import React from 'react';
import type { Metadata } from 'next';
import { AboutPage } from '../../src/pages/AboutPage';

export const metadata: Metadata = {
  title: 'About Fitnshape | Editorial Standards & Medical Review Process',
  description: 'Learn about Fitnshape’s mission, certified editorial board, evidence-based review methodology, and independent publishing standards.',
};

export default function NextAboutPage() {
  return (
    <AboutPage
      onNavigateHome={() => {
        if (typeof window !== 'undefined') window.location.href = '/';
      }}
      onOpenLeadMagnet={() => {}}
    />
  );
}
