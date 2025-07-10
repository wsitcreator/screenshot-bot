const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // تنظیم اندازه‌ی موبایل
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2
  });

  await page.goto('https://wsitcreator.github.io/stats-page/', {
    waitUntil: 'networkidle2'
  });

  // حذف پس‌زمینه سفید برای ترنسپرنت بودن
  await page.evaluate(() => {
    document.body.style.background = 'transparent';
  });

  // گرفتن دقیق باکس آمار با حاشیه کمتر و بالاتر
  await page.screenshot({
    path: 'screenshot.png',
    omitBackground: true,
    clip: {
  x: 9,          // ← حاشیه چپ
  y: 0,           // از بالاترین نقطه شروع کن
  width: 200,     // حاشیه راست
  height: 200     // ارتفاع
   }
  });

  await browser.close();
})();
