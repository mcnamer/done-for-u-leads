import { getSession } from '@/lib/portal/session';
import { getLeads, isLive } from '@/lib/portal/api';
import { LiveBanner, PageTitle } from '@/components/portal/ui';
import { LeadsTable } from '@/components/portal/leads-table';

export default async function LeadsPage() {
  const session = (await getSession())!;
  const leads = await getLeads(session);

  return (
    <>
      <PageTitle title="Leads" sub="Every lead your campaigns generated — searchable and filterable." />
      <LiveBanner live={isLive} />
      <LeadsTable leads={leads} />
    </>
  );
}
