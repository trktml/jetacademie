import sharp from "sharp";
import fs from "fs";
import path from "path";

async function generateIcons() {
  const svgPath = path.resolve("public/icon.svg");
  if (!fs.existsSync(svgPath)) {
    throw new Error(`SVG file not found at ${svgPath}`);
  }

  const svgContent = fs.readFileSync(svgPath, "utf-8");
  const svgBuffer = Buffer.from(svgContent);

  // 1. icon-192.png (192x192)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile("public/icon-192.png");

  // 2. icon-512.png (512x512)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile("public/icon-512.png");

  // 3. apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile("public/apple-touch-icon.png");

  // 4. icon-maskable-512.png (512x512 with safe area margin)
  // W3C Maskable Icon specification:
  // - Background must fill the entire canvas edge-to-edge (rx="0", full bleed)
  // - Core content must be fully contained within the 80% safe zone circle (scale 0.82 centered)
  const maskableSvg = svgContent
    .replaceAll('rx="116"', 'rx="0"')
    .replaceAll('rx="115"', 'rx="0"')
    .replace(
      '<g id="jetMark" transform="translate(0, 10)">',
      '<g id="jetMark" transform="translate(46.08, 54.28) scale(0.82)">'
    );

  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile("public/icon-maskable-512.png");

  console.log("✅ Successfully generated all PWA icons in public/");
}

generateIcons().catch((err) => {
  console.error("❌ Error generating icons:", err);
  process.exit(1);
});
