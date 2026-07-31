import { isAuthenticated } from "./lib/session.js";
import { listBookings } from "./lib/bookingsStore.js";

export const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!isAuthenticated(event)) {
    return { statusCode: 401, body: JSON.stringify({ error: "Unauthorized" }) };
  }

  const bookings = await listBookings();
  bookings.sort((a, b) => `${a.eventDate}${a.eventTime}`.localeCompare(`${b.eventDate}${b.eventTime}`));

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookings }),
  };
};
