import React, { useState } from "react";

// Define the shape of each tab
type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
};

const Widget: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "");

  return (
    <div className="flex w-fit p-[2px] items-center bg-[#E6E6E6] rounded-[30px]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`widget ${
              isActive
                ? "bg-secondary-blue text-white"
                : "bg-transparent text-[#333333]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Widget;
