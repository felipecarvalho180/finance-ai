"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getInvestmentsTotal(month: string) {
  const { userId } = await auth();

  if (!month) {
    throw new Error("Month is required");
  }

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const transactions = await db.transaction.aggregate({
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
  });

  return Number(transactions?._sum?.amount) ?? 0;
}
