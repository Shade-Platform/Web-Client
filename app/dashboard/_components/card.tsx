"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react"

interface DashboardCardProps {
  title: string;
  value: string | number;
  pastValue?: string | number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, pastValue }) => {

  // Format percentage change
  const percentageChange = pastValue ? (((Number(value) - Number(pastValue)) / Number(pastValue)) * 100) : 0;
  const percentageChangeFormatted = percentageChange.toFixed(2);
  const percentageChangeColor = percentageChange >= 0 ? "text-green-500" : "text-red-500";
  const percentageChangeSign = percentageChange > 0 ? "+" : "";
  const percentageChangeSymbol = percentageChange >= 0
    ? <TrendingUp style={{ display: "inline" }} />
    : <TrendingDown style={{ display: "inline" }} />;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="bottom-0">
        <div className="flex items-end gap-16">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </h1>
          {pastValue && (
            <span className={` flex gap-2 items-center text-sm ${percentageChangeColor}`}>
              {percentageChangeSymbol} {percentageChangeSign}{percentageChangeFormatted}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default DashboardCard;