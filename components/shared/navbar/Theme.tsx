'use client';
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

import { useTheme } from '@/context/ThemeProvider';
import Image from 'next/image';
import { themes } from '@/constants/constants';

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className='relative border-none bg-transparent shadow-none'>
      <MenubarMenu>
        <MenubarTrigger>
          {mode === 'light' ? (
            <Image
              src='/assets/icons/sun.svg'
              width={20}
              height={20}
              alt='sun'
              className='active-theme'
            />
          ) : (
            <Image
              src='/assets/icons/moon.svg'
              width={20}
              height={20}
              alt='moon'
              className='active-theme'
            />
          )}
        </MenubarTrigger>
        <MenubarContent className='absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300'>
          {themes.map((theme) => {
            return (
              <MenubarItem
                key={theme.value}
                onClick={() => {
                  setMode(theme.value);
                  if (theme.value !== 'system') {
                    localStorage.theme = theme.value;
                  } else {
                    localStorage.removeItem('theme');
                  }
                }}
                className='flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400'
              >
                <Image
                  src={theme.icon}
                  alt={theme.label}
                  width={16}
                  height={16}
                  className={`${mode === theme.value && 'active-theme'}`}
                />
                <p
                  className={`body-semibold text-light-500 ${
                    mode === theme.value
                      ? 'text-primary-500'
                      : 'text-dark100_light900'
                  }`}
                >
                  {theme.value}
                </p>
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
