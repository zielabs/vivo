"use client";

import styles from "./Hero.module.css";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className={styles.hero} id="overview">
      <video 
        src="/animated-video.mp4" 
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.overlay}></div>

      <div className={styles.heroText}>
        <motion.h2 
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          
        </motion.h2>
        <motion.h1 
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Photography<br />Redefined.
        </motion.h1>
        <motion.p 
          className={styles.heroDesc}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Co-engineered with ZEISS. Capture the extraordinary in every moment.
        </motion.p>
      </div>
    </section>
  );
}
