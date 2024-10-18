"use client"

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';


const BackAndForWardButton: React.FC<{
  className?: string,
  onClick?: () => void,
  backActive?: boolean,
  forwardActive?: boolean,
}> = ({
  className,
  onClick,
  backActive,
  forwardActive,
}) => {
    const router = useRouter()
    return (
      <div className={`
            flex
            flex-row
            gap-x-2
            items-center
            ${className}
          `}>
        {
          backActive && (
            <button
              // MARK: - Back Button
              className='
                rounded-full
                bg-black/5
                flex
                p-1
                items-center
                justify-center
                hover:opacity-55
                transition'
              onClick={() => router?.back()}
            >
              <ArrowLeft
                className='cursor-pointer text-black/30'
                size={24}
              />
            </button>
          )
        }
        {
          forwardActive && (
            <button
              // MARK: - Forward Button
              className='
              rounded-full
              bg-black/5
              flex
              p-1
              items-center
              justify-center
              hover:opacity-55
              transition'
              onClick={() => router.forward()}
            >
              <ArrowRight
                className='cursor-pointer text-black/30'
                size={24}
              />
            </button>
          )
        }
      </div>
    );
  };

export default BackAndForWardButton;