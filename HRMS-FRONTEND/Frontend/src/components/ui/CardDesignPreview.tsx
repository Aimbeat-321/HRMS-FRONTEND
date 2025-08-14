import React, { useState } from "react";

interface CardDesignPreviewProps {
  previewImageUrl: string;
  title: string;
}

const CardDesignPreview: React.FC<CardDesignPreviewProps> = ({
  previewImageUrl,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail Card */}
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center border border-gray-200">
        {/* Tailwind CSS ID Card Mockup */}
        <div className="w-40 h-56 bg-linear-to-b from-blue-500 to-blue-700 rounded-lg p-3 flex flex-col items-center text-white shadow-sm">
          <div className="w-16 h-16 bg-white rounded-full mb-3"></div>
          <h3 className="text-sm font-bold">John Doe</h3>
          <p className="text-xs opacity-90">Software Engineer</p>
          <div className="mt-auto text-xs bg-white text-blue-700 px-2 py-1 rounded-sm">
            Company Name
          </div>
        </div>

        {/* Title */}
        <p className="mt-3 font-medium text-gray-700">{title}</p>

        {/* Preview Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
        >
          Preview
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
            >
              ✕
            </button>
            <img
              src={previewImageUrl}
              alt="Preview"
              className="rounded-lg max-h-[80vh] w-auto mx-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CardDesignPreview;
