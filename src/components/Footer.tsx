"use client";

import styles from "./Footer.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = {
  Products: ["vivo X300 Pro", "vivo V40", "vivo Y200", "vivo Pad 3"],
  Support: ["Customer Care", "Warranty", "Repair Center", "FAQ"],
  Company: ["About vivo", "Sustainability", "Careers", "Press"],
  Social: ["Instagram", "Twitter / X", "YouTube", "Facebook"],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Top divider with gradient */}
      <div className={styles.topDivider} />

      <div className={styles.footerInner}>
        {/* Brand column */}
        <motion.div
          className={styles.brandCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.logoWrap}>
            <Image src="/logo-vivo.png" alt="vivo" fill sizes="120px" className={styles.logoImg} />
          </div>
          <p className={styles.brandDesc}>
            Inspired by you.<br />Designed for the extraordinary.
          </p>
          <p className={styles.tagline}>Co-engineered with ZEISS.</p>
        </motion.div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([category, links], colIdx) => (
          <motion.div
            key={category}
            className={styles.linkCol}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * (colIdx + 1) }}
          >
            <h4 className={styles.colTitle}>{category}</h4>
            <ul className={styles.linkList}>
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className={styles.footerLink}>{link}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} vivo Mobile Communication Co., Ltd. All rights reserved.
        </span>
        <div className={styles.legal}>
          <a href="#" className={styles.legalLink}>Privacy Policy</a>
          <span className={styles.dot}>·</span>
          <a href="#" className={styles.legalLink}>Terms of Use</a>
          <span className={styles.dot}>·</span>
          <a href="#" className={styles.legalLink}>Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
