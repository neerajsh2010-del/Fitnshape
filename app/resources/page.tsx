import React from 'react';
import type { Metadata } from 'next';
import { ResourcesPage } from '../../src/pages/ResourcesPage';

export const metadata: Metadata = {
  title: 'Clinical Resources & Macro Calculator | Fitnshape',
  description: 'Evidence-based fitness calculators, TDEE estimators, progressive overload logs, and the 7-Day Starter Guide.',
};

export default function NextResourcesPage() {
  return (
    <ResourcesPage
      onNavigateHome={() => {
        if (typeof window !== 'undefined') window.location.href = '/';
      }}
      onOpenLeadMagnet={() => {}}
    />
  );
}
