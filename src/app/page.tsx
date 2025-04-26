import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AccountingHero from '@/components/layout/AccountingHero';
import VerticalScrollSection from '@/components/layout/VerticalScrollSection';
import HorizontalScrollSection from '@/components/layout/HorizontalScrollSection';

export default function Home() {
  return (
    <MainLayout>
      <AccountingHero />
      <HorizontalScrollSection />
      <VerticalScrollSection />
      
      <div className="bg-green-600 dark:bg-green-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-12">
            Partner with Aurora N&N for expert accounting and innovative web solutions that drive growth and success.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white dark:bg-gray-200 text-green-600 dark:text-green-800 font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-300 shadow-lg hover:scale-105"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
