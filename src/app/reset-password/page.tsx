import RedirectResetPassword from '@/modules/reset-password';
import { Suspense } from 'react';

export default function RedirectResetPasswordPage() {
  return (
    <Suspense>
      <RedirectResetPassword />
    </Suspense>
  );
}
