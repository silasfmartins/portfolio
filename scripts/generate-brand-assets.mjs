// Generates the app icons and the sharing image from src/assets/logo.png.
// Usage: node scripts/generate-brand-assets.mjs
import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";

const BACKGROUND = "#0f131a";
const logo = `data:image/png;base64,${readFileSync("src/assets/logo.png").toString("base64")}`;

const browser = await chromium.launch();

async function shoot(path, width, height, html) {
  const page = await browser.newPage({ viewport: { height, width } });
  await page.setContent(
    `<body style="margin:0;width:${width}px;height:${height}px;display:flex;align-items:center;justify-content:center;background:${BACKGROUND};font-family:system-ui,sans-serif">${html}</body>`
  );
  await page.screenshot({ path });
  await page.close();
}

const icon = (size) => `<img src="${logo}" width="${size}" height="${size}">`;

await shoot("public/icons/icon-192.png", 192, 192, icon(192));
await shoot("public/icons/icon-512.png", 512, 512, icon(512));
await shoot("public/icons/apple-icon.png", 180, 180, icon(180));
await shoot("public/icons/maskable-512.png", 512, 512, icon(400));
await shoot(
  "public/og.png",
  1200,
  630,
  `<div style="display:flex;align-items:center;gap:48px;color:#f4f7fa">
    <img src="${logo}" width="200" height="200" style="border-radius:32px">
    <div>
      <div style="font-size:72px;font-weight:700">Silas Martins</div>
      <div style="font-size:32px;color:#45c9b3;margin-top:12px">Fullstack • DevOps</div>
    </div>
  </div>`
);

await browser.close();
