import React from 'react';
import ProfileInfoCard from './ui/ProfileInfoCard';
import { MdOutlineChangeCircle } from "react-icons/md";

type DashProfileCardProps = {
    imgUrl: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    position: string;
};

const DashProfileCard: React.FC<DashProfileCardProps> = ({ imgUrl, firstName, lastName, emailAddress, position }) => {
  const dashProfileArr = [
      { label: 'First Name', value: firstName },
      { label: 'Last Name', value: lastName },
      { label: 'Email Address', value: emailAddress },
      { label: 'Position', value: position },
  ];
  
    return (
        <div className="bg-white select-none rounded-3xl shadow-xs border border-gray-200 py-4 px-6 w-full max-w-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-semibold text-gray-600">Person</h3>
                <span className="text-sm text-gray-400">Details</span>
            </div>

            {/* Image + Details Row */}
            <div className='flex gap-8 justify-between items-center'>
                <div className='w-1/2 relative'>
                    <img src={imgUrl} className='rounded-3xl w-full h-[250px] object-cover' alt="Profile Picture" />
                    <div className='absolute bottom-1 w-[90%] right-[11px]  flex items-center justify-center border  rounded-3xl py-2 text-secondary-blue cursor-pointer text-lg hover:scale-105 bg-white/70 backdrop-blur-lg transition-all duration-200'>
                        {/* icon */}
                        <MdOutlineChangeCircle className='text-2xl' />
                        <p>Change image</p>
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className='flex flex-col items-start relative'>
                        {dashProfileArr.map((item)=>(
                          <ProfileInfoCard
                            key={item.value}
                            label={item.label}
                            value={item.value}
                          />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashProfileCard;
