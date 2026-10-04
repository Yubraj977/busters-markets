# Current version: 1.1

See [UPDATE-v1.1.md](UPDATE-v1.1.md) for the new layout, item photos, and admin deployment steps. The installation steps below still apply; old design descriptions are superseded.

# Buster's Deli for Roku

A native Roku app that reads https://www.bustersmarkets.com/api/deli-menu.
No website deployment, API key, phone mirroring, or attached computer is needed during use.
This is a development app installed directly on your TV, not a Streaming Store listing.

## Install on your Roku TV

1. Connect your Mac and Roku to the same Wi-Fi. Enroll your Roku account in the developer program if needed: https://developer.roku.com/.
2. On the Roku remote, press **Home three times, Up twice, Right, Left, Right, Left, Right**.
3. Write down the IP address/URL shown. Enable the installer, accept Roku's developer agreement, and set a password. The TV restarts. i set password:abcde
4. On your Mac, open that address in Safari, for example `http://192.168.1.50`.
5. Log in with username **rokudev** and the password you just set.
6. Upload **dist/busters-deli-roku.zip** (do not unzip it) and select Install. The app should launch.
7. Later, open **Buster's Deli** from the Roku home screen. After restarting the TV you may need to open the app again; this app does not configure automatic startup.

Roku permits only one sideloaded app at a time; installing this replaces an existing sideloaded development app. It does not replace normal Streaming Store apps.
Official instructions: https://developer.roku.com/dev/docs/developer-setup

## Keep the menu visible during store hours

In the TV settings, disable the screensaver wait time, sleep timer, and automatic power saving/shutoff where available. Names and paths vary by Roku TV model. Animated menu pages do not guarantee the TV will stay awake. Check these settings on your TV and test it for longer than its normal idle timeout before leaving it unattended.

## Operation

- Uses the same public feed as the website's deli menu. Continue editing through your existing menu administration screen.
- Checks for updates every 15 seconds, with a 12-second request timeout.
- Two category columns per page, up to three items per column. Large categories continue on additional columns. Empty categories are omitted.
- Automatically changes pages every 12 seconds. Left/Right changes pages. OK or Play/Pause pauses/resumes page rotation. Home exits.
- Shows prices, descriptions, featured status, and sold-out labels. Native Roku typography is used; a decorative AI-generated food strip is included, labeled as illustrative. The website's exact browser layout is not reproduced. Long text may be truncated to fit TV rows.
- On network/invalid-response failures, retains the last menu in memory and shows a connection notice. On a fresh launch with no connection, displays an error and retries. There is no persistent offline cache.
- An empty valid feed clears the menu. The existing website endpoint also returns an empty feed if all its upstream sources fail, so the Roku cannot distinguish that case from an intentionally empty menu.

## Build

Requires Node.js and npm. Run from this folder:

```sh
npm exec --yes --package brighterscript -- bsc --project bsconfig.json
```

Alternatively, `python3 package.py` validates the XML and packages the source without a BrightScript compiler. The ZIP must have `manifest`, `source/`, and `components/` at its root.

## Device acceptance checks

This app still needs a real Roku smoke test. Check installation, menu rendering and readability, remote buttons, a price/sold-out edit appearing, a category with more than three items, Wi-Fi failure/recovery, and a full store-day idle run. The Mac does not need to remain connected after installation.
