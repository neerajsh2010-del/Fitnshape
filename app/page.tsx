'use client';

import React from 'react';
import { HomePage } from '../src/pages/HomePage';
import { Navbar } from '../src/components/Navbar';
import { Footer } from '../src/components/Footer';
import { SearchModal } from '../src/components/SearchModal';
import { LeadMagnetModal } from '../src/components/LeadMagnetModal';
import { SitemapModal } from '../src/components/SitemapModal';
import { useRouter } from '../src/hooks/useNextRouter';
import { Article } from '../src/types';

export default function NextHomePage() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = React.useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar
        currentView="home"
        onNavigate={(view, payload) => {
          if (view === 'category') router.push(`/category/${payload?.toLowerCase().replace(/\s+/g, '-')}`);
          else if (view === 'blog') router.push('/category/all');
          else router.push(`/${view === 'home' ? '' : view}`);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
        bookmarksCount={2}
      />

      <main className="flex-1">
        <HomePage
          onSelectArticle={(article: Article) => router.push(`/article/${article.slug}`)}
          onNavigateCategory={(cat: string) => router.push(`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`)}
          onNavigateView={(view: string) => router.push(`/${view}`)}
          onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
          bookmarkedIds={['zone-2-cardio-longevity']}
          onToggleBookmark={() => {}}
        />
      </main>

      <Footer
        onNavigate={(view, payload) => {
          if (view === 'category') router.push(`/category/${payload?.toLowerCase().replace(/\s+/g, '-')}`);
          else router.push(`/${view === 'home' ? '' : view}`);
        }}
        onOpenLeadMagnet={() => setIsLeadMagnetOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(article: Article) => router.push(`/article/${article.slug}`)}
      />

      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
      />

      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
      />
    </div>
  );
}
