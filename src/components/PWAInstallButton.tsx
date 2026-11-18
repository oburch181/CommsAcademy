import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="min-h-[44px] px-4 rounded-xl bg-papyrus border border-rule text-ink text-xs font-semibold flex items-center gap-2 hover:bg-papyrus-deep active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="w-4 h-4 text-cobalt" />
        <span>Install Offline App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="min-h-[44px] px-4 rounded-xl bg-papyrus border border-rule text-ink text-xs font-semibold flex items-center gap-2 hover:bg-papyrus-deep active:scale-[0.98] transition-transform whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-cobalt" />
          <span>Install on iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-vellum border border-rule p-6 space-y-4 shadow-lg">
              <h3 className="text-xl font-semibold text-ink">
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
      </>
    );
  }

  return null;
};
