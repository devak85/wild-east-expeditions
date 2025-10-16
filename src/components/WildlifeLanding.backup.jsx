import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Each tour is a full-screen panel with the image as the background */
const TOURS = [
  {
    id: "masai-mara",
    title: "MASAI MARA",
    dates: "JUL — OCT • GREAT MIGRATION",
    bg: "/images/masai-topography.jpg",
    overlay: "/images/masai-lion.jpg", // blended lion eyes
    species: ["Lions","Cheetahs","Leopards","Wildebeest","Elephants"],
    whatsapp: "https://wa.me/919000000000?text=I'm%20interested%20in%20the%20Masai%20Mara%20tour!",
    itinerary: [
      "Day 1: Nairobi arrival → Transfer to Mara; evening drive.",
      "Day 2: Dawn & dusk game drives (big cats, migration corridors).",
      "Day 3: Full-day safari; picnic near Mara River crossing points.",
      "Day 4: Optional balloon safari (extra), checkout & return."
    ],
    style: { titleClass: "text-safari-700", chipClass: "bg-sand-300/90 text-safari-900" },
    composition: "mara",
  },
  {
    id: "ethiopia",
    title: "ETHIOPIA • GELADA",
    dates: "OCT — FEB • SIMIEN HIGHLANDS",
    bg: "/images/ethiopia-gelada.jpg",
    species: ["Gelada","Walia Ibex","Ethiopian Wolf (region)","Lammergeier"],
    whatsapp: "https://wa.me/919000000000?text=I'm%20interested%20in%20the%20Ethiopia%20Gelada%20tour!",
    itinerary: [
      "Day 1: Addis Ababa → Fly/drive to Simien; sunset ridge walk.",
      "Day 2: Gelada troops at Sankaber/Chennek; cliff-edge vistas.",
      "Day 3: Lammergeier viewpoint; optional Walia Ibex hike.",
      "Day 4: Return to Addis; city culture or coffee ceremony."
    ],
    style: { titleClass: "text-safari-700", chipClass: "bg-sand-300/90 text-safari-900" },
    composition: "single", // single background photo
  },
  {
    id: "botswana",
    title: "BOTSWANA • MEERKATS",
    dates: "MAY — SEP • KALAHARI SALT PANS",
    bg: "/images/botswana-meerkats.jpg",
    species: ["Meerkats","Brown Hyena","Oryx","Bat-eared Fox"],
    whatsapp: "https://wa.me/919000000000?text=I'm%20interested%20in%20the%20Botswana%20Meerkats%20tour!",
    itinerary: [
      "Day 1: Maun → Makgadikgadi; sunset pans walk.",
      "Day 2: Dawn with habituated meerkats; quad-bike pans (dry season).",
      "Day 3: Brown hyena tracking; night sky on the pans (weather-permitting).",
      "Day 4: Transfer back to Maun / onward safari."
    ],
    style: { titleClass: "text-safari-700", chipClass: "bg-sand-300/90 text-safari-900" },
    composition: "single",
  },
];

export default function WildlifeLanding() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(TOURS[0].id);

  const active = useMemo(() => TOURS.find(t => t.id === activeId)!, [activeId]);

  return (
    <main className="w-screen h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex select-none text-white font-body">
      {TOURS.map((t) => (
        <Panel
          key={t.id}
          tour={t}
          onOpen={() => { setActiveId(t.id); setOpen(true); }}
        />
      ))}

      {/* Slide-up itinerary panel (persists until closed) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="absolute bottom-0 left-0 right-0 bg-white/95 text-safari-900 rounded-t-3xl shadow-lg p-6 md:p-10 backdrop-blur-xl z-50"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className={`text-2xl md:text-3xl font-safari ${active.style.titleClass}`}>
                Itinerary — {active.title.replace("•","·")}
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1.5 rounded-full bg-safari-700 text-white text-xs font-semibold hover:bg-safari-600"
              >
                Close
              </button>
            </div>

            <ul className="mt-4 list-disc list-inside space-y-2 text-safari-800">
              {active.itinerary.map((line, idx) => (<li key={idx}>{line}</li>))}
            </ul>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
              <a
                href={active.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
              >
                Contact on WhatsApp
              </a>
              <span className="text-xs text-safari-700/70">*Panel stays visible until you close it.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Panel({ tour, onOpen }) {
  return (
    <section
      id={tour.id}
      onClick={onOpen}
      className="snap-center shrink-0 w-screen h-screen relative overflow-hidden cursor-pointer"
      title={`Open itinerary: ${tour.title}`}
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${tour.bg})` }}
          aria-hidden
        />
        {/* For Masai Mara we blend in lion eyes overlay */}
        {tour.composition === "mara" && (
          <div
            className="absolute inset-0 bg-center bg-cover mix-blend-multiply opacity-90"
            style={{ backgroundImage: `url(/images/masai-lion.jpg)` }}
            aria-hidden
          />
        )}
        {/* Gradient & vignette for readability */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_160px_rgba(0,0,0,0.65)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <header className="p-6 flex items-center justify-between">
          <div className="font-semibold tracking-widest text-white/90">WILDLIFE TOURS</div>
        </header>

        <div className="flex-1 flex items-center px-6 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className={`font-safari drop-shadow-[0_2px_0_rgba(0,0,0,0.35)] text-4xl md:text-6xl ${tour.style.titleClass}`}>
              {tour.title}
            </h1>
            <p className={`mt-3 inline-block font-extrabold tracking-wide px-3 py-1.5 rounded-md shadow-sm ${tour.style.chipClass}`}>
              {tour.dates}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tour.species?.map((sp) => (
                <span key={sp} className="px-3 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur text-white/95 text-xs">
                  {sp}
                </span>
              ))}
            </div>
            <div className="mt-8 text-sm text-white/80">Click anywhere to view itinerary & WhatsApp contact</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
