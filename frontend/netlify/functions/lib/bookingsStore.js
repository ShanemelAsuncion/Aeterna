import { getStore } from "@netlify/blobs";

export function bookingsStore() {
  const options = { name: "bookings", consistency: "strong" };
  // Netlify normally injects Blobs credentials automatically, but that injection
  // doesn't always reach Functions in this deploy setup, causing
  // MissingBlobsEnvironmentError. Falling back to explicit siteID/token sidesteps it.
  if (process.env.NETLIFY_SITE_ID && process.env.NETLIFY_BLOBS_TOKEN) {
    options.siteID = process.env.NETLIFY_SITE_ID;
    options.token = process.env.NETLIFY_BLOBS_TOKEN;
  }
  return getStore(options);
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
