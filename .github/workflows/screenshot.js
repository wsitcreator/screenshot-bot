const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://wsitcreator.github.io/stats-page/', {
    waitUntil: 'networkidle2'
  });

  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close();
})();
