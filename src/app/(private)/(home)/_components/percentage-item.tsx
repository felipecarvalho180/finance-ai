interface PercentageItemProps {
  icon: React.ReactNode;
  label: string;
  percentage: number;
}

const PercentageItem = ({ icon, label, percentage }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <p>{label}</p>
      </div>
      <span className="text-sm font-bold">{percentage}%</span>
    </div>
  );
};

export default PercentageItem;
