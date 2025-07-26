'use client';
import Link from 'next/link';

type SubMenuOptionsProps = {
  isVisible: boolean;
};

export const SubMenuOptions = ({ isVisible }: SubMenuOptionsProps) => {
  return (
    <ul
      id="dropdown-options"
      className={`${!isVisible ? 'hidden' : ''} py-2 space-y-2`}
    >
      <li>
        <Link
          href={'#'}
          onClick={() => console.debug('Some option')}
          className="flex items-center w-full p-2 text-primary transition duration-75 rounded-lg pl-11 group hover:bg-green/70 hover:text-white"
        >
          Cambiar contraseña
        </Link>
      </li>
      <li>
        <Link
          href="#"
          onClick={() => console.debug('Some option')}
          className="flex items-center w-full p-2 text-primary transition duration-75 rounded-lg pl-11 group hover:bg-green/70 hover:text-white"
        >
          Eliminar cuenta
        </Link>
      </li>
    </ul>
  );
};
