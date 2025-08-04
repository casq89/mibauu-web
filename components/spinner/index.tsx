import React from 'react';
import Image from 'next/image';

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <>
        <Image
          className="w-50 animate-bounce"
          alt="product image"
          width={200}
          height={0}
          src={'/logo_mibauu.png'}
          priority
        />
      </>
    </div>
  );
};
