import { Navbar } from "@/components/Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Footer } from "./Footer";
import { Features } from "./Features";
import  FAQ  from "./FAQ";
import { Pricing } from "./Pricing";
import Contact from  "./Contact"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-8">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <FAQ />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}
