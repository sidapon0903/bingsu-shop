"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import "@/styles/cart.css";

export default function CartPage() {
  const {
    items,
    increase,
    decrease,
    removeItem,
    clearCart,
  } = useCart();

  const router = useRouter();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart-wrap">
      <div className="cart-header">
        <h2>ตะกร้าสินค้า</h2>
        {items.length > 0 && (
          <button className="clear-cart" onClick={clearCart}>
            ล้างตะกร้า
          </button>
        )}
      </div>

      {items.length === 0 && (
        <p className="empty-cart">ยังไม่มีสินค้าในตะกร้า</p>
      )}

      {items.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.img} alt={item.name} />

          <div className="cart-info">
            <h4>
              {item.name}
              {item.size && (
                <span className="size"> ({item.size})</span>
              )}
            </h4>

            {/* ✅ NOTE */}
            {item.note && (
              <p className="cart-note">
                ❗ ไม่เอาอะไร: {item.note}
              </p>
            )}

            <span className="price">฿{item.price}</span>
          </div>

          <div className="cart-qty">
            <button
              onClick={() =>
                decrease(item.name, item.size, item.note)
              }
            >
              −
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() =>
                increase(item.name, item.size, item.note)
              }
            >
              +
            </button>
          </div>

          <button
            className="remove"
            onClick={() =>
              removeItem(item.name, item.size, item.note)
            }
          >
            ✕
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            รวมทั้งหมด <strong>฿{total}</strong>
          </div>

          {/* 🔥 ปุ่มที่ไปแน่นอน */}
          <button
            className="checkout-btn"
            onClick={() => router.push("/payment")}
          >
            ไปชำระเงิน
          </button>
        </div>
      )}
    </div>
  );
}