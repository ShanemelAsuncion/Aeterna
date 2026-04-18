export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#121212] border-t border-[#F9F8F5]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <button onClick={() => scrollTo("hero")} className="mb-6 block text-left cursor-pointer">
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.15em" }}
                className="text-[#F9F8F5] text-2xl tracking-widest block"
              >
                AETERNA
              </span>
              <span
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.35em" }}
                className="text-[#4A2C2A] text-[8px] tracking-[0.35em] uppercase block mt-0.5"
              >
                Studio & Photobooth
              </span>
            </button>
            <p
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
              className="text-[#F9F8F5]/25 text-xs leading-relaxed max-w-xs"
            >
              Luxury photobooth experiences and bespoke handcrafted props for those who believe every detail matters and every memory deserves permanence.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#4A2C2A]" />
              <span
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.15em" }}
                className="text-[#F9F8F5]/20 text-[8px] uppercase tracking-[0.15em]"
              >
                Based in Edmonton, Alberta
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
              className="text-[8px] uppercase tracking-[0.25em] text-[#4A2C2A] mb-6"
            >
              Navigate
            </p>
            <div className="flex flex-col gap-4">
              {[
                { id: "services", label: "The Studio" },
                { id: "atelier", label: "The Atelier" },
                { id: "process", label: "Our Process" },
                { id: "booking", label: "Reserve Your Era" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.1em" }}
                  className="text-[#F9F8F5]/35 text-xs hover:text-[#F9F8F5]/70 transition-colors duration-300 text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Atelier */}
          <div>
            <p
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
              className="text-[8px] uppercase tracking-[0.25em] text-[#4A2C2A] mb-6"
            >
              Atelier
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Personalized High-Quality Prop Sets",
                "Audio Guestbook",
                "Keychain Station",
                "Custom Commissions",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo("atelier")}
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.1em" }}
                  className="text-[#F9F8F5]/35 text-xs hover:text-[#F9F8F5]/70 transition-colors duration-300 text-left cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#F9F8F5]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.1em" }}
            className="text-[#F9F8F5]/15 text-[9px] uppercase tracking-[0.1em]"
          >
            © {currentYear} Aeterna Studio & Photobooth. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "TikTok", "Facebook"].map((platform) => (
              <button
                key={platform}
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.15em" }}
                className="text-[#F9F8F5]/15 text-[9px] uppercase tracking-[0.15em] hover:text-[#F9F8F5]/40 transition-colors duration-300 cursor-pointer"
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
