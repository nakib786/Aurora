import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Aurora - Get in Touch with Our Team',
  description: 'Have questions or need assistance? Contact the Aurora team today. We\'re here to help with all your financial, AI, and business needs.',
  keywords: 'contact, Aurora, support, customer service, help, consultation, accounting services, AI solutions',
  openGraph: {
    title: 'Contact Us | Aurora - Get in Touch with Our Team',
    description: 'Have questions or need assistance? Contact the Aurora team today. We\'re here to help with all your financial, AI, and business needs.',
    url: 'https://aurora-nn.com/contact',
    siteName: 'Aurora',
    images: [
      {
        url: '/images/contact-page-social.jpg',
        width: 1200,
        height: 630,
        alt: 'Aurora Contact Us Page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Aurora - Get in Touch with Our Team',
    description: 'Have questions or need assistance? Contact the Aurora team today. We\'re here to help with all your financial, AI, and business needs.',
    images: ['/images/contact-page-social.jpg'],
    creator: '@aurora_nn',
  },
  alternates: {
    canonical: 'https://aurora-nn.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 