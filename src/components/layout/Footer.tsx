import { Building } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import IndonesiaFlag from '@/components/IndonesiaFlag';

export default function Footer() {
  return (
    <footer className='w-full bg-black text-white flex py-8 items-center justify-center'>
      <div className='w-full px-12 flex flex-col gap-4 md:flex-row justify-between md:w-7/12'>
        <div className='flex md:hidden flex-col'>
          <div className='text-left'>Home</div>
          <div className='text-left'>Features</div>
          <div className='text-left'>Pricing</div>
          <div className='text-left'>Contact Us</div>
        </div>
        <div>
          <Image alt='logo' src='/images/logo.png' height={16} width={110} />
          <p className='text-sm font-thin mb-24'>
            Worry free notification partner! Highly reliably at lowest price!
          </p>
          <div className='w-full flex'>
            <p className='text-sm font-thin'>
              <Building className='inline-block'></Building> Jakarta, Indonesia
            </p>{' '}
            <IndonesiaFlag width={24} height={16}></IndonesiaFlag>
          </div>
        </div>
        <div className='hidden md:flex flex-col'>
          <div className='text-right'>Home</div>
          <div className='text-right'>Features</div>
          <div className='text-right'>Pricing</div>
          <div className='text-right'>Contact Us</div>
        </div>
      </div>
    </footer>
  );
}
