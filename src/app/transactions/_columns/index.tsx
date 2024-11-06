"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionTypeBadge } from "../_components/type-badge";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

const TRANSACTION_CATEGORY_LABEL = {
  HOUSING: "Habitação",
  TRANSPORTATION: "Transporte",
  FOOD: "Alimentação",
  ENTERTAINMENT: "Lazer",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  OTHER: "Outros",
  UTILITY: "Utilidades",
  SALARY: "Salário",
};

const TRANSACTION_PAYMENT_METHOD_LABEL = {
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  BANK_TRANSFER: "Transferência Bancária",
  PIX: "PIX",
  BANK_SLIP: "Boleto",
  OTHER: "Outro",
};

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
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
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
