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
    width: 390,   // مشابه iPhone 12
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

  // گرفتن فقط باکس آمار (⭐ 📦 ❤️ 📊)
  await page.screenshot({
    path: 'screenshot.png',
    omitBackground: true,
    clip: {
      x: 0,
      y: 30,           // شروع نزدیک به بالای صفحه
      width: 390,      // عرض کامل موبایل
      height: 220      // شامل تمام خطوط آمار
    }
  });

  await browser.close();
})();
