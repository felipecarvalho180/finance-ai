import { isMatch } from "date-fns";
import MonthSelect from "./_components/month-select";
import SummaryCards from "./_components/summary-cards";
import { redirect } from "next/navigation";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboardData } from "@/actions/transactions/get-dashboard-data";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";

export default async function Home({
  searchParams,
}: {
  searchParams: { month: string };
}) {
  const monthIsInvalid =
    !searchParams.month || !isMatch(searchParams.month, "MM");

  if (monthIsInvalid) {
    const currentMonth = new Date().getMonth() + 1;
    return redirect(`/?month=${currentMonth}`);
  }

  const dashboardData = await getDashboardData(searchParams.month);

  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MonthSelect />
      </div>
      <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
        <div className="flex flex-col gap-6 overflow-hidden">
          <SummaryCards {...dashboardData} />
          <div className="grid h-full grid-cols-3 gap-6 overflow-hidden">
            <TransactionsPieChart {...dashboardData} />
            <ExpensesPerCategory {...dashboardData} />
          </div>
        </div>
        <LastTransactions {...dashboardData} />
      </div>
    </div>
  );
}
