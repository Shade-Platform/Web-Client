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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartData = [
  { month: "January", thisYear: 0, lastYear: 100 },
  { month: "February", thisYear: 20, lastYear: 80 },
  { month: "March", thisYear: 40, lastYear: 60 },
  { month: "April", thisYear: 60, lastYear: 40 },
  { month: "May", thisYear: 80, lastYear: 20 },
  { month: "June", thisYear: 100, lastYear: 0 },
]

const chartConfig = {
  thisYear: {
    label: "This Year",
    color: "red",
  },
  mobile: {
    label: "Last Year",
    color: "blue",
  },
} satisfies ChartConfig

const getColorForValue = (value: number): string => {
  const red = Math.min(255, Math.floor((1 - value / 100) * 255));
  const green = Math.min(255, Math.floor((value / 100) * 255));
  return `rgb(${red}, ${green}, 0)`;
};

const Chart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU Usage</CardTitle>
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
              <linearGradient id="mobileGradient" x1="0" y1="0" x2="0" y2="1">
                {chartData.map((data, index) => (
                  <stop
                    key={index}
                    offset={`${(index / (chartData.length - 1)) * 100}%`}
                    stopColor={getColorForValue(data.lastYear)}
                  />
                ))}
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <YAxis 
              domain={[0, 100]}
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
              tickCount={5}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="thisYear"
              type="monotone"
              stroke="url(#desktopGradient)"
              strokeWidth={2}
              dot={false}
            />
            {/* <Line
              dataKey="mobile"
              type="monotone"
              stroke="url(#mobileGradient)"
              strokeWidth={2}
              dot={false}
            /> */}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;