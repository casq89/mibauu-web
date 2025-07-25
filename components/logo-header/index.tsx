'use client';

import Image from 'next/image';

type LogoHeaderProps = {
  text: string;
};
export const LogoHeader = ({ text }: LogoHeaderProps) => {
  return (
    <>
      <Image
        className="max-w-lg mx-auto align-middle"
        width={200}
        height={67}
        src={'/logo_mibauu.png'}
        alt="Logo e-talento"
        priority
      />
      <p className="text-center m-3 text-secondary font-bold">{text}</p>
    </>
  );
};
