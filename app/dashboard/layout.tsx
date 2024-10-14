import React from 'react';
import Link from 'next/link';
import Logo from '@/public/logo.png'
import Image from 'next/image';
import { dashboardLinks, DashboardLinks } from '../components/dashboard-links';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import { getSession } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth';
import { DashboardLinksMobile } from '../components/dashboard-links-mobile';
import HeaderIndicator from '../components/header-indicator';


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({
  children
}: DashboardLayoutProps) => {

  // const pathname = usePathname();
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className='
        min-h-screen w-full grid h-16
        md:grid-cols-[220px_1fr] mx-auto
      '>
        <div className='hidden border-r md:block bg-muted/40'>
          <div className='flex h-full max-h-screen flex-col gap-2'>
            {/* 
              MARK: Logo
            */}
            <div className='
              flex h-16 items-center justify-center border-b px-4'>
              <Link href="/" className='flex gap-2 items-center justify-center'>
                <Image src={Logo} alt="logo" width={90} height={90} className='size-10 aspect-square' />
                <h1 className='text-xl font-bold'>Event<span className='text-blue-500'>Master</span></h1>
              </Link>
            </div>


            <div className='px-2'>
              <DashboardLinks />
            </div>
          </div>
        </div>


        <div className='flex flex-col'>
          <header className='flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:px-6 justify-between' >
            <HeaderIndicator />
            <div className='flex flex-row gap-4 items-center'>
              <div
                // MARK: Mobile Menu
                className='md:hidden sm:block flex gap-2'
              >
                <Sheet>
                  <SheetTrigger asChild>
                    <Menu className='size-8' />
                  </SheetTrigger>
                  <SheetContent className='w-full py-12'>
                    <DashboardLinksMobile />
                  </SheetContent>
                </Sheet>

              </div>
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='w-[36px] h-[36px] rounded-full border-white' >
                    <Image src={session?.user?.image || ''} alt="user" width={500} height={500} className="w-[36px] h-[36px] rounded-full border" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='mt-3'>
                  <DropdownMenuItem >
                    My Account
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem >
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem >
                    <form 
                    action={async() => {
                      "use server"
                      await signOut()
                    }}
                    >
                      <button>Sign Out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4 lg:gap-6'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;