// Keep a working download link in the HTML when GitHub's API is unavailable.
(async () => {
  const repository = 'wupinshuo/JerryTranslate-Releases';
  const releaseRoot = `https://github.com/${repository}/releases`;
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
      credentials: 'omit',
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return;
    const release = await response.json();
    if (release.draft || release.prerelease || !/^v\d+\.\d+\.\d+$/.test(release.tag_name)) return;
    const version = release.tag_name.slice(1);
    const filename = `JerryTranslate-${version}-arm64.zip`;
    const downloadURL = `${releaseRoot}/download/${release.tag_name}/${filename}`;
    const archive = (release.assets || []).find(asset => asset.name === filename);
    if (!archive || archive.browser_download_url !== downloadURL || !Number.isSafeInteger(archive.size) || archive.size <= 0) return;
    document.getElementById('download-link').href = downloadURL;
    document.getElementById('release-notes-link').href = `${releaseRoot}/tag/${release.tag_name}`;
    document.getElementById('release-version').textContent = `正式版 ${version}`;
    document.getElementById('download-meta').textContent = `${release.tag_name} · Apple Silicon / arm64 · ZIP · ${(archive.size / 1024 / 1024).toFixed(2)} MB`;
  } catch {
    // A timeout or rate limit leaves the verified v1.0.0 download available.
  }
})();
