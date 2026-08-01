import { rename } from "node:fs/promises";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const serverOnlyPaths = [
  "app/api/analytics/visit/route.ts",
];

const movedPaths = [];

try {
  for (const relativePath of serverOnlyPaths) {
    const source = join(projectRoot, relativePath);
    const destination = `${source}.sites-only`;
    await rename(source, destination);
    movedPaths.push({ source, destination });
  }

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
} finally {
  for (const { source, destination } of movedPaths.reverse()) {
    await rename(destination, source);
  }
}
