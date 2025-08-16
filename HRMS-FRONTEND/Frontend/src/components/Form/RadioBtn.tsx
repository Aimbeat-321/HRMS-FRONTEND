import React, { ReactNode } from "react";

type RadioBtnProps = {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
};

const RadioBtn: React.FC<RadioBtnProps> = ({ selected, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full focus:outline-none transition-colors ${
        selected
          ? "text-green-500 font-semibold"
          : "text-gray-800 font-semibold"
      }`}
    >
      <div
        className={`w-[16px] h-[16px] rounded-full flex items-center justify-center border-2 transition-all ${
          selected
            ? "bg-[#52CA83] border-[#52CA83] text-white"
            : "border-gray-500"
        }`}
      >
        {selected && (
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99911 0.663339C7.98967 0.47339 7.89524 0.301532 7.75359 0.174899C7.61195 0.0482663 7.42308 -0.01505 7.22478 0.00304035C7.02648 0.0120855 6.84706 0.102537 6.7243 0.238215L2.9471 4.30855L1.21903 2.80705C1.07739 2.68042 0.88853 2.6171 0.690227 2.62614C0.491924 2.63519 0.312507 2.7166 0.189748 2.85227C0.0575456 2.98795 -0.0085554 3.16886 0.0008876 3.3588C0.0103306 3.54875 0.0953176 3.72061 0.236963 3.8382L2.51273 5.8191C2.64493 5.93668 2.82434 6 3.00376 6H3.04153H3.05098C3.23984 5.99095 3.41925 5.90955 3.5609 5.76483L7.82913 1.16082C7.94245 1.02515 8.00855 0.844243 7.99911 0.663339Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <span>{children}</span>
    </button>
  );
};

export default RadioBtn;
