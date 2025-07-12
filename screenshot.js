const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const urls = require('./urls.json');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });

  for (const item of urls) {
    const page = await browser.newPage();

    // سایز موبایل (مثلاً iPhone 12)
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2
    });

    // رفتن به آدرس کالا
    await page.goto(item.url, { waitUntil: 'networkidle2' });

    // حذف پس‌زمینه سفید
    await page.evaluate(() => {
      document.body.style.background = 'transparent';
    });

    // گرفتن باکس مربوط به id مشخص‌شده
    const element = await page.$(item.selector);
    if (!element) {
      console.warn(`⚠️ Not found: ${item.selector} in ${item.url}`);
      continue;
    }

    // مسیر فایل نهایی
    const fileName = screenshots/${item.id}.png;
    await element.screenshot({
      path: fileName,
      omitBackground: true,
    });

    await page.close();
    console.log(`✅ Saved: ${fileName}`);
  }

  await browser.close();
})();
