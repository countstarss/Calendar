import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/hooks';

interface DashboardProps {
  // You can define any props needed here
}

const Dashboard = async ({

}: DashboardProps) => {
  const session = await getSession()

  return (
    <div>Welcome to Dashboard</div>
  );
};

export default Dashboard;