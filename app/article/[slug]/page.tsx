import React from 'react';
import type { Metadata } from 'next';
import { ARTICLES } from '../../../src/data/articles';
import { AUTHORS } from '../../../src/data/authors';
import { ArticlePage } from '../../../src/pages/ArticlePage';
import { Navbar } from '../../../src/components/Navbar';
import { Footer } from '../../../src/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const author = AUTHORS.find((a) => a.id === article.authorId);

  return {
    title: `${article.title} | Fitnshape`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate,
      authors: [`https://fitnshape.in/author/${author?.id || article.authorId}`],
      images: [
        {
          url: article.featuredImage,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  };
}

export default async function NextArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <main className="flex-1">
        <ArticlePage
          article={article}
          onNavigateHome={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }}
          onNavigateCategory={(cat) => {
            if (typeof window !== 'undefined') window.location.href = `/category/${cat.toLowerCase().replace(/\s+/g, '-')}`;
          }}
          onSelectArticle={(art) => {
            if (typeof window !== 'undefined') window.location.href = `/article/${art.slug}`;
          }}
          isBookmarked={false}
          onToggleBookmark={() => {}}
          onOpenLeadMagnet={() => {}}
          onNavigateAuthor={(authorId) => {
            if (typeof window !== 'undefined') window.location.href = `/author/${authorId}`;
          }}
        />
      </main>
    </div>
  );
}

