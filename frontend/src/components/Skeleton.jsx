import React from 'react';

const Skeleton = ({ width, height, className }) => {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      style={{ width: width || '100%', height: height || '100%' }}
    />
  );
};

export default Skeleton;
