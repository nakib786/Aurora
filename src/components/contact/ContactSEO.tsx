'use client';

import React from 'react';
import Head from 'next/head';

interface ContactJsonLdProps {
  organizationName?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  socialProfiles?: string[];
}

export const ContactJsonLd: React.FC<ContactJsonLdProps> = ({
  organizationName = 'Aurora Web Design',
  email = 'contact@aurorawebdesign.com',
  phone = '+1 (555) 123-4567',
  address = {
    streetAddress: '123 Web Design St',
    addressLocality: 'Digital City',
    addressRegion: 'CA',
    postalCode: '90210',
    addressCountry: 'US'
  },
  socialProfiles = [
    'https://twitter.com/aurora',
    'https://facebook.com/aurora',
    'https://instagram.com/aurora',
    'https://linkedin.com/company/aurora'
  ]
}) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
    email: email,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry
    },
    sameAs: socialProfiles
  };

  return (
    <>
      <Head>
        <title>Contact Us | Aurora Web Design</title>
        <meta name="description" content="Get in touch with our team for web design, development, and digital marketing services. We're here to help bring your digital vision to life." />
        <meta name="keywords" content="contact, web design, development, digital marketing, get in touch" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
    </>
  );
};

export default ContactJsonLd; 