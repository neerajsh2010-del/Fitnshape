import React from 'react';
import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fitnshape.in'),
  title: {
    default: 'Fitnshape | Fitness, Health & Nutrition Magazine – Move Better. Eat Better. Live Better.',
    template: '%s | Fitnshape',
  },
  description: 'Evidence-based fitness training, clinical nutrition science, nutrient-dense recipes, and mobility protocols curated by certified practitioners.',
  keywords: ['fitness', 'nutrition', 'workouts', 'healthy recipes', 'yoga', 'mobility', 'longevity', 'wellness magazine'],
  authors: [{ name: 'Fitnshape Editorial Board', url: 'https://fitnshape.in/about' }],
  creator: 'Fitnshape',
  publisher: 'Fitnshape Digital Wellness Publishing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Fitnshape | Fitness, Health & Nutrition Magazine',
    description: 'Move Better. Eat Better. Live Better. Evidence-based training and clinical nutrition.',
    url: 'https://fitnshape.in',
    siteName: 'Fitnshape',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Fitnshape Wellness Editorial',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitnshape | Fitness, Health & Nutrition Magazine',
    description: 'Move Better. Eat Better. Live Better.',
    site: '@fitnshape',
    creator: '@fitnshape',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@400..700&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsMediaOrganization',
              name: 'Fitnshape',
              url: 'https://fitnshape.in',
              logo: 'https://fitnshape.in/logo.png',
              slogan: 'Move Better. Eat Better. Live Better.',
              description: 'Evidence-based fitness, nutrition, healthy recipes, yoga, and holistic health publication.',
            }),
          }}
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#1C1F1D] antialiased selection:bg-[#E8EFE9] selection:text-[#132E22]">
        {children}
      </body>
    </html>
  );
}
