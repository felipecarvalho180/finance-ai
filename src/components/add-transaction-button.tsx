"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  addTransactionSchema,
  defaultAddTransactionValues,
  type AddTransactionSchema,
} from "@/utils/validations/add-transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { CustomForm } from "./form";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/utils/constants/transactions";
import { addTransaction } from "@/actions/transactions/add-transaction";
import { toast } from "@/hooks/use-toast";
import { formatMoneyToNumber } from "@/utils/utils/formats";
import { useState } from "react";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<AddTransactionSchema>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: defaultAddTransactionValues,
  });

  const onSubmit = async (data: AddTransactionSchema) => {
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
      onOpenChange={(open) => {
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CustomForm.Input
              control={form.control}
              name="name"
              label="Nome"
              placeholder="Digite o nome da transação"
            />

            <CustomForm.MoneyInput
              control={form.control}
              name="amount"
              label="Valor"
              placeholder="Digite o valor da transação"
            />

            <CustomForm.Select
              control={form.control}
              name="type"
              label="Tipo"
              placeholder="Selecione o tipo da transação"
              options={TRANSACTION_TYPE_OPTIONS}
            />

            <CustomForm.Select
              control={form.control}
              name="category"
              label="Categoria"
              placeholder="Selecione a categoria da transação"
              options={TRANSACTION_CATEGORY_OPTIONS}
            />

            <CustomForm.Select
              control={form.control}
              name="paymentMethod"
              label="Método de Pagamento"
              placeholder="Selecione o método de pagamento"
              options={TRANSACTION_PAYMENT_METHOD_OPTIONS}
            />

            <CustomForm.DatePicker
              control={form.control}
              name="date"
              label="Data"
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Adicionar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
