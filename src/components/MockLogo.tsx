import Image from 'next/image';
import * as React from 'react';

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function MockLogo() {
  return (
    <div className=''>
      <Image alt='logo' src='/images/logo.png' height={16} width={110} />
    </div>
  );
}
