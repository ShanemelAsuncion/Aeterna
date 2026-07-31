import { getStore } from "@netlify/blobs";

export function bookingsStore() {
  return getStore({ name: "bookings", consistency: "strong" });
}

export async function listBookings() {
  const store = bookingsStore();
  const { blobs } = await store.list();
  const records = await Promise.all(blobs.map((b) => store.get(b.key, { type: "json" })));
  return records.filter(Boolean);
}

export async function getBooking(id) {
  return bookingsStore().get(id, { type: "json" });
}

export async function saveBooking(record) {
  await bookingsStore().setJSON(record.id, record);
  return record;
}
