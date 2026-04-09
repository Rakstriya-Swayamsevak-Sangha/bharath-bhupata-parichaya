'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './home.module.css';

const shlokaLines = [
  "उत्तरं यत् समुद्रस्य",
  "हिमाद्रेश्चैव दक्षिणम्।",
  "वर्षं तद् भारतं नाम",
  "भारती यत्र संततिः॥"
];

const englishMeaning = "The country that lies north of the ocean and south of the snowy mountains (Himalaya) is called Bhāratam there dwells the descendants of Bharata.";

export default function Home() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  const [journeyState, setJourneyState] = useState("idle"); // "idle", "activating", "navigating"

  useEffect(() => {
    // Phase 1: Void (0s - 1s) is handled by default state

    // Phase 2: Light Emergence (1s - 2.5s)
    const t1 = setTimeout(() => setPhase(1), 1000);

    // Phase 3: Shloka Reveal (2.5s - 8s)
    const t2 = setTimeout(() => setPhase(2), 2500);

    // Phase 4: English Meaning & Bharat Presence (overlap slightly for flow)
    const t3 = setTimeout(() => setPhase(3), 7500);

    // Phase 5: Entry CTA (snappier appearance)
    const t4 = setTimeout(() => setPhase(4), 9800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleEnter = () => {
    if (journeyState !== "idle") return;
    setJourneyState("activating");

    // 1. Activation Phase (0-1200ms) handles button feedback and text swap via CSS

    // 2. Navigation State Trigger (at 1200ms)
    setTimeout(() => {
      setJourneyState("navigating");

      // 3. Navigation Finalization (after 500ms exit animation)
      setTimeout(() => {
        router.push('/map/');
      }, 500);
    }, 1200);
  };

  const easing: any = [0.16, 1, 0.3, 1];

  return (
    <motion.main
      className={styles.entryContainer}
      data-state={journeyState}
      initial={{ opacity: 1 }}
      animate={{
        opacity: journeyState === "navigating" ? 0 : 1
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* ── Background Elements ─────────────────── */}
      <div className={styles.parchment} />
      <div className={styles.noise} />
      <div className={styles.vignette} />

      {/* Temple Light Emergence (Phase 2+) */}
      <motion.div
        className={styles.radialLight}
        initial={{ opacity: 0 }}
        animate={{
          opacity: phase >= 1 && journeyState === "idle" ? 1 : 0,
          scale: 1
        }}
        transition={{ duration: 2.5, ease: easing }}
      />


      <motion.div
        className={styles.shlokaContainer}
        animate={{
          y: journeyState !== "idle" ? -20 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
      >
        {/* Sanskrit Shloka (Phase 3) */}
        <div className="flex flex-col items-center">
          {shlokaLines.map((line, i) => (
            <motion.div
              key={i}
              className={styles.shlokaLine}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: journeyState !== "idle" ? 0 : (phase >= 2 ? 1 : 0),
                y: phase >= 2 ? 0 : 15
              }}
              transition={{
                duration: journeyState !== "idle" ? 0.8 : 2.2,
                delay: journeyState !== "idle" ? 0 : (phase >= 2 ? i * 0.95 : 0),
                ease: easing
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>

        {/* English Meaning Reveal (Phase 4) */}
        <motion.div
          className={styles.translation}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: journeyState !== "idle" ? 0 : (phase >= 3 ? 0.7 : 0),
            y: phase >= 3 ? 0 : 10
          }}
          transition={{ duration: 1.2, ease: easing }}
        >
          {englishMeaning}
        </motion.div>

        {/* Entry Call-to-Action (Phase 5) */}
        <AnimatePresence mode="wait">
          {phase >= 4 && (
            <motion.button
              key="cta-button"
              className={`${styles.ctaButton} ${journeyState !== "idle" ? styles.activeGlow : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: journeyState === "activating" ? [1, 0.97, 1] : 1
              }}
              transition={{
                duration: 0.8,
                scale: { duration: 0.3, ease: "easeOut" }
              }}
              onClick={handleEnter}
              disabled={journeyState !== "idle"}
              aria-busy={journeyState !== "idle"}
            >
              <div className={styles.textDefault}>
                Enter Darshan
              </div>
              <div className={styles.textLoading}>
                <span className={styles.shimmer}>STEPPING INTO BHARATH...</span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Brand Inscription (Bottom Center, Fixed) */}
      <motion.div
        className={styles.brandInscription}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 && journeyState === "idle" ? 1 : 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        Bharath Bhupata Parichaya
      </motion.div>
    </motion.main>
  );
}
