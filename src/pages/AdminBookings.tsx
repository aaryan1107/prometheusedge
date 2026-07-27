import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Calendar, Mail, MessageSquareText, Phone, RefreshCcw, UserRound } from "lucide-react";

type Booking = {
  calendly_event_uuid: string;
  event_type_name: string | null;
  invitee_name: string | null;
  invitee_email: string | null;
  invitee_phone: string | null;
  start_time: string;
  status: "active" | "canceled";
};

type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  grade: string | null;
  message: string;
  source: string | null;
  created_at: number;
};

type Tab = "enquiries" | "bookings";

function formatLeadTime(value: number) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatBookingTime(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

async function readJson<T>(response: Response, label: string): Promise<T> {
  if (!response.ok) throw new Error(`Could not load ${label}: ${response.status}`);
  try {
    return (await response.json()) as T;
  } catch {
    throw new Error(`${label} are available when the Cloudflare Pages Functions are running.`);
  }
}

/**
 * Plain operational dashboard. The /admin/* page and /api/admin/* endpoints are
 * protected by Basic Auth middleware in Cloudflare Pages Functions.
 */
export default function AdminBookings() {
  const [activeTab, setActiveTab] = useState<Tab>("enquiries");
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    const [enquiryRes, bookingRes] = await Promise.all([
      fetch("/api/admin/enquiries"),
      fetch("/api/admin/bookings"),
    ]);

    const enquiryData = await readJson<{ enquiries: Enquiry[] }>(enquiryRes, "Enquiries");
    const bookingData = await readJson<{ bookings: Booking[] }>(bookingRes, "Consultations");
    setEnquiries(enquiryData.enquiries);
    setBookings(bookingData.bookings);
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not refresh dashboard.");
      setEnquiries((current) => current ?? []);
      setBookings((current) => current ?? []);
    } finally {
      setRefreshing(false);
    }
  }, [load]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const runSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      if (!res.ok) throw new Error(`Sync failed: ${res.status}`);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  const stats = useMemo(() => {
    const today = startOfToday();
    const leadRows = enquiries ?? [];
    const bookingRows = bookings ?? [];
    return {
      totalLeads: leadRows.length,
      todayLeads: leadRows.filter((item) => item.created_at >= today).length,
      upcomingBookings: bookingRows.filter((item) => item.status === "active").length,
      newestLead: leadRows[0]?.created_at ? formatLeadTime(leadRows[0].created_at) : "No leads yet",
    };
  }, [bookings, enquiries]);

  const loading = enquiries === null || bookings === null;

  return (
    <div className="tw:min-h-screen tw:bg-parchment-deep tw:px-4 tw:py-6 tw:font-sans tw:text-espresso tw:md:px-6 tw:md:py-8">
      <div className="tw:mx-auto tw:max-w-7xl">
        <header className="tw:sticky tw:top-0 tw:z-20 tw:-mx-4 tw:border-b tw:border-ink-line tw:bg-parchment-deep/95 tw:px-4 tw:pb-4 tw:pt-2 tw:backdrop-blur-md tw:md:-mx-6 tw:md:px-6">
          <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4">
            <div>
              <p className="tw:text-[11px] tw:font-bold tw:uppercase tw:tracking-[0.16em] tw:text-clay">
                Prometheus Edge
              </p>
              <h1 className="tw:mt-1 tw:text-2xl tw:font-semibold tw:tracking-normal tw:text-espresso">
                Admissions Desk
              </h1>
              <p className="tw:mt-1 tw:text-[13px] tw:text-espresso-soft/65">
                New parent enquiries and upcoming consultation calls in one place.
              </p>
            </div>
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
              <button
                type="button"
                onClick={refresh}
                disabled={refreshing || syncing}
                className="tw:flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-white tw:px-4 tw:py-2 tw:text-[13px] tw:font-semibold tw:text-espresso tw:ring-1 tw:ring-ink-line tw:transition-colors tw:hover:bg-gold-soft/40 tw:disabled:cursor-wait tw:disabled:opacity-55"
              >
                <RefreshCcw className="tw:h-3.5 tw:w-3.5" strokeWidth={1.75} />
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
              <button
                type="button"
                onClick={runSync}
                disabled={syncing || refreshing}
                className="tw:flex tw:items-center tw:gap-2 tw:rounded-full tw:bg-espresso tw:px-4 tw:py-2 tw:text-[13px] tw:font-semibold tw:text-parchment tw:transition-colors tw:hover:bg-clay tw:disabled:cursor-wait tw:disabled:opacity-60"
              >
                <Calendar className="tw:h-3.5 tw:w-3.5" strokeWidth={1.75} />
                {syncing ? "Syncing..." : "Sync Calendly"}
              </button>
            </div>
          </div>

          <nav className="tw:mt-5 tw:flex tw:gap-2 tw:overflow-x-auto">
            <TabButton active={activeTab === "enquiries"} onClick={() => setActiveTab("enquiries")}>
              Enquiries
            </TabButton>
            <TabButton active={activeTab === "bookings"} onClick={() => setActiveTab("bookings")}>
              Consultations
            </TabButton>
          </nav>
        </header>

        <section className="tw:mt-6 tw:grid tw:gap-3 tw:md:grid-cols-4">
          <MetricCard label="Total enquiries" value={stats.totalLeads.toString()} detail="All contact form submissions" />
          <MetricCard label="Today" value={stats.todayLeads.toString()} detail="New leads since morning" tone="clay" />
          <MetricCard label="Upcoming calls" value={stats.upcomingBookings.toString()} detail="Active Calendly bookings" />
          <MetricCard label="Latest lead" value={stats.newestLead} detail="Most recent contact form entry" compact />
        </section>

        {error ? (
          <div className="tw:mt-5 tw:rounded-2xl tw:bg-clay/[0.09] tw:px-4 tw:py-3 tw:text-[13px] tw:font-medium tw:text-clay">
            {error}
          </div>
        ) : null}

        <main className="tw:mt-5">
          {activeTab === "enquiries" ? (
            <EnquiriesPanel enquiries={enquiries} loading={loading} />
          ) : (
            <BookingsPanel bookings={bookings} loading={loading} />
          )}
        </main>
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "tw:rounded-full tw:bg-espresso tw:px-4 tw:py-2 tw:text-[13px] tw:font-semibold tw:text-parchment"
          : "tw:rounded-full tw:bg-white tw:px-4 tw:py-2 tw:text-[13px] tw:font-semibold tw:text-espresso-soft/70 tw:ring-1 tw:ring-ink-line tw:transition-colors tw:hover:text-espresso"
      }
    >
      {children}
    </button>
  );
}

function MetricCard({
  compact,
  detail,
  label,
  tone = "espresso",
  value,
}: {
  compact?: boolean;
  detail: string;
  label: string;
  tone?: "espresso" | "clay";
  value: string;
}) {
  return (
    <div className="tw:rounded-2xl tw:bg-white tw:p-4 tw:ring-1 tw:ring-ink-line">
      <p className="tw:text-[11px] tw:font-bold tw:uppercase tw:tracking-[0.12em] tw:text-espresso-soft/45">{label}</p>
      <p
        className={`tw:mt-2 tw:font-semibold tw:tracking-normal ${
          compact ? "tw:text-lg" : "tw:text-3xl"
        } ${tone === "clay" ? "tw:text-clay" : "tw:text-espresso"}`}
      >
        {value}
      </p>
      <p className="tw:mt-1 tw:text-[12px] tw:leading-relaxed tw:text-espresso-soft/55">{detail}</p>
    </div>
  );
}

function EnquiriesPanel({ enquiries, loading }: { enquiries: Enquiry[] | null; loading: boolean }) {
  return (
    <section className="tw:overflow-hidden tw:rounded-2xl tw:bg-white tw:ring-1 tw:ring-ink-line">
      <PanelHeader
        icon={<MessageSquareText className="tw:h-4 tw:w-4" strokeWidth={1.75} />}
        title="Parent enquiries"
        subtitle="Call or email these families first. Newest enquiries appear at the top."
      />
      <div className="tw:divide-y tw:divide-ink-line">
        {loading ? <EmptyRow text="Loading enquiries..." /> : null}
        {!loading && enquiries?.length === 0 ? <EmptyRow text="No enquiries yet." /> : null}
        {enquiries?.map((enquiry) => (
          <article key={enquiry.id} className="tw:grid tw:gap-4 tw:p-4 tw:md:grid-cols-[1fr_1.1fr_0.8fr] tw:md:p-5">
            <div>
              <div className="tw:flex tw:items-center tw:gap-2">
                <UserRound className="tw:h-4 tw:w-4 tw:text-clay" strokeWidth={1.75} />
                <h2 className="tw:text-[15px] tw:font-semibold tw:text-espresso">{enquiry.name}</h2>
              </div>
              <p className="tw:mt-1 tw:text-[12px] tw:text-espresso-soft/55">
                {enquiry.grade ? `Grade ${enquiry.grade}` : "Grade not shared"} · {formatLeadTime(enquiry.created_at)}
              </p>
            </div>
            <p className="tw:text-[13px] tw:leading-relaxed tw:text-espresso-soft/75">{enquiry.message}</p>
            <div className="tw:flex tw:flex-col tw:items-start tw:gap-2 tw:md:items-end">
              <a className="tw:flex tw:items-center tw:gap-2 tw:text-[13px] tw:font-semibold tw:text-clay tw:hover:underline" href={`mailto:${enquiry.email}`}>
                <Mail className="tw:h-3.5 tw:w-3.5" strokeWidth={1.75} />
                {enquiry.email}
              </a>
              {enquiry.phone ? (
                <a className="tw:flex tw:items-center tw:gap-2 tw:text-[13px] tw:font-semibold tw:text-espresso-soft/70 tw:hover:text-espresso" href={`tel:${enquiry.phone}`}>
                  <Phone className="tw:h-3.5 tw:w-3.5" strokeWidth={1.75} />
                  {enquiry.phone}
                </a>
              ) : (
                <span className="tw:text-[12px] tw:text-espresso-soft/45">No phone shared</span>
              )}
              <span className="tw:rounded-full tw:bg-gold-soft/40 tw:px-2.5 tw:py-1 tw:text-[11px] tw:font-semibold tw:text-espresso-soft/70">
                {enquiry.source === "homepage-contact" ? "Homepage" : "Contact page"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BookingsPanel({ bookings, loading }: { bookings: Booking[] | null; loading: boolean }) {
  return (
    <section className="tw:overflow-hidden tw:rounded-2xl tw:bg-white tw:ring-1 tw:ring-ink-line">
      <PanelHeader
        icon={<Calendar className="tw:h-4 tw:w-4" strokeWidth={1.75} />}
        title="Consultation bookings"
        subtitle="Upcoming calls synced from Calendly."
      />
      <div className="tw:overflow-x-auto">
        <table className="tw:w-full tw:min-w-[760px] tw:text-left tw:text-[13.5px]">
          <thead>
            <tr className="tw:border-b tw:border-ink-line tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.08em] tw:text-espresso-soft/50">
              <th className="tw:px-4 tw:py-3">Name</th>
              <th className="tw:px-4 tw:py-3">Contact</th>
              <th className="tw:px-4 tw:py-3">Time</th>
              <th className="tw:px-4 tw:py-3">Type</th>
              <th className="tw:px-4 tw:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="tw:px-4 tw:py-8 tw:text-center tw:text-espresso-soft/50">
                  Loading consultations...
                </td>
              </tr>
            ) : null}
            {!loading && bookings?.length === 0 ? (
              <tr>
                <td colSpan={5} className="tw:px-4 tw:py-8 tw:text-center tw:text-espresso-soft/50">
                  No upcoming consultations yet.
                </td>
              </tr>
            ) : null}
            {bookings?.map((booking) => (
              <tr key={booking.calendly_event_uuid} className="tw:border-b tw:border-ink-line tw:last:border-0">
                <td className="tw:px-4 tw:py-3 tw:font-medium tw:text-espresso">{booking.invitee_name ?? "-"}</td>
                <td className="tw:px-4 tw:py-3 tw:text-espresso-soft/75">
                  {booking.invitee_email ?? "-"}
                  {booking.invitee_phone ? ` · ${booking.invitee_phone}` : ""}
                </td>
                <td className="tw:px-4 tw:py-3 tw:text-espresso-soft/75">{formatBookingTime(booking.start_time)}</td>
                <td className="tw:px-4 tw:py-3 tw:text-espresso-soft/75">{booking.event_type_name ?? "-"}</td>
                <td className="tw:px-4 tw:py-3">
                  <span
                    className={
                      booking.status === "canceled"
                        ? "tw:rounded-full tw:bg-red-100 tw:px-2.5 tw:py-1 tw:text-[11px] tw:font-semibold tw:text-red-700"
                        : "tw:rounded-full tw:bg-emerald-100 tw:px-2.5 tw:py-1 tw:text-[11px] tw:font-semibold tw:text-emerald-700"
                    }
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PanelHeader({ icon, subtitle, title }: { icon: ReactNode; subtitle: string; title: string }) {
  return (
    <div className="tw:flex tw:items-start tw:gap-3 tw:border-b tw:border-ink-line tw:bg-parchment/55 tw:px-4 tw:py-4 tw:md:px-5">
      <span className="tw:flex tw:h-9 tw:w-9 tw:items-center tw:justify-center tw:rounded-xl tw:bg-espresso tw:text-parchment">
        {icon}
      </span>
      <div>
        <h2 className="tw:text-[15px] tw:font-semibold tw:text-espresso">{title}</h2>
        <p className="tw:mt-1 tw:text-[12px] tw:text-espresso-soft/60">{subtitle}</p>
      </div>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return <div className="tw:px-4 tw:py-8 tw:text-center tw:text-[13px] tw:text-espresso-soft/50">{text}</div>;
}
