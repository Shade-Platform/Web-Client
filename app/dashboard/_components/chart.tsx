"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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

const chartConfig = {
  usage: {
    label: "% Usage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const getColorForValue = (value: number): string => {
  const red = Math.min(255, Math.floor((value / 100)) * 255);
  const green = Math.min(255, Math.floor((1 - (value / 100)) * 255));
  return `rgb(${red}, ${green}, 0)`;
};

const Chart: React.FC<{ chartData: { time: string, usage: number }[], title: string }> = ({ chartData, title }) => {
  return (
    <Card className="w-full max-w-4xl h-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>Showing live usage per minute</CardDescription> */}
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
                    offset={chartData.length <= 1? "50%" : `${(index / (chartData.length - 1)) * 100}%`}
                    stopColor={getColorForValue(data.usage)}
                  />
                ))}
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              domain={[0, 100]}
              tickCount={6}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="usage"
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