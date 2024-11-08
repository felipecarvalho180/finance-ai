"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  transactionSchema,
  type TransactionSchema,
} from "@/utils/validations/add-transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { formatMoney, formatMoneyToNumber } from "@/utils/utils/formats";
import { useState } from "react";
import { Transaction } from "@prisma/client";
import TransactionForm from "@/components/transaction-form";
import { editTransaction } from "@/actions/transactions/edit-transaction";

const EditTransactionButton = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      ...transaction,
      amount: formatMoney(Number(transaction.amount)),
    },
  });

  const onSubmit = async (data: TransactionSchema) => {
    try {
      await editTransaction({
        ...data,
        id: transaction.id,
        amount: formatMoneyToNumber(data.amount),
      });

      toast({
        title: "Transação adicionada com sucesso",
      });
      form.reset();
      setDialogIsOpen(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro ao adicionar transação",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={(open: boolean) => {
        setDialogIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <PencilIcon className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Transação</DialogTitle>
          <DialogDescription>Atualize as informações abaixo</DialogDescription>
        </DialogHeader>

        <TransactionForm form={form} onSubmit={onSubmit} mode="update" />
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionButton;
