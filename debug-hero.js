/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3100', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(3000);
  const result = await page.evaluate(() => {
    const q = sel => document.querySelector(sel);
    const hero = q('main section');
    const h1 = q('main section h1');
    const wrapper = q('main section > div');
    return {
      heroHTML: hero ? hero.innerHTML.slice(0, 800) : null,
      bodyHTML: document.body.innerHTML.slice(0, 800),
      heroStyle: hero ? getComputedStyle(hero) : null,
      wrapperStyle: wrapper ? getComputedStyle(wrapper) : null,
      h1Text: h1 ? h1.textContent : null,
      h1Style: h1 ? getComputedStyle(h1) : null,
      h1Visible: h1 ? (!!h1.offsetParent && !!h1.offsetWidth && !!h1.offsetHeight) : false,
      hasNavbar: !!q('header'),
      navHTML: q('header') ? q('header').innerHTML.slice(0, 400) : null,
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
