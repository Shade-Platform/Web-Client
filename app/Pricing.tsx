import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number | null;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Free",
    popular: PopularPlanType.NO,
    price: 0,
    description: "Essential resources to get started with minimal infrastructure.",
    buttonText: "Get Started",
    benefitList: [
      "2 Container Instances",
      "2GB Storage",
      "Daily Backups",
      "Basic Monitoring",
      "Community Support",
      "48h Response Time",
    ],
  },
  {
    title: "Premium",
    popular: PopularPlanType.YES,
    price: 500,
    description: "Enhanced performance and support for growing teams.",
    buttonText: "Start Free Trial",
    benefitList: [
      "10 Containers",
      "5GB Storage",
      "Hourly Backups",
      "Advanced Monitoring",
      "Priority Support",
      "24h Response Time",
      "Audit Logging",
      "Role-Based Access",
    ],
  },
  {
    title: "Enterprise",
    popular: PopularPlanType.NO,
    price: 1500,
    description: "Scalable and secure infrastructure tailored for enterprises.",
    buttonText: "Contact Us",
    benefitList: [
      "Dedicated Resources",
      "Custom Storage Limit",
      "Real-time Backups",
      "Enterprise Support",
      "4h Response Time SLA",
      "Advanced Security",
      "Custom Integration",
      "Compliance Reports",
    ],
  },
  {
    title: "Custom",
    popular: PopularPlanType.NO,
    price: null,
    description: "Tailored solutions for complex and specialized requirements.",
    buttonText: "Request a Demo",
    benefitList: [
      "Custom Infrastructure",
      "Dedicated Support Team",
      "Custom SLA Terms",
      "Compliance Package",
      "On-premise Options",
      "Custom Security",
      "Training & Workshops",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Choose the right plan that fits your team’s scale and needs.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingList.map((pricing) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-2 border-primary"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                {pricing.price !== null ? (
                  <>
                    <span className="text-3xl font-bold">EGP {pricing.price}</span>
                    <span className="text-muted-foreground"> /month</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">Custom pricing</span>
                )}
              </div>
              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter>
              <ul className="space-y-4">
                {pricing.benefitList.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <Check className="text-green-500 mt-1" />
                    <span className="ml-2">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
