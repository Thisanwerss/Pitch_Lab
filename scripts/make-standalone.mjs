import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const distDir = join(root, "dist");
const assetsDir = join(distDir, "assets");

const files = await readdir(assetsDir);
const cssFile = files.find((file) => file.endsWith(".css"));
const jsFile = files.find((file) => file.endsWith(".js"));

if (!cssFile || !jsFile) {
  throw new Error("Missing built CSS or JS asset. Run `npm run build` first.");
}

const [css, rawJs, tumLogo, atariLogo] = await Promise.all([
  readFile(join(assetsDir, cssFile), "utf8"),
  readFile(join(assetsDir, jsFile), "utf8"),
  readFile(join(assetsDir, "brand", "TUM.jpg")),
  readFile(join(assetsDir, "brand", "ATARI.png")),
]);

const logoUrls = {
  "/assets/brand/TUM.jpg": `data:image/jpeg;base64,${tumLogo.toString("base64")}`,
  "/assets/brand/ATARI.png": `data:image/png;base64,${atariLogo.toString("base64")}`,
};

let js = rawJs;
for (const [assetPath, dataUrl] of Object.entries(logoUrls)) {
  js = js.replaceAll(assetPath, dataUrl);
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Beyond Teleoperation for Humanoid Loco-Manipulation web slide deck"
    />
    <title>Beyond Teleoperation | TUM ATARI Lab</title>
    <style>
${css}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
${js}
    </script>
  </body>
</html>
`;

await writeFile(join(distDir, "standalone.html"), html, "utf8");
console.log(`Wrote ${join(distDir, "standalone.html")}`);
