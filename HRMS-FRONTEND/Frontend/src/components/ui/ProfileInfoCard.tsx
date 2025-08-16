import React from 'react';

type ProfileInfoCardProps = {
  label: string;
  value: string;
};

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ label, value }) => {
  return (
    <div className="w-full  py-2 sm:px-1 sm:py-3 border-b border-gray-300 last:border-b-0">
      <p className="text-xs sm:text-sm text-gray-600">{label}</p>
      <p className="text-sm sm:text-base font-medium">{value}</p>
    </div>
  );
};

export default ProfileInfoCard;