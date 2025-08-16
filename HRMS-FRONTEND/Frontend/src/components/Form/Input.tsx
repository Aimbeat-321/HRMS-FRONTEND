import React from "react";
import { FiMail } from "react-icons/fi";

type InputProps = {
  placeholder?: string;
  icon?: React.ReactNode;   // 👈 allow any icon
  isDisabled?: boolean;
  error?: boolean;
  className?: string;       // optional extra classes
};

const InputField: React.FC<InputProps> = ({
  placeholder = "Write Here",
  icon,
  isDisabled = false,
  error = false,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center min-h-[60px]  p-[20px] border 
        ${error ? "border-red-400" : "border-[#E6E6E6]"} 
        rounded-[16px] bg-white 
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
    >
      {/* Icon */}
      {icon && <span className="text-gray-500 text-xl">{icon}</span>}

      {/* Divider */}
      {icon && <div className="h-6 w-px bg-gray-300 mx-4"></div>}

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        disabled={isDisabled}
        aria-label={placeholder}
        className="flex-1 bg-transparent outline-none text-[#333] placeholder-[#808080] text-base"
      />
    </div>
  );
};

export default InputField;
