import crypto from "node:crypto";

const COOKIE_NAME = "aeterna_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function sign(payload) {
  return crypto.createHmac("sha256", process.env.SESSION_SECRET).update(payload).digest("hex");
}

export function createSessionCookie() {
  const payload = String(Date.now() + SESSION_TTL_MS);
  const value = `${payload}.${sign(payload)}`;
  return `${COOKIE_NAME}=${value}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_MS / 1000}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  for (const pair of header.split(";")) {
    const idx = pair.indexOf("=");
    if (idx === -1) continue;
    cookies[pair.slice(0, idx).trim()] = pair.slice(idx + 1).trim();
  }
  return cookies;
}

export function isAuthenticated(event) {
  const cookies = parseCookies(event.headers.cookie || event.headers.Cookie);
  const value = cookies[COOKIE_NAME];
  if (!value) return false;

  const [payload, sig] = value.split(".");
  if (!payload || !sig) return false;

  const expectedSig = sign(payload);
  const sigBuf = Buffer.from(sig, "hex");
  const expectedBuf = Buffer.from(expectedSig, "hex");
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }

  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() <= exp;
}

export function safeComparePassword(input, expected) {
  const inputHash = crypto.createHash("sha256").update(String(input)).digest();
  const expectedHash = crypto.createHash("sha256").update(String(expected)).digest();
  return crypto.timingSafeEqual(inputHash, expectedHash);
}
