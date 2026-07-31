import { useEffect, useState } from "react";
import { DashboardLogin } from "./components/dashboard/DashboardLogin";
import { BookingsTable } from "./components/dashboard/BookingsTable";

export type BookingStatus = "interested" | "booked";

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  service: string;
  message: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
};

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/bookings-list");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to load bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleLogout = async () => {
    await fetch("/.netlify/functions/auth-logout", { method: "POST" });
    setAuthenticated(false);
    setBookings([]);
  };

  const handleStatusChange = async (id: string, status: BookingStatus) => {
    const res = await fetch("/.netlify/functions/bookings-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      const { booking } = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === id ? booking : b)));
    }
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center">
        <p
          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
          className="text-[#F9F8F5]/40 text-[10px] uppercase tracking-[0.3em]"
        >
          Loading&hellip;
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return <DashboardLogin onLoggedIn={loadBookings} />;
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] px-6 lg:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#4A2C2A]" />
            <span
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.3em" }}
              className="text-[9px] uppercase tracking-[0.3em] text-[#4A2C2A]"
            >
              Studio Dashboard
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
            className="text-[9px] uppercase tracking-[0.2em] text-[#F9F8F5]/40 hover:text-[#F9F8F5] transition-colors duration-300 cursor-pointer"
          >
            Log Out
          </button>
        </div>

        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 0.95 }}
          className="text-[#F9F8F5] text-[clamp(2.5rem,5vw,4rem)] font-light mb-12"
        >
          Booking <em className="text-[#4A2C2A] font-semibold not-italic">Inquiries.</em>
        </h1>

        <BookingsTable bookings={bookings} loading={loading} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
