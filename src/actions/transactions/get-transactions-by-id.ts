"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getTransactionsById() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });

  return transactions;
}
