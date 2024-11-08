interface PercentageItemProps {
  icon: React.ReactNode;
  label: string;
  percentage: number;
}

const PercentageItem = ({ icon, label, percentage }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-[10px] bg-white/[0.03] p-2">{icon}</div>
        <p>{label}</p>
      </div>
      <span className="text-sm font-bold">{percentage}%</span>
    </div>
  );
};

export default PercentageItem;
