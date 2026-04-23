import { useState } from "react";

export function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Convert to URL-encoded for Netlify Forms
    const params = new URLSearchParams(formData as any).toString();

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        alert('There was an error submitting your form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full bg-transparent border-b border-[#F9F8F5]/15 text-[#F9F8F5] py-3 text-sm focus:outline-none focus:border-[#4A2C2A] transition-colors duration-300 placeholder-[#F9F8F5]/20`;
  const labelClass = `block text-[8px] uppercase tracking-[0.25em] text-[#F9F8F5]/40 mb-2`;

  return (
    <section id="booking" className="bg-[#0e0e0e] py-28 lg:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 border border-[#4A2C2A]/10 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 border border-[#4A2C2A]/5 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Header */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-[#4A2C2A]" />
                <span
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.3em" }}
                  className="text-[9px] uppercase tracking-[0.3em] text-[#4A2C2A]"
                >
                  Inquiries & Reservations
                </span>
              </div>

              <h2
                style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 0.95 }}
                className="text-[#F9F8F5] text-[clamp(3.5rem,7vw,6.5rem)] font-light mb-8"
              >
                Reserve <br />
                <em className="text-[#4A2C2A] font-semibold not-italic">Your Era.</em>
              </h2>

              <p
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
                className="text-[#F9F8F5]/35 text-sm leading-relaxed mb-12 max-w-xs"
              >
                Each event deserves a dedicated moment of planning. Fill in the form and our studio team will reach out within 24 hours to begin crafting your experience.
              </p>

              {/* Contact Info */}
              <div className="flex flex-col gap-8">
                {[
                  { 
                    label: "Studio Email", 
                    value: (
                      <a 
                        href="mailto:shanemelasuncion@gmail.com" 
                        className="hover:text-[#4A2C2A] transition-colors duration-300"
                      >
                        shanemelasuncion@gmail.com
                      </a>
                    ) 
                  },
                  { label: "Location", value: "Edmonton, Alberta" },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                      className="text-[8px] uppercase tracking-[0.2em] text-[#4A2C2A] mb-1"
                    >
                      {item.label}
                    </p>
                    <p
                      style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
                      className="text-[#F9F8F5]/50 text-sm"
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="mt-16 flex items-center gap-6">
              {["Instagram", "TikTok", "Facebook"].map((platform) => (
                <button
                  key={platform}
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                  className="text-[8px] uppercase tracking-[0.2em] text-[#F9F8F5]/25 hover:text-[#F9F8F5]/60 transition-colors duration-300 cursor-pointer"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#4A2C2A]/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#4A2C2A]/30" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-24 text-center">
                <span
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-[#4A2C2A] text-6xl mb-6"
                >
                  ✦
                </span>
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-[#F9F8F5] text-3xl font-semibold mb-4"
                >
                  Your inquiry has been received.
                </h3>
                <p
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
                  className="text-[#F9F8F5]/35 text-sm leading-relaxed max-w-xs"
                >
                  We'll be in touch within 24 hours to begin planning your era. Thank you for choosing Aeterna.
                </p>
              </div>
            ) : (
              <form 
                name="booking" 
                method="POST" 
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Hidden honeypot field for spam protection */}
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="booking" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={labelClass}
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your Name"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={labelClass}
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="phone"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={labelClass}
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(optional)"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="eventDate"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={labelClass}
                    >
                      Event Date *
                    </label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      required
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="eventType"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={labelClass}
                    >
                      Event Type *
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      required
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={`${inputClass} cursor-pointer [&>option]:bg-[#161616]`}
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="wedding">Wedding</option>
                      <option value="debut">Debut / 18th Birthday</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={labelClass}
                    >
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                      className={`${inputClass} cursor-pointer [&>option]:bg-[#161616]`}
                    >
                      <option value="" disabled>Select Service</option>
                      <option value="classic">The Classic (2 Hours)</option>
                      <option value="luxe">The Luxe (2 Hours)</option>
                      <option value="maison">The Maison (3 Hours)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                    className={labelClass}
                  >
                    Tell Us About Your Event
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your vision..."
                    style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
                  className="w-full bg-[#4A2C2A] text-[#F9F8F5] text-[10px] uppercase tracking-[0.25em] py-5 hover:bg-[#F9F8F5] hover:text-[#121212] transition-all duration-300 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reservation Request'}
                </button>

                <p
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
                  className="text-[#F9F8F5]/20 text-[9px] text-center"
                >
                  We respond within 24 hours · All inquiries are confidential
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
