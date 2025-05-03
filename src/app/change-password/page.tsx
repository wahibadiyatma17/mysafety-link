import RedirectResetPassword from '@/modules/reset-password';
import { Suspense } from 'react';

export default function RedirectTaskPage() {
  return (
    <Suspense>
      <RedirectResetPassword />
    </Suspense>
  );
}
