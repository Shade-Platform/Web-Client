// app/_components/Hero.tsx
import { Button, buttonVariants } from "@/components/ui/button";
import { Target, Wand2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const Hero = () => {
  return (
    <section className="container flex flex-col justify-center items-center py-20 md:py-32 gap-10 text-center max-w-2xl">
      <main className="text-5xl md:text-6xl font-bold">
        <h1 className="inline">
          <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
            Shade,
          </span>{" "}
          Web Hosting Platform
        </h1>
        {/* {" "} */}
        {/* for<br />
        <h2 className="inline">
          <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
            All
          </span>{" "}
          developers
        </h2> */}
      </main>

      <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
        Deploy your containers with secure zero trust access to your cloud resources.
      </p>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <a
          rel="noreferrer noopener"
          href="/signup"
        >
          <Button className="w-full md:w-auto">Get Started</Button>
        </a>

        <a
          rel="noreferrer noopener"
          href="https://github.com/Shade-Platform/"
          target="_blank"
          className={buttonVariants({ variant: "outline" })}
        >
          Github Repository
          <FaGithub className="ml-2 w-5 h-5" />
        </a>

        {/* Link to AccountWizard page */}
        <a href="/accountWizard">
        <Button
         variant="secondary"
        className="w-full md:w-auto bg-gray-400 hover:bg-gray-900 text-white transition-colors"
>
  <Wand2 className="mr-2 w-5 h-5" />
  I’m New – Show Me How
</Button>

        </a>
      </div>
    </section>
  );
};
