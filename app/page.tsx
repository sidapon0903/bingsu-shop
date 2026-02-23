// app/page.tsx
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";
import BannerSlider from "@/components/BannerSlider";

export default function HomePage() {
  return (
    <>
      <Banner />
      <BannerSlider />
      <main className="content">
        <Categories />
        <Bestsellers />
        
      </main>
    </>
  );
}