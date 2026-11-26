# SigNum — Comms, DSP & Information Theory

A mobile-first, interactive learning reader for **communications engineering**, **digital signal processing (DSP)**, and **information theory**, inspired by the [LNTwww Book Overview](https://en.lntwww.de/Book_Overview).

Designed specifically for phone reading and thumb navigation:
- **Bite-sized primers**: 2–3 short paragraphs per screen before an interactive checkpoint.
- **No pen & paper required**: Questions rely on intuition, mental math, live parameter sliders, and multiple choice.
- **Custom Math Keypad**: Built-in on-screen engineering keypad (`f_max`, `log₂(`, `π`, `√(`, `dB`, `bits`, fractions) that never pops up the native mobile OS keyboard.
- **11 Interactive Signal & Coding Visualizers**: Fourier synthesis, Nyquist aliasing, LTI filtering, convolution overlap, Gaussian noise, Shannon entropy, Shannon-Hartley capacity, ASK/FSK/BPSK waveforms, I-Q constellations, Hamming distance, and a tappable Hamming (7, 4) parity-circle syndrome explorer.
- **Random Knowledge Drill**: Practice mode includes both chapter-by-chapter sets and a randomized cross-topic drill with topic filtering.
- **Offline-Ready PWA & Direct Android APK**: Automatically builds and publishes both a Progressive Web App and a downloadable, self-contained offline Android `.apk` directly on GitHub Pages.

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

## Automatic GitHub Pages Deployment + Android APK Download

The included workflow at `.github/workflows/deploy-pages.yml` builds the web app **and** packages a completely self-contained offline Android `.apk` using Capacitor on every push to `main` or `master`.

### One-Time Setup
1. Push this repository to GitHub (`main` or `master` branch).
2. Open **Settings → Pages** in your GitHub repository.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Wait ~2–3 minutes for the **Deploy SigNum & Android APK to GitHub Pages** workflow to complete.

### Installing the APK on Your Android Phone
1. Open your GitHub Pages site on your Android phone (`https://<username>.github.io/<repo-name>/`).
2. Tap the **Download Android APK** button directly on the home screen (or visit `https://<username>.github.io/<repo-name>/downloads/signum.apk`).
3. Tap the downloaded `SigNum.apk` file in Chrome/Files. If prompted, allow **Install unknown apps** for your browser.
4. Launch **SigNum** from your Android home screen — all lessons, simulations, and the custom math keypad work 100% offline.

> **Note:** The APK is also attached to every workflow run under **Actions → Artifacts (`SigNum-Android-APK`)**.

### Optional: Persistent Release Signing Keystore
Out of the box, GitHub Actions signs the APK with an Android debug key so it installs immediately with zero configuration. If you want seamless in-place APK upgrades without uninstalling previous versions, add these optional secrets under **Settings → Secrets and variables → Actions**:
- `ANDROID_KEYSTORE_BASE64` — base64-encoded `.jks` / `.keystore` file (`base64 -w 0 my-release.keystore`)
- `ANDROID_KEYSTORE_PASSWORD` — keystore password
- `ANDROID_KEY_ALIAS` — key alias inside the keystore
- `ANDROID_KEY_PASSWORD` — key password (defaults to keystore password if omitted)

When those secrets are present, the workflow automatically switches to `assembleRelease` + `zipalign` + `apksigner`.

---

## Alternative: Instant Chrome Web App Install (No Sideloading)

If you prefer not to enable sideloading, you can also open your GitHub Pages URL in Chrome for Android and tap **Install Web App** (or Chrome menu → **Install app**).
