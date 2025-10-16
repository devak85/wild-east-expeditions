import React from "react";
import { motion } from "framer-motion";

/**
 * Minimal cinematic intro:
 * Centered text "WILD EAST EXPEDITIONS" fades in & rises from horizon
 * against a subtle forest-themed gradient.
 */
export default function HomeIntro({ onEnter }) {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-gradient-to-b from-[#0b1a13] via-[#13281f] to-[#0a0f0d] flex flex-col items-center justify-center text-white select-none">
      {/* soft mist layer */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at bottom, rgba(255,255,255,0.08) 0%, transparent 70%)",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* title */}
      <motion.h1
        initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center font-safari tracking-[0.25em] text-3xl md:text-5xl lg:text-6xl"
      >
        WILD&nbsp;EAST&nbsp;EXPEDITIONS
      </motion.h1>

      {/* subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1.6, delay: 1.6 }}
        className="mt-4 text-white/70 text-sm md:text-base tracking-wide"
      >
        into the heart of the wild
      </motion.p>

      {/* call-to-action */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.4 }}
        onClick={onEnter}
        className="mt-12 px-6 py-3 rounded-full bg-safari-700 hover:bg-safari-600 text-sand-200 font-semibold tracking-wide"
      >
        Enter the Wild
      </motion.button>

      {/* faint horizon glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 w-[90vw] h-[20vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,215,130,0.4) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
