import { isAuthenticated } from "./lib/session.js";
import { getBooking, saveBooking } from "./lib/bookingsStore.js";

const VALID_STATUSES = ["interested", "booked"];

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!isAuthenticated(event)) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!body.id || !VALID_STATUSES.includes(body.status)) {
    return { statusCode: 400, body: JSON.stringify({ error: "id and a valid status are required" }) };
  }

  const existing = await getBooking(body.id);
  if (!existing) {
    return { statusCode: 404, body: JSON.stringify({ error: "Booking not found" }) };
  }

  const updated = { ...existing, status: body.status, updatedAt: new Date().toISOString() };
  await saveBooking(updated);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ booking: updated }),
  };
};
