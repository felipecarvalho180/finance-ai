"use server";

import { db } from "@/lib/prisma";
import {
  TransactionSchemaServer,
  transactionSchemaServer,
} from "@/utils/validations/add-transaction";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addTransaction(data: TransactionSchemaServer) {
  transactionSchemaServer.parse(data);
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.create({ data: { ...data, userId } });
  revalidatePath("/transactions");
}
