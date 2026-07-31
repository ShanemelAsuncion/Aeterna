import { useState } from "react";

export function DashboardLogin({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputClass = `w-full bg-transparent border-b border-[#F9F8F5]/15 text-[#F9F8F5] py-3 text-sm focus:outline-none focus:border-[#4A2C2A] transition-colors duration-300 placeholder-[#F9F8F5]/20`;
  const labelClass = `block text-[8px] uppercase tracking-[0.25em] text-[#F9F8F5]/40 mb-2`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/.netlify/functions/auth-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onLoggedIn();
      } else if (res.status === 401) {
        setError("Incorrect password. Please try again.");
      } else {
        setError(`Login failed (${res.status}). The dashboard function may not be reachable.`);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6">
      <div className="relative w-full max-w-sm">
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#4A2C2A]/30" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#4A2C2A]/30" />

        <div className="py-16 px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#4A2C2A]" />
            <span
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.3em" }}
              className="text-[9px] uppercase tracking-[0.3em] text-[#4A2C2A]"
            >
              Studio Access
            </span>
            <div className="w-8 h-px bg-[#4A2C2A]" />
          </div>

          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#F9F8F5] text-4xl font-light mb-10"
          >
            Dashboard <em className="text-[#4A2C2A] font-semibold not-italic">Login.</em>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label
                htmlFor="password"
                style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                className={labelClass}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                className={inputClass}
              />
            </div>

            {error && (
              <p style={{ fontFamily: "'Tenor Sans', sans-serif" }} className="text-[#4A2C2A] text-xs">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
              className="w-full bg-[#4A2C2A] text-[#F9F8F5] text-[10px] uppercase tracking-[0.25em] py-5 hover:bg-[#F9F8F5] hover:text-[#121212] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Signing In..." : "Enter Dashboard"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
