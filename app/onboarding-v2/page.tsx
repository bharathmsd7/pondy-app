'use client';

import { useRouter } from 'next/navigation';
import OnboardingV2 from '@/components/OnboardingV2';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function OnboardingV2Page() {
  const router = useRouter();

  useEffect(() => {
    const isOnboardingCompleted = Cookies.get('isOnboardingCompleted') === 'true';
    if (isOnboardingCompleted) {
      router.push('/');
    }
  }, [router]);

  return <OnboardingV2 />;
}
