import { isMatch } from "date-fns";
import MonthSelect from "./_components/month-select";
import SummaryCards from "./_components/summary-cards";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { month: string };
}) {
  const monthIsInvalid =
    !searchParams.month || !isMatch(searchParams.month, "MM");

  if (monthIsInvalid) {
    return redirect("/?month=1");
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <MonthSelect />
      </div>
      <SummaryCards month={searchParams.month} />
    </div>
  );
}
