import { useState } from "react";

interface AtelierProps {
  acrylicPhoto: string;
  ribbonPhoto: string;
  propsPhoto: string;
}

const products = [
  {
    id: "01",
    name: "Personalized High-Quality Prop Sets",
    material: "High-Density PVC · Clear Acrylic · White Acrylic",
    description:
      "Handcrafted suites designed to elevate every detail of your celebration—from personalized prop sets and custom menus to bold signage and elegant placecards. Each piece is custom-designed and cut in-house using premium materials, ensuring a professional, lasting finish that perfectly complements your event aesthetic.",
    tag: "Heritage Collection",
    sizes: ["High-quality PVC props", "Placecards", "Menus", "Signage"],
  },
  {
    id: "02",
    name: "Audio Guestbook",
    material: "VINTAGE ACRYLIC · HIGH-DEFINITION AUDIO",
    description:
      "Capture the raw emotion and laughter of your celebration in a way photos simply can’t. Our Audio Guestbook replaces the traditional paper book with a vintage-inspired telephone that records heartfelt voice messages from your guests.",
    tag: "Bestseller",
    sizes: ["One size"],
  },
  {
    id: "03",
    name: "Keychain Station",
    material: "Premium Vegan Leather Straps · High-Quality Keychain Housings",
    description:
      "Bring an interactive, personalized experience to your event with our custom Keychain Station. We provide premium vegan leather straps and high-quality keychain housings designed to showcase the very best moments of your celebration. Guests can instantly transform their favorite photobooth captures into a stylish, wearable keepsake, creating a functional memento that keeps the memories of your event close at hand.",
    tag: "Signature Piece",
    sizes: ["Standard Keychain Size", "Black Leather Strap", "White Leather Strap", "Custom Engravings Available"],
  },
];

export function Atelier({ acrylicPhoto, ribbonPhoto, propsPhoto }: AtelierProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const photos = [acrylicPhoto, ribbonPhoto, propsPhoto];

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="atelier" className="bg-[#F9F8F5] py-28 lg:py-36 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#4A2C2A]" />
              <span
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.3em" }}
                className="text-[9px] uppercase tracking-[0.3em] text-[#4A2C2A]"
              >
                Custom Props & Keepsakes
              </span>
            </div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}
              className="text-[#121212] text-[clamp(3rem,6vw,5.5rem)] font-light"
            >
              The Atelier
              <em className="block text-[#4A2C2A] font-semibold not-italic">Collection.</em>
            </h2>
          </div>
          <p
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.05em" }}
            className="text-[#121212]/40 text-sm leading-relaxed max-w-xs lg:mb-2"
          >
            Every piece in our Atelier is made by hand, made with intention. Crafted for your event. Kept as heirlooms.
          </p>
        </div>
      </div>

      {/* Museum Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Image — Floating with shadow */}
              <div className="relative mb-8">
                {/* Museum-style floating mount */}
                <div
                  className="relative bg-white overflow-hidden transition-all duration-700"
                  style={{
                    boxShadow:
                      hoveredId === product.id
                        ? "0 40px 80px rgba(74,44,42,0.18), 0 8px 24px rgba(74,44,42,0.12)"
                        : "0 20px 50px rgba(74,44,42,0.1), 0 4px 12px rgba(74,44,42,0.06)",
                    transform: hoveredId === product.id ? "translateY(-8px)" : "translateY(0)",
                  }}
                >
                  {/* Staggered height for editorial feel */}
                  <div
                    className={`overflow-hidden ${
                      index === 1 ? "h-80" : index === 0 ? "h-72" : "h-88"
                    }`}
                    style={{ height: index === 1 ? "320px" : index === 0 ? "288px" : "352px" }}
                  >
                    <img
                      src={photos[index]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Inner mat border */}
                  <div className="absolute inset-3 border border-[#121212]/5 pointer-events-none" />

                  {/* Product tag */}
                  <div className="absolute top-4 left-4">
                    <span
                      style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                      className="text-[8px] uppercase tracking-[0.2em] bg-[#4A2C2A] text-[#F9F8F5] px-3 py-1"
                    >
                      {product.tag}
                    </span>
                  </div>

                  {/* Process tag */}
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-px bg-[#4A2C2A]" />
                      <span
                        style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.15em" }}
                        className="text-[8px] uppercase tracking-[0.15em] text-[#4A2C2A]"
                      >
                        {/* {product.process} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-2">
                <div className="flex items-start justify-between mb-3">
                  <span
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-[#121212]/20 text-4xl font-light"
                  >
                    {product.id}
                  </span>
                </div>
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-[#121212] text-2xl font-semibold mb-2"
                >
                  {product.name}
                </h3>
                <p
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.1em" }}
                  className="text-[#4A2C2A] text-[9px] uppercase tracking-[0.1em] mb-4"
                >
                  {product.material}
                </p>
                <p
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.03em" }}
                  className="text-[#121212]/50 text-xs leading-relaxed mb-6"
                >
                  {product.description}
                </p>

                {/* Sizes */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.1em" }}
                      className="text-[8px] uppercase tracking-[0.1em] border border-[#121212]/15 text-[#121212]/40 px-3 py-1"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToBooking}
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                  className="text-[9px] uppercase tracking-[0.2em] text-[#121212] border-b border-[#121212]/20 pb-0.5 hover:border-[#4A2C2A] hover:text-[#4A2C2A] transition-all duration-300 cursor-pointer"
                >
                  Inquire & Order →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Note */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-20">
        <div className="border-t border-[#121212]/10 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.08em" }}
            className="text-[#121212]/35 text-xs max-w-md"
          >
            All Atelier pieces are made-to-order with a standard 7–10 business day lead time. Rush orders available upon request.
          </p>
          <button
            onClick={scrollToBooking}
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
            className="text-[9px] uppercase tracking-[0.2em] bg-[#121212] text-[#F9F8F5] px-8 py-3.5 hover:bg-[#4A2C2A] transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            Commission a Piece
          </button>
        </div>
      </div>
    </section>
  );
}
