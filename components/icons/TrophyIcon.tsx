
import React from 'react';

interface IconProps {
  className?: string;
}

export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
    />
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.523 7.468l-1.06-1.06a.5.5 0 01.708-.708l1.06 1.06a.5.5 0 01-.708.708zM8.477 7.468l1.06-1.06a.5.5 0 00-.708-.708l-1.06 1.06a.5.5 0 00.708.708z"
    />
     <path 
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 21a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-5zM9 16a1 1 0 011-1h4a1 1 0 011 1v2H9v-2z"
        fill="currentColor"
    />
  </svg>
);
