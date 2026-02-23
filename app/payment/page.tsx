"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { createOrder } from "@/lib/order";
import { uploadSlip } from "@/lib/uploadSlip";
import "@/styles/payment.css";

export default function PaymentPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  /* ===== STATE ===== */
  const [bank, setBank] = useState<"promptpay" | "kbank" | "scb">("promptpay");
  const [slip, setSlip] = useState<File | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ===== TOTAL ===== */
  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  /* ===== LOAD QR (PromptPay) ===== */
  useEffect(() => {
    let active = true;

    if (bank !== "promptpay" || total <= 0) {
      setQr(null);
      return;
    }

    fetch("/api/promptpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: "0834043248",
        amount: total,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (active) setQr(data.qr);
      })
      .catch(() => {
        if (active) setQr(null);
      });

    return () => {
      active = false;
    };
  }, [bank, total]);

  /* ===== SUBMIT PAYMENT ===== */
  async function submitPayment() {
    try {
      if (!slip) {
        alert("กรุณาแนบสลิปก่อนยืนยัน");
        return;
      }

      setLoading(true);

      // 1. upload slip
      const slipUrl = await uploadSlip(slip);

      // 2. save order (ถือว่าชำระสำเร็จ)
      await createOrder({
        items,
        total,
        bank,
        status: "paid",
        slipUrl,
      });

      // 3. success
      setSuccess(true);
      clearCart();

      setTimeout(() => {
        router.push("/payment/success");
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2 className="title">ชำระเงิน</h2>

        {/* ===== ORDER SUMMARY ===== */}
        <div className="order-summary">
          {items.map((item, index) => (
            <div key={index} className="order-row">
              <div>
                {item.name} ({item.size}) × {item.qty}
              </div>
              <strong>฿{item.price * item.qty}</strong>

              {item.note && (
                <div className="order-note">
                  ❗ ไม่เอาอะไร: {item.note}
                </div>
              )}
            </div>
          ))}

          <div className="order-total">
            รวมทั้งหมด <strong>฿{total}</strong>
          </div>
        </div>

        {/* ===== BANK ===== */}
        <div className="bank-select">
          <button
            className={bank === "promptpay" ? "active" : ""}
            onClick={() => setBank("promptpay")}
          >
            PromptPay
          </button>
          <button
            className={bank === "kbank" ? "active" : ""}
            onClick={() => setBank("kbank")}
          >
            KBank
          </button>
          <button
            className={bank === "scb" ? "active" : ""}
            onClick={() => setBank("scb")}
          >
            SCB
          </button>
        </div>

        {/* ===== QR ===== */}
        {bank === "promptpay" && qr && (
          <div className="qr-box">
            <img src={qr} alt="PromptPay QR" />
            <p>สแกนเพื่อชำระเงิน (฿{total})</p>
          </div>
        )}

        {/* ===== UPLOAD ===== */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSlip(e.target.files?.[0] || null)}
        />

        {/* ===== SUCCESS MESSAGE ===== */}
        {success && (
          <div className="payment-success">
            ✅ ชำระเงินสำเร็จ กำลังบันทึกข้อมูล...
          </div>
        )}

        {/* ===== CONFIRM ===== */}
        <button
          className="confirm-btn"
          onClick={submitPayment}
          disabled={loading}
        >
          {loading ? "กำลังบันทึก..." : "ฉันชำระเงินแล้ว"}
        </button>
      </div>
    </div>
  );
} 
