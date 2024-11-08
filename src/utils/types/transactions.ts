import { TransactionType } from "@prisma/client";

export type TransactionPercentage = {
  [key in TransactionType]: number;
};
