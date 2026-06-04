import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Categories } from "@/components/sections/Categories";
import { Process } from "@/components/sections/Process";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";

// Re-fetch DB-backed products at most once a minute (ISR).
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts />
      <Categories />
      <Process />
      <Story />
      <Testimonials />
      <Newsletter />
    </>
  );
}
