import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "@/components/add-transaction-button";
import { getTransactionsById } from "@/actions/transactions/get-transactions-by-id";
import { ScrollArea } from "@/components/ui/scroll-area";

const TransactionsPage = async () => {
  const transactions = await getTransactionsById();

  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <ScrollArea className="h-full">
        <DataTable columns={transactionsColumns} data={transactions} />
      </ScrollArea>
    </div>
  );
};

export default TransactionsPage;
