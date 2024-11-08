import { isMatch } from "date-fns";
import MonthSelect from "./_components/month-select";
import SummaryCards from "./_components/summary-cards";
import { redirect } from "next/navigation";
import { TransactionsPieChart } from "./_components/transactions-pie-chart";
import { getDashboardData } from "@/actions/transactions/get- dashboard-data";

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
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MonthSelect />
      </div>
      <div className="grid grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-6">
          <SummaryCards {...dashboardData} />
          <div className="grid grid-cols-3 gap-6">
            <TransactionsPieChart {...dashboardData} />
          </div>
        </div>
      </div>
    </div>
  );
}
