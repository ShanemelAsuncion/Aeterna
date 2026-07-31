import { listBookings } from "./lib/bookingsStore.js";
import { computeAvailableSlots, isValidDateStr, DURATIONS_HOURS } from "./lib/schedule.js";

export const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { date, service } = event.queryStringParameters || {};

  if (!isValidDateStr(date)) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid or missing date" }) };
  }
  if (!service || !DURATIONS_HOURS[service]) {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid or missing service" }) };
  }

  const bookings = await listBookings();
  const slots = computeAvailableSlots(date, service, bookings);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slots }),
  };
};
