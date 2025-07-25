import type { Metadata } from 'next';
import './globals.css';
import { Toast } from '@/components/toast';

export const metadata: Metadata = {
  title: 'mibauu',
  description: 'Tienda de productos para mascotas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toast />
      </body>
    </html>
  );
}
