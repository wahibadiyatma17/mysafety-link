'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RedirectResetPassword() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [url, setUrl] = useState('#');

  useEffect(() => {
    if (!code) return;

    const userAgent = navigator.userAgent || navigator.vendor;

    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);

    const schemeUrl = `mysafety://user/user-reset-password?code=${code}`;
    const iosStoreUrl = 'https://apps.apple.com/app'; // TODO: replace with your iOS App Store link
    const androidStoreUrl = 'https://play.google.com/store/apps'; // TODO: Replace with your Play Store link

    const fallbackUrl = isIOS ? iosStoreUrl : isAndroid ? androidStoreUrl : 'https://mysafety.id';
    setUrl(fallbackUrl);
    // Attempt to open app
    window.location.href = schemeUrl;

    // Fallback if app not opened (wait 1.5 seconds)
    const timeout = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 1500);

    return () => clearTimeout(timeout);
  }, [code]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Opening MySafety App...</h1>
      <p>
        If nothing happens, <a href={url}>tap here</a>.
      </p>
    </main>
  );
}
