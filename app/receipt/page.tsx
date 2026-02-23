"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

/* ===== TYPES ===== */
type ReceiptItem = {
  name: string;
  price: number;
  qty: number;
};

type ReceiptOrder = {
  items: ReceiptItem[];
  total: number;
  bank: string;
  slipUrl: string;
};

export default function ReceiptPage() {
  const [order, setOrder] = useState<ReceiptOrder | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snap = await getDocs(q);
      if (!snap.empty) {
        setOrder(snap.docs[0].data() as ReceiptOrder);
      }
    }

    fetchOrder();
  }, []);

  if (!order) return <p>กำลังโหลดใบเสร็จ...</p>;

  return (
    <div className="receipt">
      <h2>🧾 ใบเสร็จ</h2>

      {order.items.map((item) => (
        <div key={item.name}>
          {item.name} × {item.qty} = ฿{item.price * item.qty}
        </div>
      ))}

      <h3>รวมทั้งหมด: ฿{order.total}</h3>

      <p>ชำระผ่าน: {order.bank}</p>

      <img src={order.slipUrl} width={200} alt="slip" />
    </div>
  );
}