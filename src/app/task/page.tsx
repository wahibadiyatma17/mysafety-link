'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

export default function RedirectTaskPage() {
  const searchParams = useSearchParams()
  const taskId = searchParams.get('id');
  const [url, setUrl] = useState('#')

  useEffect(() => {
    if (!taskId) return;

    const userAgent = navigator.userAgent || navigator.vendor;

    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window);


    const schemeUrl = `mysafety://task/${taskId}`;
    const iosStoreUrl = 'https://apps.apple.com/app'; // TODO: replace with your iOS App Store link
    const androidStoreUrl = 'https://play.google.com/store/apps'; // TODO: Replace with your Play Store link

    const fallbackUrl = isIOS ? iosStoreUrl : isAndroid ? androidStoreUrl : 'https://mysafety.id';
    setUrl(fallbackUrl)
    // Attempt to open app
    window.location.href = schemeUrl;

    // Fallback if app not opened (wait 1.5 seconds)
    const timeout = setTimeout(() => {
      window.location.href = fallbackUrl;
    }, 1500);

    return () => clearTimeout(timeout);
  }, [taskId]);

  return (
    <main style={{ padding: 20 }}>
      <h1>Opening MySafety App...</h1>
      <p>
        If nothing happens, <a href={url}>tap here</a>.
      </p>
    </main>
  );
}
