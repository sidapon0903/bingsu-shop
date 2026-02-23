"use client";

import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="payment-success">
      <div className="success-card">
        <h1>🎉 ชำระเงินสำเร็จ</h1>
        <p>ขอบคุณที่อุดหนุน Bing Bing Day 🍧</p>

        <button onClick={() => router.push("/receipt")}>
          ดูใบเสร็จ
        </button>

        <button onClick={() => router.push("/")}>
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
}