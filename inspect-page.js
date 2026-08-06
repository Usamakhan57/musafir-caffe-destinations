/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3100', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2000);
  const info = await page.evaluate(() => {
    const q = sel => document.querySelector(sel);
    const rect = el => el ? el.getBoundingClientRect().toJSON() : null;
    const style = el => el ? getComputedStyle(el) : null;
    const h1 = q('main section h1');
    const p = q('main section p');
    return {
      title: document.title,
      h1Text: h1?.textContent,
      h1Rect: rect(h1),
      h1Style: h1 ? {
        color: style(h1).color,
        fontSize: style(h1).fontSize,
        lineHeight: style(h1).lineHeight,
        letterSpacing: style(h1).letterSpacing,
        visibility: style(h1).visibility,
        display: style(h1).display,
        opacity: style(h1).opacity,
      } : null,
      pText: p?.textContent,
      pRect: rect(p),
      searchCard: rect(q('main section > div > div:nth-child(2) > div')),
      searchCardStyle: style(q('main section > div > div:nth-child(2) > div')) ? {
        visibility: style(q('main section > div > div:nth-child(2) > div')).visibility,
        display: style(q('main section > div > div:nth-child(2) > div')).display,
        opacity: style(q('main section > div > div:nth-child(2) > div')).opacity,
      } : null,
      heroRect: rect(q('main section')),
      bodyHeight: document.body.scrollHeight,
      htmlHeight: document.documentElement.scrollHeight,
      h1InViewport: h1 ? (h1.getBoundingClientRect().top >= 0 && h1.getBoundingClientRect().bottom <= window.innerHeight) : false,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
