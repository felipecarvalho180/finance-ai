"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  transactionSchema,
  defaultAddTransactionValues,
  type TransactionSchema,
} from "@/utils/validations/add-transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addTransaction } from "@/actions/transactions/add-transaction";
import { toast } from "@/hooks/use-toast";
import { formatMoneyToNumber } from "@/utils/utils/formats";
import { useState } from "react";
import TransactionForm from "./transaction-form";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultAddTransactionValues,
  });

  const onSubmit = async (data: TransactionSchema) => {
    try {
      await addTransaction({
        ...data,
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
        <Button className="rounded-full font-bold">
          Adicionar Transação
          <ArrowDownUpIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <TransactionForm form={form} onSubmit={onSubmit} mode="create" />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
