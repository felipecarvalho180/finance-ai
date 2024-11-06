import { DialogClose, DialogFooter } from "./ui/dialog";

import { Form } from "./ui/form";
import { CustomForm } from "./form";
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/utils/constants/transactions";
import { type UseFormReturn } from "react-hook-form";
import { type TransactionSchema } from "@/utils/validations/add-transaction";
import { Button } from "./ui/button";

interface TransactionFormProps {
  form: UseFormReturn<TransactionSchema>;
  onSubmit: (data: TransactionSchema) => void;
  mode: "create" | "update";
}

const TransactionForm = ({ form, onSubmit, mode }: TransactionFormProps) => {
  return (
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
          <Button type="submit">
            {mode === "create" ? "Adicionar" : "Atualizar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TransactionForm;
