"use client"


import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive area chart"


const chartConfig = {
  time: {
    label: "Time",
  },
  cpuUsage: {
    label: "CPU",
    color: "var(--chart-1)",
  },
  memoryUsage: {
    label: "Memory",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive({ chartData, title }: { chartData: { time: string, cpuUsage: number, memoryUsage: number }[], title: string }) {
  return (
    <Card className="w-full max-w-4xl h-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="cpuUsage"
              type="monotone"
              stroke="var(--color-cpuUsage)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="memoryUsage"
              type="monotone"
              stroke="var(--color-memoryUsage)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

