"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"

const chartData = [
  { month: "January", thisYear: 0 },
  { month: "February", thisYear: 20 },
  { month: "March", thisYear: 40 },
  { month: "April", thisYear: 60 },
  { month: "May", thisYear: 80 },
  { month: "June", thisYear: 100 },
]

const chartConfig = {
  thisYear: {
    label: "This Year",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const getColorForValue = (value: number): string => {
  const red = Math.min(255, Math.floor((1 - value / 100) * 255));
  const green = Math.min(255, Math.floor((value / 100) * 255));
  return `rgb(${red}, ${green}, 0)`;
};

const Chart: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Card className="w-full max-w-4xl h-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="desktopGradient" x1="0" y1="0" x2="0" y2="1">
                {chartData.map((data, index) => (
                  <stop
                    key={index}
                    offset={`${(index / (chartData.length - 1)) * 100}%`}
                    stopColor={getColorForValue(data.thisYear)}
                  />
                ))}
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="thisYear"
              type="natural"
              stroke="url(#desktopGradient)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default Chart;