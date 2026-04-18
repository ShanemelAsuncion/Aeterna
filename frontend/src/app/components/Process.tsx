import { useState } from "react";

const steps = [
  {
    id: "01",
    phase: "Design",
    icon: "✦",
    title: "The Vision",
    description:
      "We begin with a dedicated consultation to map out the logistics of your event. During this session, we’ll finalize your custom pricing structure, select your service duration, and explore available add-ons—such as atelier leatherwork or custom engraving. We ensure every detail is aligned with your aesthetic and budget before moving to production.",
    tools: ["LOGISTICS & PRICING", "ADD-ON CURATION", "DURATION & SCHEDULING"],
    color: "#4A2C2A",
  },
  {
    id: "02",
    phase: "Craft",
    icon: "◈",
    title: "The Making",
    description:
      "Your order moves into our studio where precision meets artistry. If your selection includes any Atelier Add-ons, I personally hand-craft those pieces to ensure a bespoke, high-end finish. Using a blend of traditional hand-finishing and modern studio tools, we prepare every element of your suite—from leather straps to precision-cut inserts—ready for the big day.",
    tools: ["ATELIER HAND-CRAFTING", "PRINTING & ENGRAVING", "QUALITY ASSURANCE"],
    color: "#4A2C2A",
  },
  {
    id: "03",
    phase: "Event",
    icon: "◇",
    title: "The Experience",
    description:
      "Our team arrives early to set the scene — every prop positioned, every backdrop steamed, every light calibrated. We run the show so you can live in your moment. The booth captures not just photos, but chapters.",
    tools: ["On-site Setup", "Live Attendants", "Same-Day Gallery"],
    color: "#4A2C2A",
  },
];

export function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="bg-[#121212] py-28 lg:py-36 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-[#4A2C2A]" />
          <span
            style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.3em" }}
            className="text-[9px] uppercase tracking-[0.3em] text-[#4A2C2A]"
          >
            How We Work
          </span>
        </div>
        <h2
          style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}
          className="text-[#F9F8F5] text-[clamp(3rem,6vw,5.5rem)] font-light"
        >
          The Aeterna <em className="text-[#4A2C2A] font-semibold not-italic">Process.</em>
        </h2>
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 hidden lg:block">
        {/* Timeline bar */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#F9F8F5]/8" />
          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className="flex flex-col items-center cursor-pointer group"
              >
                {/* Node */}
                <div
                  className={`w-14 h-14 flex items-center justify-center border transition-all duration-500 ${
                    activeStep === index
                      ? "bg-[#4A2C2A] border-[#4A2C2A]"
                      : "bg-[#121212] border-[#F9F8F5]/15 group-hover:border-[#4A2C2A]"
                  }`}
                >
                  <span
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-[#F9F8F5] text-lg"
                  >
                    {step.icon}
                  </span>
                </div>
                {/* Phase label */}
                <div className="mt-4 flex flex-col items-center gap-1">
                  <span
                    style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                    className="text-[8px] uppercase tracking-[0.2em] text-[#F9F8F5]/30"
                  >
                    {step.id}
                  </span>
                  <span
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className={`text-xl transition-colors duration-300 ${
                      activeStep === index ? "text-[#F9F8F5]" : "text-[#F9F8F5]/40"
                    }`}
                  >
                    {step.phase}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Connector lines with arrow */}
          <div className="absolute top-7 left-[16.5%] right-[16.5%] flex items-center justify-between pointer-events-none">
            <div className="flex-1 border-t border-dashed border-[#4A2C2A]/30 mx-4 relative">
              <span className="absolute right-0 -top-1.5 text-[#4A2C2A]/30 text-xs">›</span>
            </div>
            <div className="flex-1 border-t border-dashed border-[#4A2C2A]/30 mx-4 relative">
              <span className="absolute right-0 -top-1.5 text-[#4A2C2A]/30 text-xs">›</span>
            </div>
          </div>
        </div>

        {/* Active Step Detail */}
        <div className="grid grid-cols-3 gap-0 border border-[#F9F8F5]/5">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-10 border-r border-[#F9F8F5]/5 last:border-r-0 transition-all duration-500 cursor-pointer ${
                activeStep === index ? "bg-[#1a1a1a]" : "bg-transparent"
              }`}
              onClick={() => setActiveStep(index)}
            >
              <h3
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                  activeStep === index ? "text-[#F9F8F5]" : "text-[#F9F8F5]/30"
                }`}
              >
                {step.title}
              </h3>
              <p
                style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.03em" }}
                className={`text-xs leading-relaxed mb-8 transition-colors duration-300 ${
                  activeStep === index ? "text-[#F9F8F5]/50" : "text-[#F9F8F5]/20"
                }`}
              >
                {step.description}
              </p>
              <div className="flex flex-col gap-2">
                {step.tools.map((tool) => (
                  <div key={tool} className="flex items-center gap-3">
                    <div
                      className={`w-1 h-1 transition-colors duration-300 ${
                        activeStep === index ? "bg-[#4A2C2A]" : "bg-[#F9F8F5]/10"
                      }`}
                    />
                    <span
                      style={{ 
                        fontFamily: "'Tenor Sans', sans-serif", 
                        letterSpacing: "0.15em",
                        color: (tool === "LOGISTICS & PRICING" || tool === "ADD-ON CURATION" || tool === "DURATION & SCHEDULING" || tool === "ATELIER HAND-CRAFTING" || tool === "PRINTING & ENGRAVING" || tool === "QUALITY ASSURANCE" || tool === "On-site Setup" || tool === "Live Attendants" || tool === "Same-Day Gallery") ? "#dfd2c2" : undefined
                      }}
                      className={`text-[9px] uppercase tracking-[0.15em] transition-colors duration-300 ${
                        activeStep === index && !(tool === "LOGISTICS & PRICING" || tool === "ADD-ON CURATION" || tool === "DURATION & SCHEDULING" || tool === "ATELIER HAND-CRAFTING" || tool === "PRINTING & ENGRAVING" || tool === "QUALITY ASSURANCE" || tool === "On-site Setup" || tool === "Live Attendants" || tool === "Same-Day Gallery") ? "text-[#4A2C2A]" : !(tool === "LOGISTICS & PRICING" || tool === "ADD-ON CURATION" || tool === "DURATION & SCHEDULING" || tool === "ATELIER HAND-CRAFTING" || tool === "PRINTING & ENGRAVING" || tool === "QUALITY ASSURANCE" || tool === "On-site Setup" || tool === "Live Attendants" || tool === "Same-Day Gallery") ? "text-[#F9F8F5]/15" : ""
                      }`}
                    >
                      {tool}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Steps */}
      <div className="max-w-7xl mx-auto px-6 lg:hidden">
        <div className="flex flex-col gap-0">
          {steps.map((step, index) => (
            <div key={step.id} className="flex gap-6">
              {/* Left: timeline */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 flex items-center justify-center border border-[#4A2C2A] bg-[#4A2C2A]/10 flex-shrink-0">
                  <span
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    className="text-[#4A2C2A]"
                  >
                    {step.icon}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-[#4A2C2A]/20 my-2 min-h-8" />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-12">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.2em" }}
                    className="text-[8px] uppercase tracking-[0.2em] text-[#4A2C2A]"
                  >
                    {step.id} — {step.phase}
                  </span>
                </div>
                <h3
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  className="text-[#F9F8F5] text-2xl font-semibold mb-3"
                >
                  {step.title}
                </h3>
                <p
                  style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.03em" }}
                  className="text-[#F9F8F5]/40 text-xs leading-relaxed mb-6"
                >
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{ 
                        fontFamily: "'Tenor Sans', sans-serif", 
                        letterSpacing: "0.1em",
                        color: (tool === "LOGISTICS & PRICING" || tool === "ADD-ON CURATION" || tool === "DURATION & SCHEDULING" || tool === "ATELIER HAND-CRAFTING" || tool === "PRINTING & ENGRAVING" || tool === "QUALITY ASSURANCE" || tool === "On-site Setup" || tool === "Live Attendants" || tool === "Same-Day Gallery") ? "#dfd2c2" : undefined
                      }}
                      className={`text-[8px] uppercase tracking-[0.1em] border border-[#4A2C2A]/30 px-3 py-1 ${
                        !(tool === "LOGISTICS & PRICING" || tool === "ADD-ON CURATION" || tool === "DURATION & SCHEDULING" || tool === "ATELIER HAND-CRAFTING" || tool === "PRINTING & ENGRAVING" || tool === "QUALITY ASSURANCE" || tool === "On-site Setup" || tool === "Live Attendants" || tool === "Same-Day Gallery") ? "text-[#4A2C2A]" : ""
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Precision Tools Banner */}
      <div className="mt-20 border-y border-[#F9F8F5]/5 py-8 overflow-hidden">
        <div className="flex items-center gap-16 animate-scroll-tools whitespace-nowrap">
          {[
            "Laser Engraving",
            "High-Density PVC Printing",
            "Dye-Sublimation Photo Printing",
            "High-Quality Materials",
            "Precision Cutting",
            "Custom Design Software",
            "Laser Engraving",
            "High-Density PVC Printing",
            "Dye-Sublimation Photo Printing",
            "High-Quality Materials",
            "Precision Cutting",
            "Custom Design Software",
          ].map((tool, i) => (
            <span
              key={i}
              style={{ fontFamily: "'Tenor Sans', sans-serif", letterSpacing: "0.25em" }}
              className="text-[9px] uppercase tracking-[0.25em] text-[#F9F8F5]/20 inline-flex items-center gap-16"
            >
              {tool}
              <span className="text-[#4A2C2A]">◆</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollTools {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-tools {
          animation: scrollTools 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
