import crypto from "node:crypto";
import { Resend } from "resend";
import { saveBooking } from "./lib/bookingsStore.js";

const NOTIFY_TO = "shanemelasuncion@gmail.com";
const NOTIFY_FROM = "Aeterna Bookings <onboarding@resend.dev>";

const FIELD_LABELS = {
  name: "Full Name",
  email: "Email Address",
  phone: "Phone / WhatsApp",
  eventDate: "Event Date",
  eventTime: "Event Time",
  eventType: "Event Type",
  service: "Service",
  message: "Message",
};

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body);
  const data = payload.data;

  try {
    const id = crypto.randomUUID();
    await saveBooking({
      id,
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      eventDate: data.eventDate || "",
      eventTime: data.eventTime || "",
      eventType: data.eventType || "",
      service: data.service || "",
      message: data.message || "",
      status: "interested",
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to persist booking to Blobs", err);
  }

  const lines = Object.entries(FIELD_LABELS).map(
    ([key, label]) => `${label}: ${data[key] || "-"}`
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: NOTIFY_FROM,
    to: NOTIFY_TO,
    replyTo: data.email,
    subject: `New booking inquiry from ${data.name}`,
    text: lines.join("\n"),
  });

  if (error) {
    console.error("Failed to send booking notification email", error);
    return { statusCode: 500, body: "error" };
  }

  return { statusCode: 200, body: "ok" };
};
