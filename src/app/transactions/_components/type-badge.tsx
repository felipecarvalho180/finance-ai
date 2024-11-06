import { Badge } from "@/components/ui/badge";
import { CircleIcon } from "lucide-react";
import { TransactionType } from "@prisma/client";
import { TRANSACTION_TYPE_LABEL } from "@/utils/constants/transactions";

export const TransactionTypeBadge = ({ type }: { type: TransactionType }) => {
  switch (type) {
    case TransactionType.DEPOSIT:
      return (
        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
          <CircleIcon className="mr-2 fill-primary" size={10} />
          {TRANSACTION_TYPE_LABEL.DEPOSIT}
        </Badge>
      );
    case TransactionType.EXPENSE:
      return (
        <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/10">
          <CircleIcon className="mr-2 fill-red-500" size={10} />
          {TRANSACTION_TYPE_LABEL.EXPENSE}
        </Badge>
      );
    case TransactionType.INVESTMENT:
      return (
        <Badge className="bg-white/10 text-white hover:bg-white/10">
          <CircleIcon className="mr-2 fill-white" size={10} />
          {TRANSACTION_TYPE_LABEL.INVESTMENT}
        </Badge>
      );
    default:
      return null;
  }
};
