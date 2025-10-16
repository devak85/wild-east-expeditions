import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOURS = [
  {
    id: "masai-mara",
    title: "MASAI MARA",
    dates: "JUL — OCT • GREAT MIGRATION",
    bg: "/images/masai-topography.jpg",
    overlay: "/images/masai-lion.jpg",
    species: ["Lions","Cheetahs","Leopards","Wildebeest","Elephants"],
    whatsapp: "https://wa.me/919000000000?text=I'm%20interested%20in%20the%20Masai%20Mara%20tour!",
    itinerary: [
      "Day 1: Nairobi arrival → Transfer to Mara; evening drive.",
      "Day 2: Dawn & dusk game drives (big cats, migration corridors).",
      "Day 3: Full-day safari; picnic near Mara River crossings.",
      "Day 4: Optional balloon safari (extra), checkout & return."
    ],
    style:{titleClass:"text-safari-700",chipClass:"bg-sand-300/90 text-safari-900"},
    composition:"mara", // has lion overlay
  },
  {
    id: "ethiopia",
    title: "ETHIOPIA", // removed "• GELADA"
    dates: "OCT — FEB • SIMIEN HIGHLANDS",
    bg: "/images/ethiopia-gelada.jpg",
    species: ["Gelada","Walia Ibex","Ethiopian Wolf (region)","Lammergeier"],
    whatsapp: "https://wa.me/919000000000?text=I'm%20interested%20in%20the%20Ethiopia%20tour!",
    itinerary: [
      "Day 1: Addis Ababa → Simien; sunset ridge walk.",
      "Day 2: Gelada troops at Sankaber/Chennek.",
      "Day 3: Lammergeier viewpoint & Walia Ibex hike.",
      "Day 4: Return to Addis; city culture or coffee ceremony."
    ],
    style:{titleClass:"text-safari-700",chipClass:"bg-sand-300/90 text-safari-900"},
    composition:"single",
  },
  {
    id: "botswana",
    title: "BOTSWANA", // removed "• MEERKATS"
    dates: "MAY — SEP • KALAHARI SALT PANS",
    bg: "/images/botswana-meerkats.jpg",
    species:["Meerkats","Brown Hyena","Oryx","Bat-eared Fox"],
    whatsapp: "https://wa.me/919000000000?text=I'm%20interested%20in%20the%20Botswana%20tour!",
    itinerary: [
      "Day 1: Maun → Makgadikgadi; sunset pans walk.",
      "Day 2: Dawn with habituated meerkats; quad-bike pans.",
      "Day 3: Brown hyena tracking & night sky on pans.",
      "Day 4: Transfer back to Maun / onward safari."
    ],
    style:{titleClass:"text-safari-700",chipClass:"bg-sand-300/90 text-safari-900"},
    composition:"single",
  },
];

// Smooth, non-white transition
const panelVariants = {
  enter: (direction) => ({ x: direction > 0 ? 30 : -30, opacity: 0.6 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: (direction) => ({ x: direction > 0 ? -30 : 30, opacity: 0.6, transition: { duration: 0.5 } }),
};

export default function WildlifeLanding() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const active = useMemo(() => TOURS[index], [index]);

  const prev = () => { setDirection(-1); setIndex((i) => (i - 1 + TOURS.length) % TOURS.length); };
  const next = () => { setDirection(+1); setIndex((i) => (i + 1) % TOURS.length); };

  return (
    <main className="relative w-screen h-screen overflow-hidden text-white font-body bg-black">
      {/* Panel */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={active.id}
          custom={direction}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className={`absolute inset-0 ${open ? "pointer-events-none" : ""}`}
        >
          <Panel tour={active} onOpen={() => setOpen(true)} />
        </motion.div>
      </AnimatePresence>

      {/* Brand header (overlay, always visible) */}
      <div className="absolute top-4 left-6 z-30 font-semibold tracking-widest text-white/90">
        WILD EAST EXPEDITIONS
      </div>

      {/* Arrows */}
      <NavArrow side="left" label={TOURS[(index - 1 + TOURS.length) % TOURS.length].title} onClick={(e) => { e.stopPropagation(); prev(); }} />
      <NavArrow side="right" label={TOURS[(index + 1) % TOURS.length].title} onClick={(e) => { e.stopPropagation(); next(); }} />

      {/* Backdrop + Sheet (click outside closes; backdrop also BLURS) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="sheet"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 text-safari-900 rounded-t-3xl shadow-lg p-6 md:p-10 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <h2 className={`text-2xl md:text-3xl font-safari ${active.style.titleClass}`}>
                Itinerary — {active.title}
              </h2>
              <ul className="mt-4 list-disc list-inside space-y-2 text-safari-800">
                {active.itinerary.map((l,i)=><li key={i}>{l}</li>)}
              </ul>
              <div className="mt-6">
                <a
                  href={active.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
                >
                  Contact on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

function NavArrow({ side, label, onClick }) {
  const base =
    "z-50 absolute top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition group pointer-events-auto";
  const pos = side === "left" ? "left-3" : "right-3";
  const tooltipPos = side === "left" ? "left-full ml-2" : "right-full mr-2";

  return (
    <button
      aria-label={side === "left" ? "Previous tour" : "Next tour"}
      onClick={onClick}
      className={`${base} ${pos}`}
    >
      <span className="text-2xl">{side === "left" ? "←" : "→"}</span>
      <span className={`absolute ${tooltipPos} top-1/2 -translate-y-1/2 bg-black/70 px-3 py-1 text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap`}>
        {label}
      </span>
    </button>
  );
}

function Panel({ tour, onOpen }) {
  // For ETHIOPIA/BOTSWANA we always blur the photo slightly
  const alwaysBlur = tour.id === "ethiopia" || tour.id === "botswana";
  const photoBlur = alwaysBlur ? "blur-[1.5px]" : "";

  return (
    <section
      onClick={onOpen}
      className="absolute inset-0 cursor-pointer"
      title={`Open itinerary: ${tour.title}`}
    >
      {/* Dark fallback */}
      <div className="absolute inset-0 bg-black" />

      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-center bg-cover ${photoBlur}`}
          style={{ backgroundImage: `url(${tour.bg})` }}
          aria-hidden
        />
        {tour.composition === "mara" && (
          <div
            className={`absolute inset-0 bg-center bg-cover mix-blend-multiply opacity-90`}
            style={{ backgroundImage: `url(${tour.overlay})` }}
            aria-hidden
          />
        )}
        {/* Gradient & vignette */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.65)] pointer-events-none" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 h-full flex flex-col">
        <header className="p-6 flex items-center justify-between">
          <div className="font-semibold tracking-widest text-white/90">WILD EAST EXPEDITIONS</div>
        </header>

        <div className="flex-1 flex items-center px-6 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className={`font-safari text-4xl md:text-6xl ${tour.style.titleClass}`}>
              {tour.title}
            </h1>
            <p className={`mt-3 inline-block font-extrabold tracking-wide px-3 py-1.5 rounded-md shadow-sm ${tour.style.chipClass}`}>
              {tour.dates}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tour.species.map((sp) => (
                <span key={sp} className="px-3 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur text-white/95 text-xs">
                  {sp}
                </span>
              ))}
            </div>
            <div className="mt-8 text-sm text-white/80">Click anywhere to view itinerary</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
