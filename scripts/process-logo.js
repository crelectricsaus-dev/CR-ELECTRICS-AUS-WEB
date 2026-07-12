const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "brand", "logo-source.png");
const OUT = (name) => path.join(__dirname, "..", "public", name);

async function main() {
  // Trim uniform black border down to the artwork's bounding box.
  const trimmed = sharp(SRC).trim({ background: "#000000", threshold: 20 });
  const trimmedBuffer = await trimmed.png().toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log("trimmed size:", trimmedMeta.width, trimmedMeta.height);

  // Use luminance as an alpha mask so the black background becomes transparent,
  // then flood-fill white (for use on dark surfaces) or ink (for light surfaces).
  const { data, info } = await sharp(trimmedBuffer)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  async function buildMasked(rgb) {
    const rgba = Buffer.alloc(info.width * info.height * 4);
    for (let i = 0; i < info.width * info.height; i++) {
      const alpha = data[i];
      rgba[i * 4] = rgb[0];
      rgba[i * 4 + 1] = rgb[1];
      rgba[i * 4 + 2] = rgb[2];
      rgba[i * 4 + 3] = alpha;
    }
    return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png();
  }

  // Full lockup (icon + wordmark), white-on-transparent — for footer / large dark sections.
  const whiteFull = await buildMasked([255, 255, 255]);
  await whiteFull.clone().toFile(OUT("logo-full-white.png"));

  // Ink (near-black) version for light backgrounds if ever needed.
  const inkFull = await buildMasked([10, 10, 12]);
  await inkFull.clone().toFile(OUT("logo-full-ink.png"));

  // Square icon-only crop (just the CR mark, top portion) for the compact header logo + favicon.
  const iconCropHeight = Math.round(info.height * 0.62);
  const iconWhite = sharp(await whiteFull.clone().toBuffer()).extract({
    left: 0,
    top: 0,
    width: info.width,
    height: iconCropHeight,
  });
  const iconMeta = await iconWhite.clone().metadata();
  const side = Math.max(iconMeta.width, iconMeta.height);
  await iconWhite
    .clone()
    .resize({
      width: side,
      height: side,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(OUT("logo-icon-white.png"));

  // Favicon source: icon mark on solid black square (favicons need opaque backgrounds to look right in tabs).
  const faviconSquare = await sharp(await iconWhite.clone().toBuffer())
    .resize({
      width: side,
      height: side,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .flatten({ background: "#0a0a0c" })
    .png()
    .toBuffer();

  await sharp(faviconSquare).resize(32, 32).toFile(OUT("favicon-32.png"));
  await sharp(faviconSquare).resize(180, 180).toFile(OUT("apple-touch-icon.png"));
  await sharp(faviconSquare).resize(512, 512).toFile(OUT("icon-512.png"));

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
