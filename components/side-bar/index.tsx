'use client';

import { useAuth } from '@/hooks/use-auth';
import React from 'react';
import {
  ExitIcon,
  InitIcon,
  OptionsIcon,
  PerosnalDataIcon,
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
  const { logout } = useAuth();

  const handleOptions = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    seIsVisibleOptions(!isVisibleOptions);
  };

  const SIDE_BAR_ICONS: SidebarIconsProps = {
    Inicio: {
      href: '/dashboard',
      component: <InitIcon />,
    },
    'Datos personales': {
      href: '/dashboard/personal-data',
      component: <PerosnalDataIcon />,
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
            ([
              key,
              { href, component, onClick, isAcordion, subMenuComponent },
            ]) => (
              <SideBarOption
                key={key}
                title={key}
                href={href}
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
