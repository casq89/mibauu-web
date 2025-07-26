'use client';
import React from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from '../side-icons';

type SideBarOptionProps = {
  title: string;
  href: string;
  component: React.ReactElement;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isAcordion?: boolean;
  subMenuComponent?: React.ReactElement;
  isActive?: boolean;
};

export const SideBarOption = ({
  title,
  href,
  component,
  onClick,
  isAcordion = false,
  subMenuComponent,
  isActive = false,
}: SideBarOptionProps) => {
  const styles = isActive ? 'text-white bg-green' : '';
  return (
    <li>
      <Link
        className={`flex items-center justify-between p-2 text-primary rounded-lg hover:text-white hover:bg-green group border-b-[1px] border-green/40 ${styles}`}
        href={href}
        onClick={onClick}
      >
        <div className="flex">
          {component}
          <span className="ms-3">{title}</span>
        </div>
        {isAcordion ? <ChevronDownIcon /> : null}
      </Link>
      {isAcordion ? subMenuComponent : null}
    </li>
  );
};
