import { useState, useEffect, useRef } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Atelier } from "./components/Atelier";
import { Process } from "./components/Process";
import { Booking } from "./components/Booking";
import { Footer } from "./components/Footer";
import "../styles/fonts.css";
import heroImage from "../assets/hero.jpg";
import boothImage from "../assets/booth.jpg";
import audioImage from "../assets/audio.png";
import keychainImage from "../assets/keychain.png";

// Images
const HERO_PHOTO = heroImage;
const BOOTH_PHOTO = boothImage;
const ACRYLIC_PHOTO =
  "https://images.unsplash.com/photo-1768508660415-d94e940e0cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhciUyMGFjcnlsaWMlMjBsdXh1cnklMjBzdGF0aW9uZXJ5JTIwbWVudSUyMGVsZWdhbnR8ZW58MXx8fHwxNzc2NDcwODE5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const RIBBON_PHOTO = audioImage;
const PROPS_PHOTO = keychainImage;

const sections = ["hero", "services", "atelier", "process", "booking"];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#121212" }}
    >
      <Navigation
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <Hero glamPhoto={HERO_PHOTO} />

      {/* Brand Marquee — Transition between Hero and Services */}
      <div className="bg-[#4A2C2A] py-4 overflow-hidden border-y border-[#F9F8F5]/5">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {Array(3)
            .fill([
              "Luxury Photobooth",
              "Personalised Props",
              "Laser Engraving",
              "Custom Keychains",
              "Acrylic Menus",
              "High Quality Prints",
              "Retro Luxury Styling",
              "Custom Experiences",
            ])
            .flat()
            .map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-12"
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
              >
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#F9F8F5]/70">
                  {item}
                </span>
                <span className="text-[#F9F8F5]/30 text-xs">◆</span>
              </span>
            ))}
        </div>
      </div>

      <Services boothPhoto={BOOTH_PHOTO} />

      {/* Divider: Services → Atelier Transition */}
      <div
        className="relative py-20 lg:py-28 overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #121212 0%, #F9F8F5 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <span
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#4A2C2A] text-6xl block mb-6"
          >
            ✦
          </span>
          <p
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-[#121212]/60 text-2xl italic"
          >
            "The booth is the stage. The props are the costume. <br className="hidden md:block" />
            Together, they tell your story."
          </p>
        </div>
        {/* Fade lines */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent to-[#4A2C2A]/30 hidden lg:block" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-l from-transparent to-[#4A2C2A]/30 hidden lg:block" />
      </div>

      <Atelier
        acrylicPhoto={ACRYLIC_PHOTO}
        ribbonPhoto={RIBBON_PHOTO}
        propsPhoto={PROPS_PHOTO}
      />

      {/* Divider: Atelier → Process */}
      <div
        className="h-1"
        style={{ background: "linear-gradient(to right, #F9F8F5, #4A2C2A, #121212)" }}
      />

      <Process />

      <Booking />

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #121212;
        }
        ::-webkit-scrollbar-thumb {
          background: #4A2C2A;
        }
      `}</style>
    </div>
  );
}
