"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@prisma/client";
import { useMemo } from "react";
import { TransactionPercentage } from "@/utils/types/transactions";
import PercentageItem from "./percentage-item";
import { PiggyBankIcon, TrendingDownIcon } from "lucide-react";
import { TrendingUpIcon } from "lucide-react";

const chartConfig = {
  [TransactionType.DEPOSIT]: {
    label: "Depósitos",
    color: "#55b02e",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#f04134",
  },
  [TransactionType.INVESTMENT]: {
    label: "Investimentos",
    color: "#FFFFFF",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  depositsTotal: number;
  expensesTotal: number;
  investmentsTotal: number;
  typesPercentage: TransactionPercentage;
}

export function TransactionsPieChart({
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  typesPercentage,
}: TransactionsPieChartProps) {
  const chartData = useMemo(() => {
    return [
      {
        type: TransactionType.DEPOSIT,
        amount: depositsTotal,
        fill: `var(--color-${TransactionType.DEPOSIT})`,
      },
      {
        type: TransactionType.EXPENSE,
        amount: expensesTotal,
        fill: `var(--color-${TransactionType.EXPENSE})`,
      },
      {
        type: TransactionType.INVESTMENT,
        amount: investmentsTotal,
        fill: `var(--color-${TransactionType.INVESTMENT})`,
      },
    ];
  }, [depositsTotal, expensesTotal, investmentsTotal]);

  return (
    <Card className="flex flex-col p-12">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-green-500" />}
            label="Receita"
            percentage={typesPercentage[TransactionType.DEPOSIT]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            label="Despesas"
            percentage={typesPercentage[TransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} className="text-white" />}
            label="Investimentos"
            percentage={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
