# Fukuoka guide — GitHub Pages PWA

This folder is a complete offline app. No dependencies, API key, database, or build service are needed. The Korean interface has separate map, itinerary, shopping, dining and sightseeing screens. Only the selected day is shown. Compact place lists open the full photos and details on tap. All 41 photos, maps and guide information are included in index.html.

## Visibility

This is the public-safe package. Its source repository and published website are public. It contains public places and an approximate public starting point, with personal accommodation, booking details, flights and calendar dates removed. Upload only these deployable files, never the private guide, source data, local research or backups.

GitHub Free supports Pages from public repositories. A private repository requires GitHub Pro, Team or Enterprise; that does not automatically make the website private. Private website access controls require an eligible GitHub Enterprise Cloud organization.

## GitHub Pages setup

1. Upload ALL 12 files from the public-safe fukuoka-guide-pwa folder together in one batch to the repository root: index.html, sw.js, pwa.js, pwa.css, manifest.webmanifest, .nojekyll, README.md, icon.svg, icon-192.png, icon-512.png, icon-maskable-512.png and apple-touch-icon.png. All files stay in the same folder; there is no icons subfolder. Do not upload the ZIP itself or private files.
2. Open Settings → Pages. Under Build and deployment, choose Deploy from a branch, main and /(root), then Save.
3. Open the HTTPS URL shown by GitHub Pages. Deployment can take about ten minutes. Wait for “오프라인 사용 가능” before testing without internet.

Relative paths support project URLs and custom domains. No repository-name edits are required. Service workers require HTTPS or localhost; double-clicking index.html does not install the PWA.

## Add to a phone

- iPhone: open the hosted URL in Safari → Share → Add to Home Screen → keep Open as Web App enabled → Add.
- Android: open it in Chrome → menu → Install and create shortcut → Install (wording can vary), or tap “앱 저장”.
- Open online once and wait for “오프라인 사용 가능”. Test airplane mode before travelling. Photos, maps and guide content are saved. Google Maps and external websites need internet.

Browser storage can be cleared or evicted. If that happens, reopen online and allow the app to save again.

## Updates

Replace the public-safe deployable files with the latest public build. The service worker version changes with the content. Returning users tap “새 버전 열기” to update without interrupting their current reading.

The cache is scoped to the app’s URL path and stores one canonical index.html. No analytics or external fonts/scripts are used.

## Official instructions

- Pages setup: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Plans and website visibility: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- Private website access: https://docs.github.com/en/enterprise-cloud%40latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
- iPhone web apps: https://support.apple.com/en-lamr/guide/iphone/iphea86e5236/ios
- Android web apps: https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en-GB
