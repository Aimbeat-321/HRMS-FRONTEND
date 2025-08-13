import React from "react";

type DashProfileCardProps = {
  imgUrl: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  position: string;
};

const DashProfileCard: React.FC<DashProfileCardProps> = ({
  imgUrl,
  firstName,
  lastName,
  emailAddress,
  position,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-4 w-full max-w-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Person</h3>
        <span className="text-xs text-gray-400">Details</span>
      </div>

      {/* Image + Details Row */}
      <div className="flex items-start gap-5">
        {/* Image Section */}
        <div className="flex flex-col items-center">
          <img
            src={imgUrl}
            alt={`${firstName} ${lastName}`}
            className="w-28 h-28 object-cover rounded-2xl"
          />
          <button className="mt-2 text-blue-500 text-sm flex items-center gap-1 hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l9-9a2.121 2.121 0 00-3-3l-9 9z"
              />
            </svg>
            Change image
          </button>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-2 text-sm ">
          <div>
            <p className="text-gray-400">First Name</p>
            <p className="font-medium">{firstName}</p>
            <span className="bg-gray-100 w-[10px] h-1"></span>
          </div>
          <div>
            <p className="text-gray-400">Last Name</p>
            <p className="font-medium">{lastName}</p>
          </div>
          <div>
            <p className="text-gray-400">Email Address</p>
            <p className="font-medium">{emailAddress}</p>
          </div>
          <div>
            <p className="text-gray-400">Position</p>
            <p className="font-medium">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashProfileCard;
