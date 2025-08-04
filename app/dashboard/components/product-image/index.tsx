import React from 'react';
import Image from 'next/image';

type ProductImageProps = {
  imageSrc: string;
};

const defaultSrc = `data:image/svg+xml;utf8,
                        <svg xmlns='http://www.w3.org/2000/svg' width='100' height='50' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'>
                            <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
                            <path d='M3 16l5-5a2 2 0 0 1 2.8 0l7.2 7'></path>
                            <path d='M14 14l1-1a2 2 0 0 1 2.8 0L21 16'></path>
                            <circle cx='7.5' cy='7.5' r='1.5'></circle>
                        </svg>`;

export const ProductImage = ({ imageSrc }: ProductImageProps) => {
  return (
    <Image
      width={200}
      height={100}
      src={imageSrc || defaultSrc}
      alt="Imagen no disponible"
      className="h-50 w-100 mx-auto mb-2 cursor-pointer"
    />
  );
};
