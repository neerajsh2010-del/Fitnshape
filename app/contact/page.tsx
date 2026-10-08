import React from 'react';
import type { Metadata } from 'next';
import { ContactPage } from '../../src/pages/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Fitnshape | Editorial Desk & Reader Support',
  description: 'Get in touch with the Fitnshape editorial desk, submit science feedback, or inquire about press partnerships.',
};

export default function NextContactPage() {
  return (
    <ContactPage
      onNavigateHome={() => {
        if (typeof window !== 'undefined') window.location.href = '/';
      }}
    />
  );
}
