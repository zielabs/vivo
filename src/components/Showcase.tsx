"use client";

import styles from "./Showcase.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/shot-1.jpeg", alt: "Shot on vivo X300 Pro 1" },
  { src: "/shot-2.jpeg", alt: "Shot on vivo X300 Pro 2" },
  { src: "/shot-3.jpeg", alt: "Shot on vivo X300 Pro 3" },
];

export default function Showcase() {
  return (
    <section className={styles.showcaseSection}>
      <div className={styles.showcaseContainer}>
        <motion.div 
          className={styles.showcaseText}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`${styles.sectionTitle} text-gradient`}>Shot on vivo.</h2>
          <p className={styles.sectionDesc}>Discover the extraordinary world through the lens of vivo X300 Pro.</p>
        </motion.div>
        
        <div className={styles.galleryGrid}>
          {photos.map((photo, index) => (
            <motion.div 
              key={index}
              className={styles.galleryItem}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Image 
                src={photo.src} 
                alt={photo.alt} 
                fill
                className={styles.galleryImg}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
