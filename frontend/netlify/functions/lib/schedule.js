export const DURATIONS_HOURS = { classic: 2, luxe: 2, maison: 3 };

const SLOT_INTERVAL_MIN = 30;
const BLOCK_BUFFER_MIN = 120;

function dayIndex(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / 86400000);
}

function isWeekend(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return dow === 0 || dow === 6;
}

function operatingWindow(dateStr) {
  return isWeekend(dateStr)
    ? { startMin: 9 * 60, endMin: 23 * 60 }
    : { startMin: 18 * 60, endMin: 22 * 60 };
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function toHHMM(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function isValidDateStr(dateStr) {
  return (
    typeof dateStr === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(dateStr) &&
    !Number.isNaN(new Date(`${dateStr}T00:00:00Z`).getTime())
  );
}

export function computeAvailableSlots(dateStr, service, bookedRecords) {
  const durationMin = DURATIONS_HOURS[service] * 60;
  const { startMin, endMin } = operatingWindow(dateStr);
  const targetDay = dayIndex(dateStr);

  const blockedWindows = bookedRecords
    .filter((b) => b.status === "booked" && Math.abs(dayIndex(b.eventDate) - targetDay) <= 1)
    .map((b) => {
      const bDurationMin = (DURATIONS_HOURS[b.service] || 2) * 60;
      const absStart = dayIndex(b.eventDate) * 1440 + toMinutes(b.eventTime);
      const absEnd = absStart + bDurationMin;
      return { start: absStart - BLOCK_BUFFER_MIN, end: absEnd + BLOCK_BUFFER_MIN };
    });

  const slots = [];
  for (let m = startMin; m + durationMin <= endMin; m += SLOT_INTERVAL_MIN) {
    const candStart = targetDay * 1440 + m;
    const candEnd = candStart + durationMin;
    const blocked = blockedWindows.some((w) => candStart < w.end && candEnd > w.start);
    if (!blocked) slots.push(toHHMM(m));
  }
  return slots;
}
