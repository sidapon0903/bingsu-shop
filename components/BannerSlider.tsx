"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner-container">
      <div
        className="banner-slider"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {banners.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="banner"
            width={1920}
            height={900}
            className="banner-img"
          />
        ))}
      </div>
    </div>
  );
}