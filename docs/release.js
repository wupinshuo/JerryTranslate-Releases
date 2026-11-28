// Payment codes: one at a time. A tier button opens its code, and a second click closes it.
(() => {
  const panel = document.getElementById('code-panel');
  const image = document.getElementById('code-image');
  const tiers = [...document.querySelectorAll('.tier')];
  let current = null;
  // The section sits at the page bottom, so follow the panel once it has finished growing.
  panel.addEventListener('transitionend', event => {
    if (event.target === panel && current) panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  for (const tier of tiers) {
    // Fetch the code before the click so the opening animation never shows an empty frame.
    tier.addEventListener('pointerenter', () => { new Image().src = tier.dataset.src; }, { once: true });
    tier.addEventListener('click', () => {
      current = current === tier ? null : tier;
      for (const other of tiers) other.setAttribute('aria-expanded', String(other === current));
      panel.classList.toggle('open', current !== null);
      panel.inert = current === null;
      if (!current) return;
      const { src, name, price, note } = current.dataset;
      image.src = src;
      image.alt = `支付宝收款码：${name} ${price}`;
      document.getElementById('code-name').textContent = `${name} · ${price}`;
      document.getElementById('code-note').textContent = note;
      image.classList.remove('pop');
      void image.offsetWidth;
      image.classList.add('pop');
    });
  }
})();

// The button always downloads the newest release in the published update feed.
// The link in the HTML is only what is left when the feed cannot be read.
(async () => {
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  // iPadOS reports a Mac platform, so a touch screen rules it out.
  if (!/mac/i.test(platform) || navigator.maxTouchPoints > 1) {
    document.getElementById('platform-note').hidden = false;
  }

  const releaseRoot = 'https://github.com/wupinshuo/JerryTranslate-Releases/releases';
  const sparkle = 'http://www.andymatuschak.org/xml-namespaces/sparkle';
  try {
    const response = await fetch('./appcast.xml', { cache: 'no-cache', signal: AbortSignal.timeout(5000) });
    if (!response.ok) return;
    const feed = new DOMParser().parseFromString(await response.text(), 'application/xml');
    if (feed.querySelector('parsererror')) return;
    const field = (item, name) => item.getElementsByTagNameNS(sparkle, name)[0]?.textContent.trim() ?? '';
    const latest = [...feed.querySelectorAll('channel > item')]
      .map(item => ({ item, build: Number(field(item, 'version')) }))
      .filter(entry => Number.isSafeInteger(entry.build) && entry.build > 0)
      .sort((a, b) => b.build - a.build)[0];
    if (!latest) return;
    const version = field(latest.item, 'shortVersionString');
    if (!/^\d+\.\d+\.\d+$/.test(version)) return;
    const downloadURL = `${releaseRoot}/download/v${version}/JerryTranslate-${version}-arm64.zip`;
    const enclosure = latest.item.querySelector(':scope > enclosure');
    if (enclosure?.getAttribute('url') !== downloadURL) return;
    for (const link of document.querySelectorAll('[data-download]')) link.href = downloadURL;
  } catch {
    // A timeout or malformed feed leaves the default download in place.
  }
})();

// The small button in the top bar takes over once the big one has scrolled out of view.
(() => {
  const top = document.getElementById('top');
  const main = document.getElementById('download-link');
  if (!top || !main || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([entry]) => top.classList.toggle('past-hero', !entry.isIntersecting)).observe(main);
})();
