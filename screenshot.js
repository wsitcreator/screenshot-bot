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
    const page = await browser.newPage();

    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2
    });

    await page.goto(item.url, {
      waitUntil: 'networkidle2'
    });

    // ترنسپرنت کردن پس‌زمینه
    await page.evaluate(() => {
      document.body.style.background = 'transparent';
    });

    // گرفتن اسکرین‌شات از ناحیه مشخص با ابعاد دقیق ثابت
    await page.screenshot({
      path: path.join('screenshots', `${item.id}.png`),
      omitBackground: true,
      clip: {
        x: 9,
        y: 7,
        width: 185,
        height: 202
      }
    });

    await page.close();
  }

  await browser.close();
})();
