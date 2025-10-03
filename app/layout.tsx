import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Header } from '@/components/Header';
import { ScrollToTop } from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StoreFront - Quality Products',
  description: 'Browse our collection of quality products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          {children}
          <ScrollToTop />
        </QueryProvider>
      </body>
    </html>
  );
}
