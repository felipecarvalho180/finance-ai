import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABEL } from "@/utils/constants/transactions";
import { TotalExpensesPerCategory } from "@/utils/types/transactions";

interface ExpensesPerCategoryProps {
  totalExpensesPerCategory: TotalExpensesPerCategory[];
}

const ExpensesPerCategory = ({
  totalExpensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle>Gastos por categoria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {totalExpensesPerCategory.map(
          ({ category, totalAmount, percentageOfTotal }) => (
            <div key={category} className="space-y-2">
              <div className="flex w-full items-center justify-between">
                <span className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABEL[category]}
                </span>
                <span className="text-sm font-bold">{totalAmount}%</span>
              </div>

              <Progress value={percentageOfTotal} />
            </div>
          ),
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
