import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-16 md:bottom-4 left-4 z-40 flex items-center gap-2 rounded-xl bg-vellum border border-ochre/50 px-3 py-2 text-xs font-medium text-ink shadow-sm"
    >
      <WifiOff className="w-3.5 h-3.5 text-ochre shrink-0" />
      <span>Offline Mode · Cached lessons active</span>
    </div>
  );
};
