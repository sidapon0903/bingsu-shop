"use client";

import { useState } from "react";
import "@/styles/cart.css";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (size: string, extra: number, note: string) => void;
};

const SIZES = [
  { label: "S", extra: 0 },
  { label: "M", extra: 39 },
  { label: "L", extra: 79 },
];

export default function SizeModal({ open, onClose, onConfirm }: Props) {
  const [selected, setSelected] =
    useState<{ label: string; extra: number } | null>(null);
  const [note, setNote] = useState("");

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">เลือกขนาดไซส์</h3>

        {/* ===== SIZE ===== */}
        <div className="size-list">
          {SIZES.map((s) => (
            <button
              key={s.label}
              className={`size-btn ${
                selected?.label === s.label ? "active" : ""
              }`}
              onClick={() => setSelected(s)}
            >
              <span className="size-label">{s.label}</span>
              <span className="size-extra">
                {s.extra === 0 ? "ไม่เพิ่มราคา" : `+${s.extra} บาท`}
              </span>
            </button>
          ))}
        </div>

        {/* ===== NOTE ===== */}
        <textarea
          className="menu-note"
          placeholder="หมายเหตุอาหาร เช่น ไม่เอาถั่ว / หวานน้อย"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* ===== ACTIONS ===== */}
        <div className="modal-actions">
          <button className="cancel" onClick={onClose}>
            ยกเลิก
          </button>

          <button
            className="confirm"
            disabled={!selected}
            onClick={() => {
              if (!selected) return;
              onConfirm(selected.label, selected.extra, note);
              setSelected(null);
              setNote("");
              onClose();
            }}
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}