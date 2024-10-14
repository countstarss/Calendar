"use client"
import { usePathname } from 'next/navigation';
import React from 'react';
import { dashboardLinks } from './dashboard-links';

interface HeaderIndicatorProps {
  // You can define any props needed here
}

const HeaderIndicator = ({

}: HeaderIndicatorProps) => {
  const pathname = usePathname()

  return (
    <div>
      <h1 className='text-xl font-normal'>{dashboardLinks.filter(link => link.href === pathname)[0].name}</h1>
    </div>
  );
};

export default HeaderIndicator;