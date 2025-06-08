import { Navbar } from "@/components/Navbar";
import { Hero } from "./_components/Hero";
import { About } from "./_components/About";
import { Footer } from "./_components/Footer";
import { Features } from "./_components/Features";
import FAQ from "./_components/FAQ";
import { Pricing } from "./_components/Pricing"; // Ensure this import is correct
import Contact from "./_components/Contact";

const Page: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-8">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <FAQ />
      <Pricing /> {/* Pricing component here */}
      <Contact />
      {/* <Footer /> */}
    </div>
  );
};

export default Page;
