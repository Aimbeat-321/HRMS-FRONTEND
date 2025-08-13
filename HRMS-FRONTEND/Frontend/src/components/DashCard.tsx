import React from "react";

type DashCardProps = {
  icon?: React.ReactNode;
  title?: string;
  value?: number;
  active?: boolean;
  percentage?: string;
  subText?: string;
};

const DashCard: React.FC<DashCardProps> = ({
  icon,
  title,
  value,
  active = false,
  percentage,
  subText,
}) => {
  return (
    <div
      className={`flex flex-col justify-between p-5 rounded-xl shadow-sm min-w-[180px] transition-colors duration-200
      ${active ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Title + Icon */}
      <div className="flex items-center gap-2 text-sm font-medium opacity-80">
        {icon && <span className="text-lg">{icon}</span>}
        {title}
      </div>

      {/* Value */}
      <div className="mt-2 text-3xl font-semibold">{value}</div>

      {/* Percentage */}
      <div
        className={`text-sm mt-1 ${
          active ? "text-blue-400" : "text-blue-600"
        }`}
      >
        {percentage && <span>{percentage}</span>}
        {subText && <span className="ml-1">{subText}</span>}
      </div>
    </div>
  );
};

export default DashCard;
