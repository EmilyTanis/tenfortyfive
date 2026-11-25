// Export PNGs (transparent background) from the outlined SVG logos.
// Usage: node brand-kit/scripts/export_png.js   (needs Playwright + Chromium)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const KIT = path.resolve(__dirname, '..');
const SVG = path.join(KIT, 'logos', 'svg');
const PNG = path.join(KIT, 'logos', 'png');

// [svg file, output name, width in px]
const jobs = [];
for (const f of fs.readdirSync(SVG).filter((f) => f.endsWith('.svg'))) {
  const base = f.replace('.svg', '');
  if (base.startsWith('tff-mark-')) {
    for (const w of [1024, 512, 180, 64, 32]) jobs.push([f, `${base}-${w}.png`, w]);
  } else {
    jobs.push([f, `${base}-2400w.png`, 2400], [f, `${base}-800w.png`, 800]);
  }
}

(async () => {
  fs.mkdirSync(PNG, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const [file, out, width] of jobs) {
    const svg = fs.readFileSync(path.join(SVG, file), 'utf8');
    const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
    const height = Math.round((width * vb[3]) / vb[2]);
    await page.setViewportSize({ width, height });
    const sized = svg.replace(/width="[^"]+" height="[^"]+"/, `width="${width}" height="${height}"`);
    await page.setContent(`<html><body style="margin:0;background:transparent">${sized}</body></html>`);
    await page.screenshot({ path: path.join(PNG, out), omitBackground: true, clip: { x: 0, y: 0, width, height } });
    console.log('wrote', out);
  }
  await browser.close();
})();
