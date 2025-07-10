const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // فایل JSON شامل لیست کالاها و URLها
  const urls = JSON.parse(fs.readFileSync('urls.json', 'utf-8'));

  for (const item of urls) {
    await page.goto(item.url, { waitUntil: 'networkidle2' });

    // منتظر بمون تا باکس آماری لود بشه
    await page.waitForSelector('.stats-box');

    // پیدا کردن همان بخش خاص
    const statsElement = await page.$('.stats-box');

    // مسیر خروجی
    const outputPath = path.join('screenshots', `${item.id}.png`);

    // اسکرین‌شات فقط از همان div آماری
    await statsElement.screenshot({ path: outputPath });

    console.log(`✅ Saved screenshot for ${item.id}`);
  }

  await browser.close();
})();
