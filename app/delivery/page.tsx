"use client";

import { useRouter } from "next/navigation";

export default function DeliveryPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>🚚 กำลังจัดส่ง</h1>
      <p style={{ marginTop: 8, color: "#666" }}>
        ร้านกำลังเตรียมออเดอร์ของคุณ
      </p>

      <button
        onClick={() => router.push("/")}
        style={{
          marginTop: 24,
          padding: "14px 28px",
          borderRadius: 999,
          background: "linear-gradient(135deg,#ff5a8a,#ff8fb1)",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        กลับหน้าหลัก
      </button>
    </div>
  );
}