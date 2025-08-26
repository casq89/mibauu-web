'use client';

import { useAuth } from '@/hooks/use-auth';
import React from 'react';
import {
  ExitIcon,
  OffersIcon,
  OptionsIcon,
  UserIcon,
  DocEditIcon,
  StatsIcon,
} from '../side-icons';
import { SideBarOption } from '../side-bar-option';
import { SubMenuOptions } from '../submenu-options';
import { usePathname } from 'next/navigation';

type SidebarIconsProps = {
  [key: string]: {
    href: string;
    component: React.ReactElement;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    isAcordion?: boolean;
    subMenuComponent?: React.ReactElement;
  };
};

const ROUTES = [
  '/dashboard',
  '/dashboard/categories',
  '/dashboard/offers',
  '/dashboard/consents',
];

export const SideBar = () => {
  const [isVisibleOptions, seIsVisibleOptions] = React.useState(false);
  const [isActiveLink, setIsActiveLink] = React.useState(0);
  const { logout } = useAuth();
  const pathname = usePathname();

  const handleOptions = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setIsActiveLink(4);
    seIsVisibleOptions(!isVisibleOptions);
  };

  const SIDE_BAR_ICONS: SidebarIconsProps = {
    Productos: {
      href: ROUTES[0],
      component: <StatsIcon />,
      onClick: () => setIsActiveLink(0),
    },
    Categorias: {
      href: ROUTES[1],
      component: <DocEditIcon />,
      onClick: () => setIsActiveLink(1),
    },
    Promociones: {
      href: ROUTES[2],
      component: <OffersIcon />,
      onClick: () => setIsActiveLink(2),
    },
    Consentimientos: {
      href: ROUTES[3],
      component: <UserIcon />,
      onClick: () => setIsActiveLink(3),
    },
    Opciones: {
      href: '',
      onClick: handleOptions,
      component: <OptionsIcon />,
      isAcordion: true,
      subMenuComponent: <SubMenuOptions isVisible={isVisibleOptions} />,
    },
    Salir: {
      href: '/login',
      component: <ExitIcon />,
      onClick: logout,
    },
  };

  React.useEffect(() => {
    setIsActiveLink(ROUTES.indexOf(pathname));
  });
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-30 left-0  z-9 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {Object.entries(SIDE_BAR_ICONS).map(
            (
              [key, { href, component, onClick, isAcordion, subMenuComponent }],
              index
            ) => (
              <SideBarOption
                key={key}
                title={key}
                href={href}
                isActive={isActiveLink === index}
                onClick={onClick}
                isAcordion={isAcordion}
                subMenuComponent={subMenuComponent}
                component={component}
              />
            )
          )}
        </ul>
      </div>
    </aside>
  );
};
