import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/portal/session';
import { PortalShell } from '@/components/portal/portal-shell';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/portal/login');
  return <PortalShell user={session.user}>{children}</PortalShell>;
}
