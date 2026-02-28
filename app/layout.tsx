import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const siteUrl = 'https://artemadera.ru';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ArteMadera — Премиальная отделка деревянных домов в Москве',
    template: '%s | ArteMadera',
  },
  description:
    'Профессиональная шлифовка, покраска и реставрация деревянных домов. Масла Biofa, Renner, Osmo. Теплый шов, конопатка, обсада. Гарантия 5 лет. ☎ +7 (495) 005-01-45',
  keywords: [
    'отделка деревянного дома',
    'шлифовка сруба',
    'покраска дома',
    'теплый шов',
    'конопатка',
    'деревянный дом Москва',
    'ArteMadera',
  ],
  authors: [{ name: 'ArteMadera', url: siteUrl }],
  creator: 'ArteMadera',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'ArteMadera',
    title: 'ArteMadera — Искусство деревянного домостроения',
    description: 'Премиальная шлифовка, покраска и реставрация деревянных домов. Гарантия 5 лет.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'ArteMadera — отделка деревянных домов',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArteMadera — Премиальная отделка деревянных домов',
    description: 'Шлифовка, покраска, теплый шов. Гарантия 5 лет.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans wood-texture antialiased">
        {children}
      </body>
    </html>
  );
}
