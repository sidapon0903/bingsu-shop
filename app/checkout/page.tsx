"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (items.length === 0) {
    return <p style={{ padding: 40 }}>ตะกร้าว่าง 🛒</p>;
  }

  return (
    <div className="checkout-page">
      <h2>ชำระเงิน</h2>

      <div className="summary-box">
        {items.map((item) => (
          <div key={item.name} className="summary-row">
            <span>{item.name} × {item.qty}</span>
            <span>฿{item.price * item.qty}</span>
          </div>
        ))}

        <hr />

        <div className="summary-row total">
          <strong>รวมทั้งหมด</strong>
          <strong>฿{total}</strong>
        </div>
      </div>

      <button
        className="pay-btn"
        onClick={() => router.push("/payment")}
      >
        ไปชำระเงิน →
      </button>
    </div>
  );
}