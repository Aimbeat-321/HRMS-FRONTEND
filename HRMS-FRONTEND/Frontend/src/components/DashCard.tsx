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
         p-3 sm:p-4 md:p-5 min-h-[120px]
         rounded-2xl sm:rounded-3xl 
         shadow-sm cursor-pointer 
         min-w-[140px] sm:min-w-[160px] md:min-w-[180px] 
         bg-white dark:bg-primary-black
         transition-all duration-200 
         hover:scale-[1.03] sm:hover:scale-105 
         hover:shadow-md hover:bg-primary-black 
         text-primary-black dark:text-white  group
         hover:text-white dark:hover:text-white`,
        className
      )}
    >
      {/* Title + Icon */}
      <div className="flex items-center gap-1  sm:gap-2 text-xs sm:text-sm md:text-base font-medium opacity-80 dark:opacity-90">
        {icon && (
          <span className="text-base group-hover:text-secondary-blue sm:text-lg md:text-xl">{icon}</span>
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
            "text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 text-secondary-blue dark:text-blue-300 dark:hover:text-blue-500"
          )}
        >
          {percentage && <span>+{percentage}%</span>}
          {subText && (
            <span className="ml-1 text-gray-400 dark:text-gray-300 whitespace-nowrap">
              {subText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashCard;