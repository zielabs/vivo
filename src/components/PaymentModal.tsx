"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PaymentModal.module.css";

/* ── Types ─────────────────────────────────── */
interface OrderInfo {
  product: string;
  color: string;
  storage: string;
  price: number;
  monthly: number;
  protection: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderInfo;
}

type PayMethod = "kartu-kredit" | "transfer-bank" | "qris" | null;

const BANKS = [
  { id: "bca", name: "BCA", logo: "BCA", no: "1234567890" },
  { id: "mandiri", name: "Mandiri", logo: "MND", no: "0987654321" },
  { id: "bni", name: "BNI", logo: "BNI", no: "1122334455" },
];

const QR_PATTERN = [
  "111111101010101111111",
  "100000100011001000001",
  "101110101100001011101",
  "101110100011101011101",
  "101110101110101011101",
  "100000100101001000001",
  "111111101010101111111",
  "000000000111000000000",
  "101011111000111010101",
  "011100100110010001110",
  "100011011010101110001",
  "011010001100110101101",
  "110101110111001010101",
  "000000001010111011100",
  "111111100101011100101",
  "100000101110001011010",
  "101110100011100110001",
  "101110101000111001110",
  "101110100110010110011",
  "100000101010100011000",
  "111111101101101110111",
];

/* ── Main Component ─────────────────────────── */
export default function PaymentModal({ isOpen, onClose, order }: PaymentModalProps) {
  const [step, setStep] = useState(1); // 1: Data, 2: Metode, 3: Detail, 4: Sukses
  const [payMethod, setPayMethod] = useState<PayMethod>(null);
  const [selectedBank, setSelectedBank] = useState(BANKS[0].id);
  const [payToggle, setPayToggle] = useState<"cicilan" | "penuh">("cicilan");
  const [copied, setCopied] = useState(false);

  // Form state
  const [form, setForm] = useState({
    nama: "", email: "", telepon: "", alamat: "", kota: "", kodepos: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Card state
  const [card, setCard] = useState({
    number: "", name: "", expiry: "", cvv: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Email tidak valid";
    if (!form.telepon.match(/^[0-9]{10,13}$/)) e.telepon = "Nomor telepon tidak valid";
    if (!form.alamat.trim()) e.alamat = "Alamat wajib diisi";
    if (!form.kota.trim()) e.kota = "Kota wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validate()) return;
    if (step === 2 && !payMethod) return;
    setStep((s) => Math.min(s + 1, 4));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep(1);
    setPayMethod(null);
    setForm({ nama: "", email: "", telepon: "", alamat: "", kota: "", kodepos: "" });
    setCard({ number: "", name: "", expiry: "", cvv: "" });
    onClose();
  };

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val: string) =>
    val.replace(/\D/g, "").slice(0, 4).replace(/(.{2})/, "$1/");

  const bank = BANKS.find((b) => b.id === selectedBank)!;
  const totalDisplay = `Rp ${order.price.toLocaleString("id-ID")}`;
  const monthlyDisplay = `Rp ${order.monthly.toLocaleString("id-ID")}/bln`;

  const stepLabel = ["Data Diri", "Metode Bayar", "Detail Bayar", "Selesai"];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Centering wrapper */}
          <div className={styles.modalWrapper}>
            {/* Modal */}
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
            {/* Header */}
            {step < 4 && (
              <div className={styles.modalHeader}>
                <div>
                  <p className={styles.modalStep}>Langkah {step} dari 3</p>
                  <h2 className={styles.modalTitle}>{stepLabel[step - 1]}</h2>
                </div>
                <button className={styles.closeBtn} onClick={handleClose} id="modal-close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}

            {/* Step progress bar */}
            {step < 4 && (
              <div className={styles.progressBar}>
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`${styles.progressDot} ${step >= s ? styles.progressDotActive : ""}`}
                  />
                ))}
              </div>
            )}

            {/* Order summary (always visible steps 1-3) */}
            {step < 4 && (
              <div className={styles.orderSummaryRow}>
                <div>
                  <p className={styles.orderProduct}>{order.product}</p>
                  <p className={styles.orderMeta}>{order.color} · {order.storage}</p>
                  {order.protection !== "Tanpa perlindungan ekstra" && (
                    <p className={styles.orderMeta}>{order.protection}</p>
                  )}
                </div>
                <div className={styles.orderPriceCol}>
                  <p className={styles.orderPriceFull}>{totalDisplay}</p>
                  <p className={styles.orderPriceMonthly}>{monthlyDisplay} × 12</p>
                </div>
              </div>
            )}

            {/* ── STEP CONTENT ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className={styles.stepBody}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >

                {/* ── STEP 1: Data Diri ── */}
                {step === 1 && (
                  <div className={styles.form}>
                    <div className={styles.formRow}>
                      <Field label="Nama Lengkap" error={errors.nama}>
                        <input id="field-nama" className={`${styles.input} ${errors.nama ? styles.inputError : ""}`}
                          placeholder="Contoh: Budi Santoso" value={form.nama}
                          onChange={(e) => setForm({ ...form, nama: e.target.value })} />
                      </Field>
                      <Field label="Email" error={errors.email}>
                        <input id="field-email" type="email" className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                          placeholder="budi@email.com" value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </Field>
                    </div>
                    <Field label="Nomor Telepon" error={errors.telepon}>
                      <input id="field-telepon" className={`${styles.input} ${errors.telepon ? styles.inputError : ""}`}
                        placeholder="08xxxxxxxxxx" value={form.telepon}
                        onChange={(e) => setForm({ ...form, telepon: e.target.value })} />
                    </Field>
                    <Field label="Alamat Pengiriman" error={errors.alamat}>
                      <textarea id="field-alamat" className={`${styles.textarea} ${errors.alamat ? styles.inputError : ""}`}
                        placeholder="Jl. Contoh No. 123, RT/RW 001/002" rows={3} value={form.alamat}
                        onChange={(e) => setForm({ ...form, alamat: e.target.value })} />
                    </Field>
                    <div className={styles.formRow}>
                      <Field label="Kota" error={errors.kota}>
                        <input id="field-kota" className={`${styles.input} ${errors.kota ? styles.inputError : ""}`}
                          placeholder="Jakarta" value={form.kota}
                          onChange={(e) => setForm({ ...form, kota: e.target.value })} />
                      </Field>
                      <Field label="Kode Pos">
                        <input id="field-kodepos" className={styles.input}
                          placeholder="12345" value={form.kodepos}
                          onChange={(e) => setForm({ ...form, kodepos: e.target.value })} />
                      </Field>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Metode Pembayaran ── */}
                {step === 2 && (
                  <div className={styles.methodList}>
                    {/* Pay toggle cicilan / penuh */}
                    <div className={styles.payToggle}>
                      {(["cicilan", "penuh"] as const).map((v) => (
                        <button key={v} id={`toggle-${v}`}
                          className={`${styles.payToggleBtn} ${payToggle === v ? styles.payToggleActive : ""}`}
                          onClick={() => setPayToggle(v)}>
                          {v === "cicilan" ? "Cicilan 0%" : "Bayar Penuh"}
                        </button>
                      ))}
                    </div>

                    {payToggle === "cicilan" && (
                      <div className={styles.infoBox}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        Cicilan 0% selama 12 bulan · {monthlyDisplay}
                      </div>
                    )}

                    {[
                      { id: "kartu-kredit", label: "Kartu Kredit / Debit", sub: "Visa, Mastercard, JCB",
                        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
                      { id: "transfer-bank", label: "Transfer Bank", sub: "BCA, Mandiri, BNI",
                        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> },
                      { id: "qris", label: "QRIS", sub: "Scan QR dari aplikasi e-wallet",
                        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3M17 21v-3h3M21 14h-3"/></svg> },
                    ].map((m) => (
                      <button key={m.id} id={`method-${m.id}`}
                        className={`${styles.methodCard} ${payMethod === m.id ? styles.methodActive : ""}`}
                        onClick={() => setPayMethod(m.id as PayMethod)}>
                        <div className={styles.methodIcon}>{m.icon}</div>
                        <div className={styles.methodText}>
                          <p className={styles.methodLabel}>{m.label}</p>
                          <p className={styles.methodSub}>{m.sub}</p>
                        </div>
                        <div className={`${styles.radioCircle} ${payMethod === m.id ? styles.radioActive : ""}`} />
                      </button>
                    ))}
                  </div>
                )}

                {/* ── STEP 3: Detail Pembayaran ── */}
                {step === 3 && (
                  <div>
                    {payMethod === "kartu-kredit" && (
                      <div className={styles.cardForm}>
                        <div className={styles.cardPreview}>
                          <div className={styles.cardChip}>
                            <svg width="28" height="22" viewBox="0 0 40 30" fill="none">
                              <rect width="40" height="30" rx="4" fill="#d4a017" opacity="0.9"/>
                              <rect x="12" y="0" width="16" height="30" fill="#b8860b" opacity="0.4"/>
                              <rect x="0" y="10" width="40" height="10" fill="#b8860b" opacity="0.4"/>
                            </svg>
                          </div>
                          <p className={styles.cardNumber}>
                            {card.number || "•••• •••• •••• ••••"}
                          </p>
                          <div className={styles.cardBottom}>
                            <span>{card.name || "NAMA KARTU"}</span>
                            <span>{card.expiry || "MM/YY"}</span>
                          </div>
                        </div>

                        <Field label="Nomor Kartu">
                          <input id="card-number" className={styles.input} placeholder="0000 0000 0000 0000"
                            value={card.number} onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })} />
                        </Field>
                        <Field label="Nama di Kartu">
                          <input id="card-name" className={styles.input} placeholder="NAMA LENGKAP"
                            value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })} />
                        </Field>
                        <div className={styles.formRow}>
                          <Field label="Expired">
                            <input id="card-expiry" className={styles.input} placeholder="MM/YY"
                              value={card.expiry} onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />
                          </Field>
                          <Field label="CVV">
                            <input id="card-cvv" className={styles.input} placeholder="•••" maxLength={3}
                              type="password" value={card.cvv}
                              onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })} />
                          </Field>
                        </div>
                      </div>
                    )}

                    {payMethod === "transfer-bank" && (
                      <div className={styles.transferWrap}>
                        <div className={styles.bankTabs}>
                          {BANKS.map((b) => (
                            <button key={b.id} id={`bank-${b.id}`}
                              className={`${styles.bankTab} ${selectedBank === b.id ? styles.bankTabActive : ""}`}
                              onClick={() => setSelectedBank(b.id)}>
                              {b.name}
                            </button>
                          ))}
                        </div>
                        <div className={styles.transferCard}>
                          <p className={styles.transferLabel}>Transfer ke rekening {bank.name}</p>
                          <div className={styles.transferNoRow}>
                            <p className={styles.transferNo}>{bank.no}</p>
                            <button id="copy-btn" className={styles.copyBtn} onClick={() => handleCopy(bank.no)}>
                              {copied ? "Tersalin!" : "Salin"}
                            </button>
                          </div>
                          <p className={styles.transferName}>a.n. vivo Indonesia</p>
                          <div className={styles.transferTotal}>
                            <span>Total Transfer</span>
                            <strong>{totalDisplay}</strong>
                          </div>
                        </div>
                        <p className={styles.transferNote}>
                          Setelah transfer, pesanan dikonfirmasi otomatis dalam 1×24 jam.
                        </p>
                      </div>
                    )}

                    {payMethod === "qris" && (
                      <div className={styles.qrisWrap}>
                        <div className={styles.qrisBox}>
                          {/* SVG QR code deterministic */}
                          <svg width="180" height="180" viewBox="-1 -1 23 24" className={styles.qrSvg}>
                            <rect x="-1" y="-1" width="23" height="24" fill="#fff"/>
                            {QR_PATTERN.map((row, y) =>
                              row.split("").map((cell, x) =>
                                cell === "1" ? (
                                  <rect key={`${x}-${y}`} x={x} y={y} width="1.05" height="1.05" fill="#000" />
                                ) : null
                              )
                            )}
                            <text x="10.5" y="22.2" textAnchor="middle" fontSize="1.6" fontWeight="bold" fill="#333" letterSpacing="0.05">vivo Indonesia</text>
                          </svg>
                        </div>
                        <p className={styles.qrisAmount}>{totalDisplay}</p>
                        <p className={styles.qrisSub}>Scan menggunakan GoPay, OVO, Dana, ShopeePay, atau m-banking</p>
                        <p className={styles.qrisTimer}>QR berlaku selama <strong>10:00</strong></p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 4: Sukses ── */}
                {step === 4 && (
                  <div className={styles.successWrap}>
                    <motion.div
                      className={styles.successIcon}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </motion.div>
                    <motion.h2 className={styles.successTitle}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                      Pesanan Berhasil!
                    </motion.h2>
                    <motion.p className={styles.successSub}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                      Terima kasih, <strong>{form.nama}</strong>! Pesanan Anda sedang diproses.
                    </motion.p>
                    <motion.div className={styles.successDetail}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
                      <div className={styles.successRow}><span>Produk</span><span>{order.product} · {order.storage}</span></div>
                      <div className={styles.successRow}><span>Warna</span><span>{order.color}</span></div>
                      <div className={styles.successRow}><span>Total</span><strong>{totalDisplay}</strong></div>
                      <div className={styles.successRow}><span>Metode</span><span>
                        {payMethod === "kartu-kredit" ? "Kartu Kredit" : payMethod === "transfer-bank" ? `Transfer ${bank.name}` : "QRIS"}
                      </span></div>
                      <div className={styles.successRow}><span>Dikirim ke</span><span>{form.alamat}, {form.kota}</span></div>
                    </motion.div>
                    <motion.p className={styles.successEmail}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                      Konfirmasi dikirim ke <strong>{form.email}</strong>
                    </motion.p>
                    <motion.button id="success-close-btn" className={styles.successBtn} onClick={handleClose}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
                      Kembali ke Beranda
                    </motion.button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Footer buttons */}
            {step < 4 && (
              <div className={styles.modalFooter}>
                {step > 1 && (
                  <button id="btn-back" className={styles.btnBack} onClick={() => setStep((s) => s - 1)}>
                    ← Kembali
                  </button>
                )}
                <button
                  id="btn-next"
                  className={styles.btnNext}
                  onClick={step === 3 ? () => setStep(4) : handleNext}
                  disabled={step === 2 && !payMethod}
                >
                  {step === 3
                    ? payMethod === "transfer-bank" ? "Konfirmasi Pesanan"
                    : payMethod === "qris" ? "Saya Sudah Bayar"
                    : "Bayar Sekarang"
                    : "Lanjutkan →"}
                </button>
              </div>
            )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Helper: Field wrapper ─────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {children}
      {error && <p className={styles.fieldError}>{error}</p>}
    </div>
  );
}
