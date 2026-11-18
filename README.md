# SigNum — Comms, DSP & Information Theory

A mobile-first, interactive learning reader for **communications engineering**, **digital signal processing (DSP)**, and **information theory**, inspired by the [LNTwww Book Overview](https://en.lntwww.de/Book_Overview).

Designed specifically for phone reading and thumb navigation:
- **Bite-sized primers**: 2–3 short paragraphs per screen before an interactive checkpoint.
- **No pen & paper required**: Questions rely on intuition, mental math, live parameter sliders, and multiple choice.
- **Custom Math Keypad**: Built-in on-screen engineering keypad (`f_max`, `log₂(`, `π`, `√(`, `dB`, `bits`, fractions) that never pops up the native mobile OS keyboard.
- **11 Interactive Signal & Coding Visualizers**: Fourier synthesis, Nyquist aliasing, LTI filtering, convolution overlap, Gaussian noise, Shannon entropy, Shannon-Hartley capacity, ASK/FSK/BPSK waveforms, I-Q constellations, Hamming distance, and a tappable Hamming (7, 4) parity-circle syndrome explorer.
- **Random Knowledge Drill**: Practice mode includes both chapter-by-chapter sets and a randomized cross-topic drill with topic filtering.
- **Offline-Ready PWA**: Configured with `vite-plugin-pwa`, Workbox offline caching, and relative `./` paths for seamless GitHub Pages hosting and Android APK wrapping.

---

## Curriculum Overview (6 Books · 19 Chapters)

1. **Book 1 — Signal Representation**: Waves & Fourier Series · Sampling & Nyquist · Decibels & Signal Power
2. **Book 2 — Linear & Time-Invariant Systems**: Linearity & Convolution · Filters & Causality · Multipath & ISI
3. **Book 3 — Theory of Stochastic Signals**: Random Noise & Bell Curves · Autocorrelation, SNR & White Noise
4. **Book 4 — Information Theory**: Surprise & Shannon Entropy · Huffman Compression · Mutual Information & Capacity
5. **Book 5 — Modulation Methods**: Analog AM/FM · Digital ASK/FSK/BPSK · I-Q Constellations & QAM · OFDM
6. **Book 6 — Channel Coding & Error Control**: Parity & Hamming Distance · Hamming (7, 4) Syndromes · CRC & Viterbi · Soft Decisions, LDPC & Shannon Limit

---

## Local Development

```bash
npm install
npm run dev
```

Build and type-check production bundle:

```bash
npm run lint
npm run build
```

---

## Hosting on GitHub Pages

This repository includes an automated GitHub Actions workflow at `.github/workflows/deploy-pages.yml` and uses `base: './'` in `vite.config.ts`, so subpath URLs like `https://<username>.github.io/<repo-name>/` work with zero path edits.

1. Push this project to a GitHub repository on the `main` branch.
2. Open your repository **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Every push to `main` automatically runs `npm run lint`, `npm run build`, and publishes `dist/` to `https://<username>.github.io/<repo-name>/`.

---

## Installing on Android (PWA or APK)

Once hosted on GitHub Pages, you can install SigNum on your Android phone in three ways:

### Option 1: Instant Android WebAPK (Simplest — No Build Tools)
1. Open your GitHub Pages URL in **Chrome for Android**.
2. Tap **Install Offline App** on the Overview screen (or Chrome menu → **Install app** / **Add to Home screen**).
3. Android generates an installable WebAPK with the SigNum icon, standalone full-screen window, and full offline Workbox caching.

### Option 2: Signed Android APK via PWABuilder or Bubblewrap (Recommended for `.apk` file)
Because SigNum ships a complete Web App Manifest (`manifest.webmanifest`) and Service Worker (`sw.js`) with `192x192`, `512x512`, and padded `maskable` PNG icons:

**Fastest (Browser UI via PWABuilder):**
1. Go to [pwabuilder.com](https://www.pwabuilder.com/) and paste your live GitHub Pages URL (`https://<username>.github.io/<repo-name>/`).
2. Click **Package for stores → Android → Generate Package** (or download the signed `.apk` bundle directly for sideloading).

**CLI (Google Bubblewrap Trusted Web Activity):**
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest="https://<username>.github.io/<repo-name>/manifest.webmanifest"
bubblewrap build
```
This outputs `app-release-signed.apk` ready to install on your Android phone via USB (`adb install app-release-signed.apk`) or file transfer.

> **Hiding the Chrome address bar in a TWA APK:**
> Copy the SHA-256 fingerprint from your Bubblewrap signing keystore (`bubblewrap fingerprint`) and place a `public/.well-known/assetlinks.json` file in this repo before redeploying to GitHub Pages so Android verifies domain ownership.

### Option 3: Completely Self-Contained Offline APK via Capacitor
If you want an `.apk` that bundles all HTML/JS/CSS locally without relying on GitHub Pages at all:

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "SigNum" "com.signum.reader" --web-dir=dist
npm run build
npx cap add android
npx cap sync android
npx cap open android   # Build signed APK from Android Studio or ./gradlew assembleRelease
```
