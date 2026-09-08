import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StaySphere - Unified Journey Platform: Handpicked Stays, Transit & Coordinated Travel',
  description: 'Your Complete Journey Platform. Discover boutique hotels, private villas, resorts, and serviced apartments with coordinated airport transfers, local mobility, and 24/7 proactive resolution.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'StaySphere - Unified Journey Platform: Stays, Mobility & Proactive Resolution',
    description: 'The modern journey platform coupling curated stays with seamless airport mobility and proactive resolution support.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#001A33] text-white antialiased selection:bg-[#00A9A5] selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
