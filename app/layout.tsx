import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'DRIVE THE FUTURE | Premium Automotive Experience',
  description: 'Experience the pinnacle of automotive engineering. Explore hypercars and superbikes in immersive 3D.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-cyber-black text-white font-poppins">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}