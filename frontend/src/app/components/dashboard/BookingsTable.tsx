import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import type { Booking, BookingStatus } from "../../Dashboard";

const SERVICE_LABELS: Record<string, string> = {
  classic: "The Classic",
  luxe: "The Luxe",
  maison: "The Maison",
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  wedding: "Wedding",
  debut: "Debut / 18th",
  corporate: "Corporate",
  birthday: "Birthday",
  other: "Other",
};

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatTime(hhmm: string) {
  if (!hhmm) return "-";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

const headLabelClass = `text-[8px] uppercase tracking-[0.2em] text-[#F9F8F5]/40`;
const cellClass = `text-[#F9F8F5]/60 text-xs`;

export function BookingsTable({
  bookings,
  loading,
  onStatusChange,
}: {
  bookings: Booking[];
  loading: boolean;
  onStatusChange: (id: string, status: BookingStatus) => void;
}) {
  const [tab, setTab] = useState<BookingStatus>("interested");
  const filtered = bookings.filter((b) => b.status === tab);

  return (
    <div>
      <div className="flex items-center gap-8 mb-8 border-b border-[#F9F8F5]/10">
        {(["interested", "booked"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setTab(status)}
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
            className={`pb-4 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer border-b ${
              tab === status
                ? "text-[#F9F8F5] border-[#4A2C2A]"
                : "text-[#F9F8F5]/30 border-transparent hover:text-[#F9F8F5]/60"
            }`}
          >
            {status === "interested" ? "Interested" : "Booked"} (
            {bookings.filter((b) => b.status === status).length})
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ fontFamily: "'Tenor Sans', sans-serif" }} className="text-[#F9F8F5]/30 text-sm">
          Loading&hellip;
        </p>
      ) : filtered.length === 0 ? (
        <p style={{ fontFamily: "'Tenor Sans', sans-serif" }} className="text-[#F9F8F5]/30 text-sm">
          No {tab} leads yet.
        </p>
      ) : (
        <div className="border border-[#F9F8F5]/10">
          <Table>
            <TableHeader>
              <TableRow className="border-[#F9F8F5]/10 hover:bg-transparent">
                <TableHead className={headLabelClass}>Name</TableHead>
                <TableHead className={headLabelClass}>Contact</TableHead>
                <TableHead className={headLabelClass}>Event Date &amp; Time</TableHead>
                <TableHead className={headLabelClass}>Type</TableHead>
                <TableHead className={headLabelClass}>Package</TableHead>
                <TableHead className={headLabelClass} />
                <TableHead className={headLabelClass} />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id} className="border-[#F9F8F5]/10 hover:bg-[#F9F8F5]/5">
                  <TableCell
                    style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                    className="text-[#F9F8F5] text-sm"
                  >
                    {b.name}
                  </TableCell>
                  <TableCell style={{ fontFamily: "'Tenor Sans', sans-serif" }} className={cellClass}>
                    <div>{b.email}</div>
                    {b.phone && <div>{b.phone}</div>}
                  </TableCell>
                  <TableCell style={{ fontFamily: "'Tenor Sans', sans-serif" }} className={cellClass}>
                    {formatDate(b.eventDate)}
                    <br />
                    {formatTime(b.eventTime)}
                  </TableCell>
                  <TableCell style={{ fontFamily: "'Tenor Sans', sans-serif" }} className={cellClass}>
                    {EVENT_TYPE_LABELS[b.eventType] || b.eventType}
                  </TableCell>
                  <TableCell style={{ fontFamily: "'Tenor Sans', sans-serif" }} className={cellClass}>
                    {SERVICE_LABELS[b.service] || b.service}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.15em" }}
                          className="text-[9px] uppercase tracking-[0.15em] text-[#F9F8F5]/40 hover:text-[#F9F8F5] transition-colors duration-300 cursor-pointer"
                        >
                          View
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#161616] border-[#F9F8F5]/10 text-[#F9F8F5]">
                        <DialogHeader>
                          <DialogTitle
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            className="text-2xl font-light text-[#F9F8F5]"
                          >
                            {b.name}
                          </DialogTitle>
                        </DialogHeader>
                        <p
                          style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                          className="text-[#F9F8F5]/70 text-sm leading-relaxed whitespace-pre-wrap"
                        >
                          {b.message || "No message provided."}
                        </p>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() =>
                        onStatusChange(b.id, tab === "interested" ? "booked" : "interested")
                      }
                      style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.15em" }}
                      className="text-[9px] uppercase tracking-[0.15em] text-[#4A2C2A] hover:text-[#F9F8F5] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      {tab === "interested" ? "Mark Booked" : "Revert"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
