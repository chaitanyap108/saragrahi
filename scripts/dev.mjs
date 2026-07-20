import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureLocalAdmin } from "./ensure-local-admin.mjs";

/**
 * Cross-platform local dev entrypoint (low-memory safe).
 *
 * Why this changed:
 *   `tinacms build --local` was OOMing (~2GB heap) on this machine during
 *   "Indexing local files" / admin bundle generation.
 *
 * New approach:
 *   1) Load .env files (Node does not do this automatically), then FORCE
 *      TINA_PUBLIC_IS_LOCAL=true so Cloud auth cannot win via .env.local
 *   2) Lightweight-patch public/admin so it calls local GraphQL (no full rebuild)
 *   3) Start `tinacms dev -c "…next dev"` with the same env on parent + child
 *
 * Important:
 *   /admin is a static SPA (public/admin). Next.js env loading does NOT
 *   configure it. Local mode is entirely this launcher + admin interceptor
 *   + tina/config.ts reading TINA_PUBLIC_IS_LOCAL at process start.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Minimal .env loader. Does not override vars already set in the shell.
 * Next.js loads these too; we load them here so `tinacms` and this launcher
 * see the same values before any child process starts.
 */
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let text;
  try {
    text = fs.readFileSync(filePath, "utf8");
  } catch {
    return;
  }
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!key) continue;
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    // Shell / parent env wins over files (Next-compatible precedence)
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

// Match Next-ish load order, then lock local mode.
loadEnvFile(path.join(root, ".env"));
loadEnvFile(path.join(root, ".env.local"));
loadEnvFile(path.join(root, ".env.development"));
loadEnvFile(path.join(root, ".env.development.local"));

// CRITICAL: force AFTER .env load so .env.local cannot disable local mode.
// tina/config.ts uses strict equality against the string "true".
process.env.TINA_PUBLIC_IS_LOCAL = "true";

const priorNodeOptions = process.env.NODE_OPTIONS || "";
const heapFlag = "--max-old-space-size=8192";
const nodeOptions = priorNodeOptions.includes("--max-old-space-size")
  ? priorNodeOptions
  : `${priorNodeOptions} ${heapFlag}`.trim();
process.env.NODE_OPTIONS = nodeOptions;

// Explicit child env (copy after mutations) so Tina + Next never see a stale set.
const childEnv = {
  ...process.env,
  TINA_PUBLIC_IS_LOCAL: "true",
  NODE_OPTIONS: nodeOptions,
};

function runSync(command, args, { optional = false } = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    env: childEnv,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (!optional && result.status !== 0) {
    console.error(`\nCommand failed: ${command} ${args.join(" ")}`);
    process.exit(result.status ?? 1);
  }
  return result.status ?? 0;
}

console.log("────────────────────────────────────────────");
console.log(" Tina local mode (low-memory)");
console.log(` TINA_PUBLIC_IS_LOCAL=${childEnv.TINA_PUBLIC_IS_LOCAL}`);
console.log(` NODE_OPTIONS=${nodeOptions}`);
console.log(" Admin API → /api/tina-graphql (proxy → :4001)");
console.log("────────────────────────────────────────────");

if (childEnv.TINA_PUBLIC_IS_LOCAL !== "true") {
  console.error(
    "Refusing to start: TINA_PUBLIC_IS_LOCAL must be \"true\" for local dev."
  );
  process.exit(1);
}

// Free port 4001 if a previous crashed Tina left it occupied.
if (process.platform === "win32") {
  runSync(
    "cmd",
    ["/c", "for /f \"tokens=5\" %a in ('netstat -aon ^| findstr :4001') do taskkill /F /PID %a"],
    { optional: true }
  );
} else {
  runSync("bash", ["-lc", "fuser -k 4001/tcp 2>/dev/null || true"], {
    optional: true,
  });
}

// Patch committed admin assets to use local GraphQL (no heavy build).
console.log("\nPatching public/admin for local GraphQL…");
const patched = ensureLocalAdmin(root);
console.log(
  patched > 0
    ? ` Patched ${patched} admin file(s) → local GraphQL proxy`
    : " Admin assets already point at local GraphQL (or no cloud URLs found)"
);

// Re-assert on the nested Next command in case `tinacms dev -c` does not
// fully forward env on some platforms / Tina versions.
const nextCommand =
  process.platform === "win32"
    ? "set TINA_PUBLIC_IS_LOCAL=true&& next dev"
    : "TINA_PUBLIC_IS_LOCAL=true next dev";

console.log("\nStarting tinacms dev + next dev…");
console.log(` Nested Next command: ${nextCommand}`);
console.log("First boot can take a minute. Wait for :4001 and :3000.\n");

const child = spawn("npx", ["tinacms", "dev", "-c", nextCommand], {
  cwd: root,
  env: childEnv,
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("error", (error) => {
  console.error("Failed to start tinacms dev:", error);
  console.error("Run npm install, then try again.");
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
