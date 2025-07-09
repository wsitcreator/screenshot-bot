const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 800,
    height: 1200,
    deviceScaleFactor: 2
  });

  await page.goto('https://wsitcreator.github.io/stats-page/', {
    waitUntil: 'networkidle2'
  });

  await page.evaluate(() => {
    document.body.style.background = 'transparent';
    document.body.style.setProperty('background', 'transparent', 'important');
  });

  await page.screenshot({
    path: 'screenshot.png',
    fullPage: true,
    omitBackground: true
  });

  await browser.close();
})();
