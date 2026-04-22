"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Overview", href: "#overview", id: "overview" },
  { label: "Camera", href: "#camera", id: "camera" },
  { label: "Design", href: "#design", id: "design" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logoContainer}>
          <Image src="/logo-vivo.png" alt="vivo logo" fill sizes="130px" className={styles.logoImage} />
        </Link>
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`${styles.navLink} ${activeSection === link.id ? styles.navLinkActive : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
                <span className={styles.navIndicator} />
              </a>
            </li>
          ))}
        </ul>
        <Link href="/buy" className={styles.buyBtn}>Buy Now</Link>
      </div>
    </nav>
  );
}
