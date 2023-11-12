import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Theme from './Theme';

const NavBar = () => {
  return (
    <nav className='flex-between background-light900_dark200 g-5 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12'>
      <Link href='/' className='flex items-center gap-1'>
        <Image
          src='/assets/images/site-logo.svg'
          width={23}
          height={23}
          alt='Islamic overflow'
        />
        <p className='h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden'>
          Islamic<span className='text-primary-500'>Overflow</span>
        </p>
      </Link>
      {/* GlobalSearch */}
      <div className='flex-between gap-5'>
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
              variables: {
                colorPrimary: '#22c55e',
              },
            }}
          />
        </SignedIn>
        MobileNavBar
      </div>
    </nav>
  );
};

export default NavBar;
