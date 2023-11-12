import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';

import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk',
});

export const metadata: Metadata = {
  title: 'Islamic-overflow',
  description:
    'A comprehensive online platform dedicated to sharing knowledge, resources, and discussions on Islamic teachings, history, and culture. Engage with a community of scholars, students, and enthusiasts to explore the rich heritage of Islam.',
  icons: {
    icon: '/assets/images/site-logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'primary-gradient',
              footerActionLink: 'primary-text-gradient hover:text-primary-500',
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
