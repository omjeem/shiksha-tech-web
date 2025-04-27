import AppDownload from "@/components/Landing/AppDownload";
import Contact from "@/components/Landing/Contact";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import Hero from "@/components/Landing/Hero";
import Navbar from "@/components/Landing/Navbar";
import Pricing from "@/components/Landing/Pricing";
import Testimonials from "@/components/Landing/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <AppDownload />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
