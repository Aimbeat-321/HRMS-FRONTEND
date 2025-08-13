import React from "react";
import CardDesignPreview from "./CardDesignPreview";

// Replace this with your actual uploaded preview image
// import preview1 from "../assets/card-preview.png;

const CardDesignList: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <CardDesignPreview
        previewImageUrl={""}
        title="Employee ID Card"
      />
      {/* Add more CardDesignPreview items if needed */}
    </div>
  );
};

export default CardDesignList;
