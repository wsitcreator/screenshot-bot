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
      x: 5,            // حاشیه چپ بسیار کم
      y: 0,            // از بالاترین نقطه شروع کن
      width: 380,      // کاهش عرض برای حذف حاشیه سمت راست
      height: 250      // کمی افزایش برای نمایش کامل ستاره + آمار
    }
  });

  await browser.close();
})();
