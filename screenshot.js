const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // خواندن لیست آدرس‌ها
  const urls = JSON.parse(fs.readFileSync('urls.json', 'utf-8'));

  for (const item of urls) {
    try {
      await page.goto(item.url, { waitUntil: 'networkidle2' });

      // منتظر ماندن برای لود stats-box
      await page.waitForSelector('.stats-box', { timeout: 15000 });

      const statsElement = await page.$('.stats-box');

      if (statsElement) {
        const outputPath = path.join('screenshots', `${item.id}.png`);
        await statsElement.screenshot({ path: outputPath });
        console.log(`✅ Saved screenshot for ${item.id}`);
      } else {
        console.warn(`⚠️ .stats-box not found in DOM for ${item.id}`);
      }

    } catch (err) {
      console.error(`❌ Failed for ${item.id}: ${err.message}`);
    }
  }

  await browser.close();
})();
