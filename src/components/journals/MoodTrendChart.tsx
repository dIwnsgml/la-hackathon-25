"use client";

import { TrendingUp } from "lucide-react";
import { DateTime } from "luxon";
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

interface MoodTrendChartProps {
  moodScores: { date: string; mood: number }[]; // date in YYYY-MM-DD
}

const chartConfig = {
  mood: {
    label: "Mood Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const MoodTrendChart: React.FC<MoodTrendChartProps> = ({ moodScores }) => {
  // Build a date → mood map for fast lookup
  const moodMap = new Map(moodScores.map((d) => [d.date, d.mood]));

  // Generate mood data for last 7 days
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = DateTime.now().minus({ days: 6 - i });
    const key = date.toFormat("yyyy-MM-dd");
    return {
      date: date.toFormat("ccc"), // Short weekday (Mon, Tue, etc.)
      mood: moodMap.get(key) ?? 50, // Default to 50
    };
  });

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Mood Trend</CardTitle>
        <CardDescription>
          Average mood score for the past 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={last7Days}
            margin={{ left: 12, right: 12 }}
            height={300}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mood"
              type="natural"
              fill="var(--color-mood)"
              fillOpacity={0.4}
              stroke="var(--color-mood)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground">
              {DateTime.now().minus({ days: 6 }).toFormat("LLL dd")} -{" "}
              {DateTime.now().toFormat("LLL dd, yyyy")}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MoodTrendChart;
