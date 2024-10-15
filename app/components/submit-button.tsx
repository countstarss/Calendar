'use client'
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import GoogleLogo from '@/public/google.svg';
import GithubLogo from '@/public/github.svg';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  title?: string;
}

export const OAuthButton = ({
  title,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <>
      {
        pending ? (
          <Button className='outline w-full font-bold hover:text-black hover:bg-gray-200 border-gray-400 border-[1px] flex gap-2'>
            <Loader2 className='size-4 animate-spin' />
          </Button >
        ) : (
          <Button className='outline w-full font-bold hover:text-black hover:bg-gray-200 border-gray-400 border-[1px] flex gap-2'>
            <Image src={GithubLogo} alt='Logo' width={100} height={100} className='size-4 text-white'/>
            Sign in with {title}
          </Button >
        )
      }
    </>
  );
};
export const SubmitButton = ({
  title
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <>
      {
        pending ? (
          <Button className='outline w-full font-bold hover:text-black hover:bg-gray-200 border-gray-400 border-[1px] flex gap-2'>
            <Loader2 className='size-4 animate-spin' />Please wait...
          </Button >
        ) : (
          <Button className='outline w-full font-bold hover:text-black hover:bg-gray-200 border-gray-400 border-[1px] flex gap-2'>
            {title}
          </Button >
        )
      }
    </>
  );
};
