import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const packagePath = import.meta.resolve("pdfjs-dist/package.json").replace("file://", "");
const { version } = (await Bun.file(packagePath).json()) as { version: string };
const source = dirname(packagePath);
const target = join(import.meta.dir, "../public/pdfjs", version);
await mkdir(target, { recursive: true });
await cp(join(source, "build/pdf.worker.min.mjs"), join(target, "pdf.worker.min.mjs"));
for (const directory of ["cmaps", "standard_fonts", "wasm"]) {
  await cp(join(source, directory), join(target, directory), { recursive: true });
}
console.log(`PDF.js ${version} assets prepared.`);
