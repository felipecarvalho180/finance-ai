import { TransactionCategory, TransactionType } from "@prisma/client";

export type TransactionPercentage = {
  [key in TransactionType]: number;
};

export interface TotalExpensesPerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
