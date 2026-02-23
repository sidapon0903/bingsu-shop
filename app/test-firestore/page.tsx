"use client";

import { createOrder } from "@/lib/order";

export default function TestFirestorePage() {
  async function testSave() {
    try {
      console.log("🟡 CLICK");

      const id = await createOrder({
        items: [
          {
            name: "TEST MENU",
            price: 99,
            qty: 1,
            img: "/test.jpg",
            size: "M",
            note: "ไม่เอาถั่ว",
          },
        ],
        total: 99,
        bank: "promptpay",
        status: "paid",
        slipUrl: "https://test.com/slip.jpg",
      });

      console.log("🎉 SUCCESS ID:", id);
      alert("✅ บันทึกเข้า Firestore แล้ว\nID: " + id);
    } catch (e) {
      console.error("❌ ERROR", e);
      alert("❌ ไม่เข้า Firestore ดู console");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🔥 TEST FIRESTORE</h1>

      <button
        onClick={testSave}
        style={{
          marginTop: 20,
          padding: "14px 30px",
          background: "#ec4899",
          color: "#fff",
          borderRadius: 999,
          fontWeight: "bold",
        }}
      >
        กดเพื่อบันทึก DB
      </button>
    </div>
  );
}