import type { Metadata } from 'next';
import { isLive } from '@/lib/portal/api';
import { LoginForm } from '@/components/portal/login-form';

export const metadata: Metadata = {
  title: 'Client sign-in',
  robots: { index: false, follow: false },
};

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  const next = typeof sp.next === 'string' && sp.next.startsWith('/portal') ? sp.next : '/portal';
  return <LoginForm demo={!isLive} next={next} />;
}
