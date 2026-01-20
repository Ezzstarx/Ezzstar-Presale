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
      <body className={`${tektur.variable} ${satoshi.variable} font-tektur text-white antialiased overflow-x-hidden relative`}>
        {/* Global Background Image */}
        <div
          className="fixed inset-0 z-[-1] pointer-events-none"
          style={{
            backgroundImage: "url('/assets/images/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundColor: "#000000"
          }}
        />
        <WalletProvider>
          <Navbar />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
