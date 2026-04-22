"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import styles from "./VideoFeature.module.css";

export default function VideoFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10%" });

  return (
    <section className={styles.videoSection} id="performance" ref={sectionRef}>
      {/* ── Full-bleed video background ── */}
      <div className={styles.videoBg}>
        <video
          className={styles.video}
          src="/fitur3.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Cinematic vignette overlays */}
        <div className={styles.vignetteLeft} />
        <div className={styles.vignetteRight} />
        <div className={styles.vignetteTop} />
        <div className={styles.vignetteBottom} />
      </div>

      {/* ── Content overlay ── */}
      <div className={styles.overlay}>

        {/* LEFT: Text */}
        <motion.div
          className={styles.leftContent}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* MediaTek Chipset Badge */}
          <div className={styles.chipsetBadge}>
            <div className={styles.chipsetEmblem}>
              <Image
                src="/mediatek9500.png"
                alt="MediaTek Dimensity 9500"
                fill
                sizes="64px"
                className={styles.chipsetImg}
              />
            </div>
            <span className={styles.tag}>Dimensity 9500</span>
          </div>

          <h2 className={styles.title}>
            Power<br />Beyond<br />
            <span className={styles.titleAccent}>Limits.</span>
          </h2>

          <p className={styles.desc}>
            Driven by the world&apos;s most advanced mobile chipset.
            Blazing-fast speeds, intelligent AI processing, and all-day
            endurance — seamlessly packed into an ultra-thin chassis.
          </p>
        </motion.div>

        {/* RIGHT: Stat cards */}
        <motion.div
          className={styles.rightContent}
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <StatCard value="4nm" label="Process Node" delay={0.35} inView={isInView} />
          <StatCard value="45%" label="Faster AI" delay={0.45} inView={isInView} />
          <StatCard value="6000" label="mAh Battery" delay={0.55} inView={isInView} />
        </motion.div>
      </div>

      {/* ── Bottom label ── */}
      <motion.p
        className={styles.bottomLabel}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        PERFORMANCE
      </motion.p>
    </section>
  );
}

function StatCard({
  value,
  label,
  delay,
  inView,
}: {
  value: string;
  label: string;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
    </motion.div>
  );
}
