import AddTransactionButton from "@/components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatMoney } from "@/utils/utils/formats";

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: number;
  size?: "sm" | "lg";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "sm",
}: SummaryCardProps) => {
  return (
    <Card className={size === "lg" ? "bg-white/5" : ""}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <div className="rounded-[10px] bg-white/[0.03] p-2">{icon}</div>
        <span
          className={
            size === "sm" ? "text-muted-foreground" : "text-white opacity-70"
          }
        >
          {title}
        </span>
      </CardHeader>
      <CardContent className="flex justify-between">
        <span
          className={`font-bold ${size === "sm" ? "text-2xl" : "text-4xl"}`}
        >
          {formatMoney(amount)}
        </span>

        {size === "lg" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
