const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const urls = JSON.parse(fs.readFileSync('urls.json', 'utf-8'));

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });

  for (const item of urls) {
    console.log(`⏳ Processing: ${item.id}`);

    const page = await browser.newPage();

    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2
    });

    try {
      await page.goto(item.url, {
        waitUntil: 'networkidle2',
        timeout: 60000  // 60 ثانیه
      });

      // شفاف کردن پس‌زمینه
      await page.evaluate(() => {
        document.body.style.background = 'transparent';
      });

      // منتظر لود کامل selector
      await page.waitForFunction(
        (selector) => {
          const el = document.querySelector(selector);
          return el && el.innerText && el.innerText.includes('⭐');
        },
        { timeout: 10000 },  // صبر تا ۱۰ ثانیه
        item.selector
      );

      // یافتن المنت و گرفتن اسکرین‌شات
      const element = await page.$(item.selector);
      if (!element) {
        console.warn(`⚠️ Selector not found: ${item.selector}`);
        continue;
      }

      await element.screenshot({
        path: path.join('screenshots', `${item.id}.png`),
        omitBackground: true
      });

      console.log(`✅ Screenshot saved: ${item.id}.png`);
    } catch (error) {
      console.error(`❌ Error for ${item.id}:`, error.message);
    }

    await page.close();
  }

  await browser.close();
})();
