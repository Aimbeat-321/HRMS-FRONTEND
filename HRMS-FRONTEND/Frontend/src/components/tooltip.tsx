import React, { ReactNode } from "react";

type TooltipDirection = "top" | "bottom" | "left" | "right";

type TooltipButtonProps = {
  message: string;
  direction?: TooltipDirection;
  children?: ReactNode;
};

const TooltipButton: React.FC<TooltipButtonProps> = ({
  message,
  direction = "top",
  children,
}) => {
  const tooltipPosition: Record<TooltipDirection, string> = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  const arrowPosition: Record<TooltipDirection, string> = {
    top: "left-1/2 -bottom-1 -translate-x-1/2",
    bottom: "left-1/2 -top-1 -translate-x-1/2",
    left: "top-1/2 -right-1 -translate-y-1/2",
    right: "top-1/2 -left-1 -translate-y-1/2",
  };

  const isVertical = direction === "top" || direction === "bottom";

  return (
    <div
      className={`flex w-[34px] h-[18px] pt-[4px] pr-[10px] pb-[4px] pl-[10px]  ${
        isVertical ? "flex-col" : "flex-row"
      } items-center space-${isVertical ? "y" : "x"}-2 mt-10`}
    >
      <div className="relative group inline-block">
        {/* Tooltip */}
        <div
          className={`absolute ${tooltipPosition[direction]} bg-black text-white text-xs font-semibold py-1 px-2 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity z-10`}
        >
          <label className="relative z-10">{message}</label>
          <div
            className={`absolute w-[15.82px] h-[12px] rounded-[1px] bg-black rotate-45 ${arrowPosition[direction]}`}
          />
        </div>

        {/* Trigger Component */}
        {children || "+"}
      </div>
    </div>
  );
};

export default TooltipButton;
