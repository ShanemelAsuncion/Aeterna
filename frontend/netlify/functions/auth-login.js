import { createSessionCookie, safeComparePassword } from "./lib/session.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!body.password || !safeComparePassword(body.password, process.env.DASHBOARD_PASSWORD)) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid password" }) };
  }

  return {
    statusCode: 200,
    multiValueHeaders: { "Set-Cookie": [createSessionCookie()] },
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  };
};
