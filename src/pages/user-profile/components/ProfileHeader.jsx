import React from "react";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const ProfileHeader = ({ user, onEditPhoto }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center">
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-100">
            <Image 
              src={user.profileImage} 
              alt={`${user.firstName} ${user.lastName}`} 
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={onEditPhoto}
            className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition duration-300" aria-label="Change profile photo"
          >
            <Icon name="Camera" size={16} />
          </button>
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-display font-bold text-neutral-800 mb-1">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-neutral-600 mb-2">
            Member since {user.memberSince}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
              {user.membershipTier}
            </span>
            {user.verifiedUser && (
              <span className="bg-success-100 text-success-600 text-xs px-2 py-1 rounded-full flex items-center">
                <Icon name="CheckCircle" size={12} className="mr-1" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;