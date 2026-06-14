import Hero from "@/components/Hero";
import Demo from "@/components/Demo";
import HowItWorks from "@/components/HowItWorks";
import JsonPreview from "@/components/JsonPreview";
import Trial from "@/components/Trial";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <Demo />
      <JsonPreview />
      <HowItWorks />
      <Pricing />
      <Trial />
      <Footer />
    </main>
  );
}
