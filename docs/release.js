// The HTML ships a working default download; this only refreshes it from the published update feed.
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
    const size = Number(enclosure?.getAttribute('length'));
    if (enclosure?.getAttribute('url') !== downloadURL || !Number.isSafeInteger(size) || size <= 0) return;
    document.getElementById('download-link').href = downloadURL;
    document.getElementById('release-notes-link').href = `${releaseRoot}/tag/v${version}`;
    document.getElementById('release-version').textContent = `正式版 ${version}`;
    document.getElementById('download-meta').textContent = `v${version} · ${(size / 1024 / 1024).toFixed(2)} MB`;
  } catch {
    // A timeout or malformed feed leaves the default download in place.
  }
})();
