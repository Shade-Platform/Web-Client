import { Statistics } from "./Statistics";
import { Target } from "lucide-react";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Target />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Company
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Shade is a secure cloud service provider focused on privacy, offering a simple, affordable, and reliable platform for developers and small businesses. Built on a zero-trust model, it ensures verified interactions, strong user isolation, and flexible pricing. With an intuitive interface and a live demo showcasing its scalability and security, Shade aims to redefine privacy-first cloud services in emerging markets.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
