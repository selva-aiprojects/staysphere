import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StaySphere - Luxury Stays, Airport Chauffeur Rides & Personal Butler',
  description: 'Your Journey. Our Priority. Book 100% verified luxury villas, royal palace suites, airport chauffeur cars, and 24/7 personal butler service with 100% safe payment protection across India.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'StaySphere - Luxury Stays, Airport Chauffeur Rides & Personal Butler',
    description: 'Your Journey. Our Priority. Discover verified luxury villas and guaranteed airport chauffeur transfers with 100% safe payment protection.',
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
