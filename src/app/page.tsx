import AboutSection from "@/features/home/components/AboutSection";
import CategorySection from "@/features/home/components/CategorySection";
import HeroSection from "@/features/home/components/HeroSection";
import NewSection from "@/features/home/components/NewSection";
import TermSection from "@/features/home/components/TermSection";

export default function Home() {
  return (
    <div className="dark:bg-gray-900">
      <HeroSection />
      <CategorySection />
      <TermSection />
      <AboutSection />
      <NewSection />
    </div>
  );
}
