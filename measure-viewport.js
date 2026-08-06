/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3100', { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(1500);
  const selectors = {
    header: 'header',
    logo: 'header a[href="/"]',
    navLinks: 'header nav ul li a',
    joinBtn: 'header a[href="/register"]',
    heroSection: 'main section',
    eyebrow: 'main section span.inline-flex',
    heading: 'main section h1',
    paragraph: 'main section p',
    ctaPrimary: 'main section a[href="/destinations"]',
    searchCard: 'main section > div > div:nth-child(2) > div',
    statsRow: 'main section > div > div:nth-child(2) > div + div',
  };
  const toRect = el => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return {
      width: Math.round(r.width),
      height: Math.round(r.height),
      top: Math.round(r.top),
      left: Math.round(r.left),
      bottom: Math.round(r.bottom),
      right: Math.round(r.right),
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
  const metrics = await page.evaluate((selectors, toRectStr) => {
    const toRectFn = new Function('el', `return ${toRectStr}`);
    const q = sel => document.querySelector(sel);
    const qa = sel => Array.from(document.querySelectorAll(sel));
    return {
      header: toRectFn(q(selectors.header)),
      logo: toRectFn(q(selectors.logo)),
      navLinkCount: qa(selectors.navLinks).length,
      joinBtn: toRectFn(q(selectors.joinBtn)),
      heroSection: toRectFn(q(selectors.heroSection)),
      eyebrow: toRectFn(q(selectors.eyebrow)),
      heading: toRectFn(q(selectors.heading)),
      paragraph: toRectFn(q(selectors.paragraph)),
      ctaPrimary: toRectFn(q(selectors.ctaPrimary)),
      searchCard: toRectFn(q(selectors.searchCard)),
      statsRow: toRectFn(q(selectors.statsRow)),
      bodyHeight: document.body.scrollHeight,
      htmlHeight: document.documentElement.scrollHeight,
      initialScroll: window.scrollY,
    };
  }, selectors, toRect.toString());
  console.log(JSON.stringify(metrics, null, 2));
  await browser.close();
})();
