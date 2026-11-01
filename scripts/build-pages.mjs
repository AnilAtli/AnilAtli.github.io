import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const nextBin = join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const exitCode = await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [nextBin, "build"], {
    cwd: projectRoot,
    env: process.env,
    stdio: "inherit",
  });
  child.once("error", reject);
  child.once("exit", (code) => resolve(code ?? 1));
});

if (exitCode !== 0) process.exitCode = exitCode;
