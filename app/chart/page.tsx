'use client'
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
    metric: string;
    value: number;
}

const dataQ1: ChartData[] = [
    { metric: "Revenue", value: 500 },
    { metric: "PAT", value: 200 },
    { metric: "Net", value: 300 },
];

const dataQ2: ChartData[] = [
    { metric: "Revenue", value: 600 },
    { metric: "PAT", value: 250 },
    { metric: "Net", value: 350 },
];

const comparisonData = [
    { metric: "Revenue", Q1: 500, Q2: 600 },
    { metric: "PAT", Q1: 200, Q2: 250 },
    { metric: "Net", Q1: 300, Q2: 350 },
];

const chartConfig = {
    value: {
        label: "Amount ($)",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const FinancialChart = ({ title, data, color }: { title: string; data: ChartData[]; color: string }) => {
    return (
        <Card className="w-full bg-[#212121] text-white border border-[#696969]">
            <CardHeader>
                <CardTitle className="text-white">{title}</CardTitle>
                <CardDescription className="text-gray-400">Revenue, PAT, and Net Profit</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} stroke="#444" />
                        <XAxis
                            dataKey="metric"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tick={{ fill: "#fff" }}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm text-gray-300">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this quarter <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="leading-none">Financial performance for this quarter</div>
            </CardFooter>
        </Card>
    );
};

const ComparisonChart = () => {
    return (
        <Card className="w-full bg-[#212121] text-white border border-[#696969]">
            <CardHeader>
                <CardTitle className="text-white">Q1 vs. Q2 Comparison</CardTitle>
                <CardDescription className="text-gray-400">Comparing Revenue, PAT, and Net Profit</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        Q1: { label: "Q1", color: "hsl(var(--chart-1))" },
                        Q2: { label: "Q2", color: "hsl(var(--chart-2))" },
                    }}
                >
                    <BarChart accessibilityLayer data={comparisonData}>
                        <CartesianGrid vertical={false} stroke="#444" />
                        <XAxis
                            dataKey="metric"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tick={{ fill: "#fff" }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="Q1" fill="hsl(var(--chart-1))" radius={4} />
                        <Bar dataKey="Q2" fill="hsl(var(--chart-2))" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm text-gray-300">
                <div className="flex gap-2 font-medium leading-none">
                    Financial performance trend <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div className="leading-none">Q1 vs Q2 financials comparison</div>
            </CardFooter>
        </Card>
    );
};

export default function ChartComponent() {
    return (
        <div className="w-full bg-[#212121] p-4">
            {/* Desktop: Side-by-side charts */}
            <div className="hidden md:flex flex-wrap justify-center gap-6">
                <div className="w-1/3">
                    <FinancialChart title="Q1 Financials" data={dataQ1} color="hsl(var(--chart-1))" />
                </div>
                <div className="w-1/3">
                    <FinancialChart title="Q2 Financials" data={dataQ2} color="hsl(var(--chart-2))" />
                </div>
                <div className="w-1/3">
                    <ComparisonChart />
                </div>
            </div>

            {/* Mobile: One chart at a time */}
            <div className="md:hidden space-y-6">
                <FinancialChart title="Q1 Financials" data={dataQ1} color="hsl(var(--chart-1))" />
                <FinancialChart title="Q2 Financials" data={dataQ2} color="hsl(var(--chart-2))" />
                <ComparisonChart />
            </div>
        </div>
    );
}
