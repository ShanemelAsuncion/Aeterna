import { useState, useEffect } from "react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "services", label: "The Studio" },
    { id: "atelier", label: "The Atelier" },
    { id: "process", label: "Our Process" },
    { id: "booking", label: "Reserve" },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#121212]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("hero")}
          className="flex flex-col items-start group cursor-pointer"
        >
          <span
            style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.15em" }}
            className="text-[#F9F8F5] text-lg tracking-widest"
          >
            AETERNA
          </span>
          <span
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.35em" }}
            className="text-[#4A2C2A] text-[9px] tracking-[0.35em] uppercase"
          >
            Studio & Photobooth
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
              className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                activeSection === link.id
                  ? "text-[#F9F8F5]"
                  : "text-[#F9F8F5]/50 hover:text-[#F9F8F5]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("booking")}
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
            className="text-[10px] uppercase tracking-[0.2em] border border-[#4A2C2A] text-[#F9F8F5] px-5 py-2 hover:bg-[#4A2C2A] transition-all duration-300 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-px bg-[#F9F8F5] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-[#F9F8F5] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-[#F9F8F5] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#121212]/98 backdrop-blur-md overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-96 border-t border-[#4A2C2A]/30" : "max-h-0"
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
              className="text-[11px] uppercase tracking-[0.2em] text-[#F9F8F5]/70 hover:text-[#F9F8F5] text-left transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}