import { useCallback, useEffect, useState } from "react";

type Booking = {
  calendly_event_uuid: string;
  event_type_name: string | null;
  invitee_name: string | null;
  invitee_email: string | null;
  invitee_phone: string | null;
  start_time: string;
  status: "active" | "canceled";
};

/**
 * Plain operational dashboard — deliberately not wrapped in the marketing
 * PageShell (no nav/footer/WhatsApp chrome). Access to this route and its
 * API is gated by Cloudflare Access at the edge, not app-level auth.
 */
export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  const load = useCallback(() => {
    setError(null);
    fetch("/api/admin/bookings")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data: { bookings: Booking[] }) => setBookings(data.bookings))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load bookings."));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const runSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      if (!res.ok) throw new Error(`Sync failed: ${res.status}`);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sync failed.");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="tw:min-h-screen tw:bg-parchment-deep tw:px-6 tw:py-10 tw:font-sans">
      <div className="tw:mx-auto tw:max-w-5xl">
        <div className="tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-4">
          <div>
            <h1 className="tw:text-xl tw:font-semibold tw:text-espresso">Consultation Bookings</h1>
            <p className="tw:mt-1 tw:text-[13px] tw:text-espresso-soft/60">
              Upcoming consultations booked through Calendly.
            </p>
          </div>
          <button
            type="button"
            onClick={runSync}
            disabled={syncing}
            className="tw:rounded-full tw:bg-espresso tw:px-4 tw:py-2 tw:text-[13px] tw:font-semibold tw:text-parchment tw:disabled:opacity-50"
          >
            {syncing ? "Syncing…" : "Sync now"}
          </button>
        </div>

        {error && (
          <div className="tw:mt-6 tw:rounded-xl tw:bg-red-50 tw:px-4 tw:py-3 tw:text-[13px] tw:text-red-800">
            {error}
          </div>
        )}

        <div className="tw:mt-6 tw:overflow-hidden tw:rounded-2xl tw:bg-white tw:ring-1 tw:ring-ink-line">
          <table className="tw:w-full tw:text-left tw:text-[13.5px]">
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
              {bookings === null && !error && (
                <tr>
                  <td colSpan={5} className="tw:px-4 tw:py-8 tw:text-center tw:text-espresso-soft/50">
                    Loading…
                  </td>
                </tr>
              )}
              {bookings?.length === 0 && (
                <tr>
                  <td colSpan={5} className="tw:px-4 tw:py-8 tw:text-center tw:text-espresso-soft/50">
                    No upcoming bookings yet.
                  </td>
                </tr>
              )}
              {bookings?.map((booking) => (
                <tr key={booking.calendly_event_uuid} className="tw:border-b tw:border-ink-line tw:last:border-0">
                  <td className="tw:px-4 tw:py-3 tw:font-medium tw:text-espresso">
                    {booking.invitee_name ?? "—"}
                  </td>
                  <td className="tw:px-4 tw:py-3 tw:text-espresso-soft/75">
                    {booking.invitee_email ?? "—"}
                    {booking.invitee_phone ? ` · ${booking.invitee_phone}` : ""}
                  </td>
                  <td className="tw:px-4 tw:py-3 tw:text-espresso-soft/75">
                    {new Date(booking.start_time).toLocaleString()}
                  </td>
                  <td className="tw:px-4 tw:py-3 tw:text-espresso-soft/75">{booking.event_type_name ?? "—"}</td>
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
      </div>
    </div>
  );
}
