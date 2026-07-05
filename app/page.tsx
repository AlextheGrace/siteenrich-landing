import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import BeforeAfter from "@/components/BeforeAfter";
import PrivacyNote from "@/components/PrivacyNote";
import CsvUpload from "@/components/CsvUpload";
import SampleOutput from "@/components/SampleOutput";
import BuiltFor from "@/components/BuiltFor";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Hero />
      <TrustBar />
      <BeforeAfter />
      <PrivacyNote />
      <CsvUpload />
      <SampleOutput />
      <BuiltFor />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}