import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  // image: string;
}

const features: FeatureProps[] = [
  {
    title: "Responsive Design",
    description:
      "Our dashboard is fully responsive, ensuring a seamless experience across all devices.",
    // image: image4,
  },
  {
    title: "Intuitive user interface",
    description:
      "Just fill a form to upload your own container images and immediately start using them.",
    // image: image3,
  },
  {
    title: "Private and secure",
    description:
      "Your data is private and secure. We do not share your data with third parties.",
    // image: image,
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Open source",
  "Zero configuration",
  "Zero Trust",
  "Reviews",
  "Features",
  "Pricing",
  "Contact form",
  "Our team",
  "Responsive design",
  "Minimalist",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Great Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Target />
              {/* <img
                                src={image}
                                alt="About feature"
                                className="w-[200px] lg:w-[300px] mx-auto"
                            /> */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};