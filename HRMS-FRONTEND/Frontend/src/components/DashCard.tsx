import React from "react";
import clsx from "clsx";

type DashCardProps = {
  icon?: React.ReactNode;
  title?: string;
  value?: number | string;
  active?: boolean;
  percentage?: string;
  subText?: string;
  onClick?: () => void;
  className?: string;
};

const DashCard: React.FC<DashCardProps> = ({
  icon,
  title,
  value,
  active = false,
  percentage,
  subText,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        `flex flex-col justify-between 
         p-3 sm:p-4 md:p-5 
         rounded-2xl sm:rounded-3xl 
         shadow-sm cursor-pointer 
         min-w-[140px] sm:min-w-[160px] md:min-w-[180px] 
         transition-all duration-200 
         hover:scale-[1.03] sm:hover:scale-105 
         hover:shadow-md`,
        active ? "bg-gray-900 text-white" : "bg-white text-gray-900",
        className
      )}
    >
      {/* Title + Icon */}
      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-medium opacity-80">
        {icon && (
          <span className="text-base sm:text-lg md:text-xl">{icon}</span>
        )}
        {title}
      </div>

      {/* Value + Percentage */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-semibold">
          {value}
        </div>

        {/* Percentage & Subtext */}
        <div
          className={clsx(
            "text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1",
            active ? "text-blue-400" : "text-blue-600"
          )}
        >
          {percentage && <span>+{percentage}%</span>}
          {subText && (
            <span className="ml-1 text-gray-400 whitespace-nowrap">
              {subText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashCard;
