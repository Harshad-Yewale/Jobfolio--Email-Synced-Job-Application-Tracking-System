import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from 'recharts';
import { useSummary, useFunnel, useWeekly, useRecentActivity } from '../hooks/useDashboard';
import type { ConversionFunnelResponse } from '../types/dashboard';

const funnelStages: { key: keyof ConversionFunnelResponse; label: string; color: string }[] = [
  { key: 'applied', label: 'Applied', color: 'var(--st-applied)' },
  { key: 'received', label: 'Received', color: 'var(--st-received)' },
  { key: 'assessment', label: 'Assessment', color: 'var(--st-assessment)' },
  { key: 'interview', label: 'Interview', color: 'var(--st-interview)' },
  { key: 'offer', label: 'Offer', color: 'var(--st-offer)' },
  { key: 'accepted', label: 'Accepted', color: 'var(--st-accepted)' },
];

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: '18px 20px' }}>
      <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 8 }}>{label}</div>
      <div className="mono" style={{ fontSize: 26, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useSummary();
  const { data: funnel, isLoading: funnelLoading } = useFunnel();
  const { data: weekly, isLoading: weeklyLoading } = useWeekly();
  const { data: activity, isLoading: activityLoading } = useRecentActivity(10);

  const maxFunnelValue = funnel ? Math.max(...funnelStages.map((s) => funnel[s.key as keyof typeof funnel] as number), 1) : 1;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22 }}>Dashboard</h1>
        <p style={{ color: 'var(--ink-soft)', margin: '4px 0 0' }}>Your job search at a glance</p>
      </div>

      {summaryLoading ? (
        <p>Loading stats...</p>
      ) : summary ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, marginBottom: 28 }}>
          <StatCard label="Total Applications" value={summary.totalApplications} />
          <StatCard label="Active" value={summary.activeApplications} />
          <StatCard label="Interviews" value={summary.interviews} />
          <StatCard label="Offers Received" value={summary.offersReceived} />
          <StatCard label="Offers Accepted" value={summary.offersAccepted} />
          <StatCard label="Success Rate" value={`${summary.successRate}%`} />
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, marginBottom: 28 }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, marginBottom: 16 }}>Applications per week</h3>
          {weeklyLoading ? (
            <p>Loading...</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weekly}>
                <XAxis dataKey="weekLabel" tick={{ fontSize: 12, fill: 'var(--ink-soft)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: 'var(--ink-soft)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: 20 }}>
          <h3 style={{ fontSize: 15, marginBottom: 16 }}>Conversion funnel</h3>
          {funnelLoading ? (
            <p>Loading...</p>
          ) : funnel ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {funnelStages.map((stage) => {
                const value = funnel[stage.key as keyof typeof funnel] as number;
                const widthPct = Math.max((value / maxFunnelValue) * 100, 3);
                return (
                  <div key={stage.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 80, fontSize: 12, color: 'var(--ink-soft)' }}>{stage.label}</div>
                    <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 6, overflow: 'hidden' }}>
                      <div style={{ width: `${widthPct}%`, background: stage.color, height: 18, borderRadius: 6 }} />
                    </div>
                    <div className="mono" style={{ width: 28, fontSize: 12, textAlign: 'right' }}>{value}</div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 12, padding: 20 }}>
        <h3 style={{ fontSize: 15, marginBottom: 16 }}>Recent activity</h3>
        {activityLoading ? (
          <p>Loading...</p>
        ) : activity && activity.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activity.map((event, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 14 }}>
                    <strong>{event.company}</strong> — {event.jobTitle}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
                    {event.oldStatus ? `${event.oldStatus} → ${event.newStatus}` : event.newStatus}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {event.source === 'EMAIL_SYNC' && (
                    <span style={{ fontSize: 10, background: 'var(--accent-soft)', color: 'var(--accent)', padding: '3px 8px', borderRadius: 20, fontWeight: 600 }}>
                      AUTO-DETECTED
                    </span>
                  )}
                  <span className="mono" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                    {new Date(event.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--ink-soft)' }}>No activity yet.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;