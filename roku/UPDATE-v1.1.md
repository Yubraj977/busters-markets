# Buster's Deli 1.1

Install `dist/busters-deli-roku-v1.1.0.zip` through the Roku Developer Installer at your TV's IP address. Existing font, menu parsing, and Home-screen icon fixes are included.

## Design and photos

- Cream menu surface, red masthead, yellow accents, bold category headings and large right-aligned prices.
- Four items per category page; automatic rotation every 12 seconds. All items remain reachable. Left/Right changes pages; OK or Play pauses/resumes rotation.
- Each item reads its `image` URL from the existing public `/api/deli-menu` feed, polled every 15 seconds. A changed URL or removed URL appears when the menu refreshes, without another Roku installation.
- Each row has its own thumbnail. The large spotlight prefers an available featured item with a photo on the current page, then an available item with a photo, then an available item without a photo.
- No stock food image is shown as an actual menu item. Missing, invalid, loading, or failed photos display a branded placeholder. Sold-out items are labeled and their thumbnails dimmed.
- Use direct, public HTTP(S) JPEG/PNG URLs, or WebP on Roku OS 9.4+. Webpages, login-required links, SVG, and HEIC are not supported. Relative `/path` URLs resolve against the store website. Signed URL query strings are preserved.
- Use a new URL when replacing the bytes of an image: Roku or a CDN may cache an unchanged URL. Image requests retain certificate validation. Images load asynchronously and are downscaled at decode time to limit texture memory.

## Website admin change

`app/admin/deli/page.tsx` now includes an optional Food photo URL field on Add/Edit Item. Clearing it removes the photo. Failed saves are shown in the item modal instead of closing it as if saved.

The website code change is local and must be deployed through the website's normal workflow before that field appears on the live admin page. The existing endpoint already persists and returns the `image` field; no database migration is needed. Another editor that already writes `image` works immediately with this Roku app.

## Validation and limitations

BrightScript compilation, package integrity and asset references checked. Sixteen menu-logic tests cover JSON text types, category overflow, sorting, invalid/missing/relative/signed photo URLs, zero prices, and malformed menus. Run tests against the source with `python3 tests/run.py /path/to/brs/bin/cli.js` using the `brs` npm package.

`preview-v1.1.png` is a generated layout approximation using the current menu text, not a Roku screenshot. Fonts and image cropping must be checked on the TV after installation. This update has not yet been sideloaded or visually tested on the TV. Test a real photo URL, a broken URL, replacement/removal, sold-out and featured flags, and more than four items after installation.
