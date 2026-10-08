import React from 'react';
import type { Metadata } from 'next';
import { AUTHORS } from '../../../src/data/authors';
import { AuthorPage } from '../../../src/pages/AuthorPage';
import { Author, Article } from '../../../src/types';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author: Author = AUTHORS.find((a: Author) => a.id === id) || AUTHORS[0];

  return {
    title: `${author.name} | Fitnshape Author & Editorial Profile`,
    description: author.bio,
    openGraph: {
      title: `${author.name} | Fitnshape Author Profile`,
      description: author.bio,
      type: 'profile',
      images: [
        {
          url: author.avatar,
          width: 400,
          height: 400,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${author.name} | Fitnshape`,
      description: author.bio,
      images: [author.avatar],
    },
  };
}

export default async function NextAuthorProfilePage({ params }: Props) {
  const { id } = await params;
  const author: Author = AUTHORS.find((a: Author) => a.id === id) || AUTHORS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <main className="flex-1">
        <AuthorPage
          author={author}
          onNavigateHome={() => {
            if (typeof window !== 'undefined') window.location.href = '/';
          }}
          onSelectArticle={(art: Article) => {
            if (typeof window !== 'undefined') window.location.href = `/article/${art.slug}`;
          }}
          bookmarkedIds={[]}
          onToggleBookmark={() => {}}
        />
      </main>
    </div>
  );
}
