import { spawnSync } from "node:child_process";

// Production must NEVER build the admin in local mode.
// (Prevents localhost:4001 from being baked into the deployed admin.)
process.env.TINA_PUBLIC_IS_LOCAL = "false";

const hasTinaCreds =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) &&
  Boolean(process.env.TINA_TOKEN);

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (hasTinaCreds) {
  console.log("Tina credentials found — running production tinacms build…");
  // NOTE: no --local flag here. This generates cloud-oriented admin assets.
  run("npx", ["tinacms", "build", "--skip-cloud-checks"]);
} else {
  console.warn(
    "Skipping tinacms build — using committed public/admin assets. Set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN on Vercel to regenerate admin during deploy."
  );
}

run("npx", ["next", "build"]);
