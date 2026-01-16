import type { Metadata } from 'next';
import { Tektur, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { WalletProvider } from '@/components/providers/WalletProvider';

const tektur = Tektur({
  subsets: ['latin'],
  variable: '--font-tektur',
  display: 'swap',
});

// Using Inter as a high-quality substitute for Satoshi which is a paid/external font
const satoshi = Inter({
  subsets: ['latin'],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ezzstar - Empowering the Future of Digital Aliens',
  description: 'The official presale platform for Ezzstar (SPICA) token.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${tektur.variable} ${satoshi.variable} bg-black font-satoshi text-white antialiased overflow-x-hidden`}>
        <WalletProvider>
          <Navbar />
          <main className="min-h-screen relative overflow-hidden">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
