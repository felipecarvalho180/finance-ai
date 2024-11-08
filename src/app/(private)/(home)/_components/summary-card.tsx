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
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <p
          className={
            size === "sm" ? "text-muted-foreground" : "text-white opacity-70"
          }
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={`font-bold ${size === "sm" ? "text-2xl" : "text-4xl"}`}>
          {formatMoney(amount)}
        </p>

        {size === "lg" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
