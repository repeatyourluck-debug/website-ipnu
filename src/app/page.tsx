import Footer from "@/components/layout/Footer";
import Hero from "@/components/ui/Hero";
import NewsSection from "@/components/ui/NewsSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <NewsSection />
      <Footer />
    </div>
  );
}
