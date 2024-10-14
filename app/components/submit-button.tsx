'use client'
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import GoogleLogo from '@/public/google.svg';
import GithubLogo from '@/public/github.svg';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  title: string;
}

const SubmitButton = ({
  title,
}: SubmitButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <>
      {
        pending ? (
          <Button className='w-full bg-gray-200 text-white font-bold hover:text-black hover:bg-gray-200 border-gray-400 border-[1px]'>
            <Loader2 className='size-4 animate-spin' />
          </Button >
        ) : (
          <Button className='outline w-full font-bold hover:text-black hover:bg-gray-200 border-gray-400 border-[1px] flex gap-2'>
            <Image src={title === "GitHub" ? GithubLogo : GoogleLogo} alt='google' width={100} height={100} className='size-4 text-white'/>
            Sign in with {title}
          </Button >
        )
      }
    </>
  );
};

export default SubmitButton;