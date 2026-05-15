
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import JsonPreview from "@/components/JsonPreview";
import Pricing from "@/components/Pricing";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <HowItWorks />
      <JsonPreview />
      <Pricing />
      <Feedback />
      <Footer />
    </main>
  );
}