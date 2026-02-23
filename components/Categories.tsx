"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Categories() {
  const router = useRouter();

  const categories = [
    {
      name: "Classic & Original",
      slug: "classic",
      icon: "🍧",
      glow: "#fff3c4",
    },
    {
      name: "Fruity & Refreshing",
      slug: "fruity",
      icon: "🍓",
      glow: "#ffd6e8",
    },
    {
      name: "Chocolate & Decadent",
      slug: "chocolate",
      icon: "🍫",
      glow: "#e8dcd4",
    },
    {
      name: "Tea & Local Flavors",
      slug: "tea",
      icon: "🍵",
      glow: "#e6f2ea",
    },
    {
      name: "Drinks",
      slug: "drinks",
      icon: "🧋",
      glow: "#e0f4ff",
    },
  ];

  return (
    <div className="category-row">
      {categories.map((cat) => (
        <div
          key={cat.slug}
          className="category-item"
          onClick={() => router.push(`/category/${cat.slug}`)}
        >
          <div
            className="category-icon"
            style={{
              boxShadow: `0 0 20px ${cat.glow}`,
            }}
          >
            {cat.icon}
          </div>
          <span>{cat.name}</span>
        </div>
      ))}
    </div>
  );
}