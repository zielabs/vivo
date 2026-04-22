"use client";

import styles from "./FeatureSection.module.css";
import { motion } from "framer-motion";
import Image from "next/image";

interface FeatureSectionProps {
  id: string;
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  imageStyle?: React.CSSProperties;
}

export default function FeatureSection({
  id,
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  imageStyle,
}: FeatureSectionProps) {
  return (
    <section className={styles.featureSection} id={id}>
      <div className={`${styles.featureContent} ${reverse ? styles.reverse : ""}`}>
        <motion.div 
          className={styles.featureText}
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className={styles.sectionTag}>{tag}</h3>
          <h2 className={`${styles.sectionTitle} text-gradient`}>{title}</h2>
          <p className={styles.sectionDesc}>{description}</p>
        </motion.div>
        
        <motion.div 
          className={styles.featureImageContainer}
          initial={{ opacity: 0, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className={styles.imageWrapper}>
            <Image 
              src={imageSrc} 
              alt={imageAlt} 
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className={styles.featureImg}
              style={imageStyle}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
