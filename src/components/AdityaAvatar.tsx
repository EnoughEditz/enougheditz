import React from 'react';
import adityaAvatarImg from '../assets/images/aditya_profile.png';

interface AvatarProps {
  className?: string;
  showRing?: boolean;
}

export const AdityaAvatar: React.FC<AvatarProps> = ({
  className = "w-10 h-10",
  showRing = false
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {/* Crochet chibi character avatar with orange dashed ring */}
      <img
        src={adityaAvatarImg}
        alt="Aditya Anil Khekade"
        className="w-full h-full rounded-full object-cover select-none pointer-events-none transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
};
