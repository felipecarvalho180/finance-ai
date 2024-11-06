import { TransactionPaymentMethod } from "@prisma/client";
import { TransactionType } from "@prisma/client";
import { TransactionCategory } from "@prisma/client";
import { z } from "zod";

export const createTransactionSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
  amount: z.string().trim().min(1, { message: "O valor é obrigatório" }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatório",
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "A categoria é obrigatória",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatório",
  }),
  date: z.date({
    required_error: "A data é obrigatória",
  }),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;

export const defaultCreateTransactionValues: CreateTransactionSchema = {
  name: "",
  amount: "1",
  type: TransactionType.DEPOSIT,
  category: TransactionCategory.OTHER,
  paymentMethod: TransactionPaymentMethod.CASH,
  date: new Date(),
};
