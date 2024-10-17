import { Button } from '@/components/ui/button';
import { Ban, Plus, PlusCircle, PlusSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface EmptyStateProps {
  // You can define any props needed here
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: EmptyStateProps) => {


  return (
    <div className='flex flex-col flex-1 h-full items-center justify-center
      rounded-md border border-dashed p-8 text-center animate-in fade-in-50
    '>
      <div className='flex flex-col items-center justify-center size-20 rounded-full bg-blue-500/20 dark:bg-white/20 cursor-pointer'>
        <Ban className='size-10 text-blue-600 dark:text-blue-200' />
      </div>

      <h1 className='text-xl font-bold mt-6'>{title}</h1>
      <p className='text-sm text-muted-foreground max-w-xs'>{description}</p>
      <Button
        variant="outline"
        size="default"
        className='mt-4'
        asChild
      >
        <Link href={href}>
        <PlusSquare className='size-4 mr-2' />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
};

export default EmptyState;