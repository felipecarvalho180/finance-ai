"use server";

import { db } from "@/lib/prisma";
import {
  TransactionSchemaServer,
  transactionSchemaServer,
} from "@/utils/validations/add-transaction";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function editTransaction(
  data: TransactionSchemaServer & { id: string },
) {
  transactionSchemaServer.parse(data);
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.update({
    where: { id: data.id },
    data: { ...data, userId },
  });
  revalidatePath("/transactions");
}
