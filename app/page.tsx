'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="max-w-sm mx-auto align-middle mt-[100px]  p-5 rounded-xl z-10   ">
      <Image
        className="max-w-lg mx-auto align-middle"
        width={200}
        height={67}
        src={'/logo_mibauu.png'}
        alt="Logo e-talento"
        priority
      />
      <h1 className="text-center text-xl">Bienvenido a MIBAUU</h1>
      <h1 className="text-center text-xl">Descarga la app</h1>
    </div>
  );
}
