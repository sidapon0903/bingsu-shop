"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import SizeModal from "@/components/SizeModal";

type Menu = {
  name: string;
  price: number;   // 👈 ราคาฐาน
  rating: number;
  img: string;
  tag?: string;
  color: string;
};

type MenuWithSize = Menu & {
  size: string;
};

export default function Bestsellers() {
  const { addToCart } = useCart();

  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [cardEl, setCardEl] = useState<HTMLElement | null>(null);

  /* ===== FLY TO CART ===== */
  function flyToCart(menu: MenuWithSize) {
    addToCart({
      name: menu.name,
      price: menu.price, // 👈 ราคาที่รวมแล้ว
      img: menu.img,
      size: menu.size,
    });

    if (!cardEl) return;

    const img = cardEl.querySelector("img");
    const cart = document.getElementById("cart-icon");
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const flyingImg = img.cloneNode(true) as HTMLImageElement;
    flyingImg.style.position = "fixed";
    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";
    flyingImg.style.width = imgRect.width + "px";
    flyingImg.style.height = imgRect.height + "px";
    flyingImg.style.zIndex = "9999";
    flyingImg.style.pointerEvents = "none";
    flyingImg.style.borderRadius = "50%";
    flyingImg.style.transition =
      "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)";

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.left = cartRect.left + "px";
      flyingImg.style.top = cartRect.top + "px";
      flyingImg.style.width = "20px";
      flyingImg.style.height = "20px";
      flyingImg.style.opacity = "0.5";
    });

    setTimeout(() => {
      flyingImg.remove();
      cart.classList.add("bounce");
      setTimeout(() => cart.classList.remove("bounce"), 400);
    }, 800);
  }

  const menus: Menu[] = [
    {
      name: "Classic Milk Snow",
      price: 120,
      rating: 4.8,
      img: "/images/classic-milk.jpg",
      tag: "POPULAR",
      color: "#E9F4EE",
    },
    {
      name: "Strawberry Dream",
      price: 145,
      rating: 4.9,
      img: "/images/strawberry-dream.jpg",
      color: "#FFE8EC",
    },
    {
      name: "Choco Lava Mountain",
      price: 150,
      rating: 4.7,
      img: "/images/choco-lava.jpg",
      color: "#F3E7E1",
    },
    {
      name: "Matcha Forest",
      price: 135,
      rating: 4.8,
      img: "/images/matcha-forest.jpg",
      color: "#E6F2EA",
    },
  ];

  return (
    <section className="section">
      <h3>Bestsellers 🔥</h3>

      <div className="menu-grid-mobile">
        {menus.map((menu) => (
          <div key={menu.name} className="menu-card-mobile">
            {menu.tag && <span className="menu-tag">{menu.tag}</span>}

            <div
              className="menu-image"
              style={{ background: menu.color }}
            >
              <Image
                src={menu.img}
                alt={menu.name}
                width={240}
                height={240}
                className="menu-img"
              />
            </div>

            <h4>{menu.name}</h4>
            <div className="rating">⭐ {menu.rating}</div>

            <div className="menu-footer">
              {/* 👇 แสดงราคา “ฐาน” เท่านั้น */}
              <span className="price">฿{menu.price}</span>

              <button
                type="button"
                className="add-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMenu(menu);
                  setOpen(true);

                  const card = (e.currentTarget as HTMLElement).closest(
                    ".menu-card-mobile"
                  );
                  setCardEl(card as HTMLElement);
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== SIZE MODAL ===== */}
      {selectedMenu && (
        <SizeModal
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={(size, extra) => {
            flyToCart({
              ...selectedMenu,
              size,
              price: selectedMenu.price + extra, // ✅ ฐาน + เพิ่ม
            });
            setOpen(false);
          }}
        />
      )}
    </section>
  );
}