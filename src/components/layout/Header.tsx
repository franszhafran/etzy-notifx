import Image from 'next/image';
import * as React from 'react';

import Button from '@/components/buttons/Button';

export default function Header() {
  return (
    <header className='flex md:flex w-full z-10 justify-center items-center border-b shadow-md fixed bg-white'>
      <div className='w-full px-6 md:px-0 md:w-9/12 py-4 flex justify-between items-center'>
        <div>
          <Image alt='logo' src='/images/logo.png' height={16} width={110} />
        </div>
        <div className='hidden md:flex gap-12 items-center'>
          <a href='#home'>
            <div>Home</div>
          </a>
          <a href='#features'>
            <div>Features</div>
          </a>
          <a href='#pricing'>
            <div>Pricing</div>
          </a>
          <div></div>
          <a href='/client/login'>
            <Button>Login</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
