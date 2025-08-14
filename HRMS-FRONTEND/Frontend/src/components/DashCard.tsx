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
  "aria-label"?: string;
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
  "aria-label": ariaLabel,
}) => {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "dash-card",
        active ? "dash-card-active" : "dash-card-inactive",
        isClickable && "cursor-pointer hover:scale-[1.03] sm:hover:scale-105 hover:shadow-md",
        className
      )}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={ariaLabel || title || "Dashboard card"}
      onKeyDown={(e) => isClickable && e.key === "Enter" && onClick?.()}
    >
      {(icon || title) && (
        <div className="dash-title">
          {icon && <span className="dash-icon">{icon}</span>}
          {title}
        </div>
      )}
      {value !== undefined && (
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="dash-value">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          {(percentage || subText) && (
            <div
              className={clsx(
                "dash-subtext",
                active ? "dash-subtext-active" : "dash-subtext-inactive"
              )}
            >
              {percentage && <span>+{percentage}%</span>}
              {subText && (
                <span className="ml-1 text-gray-400 whitespace-nowrap">
                  {subText}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ;