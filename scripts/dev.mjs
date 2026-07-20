import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Cross-platform local dev entrypoint.
 *
 * Root cause this fixes:
 *   The committed public/admin bundle was built for Tina Cloud, so /admin calls
 *   https://content.tinajs.io/1.7/content/undefined/github/main
 *   instead of the local filesystem API.
 *
 * Fix:
 *   1) Force TINA_PUBLIC_IS_LOCAL=true
 *   2) Rebuild admin with `tinacms build --local` (points at localhost:4001)
 *   3) Start `tinacms dev -c "next dev"` (GraphQL on :4001 + Next on :3000)
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const env = {
  ...process.env,
  TINA_PUBLIC_IS_LOCAL: "true",
};

function runSync(command, args) {
  console.log(`\n> ${command} ${args.join(" ")}\n`);
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    console.error(`\nCommand failed: ${command} ${args.join(" ")}`);
    process.exit(result.status ?? 1);
  }
}

console.log("────────────────────────────────────────────");
console.log(" Tina local mode");
console.log(" TINA_PUBLIC_IS_LOCAL=true");
console.log(" Admin API → http://localhost:4001/graphql");
console.log("────────────────────────────────────────────");

// Regenerate public/admin so it does NOT use content.tinajs.io
runSync("npx", ["tinacms", "build", "--local", "--skip-cloud-checks"]);

console.log("\nStarting tinacms dev + next dev…\n");

const child = spawn(
  "npx",
  ["tinacms", "dev", "-c", "next dev"],
  {
    cwd: root,
    env,
    stdio: "inherit",
    shell: process.platform === "win32",
  }
);

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
