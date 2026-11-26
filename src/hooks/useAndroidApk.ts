import { useEffect, useState } from 'react';

export interface AndroidApkMeta {
  filename: string;
  path: string;
  version: string;
  sizeBytes: number;
  builtAt: string;
  buildType?: string;
}

export function useAndroidApk() {
  const [apkMeta, setApkMeta] = useState<AndroidApkMeta | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isNativeApp, setIsNativeApp] = useState(false);

  useEffect(() => {
    const win = window as unknown as {
      Capacitor?: { isNativePlatform?: () => boolean };
    };
    const native = Boolean(win.Capacitor?.isNativePlatform?.());
    setIsNativeApp(native);

    if (native) {
      setIsChecking(false);
      return;
    }

    let cancelled = false;

    fetch('./downloads/apk-meta.json', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return null;
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) return null;
        const data = (await res.json()) as Partial<AndroidApkMeta>;
        if (
          typeof data.path === 'string' &&
          typeof data.filename === 'string' &&
          typeof data.sizeBytes === 'number'
        ) {
          return data as AndroidApkMeta;
        }
        return null;
      })
      .then((meta) => {
        if (!cancelled) {
          setApkMeta(meta);
          setIsChecking(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setApkMeta(null);
          setIsChecking(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { apkMeta, isChecking, isNativeApp };
}

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  const kb = bytes / 1024;
  return `${Math.round(kb)} KB`;
}
