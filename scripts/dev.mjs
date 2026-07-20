import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Cross-platform local dev entrypoint.
 *
 * Ensures TINA_PUBLIC_IS_LOCAL=true on every OS (including Windows), then starts:
 *   tinacms dev -c "next dev"
 *
 * That boots the local filesystem GraphQL API at http://localhost:4001/graphql
 * and regenerates admin/client files against tina/config.ts.
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const env = {
  ...process.env,
  TINA_PUBLIC_IS_LOCAL: "true",
};

const tinacmsCmd = process.platform === "win32" ? "tinacms.cmd" : "tinacms";
const tinacmsBin = path.join(root, "node_modules", ".bin", tinacmsCmd);

const child = spawn(tinacmsBin, ["dev", "-c", "next dev"], {
  cwd: root,
  env,
  stdio: "inherit",
  shell: process.platform === "win32",
});

child.on("error", (error) => {
  console.error("Failed to start tinacms dev:", error);
  console.error(
    "Make sure dependencies are installed (npm install) and @tinacms/cli is present."
  );
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
