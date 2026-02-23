import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/* ===== ITEM ===== */
export type OrderItem = {
  name: string;
  price: number;
  qty: number;
  img: string;
  size?: string;
  note?: string;
};

/* ===== STATUS ===== */
export type OrderStatus = "pending" | "paid";

/* ===== ORDER ===== */
export type Order = {
  items: OrderItem[];
  total: number;
  bank: "promptpay" | "kbank" | "scb";
  status: OrderStatus;
  slipUrl: string;
};


/* ===== CREATE ORDER ===== */
export async function createOrder(order: Order): Promise<void> {
  if (!order.items || order.items.length === 0) {
    throw new Error("Order must have items");
  }

  if (!order.slipUrl) {
    throw new Error("Slip is required");
  }

  await addDoc(collection(db, "orders"), {
    items: order.items,
    total: order.total,
    bank: order.bank,
    status: order.status,
    slipUrl: order.slipUrl,
    createdAt: serverTimestamp(),
  });
}