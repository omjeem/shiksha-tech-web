import AppDownload from "@/components/Landing/AppDownload";
import Contact from "@/components/Landing/Contact";
import Features from "@/components/Landing/Features";
import Hero from "@/components/Landing/Hero";
import Pricing from "@/components/Landing/Pricing";
import Testimonials from "@/components/Landing/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Features />
      <Testimonials />
      <AppDownload />
      <Pricing />
      <Contact />
    </main>
  );
}
