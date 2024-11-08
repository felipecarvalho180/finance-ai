"use server";

import { db } from "@/lib/prisma";
import { TransactionPercentage } from "@/utils/types/transactions";
import { auth } from "@clerk/nextjs/server";
import { TransactionType } from "@prisma/client";

export async function getDashboardData(month: string) {
  const { userId } = await auth();

  if (!month) {
    throw new Error("Month is required");
  }

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          userId,
          type: "DEPOSIT",
          date: {
            gte: new Date(new Date().getFullYear(), Number(month) - 1, 1),
            lte: new Date(new Date().getFullYear(), Number(month), 31),
          },
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          userId,
          type: "EXPENSE",
          date: {
            gte: new Date(new Date().getFullYear(), Number(month) - 1, 1),
            lte: new Date(new Date().getFullYear(), Number(month), 31),
          },
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          userId,
          type: "INVESTMENT",
          date: {
            gte: new Date(new Date().getFullYear(), Number(month) - 1, 1),
            lte: new Date(new Date().getFullYear(), Number(month), 31),
          },
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where: {
          userId,
          date: {
            gte: new Date(new Date().getFullYear(), Number(month) - 1, 1),
            lte: new Date(new Date().getFullYear(), Number(month), 31),
          },
        },
        _sum: {
          amount: true,
        },
      })
    )?._sum?.amount ?? 0,
  );

  const balance = investmentsTotal + depositsTotal - expensesTotal;
  const typesPercentage: TransactionPercentage = {
    [TransactionType.DEPOSIT]: Math.round(
      (depositsTotal / transactionsTotal) * 100,
    ),
    [TransactionType.EXPENSE]: Math.round(
      (expensesTotal / transactionsTotal) * 100,
    ),
    [TransactionType.INVESTMENT]: Math.round(
      (investmentsTotal / transactionsTotal) * 100,
    ),
  };

  return {
    depositsTotal,
    expensesTotal,
    investmentsTotal,
    balance,
    typesPercentage,
  };
}
