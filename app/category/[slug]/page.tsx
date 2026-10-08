import React from 'react';
import type { Metadata } from 'next';
import { CATEGORIES } from '../../../src/data/categories';
import { CategoryPage } from '../../../src/pages/CategoryPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryMeta = CATEGORIES.find((c) => c.slug === slug);
  const title = categoryMeta ? `${categoryMeta.name} Articles & Evidence-Based Guides` : 'Category';

  return {
    title: `${title} | Fitnshape`,
    description: categoryMeta?.description || 'Explore Fitnshape articles.',
  };
}

export default async function NextCategoryRoutePage({ params }: Props) {
  const { slug } = await params;
  const categoryMeta = CATEGORIES.find((c) => c.slug === slug);
  const categoryName = categoryMeta ? categoryMeta.name : 'Fitness';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <main className="flex-1">
        <CategoryPage
          categoryName={categoryName}
          onNavigateHome={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }}
          onSelectArticle={(art) => {
            if (typeof window !== 'undefined') window.location.href = `/article/${art.slug}`;
          }}
          bookmarkedIds={[]}
          onToggleBookmark={() => {}}
        />
      </main>
    </div>
  );
}
