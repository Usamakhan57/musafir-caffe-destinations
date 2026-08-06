/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(() => {
    const rect = el => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        width: Math.round(r.width),
        height: Math.round(r.height),
        top: Math.round(r.top),
        left: Math.round(r.left),
        right: Math.round(r.right),
        bottom: Math.round(r.bottom),
        marginTop: s.marginTop,
        marginBottom: s.marginBottom,
        marginLeft: s.marginLeft,
        marginRight: s.marginRight,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
        paddingLeft: s.paddingLeft,
        paddingRight: s.paddingRight,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
      };
    };
    const query = sel => document.querySelector(sel);
    const getAll = sel => Array.from(document.querySelectorAll(sel)).map(rect);
    return {
      header: rect(query('header')),
      logo: rect(query('header a:first-of-type')),
      nav: rect(query('header nav')),
      navList: getAll('header nav ul li a'),
      joinButton: rect(query('header a[href="/register"]')),
      heroSection: rect(query('main section')),
      heading: rect(query('main section h1')),
      paragraph: rect(query('main section p')),
      ctaPrimary: rect(query('main section a[href="/destinations"]')),
      searchCard: rect(query('main section > div > div:nth-child(2) > div')),
      statsRow: rect(query('main section > div > div:nth-child(2) > div + div')),
      statItems: getAll('main section > div > div:nth-child(2) > div + div > div'),
    };
  });
  console.log(JSON.stringify(metrics, null, 2));
  await browser.close();
})();
