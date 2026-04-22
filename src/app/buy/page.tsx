"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./buy.module.css";
import PaymentModal from "@/components/PaymentModal";

const COLORS = [
  { id: "titanium-black", label: "Titanium Black", hex: "#1a1a1a" },
  { id: "moonlight-silver", label: "Moonlight Silver", hex: "#c0c0c0" },
  { id: "aurora-blue", label: "Aurora Blue", hex: "#2563eb" },
  { id: "sakura-pink", label: "Sakura Pink", hex: "#e879a0" },
];

const STORAGE = [
  { id: "256", label: "256 GB", price: "Rp 9.999.000" },
  { id: "512", label: "512 GB", price: "Rp 11.499.000" },
  { id: "1tb", label: "1 TB", price: "Rp 13.999.000" },
];

const PROTECTION = [
  { id: "none", label: "Tanpa perlindungan ekstra", price: null },
  { id: "care1", label: "vivo Care+ 1 Tahun", price: "Rp 499.000" },
  { id: "care2", label: "vivo Care+ 2 Tahun", price: "Rp 799.000" },
];

const GALLERY = [
  "/pilihan1.jfif",
  "/pilihan2.jfif",
  "/pilihan3.jfif",
  "/pilihan4.jfif",
  "/pilihan5.jfif",
];

const BENEFITS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
    title: "vivo Rewards",
    desc: "Kumpulkan poin setiap pembelian dan tukarkan dengan hadiah eksklusif.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "vivo Premium Care",
    desc: "Perlindungan perangkat 24/7 tanpa perlu khawatir.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v4h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Gratis Pengiriman",
    desc: "Tidak perlu keluar rumah, perangkat diantar ke depan pintu Anda.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Cicilan 0%",
    desc: "Cicilan 0% bunga hingga 24 bulan dengan kartu kredit pilihan.",
  },
];

export default function BuyPage() {
  const [activeColor, setActiveColor] = useState(COLORS[0].id);
  const [activeStorage, setActiveStorage] = useState(STORAGE[0].id);
  const [activeProtection, setActiveProtection] = useState(PROTECTION[0].id);
  const [activeImg, setActiveImg] = useState(0);
  const [tradeIn, setTradeIn] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState<"full" | "installment">("installment");
  const [modalOpen, setModalOpen] = useState(false);

  const selectedStorage = STORAGE.find((s) => s.id === activeStorage)!;
  const selectedColor = COLORS.find((c) => c.id === activeColor)!;
  const selectedProtection = PROTECTION.find((p) => p.id === activeProtection)!;

  const basePrice = parseInt(selectedStorage.price.replace(/\D/g, ""));
  const protectionPrice = selectedProtection.price
    ? parseInt(selectedProtection.price.replace(/\D/g, ""))
    : 0;
  const totalPrice = basePrice + protectionPrice;
  const monthlyPrice = Math.round(totalPrice / 12);

  return (
    <div className={styles.page}>
      {/* ── Sticky Top Bar ──────────────────────── */}
      <header className={styles.stickyBar}>
        <div className={styles.stickyInner}>
          <Link href="/" className={styles.backLink}>
            ← Kembali ke vivo X300 Pro
          </Link>
          <div className={styles.stickyPrice}>
            <span>
              Mulai dari{" "}
              <strong>Rp {monthlyPrice.toLocaleString("id-ID")}/bln</strong>{" "}
              bunga 0% selama 12 bulan atau{" "}
              <strong>{selectedStorage.price}</strong>
            </span>
            <button className={styles.buyNowBtn} id="sticky-buy-btn" onClick={() => setModalOpen(true)}>
              Beli sekarang
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────── */}
      <main className={styles.main}>
        {/* Left: Gallery */}
        <section className={styles.galleryCol}>
          <div className={styles.mainImgWrapper}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={GALLERY[activeImg]}
                alt="vivo X300 Pro"
                className={styles.mainImgNative}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </AnimatePresence>
          </div>
          <div className={styles.thumbRow}>
            {GALLERY.map((src, i) => (
              <motion.button
                key={i}
                className={`${styles.thumbBtn} ${activeImg === i ? styles.thumbActive : ""}`}
                onClick={() => setActiveImg(i)}
                id={`gallery-thumb-${i}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`View ${i + 1}`} className={styles.thumbImgNative} />
              </motion.button>
            ))}
          </div>
        </section>

        {/* Right: Config */}
        <section className={styles.configCol}>
          {/* Product Header */}
          <div className={styles.productHeader}>
            <h1 className={styles.productName}>vivo X300 Pro</h1>
            <p className={styles.productMeta}>
              {selectedColor.label} · {selectedStorage.label}
            </p>
            <div className={styles.ratingRow}>
              {[1,2,3,4].map((i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className={styles.ratingCount}>(128 ulasan)</span>
            </div>
          </div>

          {/* Color */}
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>
              Pilih Warna Anda :{" "}
              <span className={styles.optionSelected}>{selectedColor.label}</span>
            </p>
            <div className={styles.colorRow} role="radiogroup">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  id={`color-${c.id}`}
                  className={`${styles.colorSwatch} ${activeColor === c.id ? styles.colorActive : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setActiveColor(c.id)}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>Pilih Kapasitas Penyimpanan</p>
            <div className={styles.storageRow} role="radiogroup">
              {STORAGE.map((s) => (
                <button
                  key={s.id}
                  id={`storage-${s.id}`}
                  className={`${styles.storageBtn} ${activeStorage === s.id ? styles.storageActive : ""}`}
                  onClick={() => setActiveStorage(s.id)}
                >
                  <span className={styles.storageLabel}>{s.label}</span>
                  <span className={styles.storagePrice}>{s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Trade-In */}
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>
              Ingin mendapatkan potongan hingga{" "}
              <strong className={styles.highlight}>Rp 2.000.000?</strong>
              <br />
              <span className={styles.optionSub}>Coba tukarkan ponsel Anda sekarang!</span>
            </p>
            <div className={styles.tradeRow}>
              {["YA", "TIDAK"].map((v) => (
                <button
                  key={v}
                  id={`tradein-${v.toLowerCase()}`}
                  className={`${styles.tradeBtn} ${tradeIn === v ? styles.tradeActive : ""}`}
                  onClick={() => setTradeIn(v)}
                >
                  <span>{v}</span>
                  {v === "YA" && (
                    <span className={styles.tradeSave}>Hemat hingga Rp 2.000.000</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Protection */}
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>
              Tambahkan vivo Care+{" "}
              <a href="#" className={styles.detailLink}>
                Detail →
              </a>
            </p>
            <p className={styles.optionSub}>
              Asuransi yang melindungi perangkat Anda, di mana pun, kapan pun.
            </p>
            <div className={styles.protectionList} role="radiogroup">
              {PROTECTION.map((p) => (
                <button
                  key={p.id}
                  id={`protection-${p.id}`}
                  className={`${styles.protectionItem} ${activeProtection === p.id ? styles.protectionActive : ""}`}
                  onClick={() => setActiveProtection(p.id)}
                >
                  <span>{p.label}</span>
                  {p.price && <span className={styles.protectionPrice}>{p.price}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Promo bullets */}
          <ul className={styles.promoBullets}>
            <li>Cashback hingga Rp 500.000 dengan pembelian produk aksesoris</li>
            <li>Gratis case & screen protector untuk pembelian pertama</li>
            <li>
              Mulai dari Rp {monthlyPrice.toLocaleString("id-ID")}/bln.{" "}
              <a href="#" className={styles.detailLink}>Kalkulator Finansial →</a>
            </li>
          </ul>

          {/* Summary Card */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryInfo}>
              <p className={styles.summaryProduct}>vivo X300 Pro</p>
              <p className={styles.summaryMeta}>
                {selectedColor.label} · {selectedStorage.label}
              </p>
            </div>

            {/* Payment method toggle */}
            <div className={styles.payToggle}>
              <button
                id="pay-installment"
                className={`${styles.payToggleBtn} ${payMethod === "installment" ? styles.payToggleActive : ""}`}
                onClick={() => setPayMethod("installment")}
              >
                Cicilan
              </button>
              <button
                id="pay-full"
                className={`${styles.payToggleBtn} ${payMethod === "full" ? styles.payToggleActive : ""}`}
                onClick={() => setPayMethod("full")}
              >
                Bayar Penuh
              </button>
            </div>

            {payMethod === "installment" ? (
              <div className={styles.summaryPrice}>
                <p className={styles.summaryPriceMain}>
                  Mulai dari{" "}
                  <strong>Rp {monthlyPrice.toLocaleString("id-ID")}/bln</strong>
                </p>
                <p className={styles.summaryPriceSub}>
                  Bunga 0% selama 12 bulan atau{" "}
                  <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
                </p>
              </div>
            ) : (
              <div className={styles.summaryPrice}>
                <p className={styles.summaryPriceMain}>
                  <strong>Rp {totalPrice.toLocaleString("id-ID")}</strong>
                </p>
                <p className={styles.summaryPriceSub}>Bayar sekarang, langsung dikirim</p>
              </div>
            )}

            <button className={styles.summaryBuyBtn} id="summary-buy-btn" onClick={() => setModalOpen(true)}>
              Beli sekarang
            </button>

            <div className={styles.paymentIcons}>
              <span className={styles.payIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Kartu Kredit
              </span>
              <span className={styles.payIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                Transfer Bank
              </span>
              <span className={styles.payIcon}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                QRIS
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ── Benefits Section ──────────────────── */}
      <section className={styles.benefitsSection}>
        <h2 className={styles.benefitsTitle}>Beli langsung. Dapat lebih banyak.</h2>
        <div className={styles.benefitsGrid}>
          {BENEFITS.map((b) => (
            <div key={b.title} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{b.icon}</div>
              <h3 className={styles.benefitName}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
              <a href="#" className={styles.benefitLink}>
                Lebih detail
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:"4px"}}>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Payment Modal ──────────────────────── */}
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        order={{
          product: "vivo X300 Pro",
          color: selectedColor.label,
          storage: selectedStorage.label,
          price: totalPrice,
          monthly: monthlyPrice,
          protection: selectedProtection?.label ?? "Tanpa perlindungan ekstra",
        }}
      />
    </div>
  );
}
