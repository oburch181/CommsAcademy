import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { formatFileSize, useAndroidApk } from '../hooks/useAndroidApk';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { apkMeta, isChecking, isNativeApp } = useAndroidApk();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showApkGuide, setShowApkGuide] = useState(false);

  // Hide install controls once running inside the installed Android APK or standalone PWA
  if (isNativeApp || isInstalled) {
    return null;
  }

  const sizeLabel = apkMeta ? formatFileSize(apkMeta.sizeBytes) : '';

  return (
    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
      {/* Direct Android APK download when hosted on GitHub Pages */}
      {apkMeta ? (
        <a
          href={apkMeta.path}
          download={apkMeta.filename}
          className="min-h-[44px] px-4 rounded-xl bg-cobalt text-vellum text-xs font-semibold flex items-center gap-2 hover:bg-cobalt/90 active:scale-[0.98] transition-transform whitespace-nowrap shrink-0"
        >
          <Download className="w-4 h-4 shrink-0" />
          <span>
            Download Android APK{sizeLabel ? ` (${sizeLabel})` : ''}
          </span>
        </a>
      ) : (
        !isChecking && (
          <button
            type="button"
            onClick={() => setShowApkGuide(true)}
            className="min-h-[44px] px-4 rounded-xl bg-vellum border border-rule text-ink text-xs font-semibold flex items-center gap-2 hover:bg-papyrus-deep active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4 text-cobalt shrink-0" />
            <span>Android APK</span>
          </button>
        )
      )}

      {/* Browser PWA install prompt (Chrome / Edge / Android) */}
      {isInstallable && (
        <button
          type="button"
          onClick={install}
          className="min-h-[44px] px-4 rounded-xl bg-papyrus border border-rule text-ink text-xs font-semibold flex items-center gap-2 hover:bg-papyrus-deep active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-cobalt shrink-0" />
          <span>Install Web App</span>
        </button>
      )}

      {/* iOS Safari fallback instructions */}
      {isIOS && (
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="min-h-[44px] px-4 rounded-xl bg-papyrus border border-rule text-ink text-xs font-semibold flex items-center gap-2 hover:bg-papyrus-deep active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-cobalt shrink-0" />
          <span>Install on iOS</span>
        </button>
      )}

      {/* Android APK Info Modal (shown in local dev / preview before GitHub Pages builds the APK) */}
      {showApkGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="apk-guide-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-vellum border border-rule p-6 space-y-4 shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <h3
                id="apk-guide-title"
                className="text-xl font-semibold text-ink"
              >
                Android APK via GitHub Pages
              </h3>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setShowApkGuide(false)}
                className="min-h-[36px] min-w-[36px] rounded-lg flex items-center justify-center text-ink-muted hover:text-ink cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-sm text-ink-muted leading-relaxed">
              <p>
                When deployed to GitHub Pages, the included GitHub Actions
                workflow compiles a self-contained offline Android APK and
                serves it right from this button at{' '}
                <code className="font-mono text-xs text-ink">
                  /downloads/signum.apk
                </code>
                .
              </p>
              <p>
                On your Android phone, open your GitHub Pages URL, tap{' '}
                <strong className="text-ink">Download Android APK</strong>, then
                open the downloaded file to install.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowApkGuide(false)}
              className="w-full min-h-[44px] rounded-xl bg-cobalt text-vellum text-sm font-semibold cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ios-guide-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-xs p-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-vellum border border-rule p-6 space-y-4 shadow-lg">
            <h3
              id="ios-guide-title"
              className="text-xl font-semibold text-ink"
            >
              Install SigNum on iPhone / iPad
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              1. Tap the <strong>Share</strong> button in the Safari toolbar.
              <br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.
            </p>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="w-full min-h-[44px] rounded-xl bg-cobalt text-vellum text-sm font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
