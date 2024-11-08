import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import { formatMoney, formatShortDate } from "@/utils/utils/formats";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/utils/constants/transactions";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getPriceColor = (transaction: Transaction) => {
    switch (transaction.type) {
      case TransactionType.EXPENSE:
        return "text-red-500";
      case TransactionType.INVESTMENT:
        return "text-white";
      case TransactionType.DEPOSIT:
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getAmountPrefix = (transaction: Transaction) => {
    return transaction.type === TransactionType.DEPOSIT ? "+" : "-";
  };

  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="relative size-10 rounded-[10px] bg-white/[0.03]">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  alt={transaction.paymentMethod}
                  fill
                  className="p-[10px]"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-bold">{transaction.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatShortDate(transaction.date)}
                </span>
              </div>
            </div>
            <span className={`${getPriceColor(transaction)} text-sm font-bold`}>
              {getAmountPrefix(transaction)}{" "}
              {formatMoney(Number(transaction.amount))}
            </span>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
