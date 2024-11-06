import { TransactionPaymentMethod } from "@prisma/client";
import { TransactionType } from "@prisma/client";
import { TransactionCategory } from "@prisma/client";
import { z } from "zod";

export type AddTransactionSchema = z.infer<typeof addTransactionSchema>;
export type AddTransactionSchemaServer = z.infer<
  typeof addTransactionSchemaServer
>;

export const defaultAddTransactionValues: AddTransactionSchema = {
  name: "",
  amount: "",
  type: TransactionType.DEPOSIT,
  category: TransactionCategory.OTHER,
  paymentMethod: TransactionPaymentMethod.CASH,
  date: new Date(),
};

export const addTransactionSchema = z.object({
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

export const addTransactionSchemaServer = z.object({
  name: z.string().trim().min(1),
  amount: z.number().positive(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date(),
});