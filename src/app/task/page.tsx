import RedirectTask from '@/modules/task';
import { Suspense } from 'react';

export default function RedirectTaskPage() {
  return (
    <Suspense>
      <RedirectTask />
    </Suspense>
  );
}
