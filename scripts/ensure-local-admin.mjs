import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Same-origin Next rewrite → http://localhost:4001/graphql (see next.config.ts)
const LOCAL_GQL = "/api/tina-graphql";

const INTERCEPTOR_SCRIPT = `<script data-tina-local-interceptor>
(function () {
  var LOCAL_GQL = ${JSON.stringify(LOCAL_GQL)};

  // Force local flags BEFORE the Tina admin bundle evaluates auth.
  // /admin is a static SPA — Next.js .env.local does not apply here.
  try {
    window.TINA_PUBLIC_IS_LOCAL = true;
    window.__TINA_LOCAL_GQL__ = LOCAL_GQL;
    window.process = window.process || {};
    window.process.env = window.process.env || {};
    window.process.env.TINA_PUBLIC_IS_LOCAL = "true";
  } catch (e) {}

  function rewrite(url) {
    if (typeof url !== "string") return url;
    if (
      url.indexOf("content.tinajs.io") !== -1 ||
      url.indexOf("content.tina.io") !== -1 ||
      url.indexOf("localhost:4001/graphql") !== -1 ||
      url.indexOf("127.0.0.1:4001/graphql") !== -1 ||
      /\\/content\\/undefined\\//.test(url) ||
      /\\/content\\/local-mode-client-id\\//.test(url)
    ) {
      return LOCAL_GQL;
    }
    return url;
  }

  function rewriteInput(input) {
    try {
      if (typeof input === "string") return rewrite(input);
      if (typeof Request !== "undefined" && input instanceof Request) {
        var next = rewrite(input.url);
        if (next !== input.url) return new Request(next, input);
      }
    } catch (e) {}
    return input;
  }

  if (typeof window.fetch === "function") {
    var ofetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      return ofetch(rewriteInput(input), init);
    };
  }

  if (typeof XMLHttpRequest !== "undefined") {
    var oopen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function () {
      if (arguments.length > 1) arguments[1] = rewrite(arguments[1]);
      return oopen.apply(this, arguments);
    };
  }

  console.info("[tina-local] content API → " + LOCAL_GQL + " (proxy to :4001); TINA_PUBLIC_IS_LOCAL=true");
})();
</script>`;

/**
 * Ensure public/admin forces local GraphQL via the Next.js proxy.
 * Avoids `tinacms build --local` (OOMs on low-RAM machines).
 */
export function ensureLocalAdmin(root) {
  const adminDir = path.join(root, "public", "admin");
  if (!fs.existsSync(adminDir)) {
    console.warn("public/admin not found — skip admin patch");
    return 0;
  }

  let patchedFiles = 0;
  const indexPath = path.join(adminDir, "index.html");

  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, "utf8");

    html = html.replace(
      /<script data-tina-local-interceptor>[\s\S]*?<\/script>\s*/g,
      ""
    );

    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(
        /<head[^>]*>/i,
        (m) => `${m}\n    ${INTERCEPTOR_SCRIPT}\n`
      );
    } else if (/<html[^>]*>/i.test(html)) {
      html = html.replace(
        /<html[^>]*>/i,
        (m) => `${m}\n${INTERCEPTOR_SCRIPT}\n`
      );
    } else {
      html = `${INTERCEPTOR_SCRIPT}\n${html}`;
    }

    fs.writeFileSync(indexPath, html, "utf8");
    patchedFiles += 1;
  } else {
    console.warn("public/admin/index.html not found — cannot inject interceptor");
  }

  // Best-effort rewrites inside any leftover static admin assets
  const cloudUrlPatterns = [
    /https:\/\/content\.tinajs\.io\/[^"'`\s]*/g,
    /https:\\\/\\\/content\.tinajs\.io\\\/[^"'`\s]*/g,
    /https:\/\/content\.tina\.io\/[^"'`\s]*/g,
    /http:\/\/localhost:4001\/graphql/g,
    /http:\/\/127\.0\.0\.1:4001\/graphql/g,
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
      if (stat.isDirectory()) walk(full, out);
      else if (/\.(js|html|json)$/i.test(name) && name !== "index.html") {
        out.push(full);
      }
    }
    return out;
  }

  for (const file of walk(adminDir)) {
    let source;
    try {
      const stat = fs.statSync(file);
      if (stat.size > 12 * 1024 * 1024) continue;
      source = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }

    if (
      !source.includes("tinajs") &&
      !source.includes("content.tina") &&
      !source.includes("4001/graphql")
    ) {
      continue;
    }

    let next = source;
    for (const pattern of cloudUrlPatterns) {
      next = next.replace(pattern, LOCAL_GQL);
    }

    if (next !== source) {
      fs.writeFileSync(file, next, "utf8");
      patchedFiles += 1;
    }
  }

  return patchedFiles;
}

const isDirect =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirect) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const n = ensureLocalAdmin(root);
  console.log(`Patched ${n} file(s)`);
}
