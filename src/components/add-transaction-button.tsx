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
  createTransactionSchema,
  defaultCreateTransactionValues,
  type CreateTransactionSchema,
} from "@/utils/validations/create-transaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { CustomForm } from "./form";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/utils/constants/transactions";

const AddTransactionButton = () => {
  const form = useForm<CreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: defaultCreateTransactionValues,
  });

  const onSubmit = (data: CreateTransactionSchema) => {
    console.log(data);
  };

  return (
    <Dialog onOpenChange={(open) => !open && form.reset()}>
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
