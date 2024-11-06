"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../_components/type-badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  TRANSACTION_CATEGORY_LABEL,
  TRANSACTION_PAYMENT_METHOD_LABEL,
} from "@/utils/constants/transactions";
import { formatDate, formatMoney } from "@/utils/utils/formats";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => <TransactionTypeBadge type={row.original.type} />,
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABEL[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABEL[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      formatDate(new Date(transaction.date)),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      formatMoney(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <div className="space-x-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PencilIcon className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon className="size-4" />
        </Button>
      </div>
    ),
  },
];
