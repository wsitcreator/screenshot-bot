const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // تنظیم سایز و زوم مناسب برای فونت واضح
  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 2
  });

  await page.goto('https://wsitcreator.github.io/stats-page/', {
    waitUntil: 'networkidle2'
  });

  // پس‌زمینه ترنسپرنت
  await page.evaluate(() => {
    document.body.style.background = 'transparent';
  });

  // اسکرین‌شات با حاشیه کمتر و شروع بالاتر
  await page.screenshot({
    path: 'screenshot.png',
    omitBackground: true,
    clip: {
      x: 15,           // کاهش حاشیه سمت چپ
      y: 10,           // شروع از بالاتر برای نمایش کامل امتیاز
      width: 360,      // کاهش عرض برای حذف فضای خالی سمت راست
      height: 230      // به اندازه کافی برای کل باکس آمار
    }
  });

  await browser.close();
})();
