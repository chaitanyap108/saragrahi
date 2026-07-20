import fs from "node:fs";
import path from "node:path";

/**
 * Lightweight local-admin fix.
 *
 * Avoids `tinacms build --local` (OOMs on low-RAM machines) by rewriting
 * Tina Cloud GraphQL URLs inside the committed public/admin bundle so the
 * admin talks to the local filesystem API instead:
 *   http://localhost:4001/graphql
 *
 * Returns the number of files modified.
 */
export function ensureLocalAdmin(root) {
  const adminDir = path.join(root, "public", "admin");
  if (!fs.existsSync(adminDir)) {
    console.warn("public/admin not found — skip admin patch");
    return 0;
  }

  const localEndpoint = "http://localhost:4001/graphql";
  let patchedFiles = 0;

  const cloudUrlPatterns = [
    // Normal strings
    /https:\/\/content\.tinajs\.io\/[^"'`\s]+/g,
    // Escaped slashes inside bundled JS strings
    /https:\\\/\\\/content\.tinajs\.io\\\/[^"'`\s]+/g,
    // Unicode-escaped slashes (\/)
    /https:\u002F\u002Fcontent\.tinajs\.io[^"'`\s]*/g,
  ];

  function walk(dir, out = []) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      let stat;
      try {
        stat = fs.statSync(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        walk(full, out);
      } else if (/\.(js|html|json|css|map)$/i.test(name)) {
        out.push(full);
      }
    }
    return out;
  }

  for (const file of walk(adminDir)) {
    let source;
    try {
      source = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }

    // Skip obviously binary-ish giant files with no text markers
    if (!source.includes("tinajs") && !source.includes("tinacms") && !source.includes("graphql")) {
      continue;
    }

    let next = source;
    for (const pattern of cloudUrlPatterns) {
      next = next.replace(pattern, localEndpoint);
    }

    // Common baked flags / absolute API helpers seen in Tina admin builds
    next = next
      .replace(
        /TINA_PUBLIC_IS_LOCAL["']?\s*[:=]\s*["']?false["']?/g,
        (m) => m.replace(/false/, "true")
      )
      .replace(
        /["']isLocal["']\s*:\s*false/g,
        (m) => m.replace("false", "true")
      );

    if (next !== source) {
      fs.writeFileSync(file, next, "utf8");
      patchedFiles += 1;
    }
  }

  return patchedFiles;
}

// Allow: node scripts/ensure-local-admin.mjs
if (import.meta.url === `file://${process.argv[1]}`) {
  const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
  const n = ensureLocalAdmin(root);
  console.log(`Patched ${n} file(s)`);
}
