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
    <div className='w-full'>
      <h1 className='text-xl font-normal'>
        {
          // 如果不存在匹配的链接，则直接使用路径的第二部分作为标题
          dashboardLinks.filter(link => link.href === pathname)[0] ? 
            dashboardLinks.filter(link => link.href === pathname)[0].name : pathname.split("/")[2]
        }
      </h1>
    </div>
  );
};

export default HeaderIndicator;