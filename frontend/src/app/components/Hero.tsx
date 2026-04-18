interface HeroProps {
  glamPhoto: string;
}

export function Hero({ glamPhoto }: HeroProps) {
  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#121212] overflow-hidden flex items-stretch"
    >
      {/* Asymmetric grid */}
      <div className="flex w-full min-h-screen">
        {/* Left: B&W Photo — 45% */}
        <div className="relative w-[45%] min-h-screen hidden md:block overflow-hidden">
          <img
            src={glamPhoto}
            alt="Aeterna Studio Glam"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-110 scale-105 hover:scale-100 transition-transform duration-[2s]"
          />
          {/* Film grain overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#121212]/60 z-10" />
          {/* Vertical text */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
            <div className="w-px h-16 bg-[#4A2C2A]" />
            <span
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                letterSpacing: "0.35em",
                writingMode: "vertical-rl",
              }}
              className="text-[8px] uppercase tracking-[0.35em] text-[#F9F8F5]/40"
            >
              Edmonton · Est. 2026
            </span>
            <div className="w-px h-16 bg-[#4A2C2A]" />
          </div>
          {/* Studio tag */}
          <div className="absolute bottom-10 left-10 z-20">
            <span
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
              className="text-[9px] uppercase tracking-[0.2em] text-[#F9F8F5]/30 border border-[#F9F8F5]/10 px-3 py-1.5"
            >
              Personalized · Luxury
            </span>
          </div>
        </div>

        {/* Right: Headline — 55% */}
        <div className="relative w-full md:w-[55%] flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-28 md:pt-0">
          {/* Mobile photo behind text */}
          <div className="absolute inset-0 md:hidden">
            <img
              src={glamPhoto}
              alt="Aeterna Studio"
              className="w-full h-full object-cover grayscale opacity-20"
            />
            <div className="absolute inset-0 bg-[#121212]/80" />
          </div>

          <div className="relative z-10 max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[#4A2C2A]" />
              <span
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.3em" }}
                className="text-[9px] uppercase tracking-[0.3em] text-[#4A2C2A]"
              >
                Luxury Photobooth Rental
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 0.92 }}
              className="text-[#F9F8F5] mb-6"
            >
              <span className="block text-[clamp(4rem,8vw,7rem)] font-light italic">
                Where
              </span>
              <span className="block text-[clamp(4.5rem,9vw,8rem)] font-semibold">
                MOMENTS
              </span>
              <span className="block text-[clamp(3.5rem,7vw,6.5rem)] font-light italic text-[#4A2C2A]">
                become
              </span>
              <span className="block text-[clamp(4rem,8vw,7rem)] font-semibold">
                LEGACY.
              </span>
            </h1>

            {/* Subtext */}
            <p
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.08em" }}
              className="text-[#F9F8F5]/50 text-sm tracking-wide mb-12 max-w-sm leading-relaxed"
            >
              Bespoke photobooth experiences and handcrafted luxury props for those who demand more than ordinary.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToBooking}
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
                className="bg-[#4A2C2A] text-[#F9F8F5] text-[10px] uppercase tracking-[0.25em] px-10 py-4 hover:bg-[#F9F8F5] hover:text-[#121212] transition-all duration-300 cursor-pointer"
              >
                Book the Studio
              </button>
              <button
                onClick={scrollToServices}
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
                className="border border-[#F9F8F5]/20 text-[#F9F8F5]/70 text-[10px] uppercase tracking-[0.25em] px-10 py-4 hover:border-[#F9F8F5]/60 hover:text-[#F9F8F5] transition-all duration-300 cursor-pointer"
              >
                Discover More
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-16 pt-10 border-t border-[#F9F8F5]/10">
              {[
                // { num: "200+", label: "Events Captured" },
                { num: "1 hr", label: "Avg Response Time" },
                { num: "100%", label: "Custom Crafted" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-[#F9F8F5] text-2xl font-semibold"
                  >
                    {stat.num}
                  </span>
                  <span
                    style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.15em" }}
                    className="text-[#F9F8F5]/30 text-[8px] uppercase tracking-[0.15em]"
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="relative z-10 flex items-center gap-3 mt-16 md:mt-0 md:absolute md:bottom-10 md:right-10">
            <span
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
              className="text-[8px] uppercase tracking-[0.2em] text-[#F9F8F5]/20"
            >
              Scroll
            </span>
            <div className="flex flex-col gap-1">
              <div className="w-px h-8 bg-gradient-to-b from-[#F9F8F5]/20 to-transparent mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
