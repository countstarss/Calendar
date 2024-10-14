import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import Logo from '@/public/logo.png'
import Image from 'next/image';
import { auth, signIn, signOut } from '../lib/auth';
import SubmitButton from './submit-button';


interface AuthModalProps {
  // You can define any props needed here
}

const AuthModal = async ({

}: AuthModalProps) => {
  
  const session = await auth()
  const user = session?.user

  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          user ? (
            <form action={ async () => {
              "use server"
              await signOut()
            }}>
              <Button>Sign out</Button>
            </form>
          ) : (
            <Button>Try for free</Button>
          )
        }
      </DialogTrigger>
      <DialogContent className='sm:max-w-[360px]'>
        <DialogHeader className='flex flex-row gap-2 justify-center items-center'>
          <Image src={Logo} alt="logo" width={100} height={100} className='size-10 object-contain aspect-square'/>
          <h4 className='text-3xl font-bold'>Time<span className='text-blue-500'>Master</span></h4>
        </DialogHeader>

        <div className='flex flex-col mt-5 gap-3'>
          <form action={async () => {
            "use server"
            await signIn("github")
          }} className='w-full'>
            <SubmitButton title="GitHub" />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;