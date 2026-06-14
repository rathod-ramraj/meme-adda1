import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

async function compress() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.log("sharp not installed — skipping image compression");
    return;
  }

  const targets = ["logo.png", "icon.png", "oneflix-icon.png", "anime-icon.png", "cricket-icon.png"];
  for (const file of targets) {
    const path = join(publicDir, file);
    if (!existsSync(path)) continue;
    if (file.endsWith(".jpg")) {
      await sharp(path).jpeg({ quality: 82, mozjpeg: true }).toFile(path + ".tmp");
    } else {
      await sharp(path).png({ quality: 80, compressionLevel: 9 }).toFile(path + ".tmp");
    }
    const { renameSync, unlinkSync } = await import("node:fs");
    unlinkSync(path);
    renameSync(path + ".tmp", path);
    console.log(`compressed ${file}`);
  }
}

compress();
