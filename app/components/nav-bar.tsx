import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/public/logo.png'
import AuthModal from './auth-modal';

interface NavbarProps {
  // You can define any props needed here
}

const Navbar = ({

}: NavbarProps) => {
  
  return (
    <div className='flex py-5 px-5 items-center justify-between'>
      <Link href="/dashboard" className='flex items-center gap-2'>
        <Image src={Logo} alt="logo" width={100} height={100} className='size-10 object-contain aspect-square'/>
        <h1 className='text-2xl font-bold'>Event<span className='text-blue-500'>Master</span></h1>
      </Link>

      <AuthModal />
    </div>
  );
};

export default Navbar;