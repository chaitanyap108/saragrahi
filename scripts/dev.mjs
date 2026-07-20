import { spawn, spawnSync } from "node:child_process";
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
 *   1) Force TINA_PUBLIC_IS_LOCAL=true + raise Node heap
 *   2) Lightweight-patch public/admin so it calls localhost:4001 (no full rebuild)
 *   3) Start `tinacms dev -c "next dev"` once (GraphQL :4001 + Next :3000)
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const priorNodeOptions = process.env.NODE_OPTIONS || "";
const heapFlag = "--max-old-space-size=8192";
const nodeOptions = priorNodeOptions.includes("--max-old-space-size")
  ? priorNodeOptions
  : `${priorNodeOptions} ${heapFlag}`.trim();

const env = {
  ...process.env,
  TINA_PUBLIC_IS_LOCAL: "true",
  NODE_OPTIONS: nodeOptions,
};

function runSync(command, args, { optional = false } = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
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
console.log(" TINA_PUBLIC_IS_LOCAL=true");
console.log(` NODE_OPTIONS=${nodeOptions}`);
console.log(" Admin API → http://localhost:4001/graphql");
console.log("────────────────────────────────────────────");

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

// Patch committed cloud admin assets to use local GraphQL (no heavy build).
console.log("\nPatching public/admin for local GraphQL…");
const patched = ensureLocalAdmin(root);
console.log(
  patched > 0
    ? ` Patched ${patched} admin file(s) → http://localhost:4001/graphql`
    : " Admin assets already point at local GraphQL (or no cloud URLs found)"
);

console.log("\nStarting tinacms dev + next dev…");
console.log("First boot can take a minute. Wait for :4001 and :3000.\n");

const child = spawn("npx", ["tinacms", "dev", "-c", "next dev"], {
  cwd: root,
  env,
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
