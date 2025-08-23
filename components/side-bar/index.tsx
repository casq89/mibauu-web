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

type SidebarIconsProps = {
  [key: string]: {
    href: string;
    component: React.ReactElement;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    isAcordion?: boolean;
    subMenuComponent?: React.ReactElement;
  };
};

export const SideBar = () => {
  const [isVisibleOptions, seIsVisibleOptions] = React.useState(false);
  const [isActiveLink, setIsActiveLink] = React.useState(0);
  const { logout } = useAuth();

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
      href: '/dashboard',
      component: <StatsIcon />,
      onClick: () => setIsActiveLink(0),
    },
    Categorias: {
      href: '/dashboard/categories',
      component: <DocEditIcon />,
      onClick: () => setIsActiveLink(1),
    },
    Promociones: {
      href: '/dashboard/offers',
      component: <OffersIcon />,
      onClick: () => setIsActiveLink(2),
    },
    Consentimientos: {
      href: '/dashboard/consents',
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
