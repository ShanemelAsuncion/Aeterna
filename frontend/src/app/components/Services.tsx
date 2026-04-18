interface ServicesProps {
  boothPhoto: string;
}

const packages = [
  {
    id: "01",
    name: "The Classic",
    duration: "2 Hours",
    features: [
      "Open-air studio setup",
      "Bonus: Audio Guestbook (Limited Time)",
      "Interactive themed prop collection",
      "Custom photo layout design",
      "Live online gallery access",
      "1 Professional attendant",
      "Instant SMS & Email delivery",
      "Venue-to-venue logistics",
    ],
    accent: false,
  },
  {
    id: "02",
    name: "The Luxe",
    duration: "5 Hours",
    features: [
      "Unlimited premium photo prints",
      "Bonus: Audio Guestbook (Limited Time)",
      "Everything in The Classic",
      "Additional 2 Personalized High-Density Props",
    ],
    accent: true,
  },
  {
    id: "03",
    name: "The Maison",
    duration: "Full Day",
    features: [
      "Bonus: Acrylic Keychain Booth",
      "8-Piece custom-designed prop set",
      "Everything in The Luxe",
      "2 Professional attendants",
    ],
    accent: false,
  },
];

export function Services({ boothPhoto }: ServicesProps) {
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-[#121212] py-28 lg:py-36 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="flex items-start justify-between flex-wrap gap-8">
          <div>
            <div className="flex items-cente r gap-4 mb-6">
              <div className="w-8 h-px bg-[#4A2C2A]" />
              <span
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.3em" }}
                className="text-[9px] uppercase tracking-[0.3em] text-[#4A2C2A]"
              >
                The Experience
              </span>
            </div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}
              className="text-[#F9F8F5] text-[clamp(3rem,6vw,5.5rem)] font-light"
            >
              Photobooth <br />
              <em className="text-[#4A2C2A] font-semibold not-italic">Redefined.</em>
            </h2>
          </div>
          <div className="max-w-xs">
            <p
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
              className="text-[#F9F8F5]/40 text-sm leading-relaxed"
            >
              We don't just set up a booth. We curate an experience — one that matches the grandeur of your event and the permanence of your memories.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Image */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="relative h-[40vh] lg:h-[55vh] overflow-hidden">
          <img
            src={boothPhoto}
            alt="Aeterna Studio Photobooth"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
            <div>
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-[#F9F8F5] italic text-2xl"
              >
                "Every frame, a portrait of your finest hour."
              </span>
            </div>
          </div>
          {/* Decorative corner */}
          <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-[#4A2C2A]" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-[#4A2C2A]" />
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#F9F8F5]/5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-10 ${
                pkg.accent ? "bg-[#4A2C2A]" : "bg-[#121212]"
              } transition-all duration-500 group hover:bg-[#4A2C2A] cursor-pointer`}
            >
              {/* Package number */}
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className={`text-[80px] font-light absolute top-4 right-6 leading-none ${
                  pkg.accent ? "text-[#F9F8F5]/10" : "text-[#F9F8F5]/5"
                } group-hover:text-[#F9F8F5]/10`}
              >
                {pkg.id}
              </span>

              <div className="relative z-10">
                <div
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                  className="text-[8px] uppercase tracking-[0.2em] text-[#F9F8F5]/40 mb-4"
                >
                  {pkg.duration}
                </div>
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-[#F9F8F5] text-3xl font-semibold mb-8"
                >
                  {pkg.name}
                </h3>
                <div className="w-8 h-px bg-[#F9F8F5]/20 mb-8" />
                <ul className="flex flex-col gap-3 mb-10">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
                      className="text-[#F9F8F5]/60 text-[11px] flex items-start gap-3"
                    >
                      <span className="text-[#4A2C2A] group-hover:text-[#F9F8F5]/60 mt-0.5">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToBooking}
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                  className="text-[9px] uppercase tracking-[0.2em] text-[#F9F8F5] border border-[#F9F8F5]/20 px-6 py-3 hover:bg-[#F9F8F5] hover:text-[#121212] transition-all duration-300 cursor-pointer w-full text-center"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
