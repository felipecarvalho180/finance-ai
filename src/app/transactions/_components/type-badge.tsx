import { Badge } from "@/components/ui/badge";
import { CircleIcon } from "lucide-react";
import { TransactionType } from "@prisma/client";

export const TransactionTypeBadge = ({ type }: { type: TransactionType }) => {
  switch (type) {
    case "DEPOSIT":
      return (
        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
          <CircleIcon className="mr-2 fill-primary" size={10} />
          Ganho
        </Badge>
      );
    case "EXPENSE":
      return (
        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/10">
          <CircleIcon className="mr-2 fill-red-500" size={10} />
          Gasto
        </Badge>
      );
    case "INVESTMENT":
      return (
        <Badge className="bg-white/10 text-white hover:bg-white/10">
          <CircleIcon className="mr-2 fill-white" size={10} />
          Investimento
        </Badge>
      );
    default:
      return null;
  }
};
