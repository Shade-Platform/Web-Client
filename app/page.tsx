import { Navbar } from "@/components/Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Footer } from "./Footer";
import { Features } from "./Features";
import FAQ from "./FAQ";
import { Pricing } from "./Pricing"; // Ensure this import is correct
import Contact from "./Contact";

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
