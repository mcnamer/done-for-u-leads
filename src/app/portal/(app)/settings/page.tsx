import { ShieldCheck } from 'lucide-react';
import { getSession } from '@/lib/portal/session';
import { isLive } from '@/lib/portal/api';
import { Card, LiveBanner, PageTitle } from '@/components/portal/ui';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-2 block font-display text-[0.8125rem] font-semibold text-ink">{label}</label>
      <input
        defaultValue={value}
        readOnly={!isLive}
        className="w-full rounded-xl border border-hair bg-paper px-4 py-2.5 text-ink read-only:text-ink-2 focus:border-brand-strong focus:ring-4 focus:ring-brand-strong/15 focus:outline-none"
      />
    </div>
  );
}

const toggles = [
  ['New lead alerts', true],
  ['Appointment reminders', true],
  ['Weekly summary email', true],
  ['Product updates', false],
] as const;

export default async function SettingsPage() {
  const session = (await getSession())!;
  const u = session.user;

  return (
    <>
      <PageTitle title="Settings" sub="Your profile, security and notifications." />
      <LiveBanner live={isLive} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-bold text-ink">Profile</h2>
          <div className="mt-5 space-y-4">
            <Field label="Full name" value={u.name} />
            <Field label="Email" value={u.email} />
            <Field label="Company" value={u.company ?? ''} />
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card>
            <h2 className="font-display text-lg font-bold text-ink">Security</h2>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-tint px-4 py-3">
              <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                <ShieldCheck className="size-5 text-brand-strong" aria-hidden />
                Two-factor authentication
              </span>
              <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 font-display text-[0.7rem] font-semibold text-white">
                On
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-2">
              Codes are sent at sign-in on a new device. Trusted devices are remembered for 30 days.
            </p>
          </Card>

          <Card>
            <h2 className="font-display text-lg font-bold text-ink">Notifications</h2>
            <ul className="mt-4 space-y-3">
              {toggles.map(([label, on]) => (
                <li key={label} className="flex items-center justify-between">
                  <span className="text-sm text-ink">{label}</span>
                  <span
                    className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-brand-strong' : 'bg-hair'}`}
                    aria-hidden
                  >
                    <span
                      className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all ${on ? 'left-[1.375rem]' : 'left-0.5'}`}
                    />
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-2">Saving preferences activates with the live backend.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
