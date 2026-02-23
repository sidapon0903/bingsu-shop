"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { menus } from "@/data/menus";
import SizeModal from "@/components/SizeModal";

type Menu = {
  name: string;
  price: number;
  img: string;
  rating: number;
  category: string;
  color: string;
};

type SelectedMenu = Menu & {
  size?: string;
  note?: string;
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { addToCart } = useCart();

  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] =
    useState<SelectedMenu | null>(null);

  const filteredMenus = menus.filter(
    (menu) => menu.category === slug
  );

  return (
    <section className="section">
      <h3 style={{ textAlign: "center", textTransform: "capitalize" }}>
        {slug} Menu 🍧
      </h3>

      <div className="menu-grid-mobile">
        {filteredMenus.map((menu) => (
          <div key={menu.name} className="menu-card-mobile">
            <div
              className="menu-image"
              style={{ background: menu.color }}
            >
              <img src={menu.img} alt={menu.name} />
            </div>

            <h4>{menu.name}</h4>
            <div className="rating">⭐ {menu.rating}</div>

            <div className="menu-footer">
              <span className="price">฿{menu.price}</span>

              <button
                type="button"
                className="add-btn"
                onClick={() => {
                  setSelectedMenu(menu);
                  setOpen(true);
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedMenu && (
        <SizeModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedMenu(null);
          }}
          onConfirm={(size, extra, note) => {
            addToCart({
              name: selectedMenu.name,
              img: selectedMenu.img,
              price: selectedMenu.price + extra,
              size,
              note,
            });

            setOpen(false);
            setSelectedMenu(null);
          }}
        />
      )}
    </section>
  );
}