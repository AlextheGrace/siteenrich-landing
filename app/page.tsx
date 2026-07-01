import Hero from "@/components/Hero";
import CsvUpload from "@/components/CsvUpload";
import SampleOutput from "@/components/SampleOutput";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Trial from "@/components/Trial";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <CsvUpload />
      <SampleOutput />
      <HowItWorks />
      <Pricing />
      {/* <Trial /> */}
      <Footer />
    </main>
  );
}