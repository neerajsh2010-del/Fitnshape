import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { LeadMagnetModal } from './components/LeadMagnetModal';
import { SitemapModal } from './components/SitemapModal';
import { NextjsArchitectureModal } from './components/NextjsArchitectureModal';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AuthorPage } from './pages/AuthorPage';
import { Article, Author } from './types';
import { ARTICLES } from './data/articles';
import { CATEGORIES } from './data/categories';
import { AUTHORS } from './data/authors';
import { useRouter } from './hooks/useNextRouter';

export default function App() {
  const router = useRouter();

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLeadMagnetOpen, setIsLeadMagnetOpen] = useState(false);
  const [leadMagnetGoal, setLeadMagnetGoal] = useState('Sustainable Fat Loss & Tone');
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);
  const [isNextjsModalOpen, setIsNextjsModalOpen] = useState(false);

  // Bookmarks saved in local storage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fitnshape_bookmarks');
      return saved ? JSON.parse(saved) : ['zone-2-cardio-longevity', 'salmon-sweet-potato-bowl'];
    } catch {
      return ['zone-2-cardio-longevity'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fitnshape_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      // ignore
    }
  }, [bookmarkedIds]);

  // Global keyboard shortcut for search ('/' or CMD+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') ||
        ((e.metaKey || e.ctrlKey) && e.key === 'k')
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleBookmark = (e: React.MouseEvent, articleId: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleClearBookmarks = () => {
    setBookmarkedIds([]);
  };

  // Route matching based on Next.js path conventions
  const pathname = router.pathname;

  let activeView = 'home';
  let activeArticle: Article | null = null;
  let activeCategory = 'Fitness';
  let activeAuthor: Author | null = null;

  if (pathname.startsWith('/article/')) {
    const slug = pathname.replace('/article/', '');
    activeArticle = ARTICLES.find((a) => a.slug === slug) || null;
    if (activeArticle) {
      activeView = 'article';
    } else {
      activeView = 'home';
    }
  } else if (pathname.startsWith('/author/')) {
    const authorId = pathname.replace('/author/', '');
    activeAuthor = AUTHORS.find((a) => a.id === authorId) || AUTHORS[0];
    activeView = 'author';
  } else if (pathname.startsWith('/category/')) {
    const slug = pathname.replace('/category/', '');
    if (slug === 'all') {
      activeCategory = 'All';
    } else {
      const cat = CATEGORIES.find((c) => c.slug === slug || c.name.toLowerCase() === slug.toLowerCase());
      activeCategory = cat ? cat.name : 'Fitness';
    }
    activeView = 'category';
  } else if (pathname === '/fitness') {
    activeCategory = 'Fitness';
    activeView = 'category';
  } else if (pathname === '/workouts') {
    activeCategory = 'Workouts';
    activeView = 'category';
  } else if (pathname === '/nutrition') {
    activeCategory = 'Nutrition';
    activeView = 'category';
  } else if (pathname === '/healthy-recipes') {
    activeCategory = 'Healthy Recipes';
    activeView = 'category';
  } else if (pathname === '/yoga-and-mobility') {
    activeCategory = 'Yoga & Mobility';
    activeView = 'category';
  } else if (pathname === '/health-and-wellness') {
    activeCategory = 'Health & Wellness';
    activeView = 'category';
  } else if (pathname === '/lifestyle') {
    activeCategory = 'Lifestyle';
    activeView = 'category';
  } else if (pathname === '/blog') {
    activeCategory = 'All';
    activeView = 'category';
  } else if (pathname === '/resources') {
    activeView = 'resources';
  } else if (pathname === '/about') {
    activeView = 'about';
  } else if (pathname === '/contact') {
    activeView = 'contact';
  } else if (pathname === '/bookmarks') {
    activeView = 'bookmarks';
  } else {
    activeView = 'home';
  }

  const handleNavigate = (view: string, payload?: any) => {
    if (view === 'category') {
      const slug = (payload || 'fitness').toLowerCase().replace(/\s+/g, '-');
      router.push(`/category/${slug}`);
    } else if (view === 'blog') {
      router.push('/category/all');
    } else if (view === 'article' && payload) {
      router.push(`/article/${payload.slug || payload}`);
    } else if (view === 'home') {
      router.push('/');
    } else {
      router.push(`/${view}`);
    }
  };

  const handleSelectArticle = (article: Article) => {
    router.push(`/article/${article.slug}`);
  };

  const handleOpenLeadMagnet = (goal?: string) => {
    if (goal) setLeadMagnetGoal(goal);
    setIsLeadMagnetOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1F1D] selection:bg-[#E8EFE9] selection:text-[#132E22]">
      {/* Primary Sticky Header */}
      <Navbar
        currentView={activeView === 'category' ? `category-${activeCategory}` : activeView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLeadMagnet={() => handleOpenLeadMagnet()}
        onOpenNextjsArchitecture={() => setIsNextjsModalOpen(true)}
        bookmarksCount={bookmarkedIds.length}
      />

      {/* Main Routed Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HomePage
            onSelectArticle={handleSelectArticle}
            onNavigateCategory={(cat) => handleNavigate('category', cat)}
            onNavigateView={(view) => handleNavigate(view)}
            onOpenLeadMagnet={handleOpenLeadMagnet}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onNavigateAuthor={(authorId) => router.push(`/author/${authorId}`)}
          />
        )}

        {activeView === 'article' && activeArticle && (
          <ArticlePage
            article={activeArticle}
            onNavigateHome={() => router.push('/')}
            onNavigateCategory={(cat) => handleNavigate('category', cat)}
            onSelectArticle={handleSelectArticle}
            isBookmarked={bookmarkedIds.includes(activeArticle.id)}
            onToggleBookmark={handleToggleBookmark}
            onOpenLeadMagnet={() => handleOpenLeadMagnet()}
            onNavigateAuthor={(authorId) => router.push(`/author/${authorId}`)}
          />
        )}

        {activeView === 'author' && activeAuthor && (
          <AuthorPage
            author={activeAuthor}
            onNavigateHome={() => router.push('/')}
            onSelectArticle={handleSelectArticle}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeView === 'category' && (
          <CategoryPage
            categoryName={activeCategory}
            onNavigateHome={() => router.push('/')}
            onSelectArticle={handleSelectArticle}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeView === 'resources' && (
          <ResourcesPage
            onNavigateHome={() => router.push('/')}
            onOpenLeadMagnet={() => handleOpenLeadMagnet()}
          />
        )}

        {activeView === 'about' && (
          <AboutPage
            onNavigateHome={() => router.push('/')}
            onOpenLeadMagnet={() => handleOpenLeadMagnet()}
          />
        )}

        {activeView === 'contact' && (
          <ContactPage onNavigateHome={() => router.push('/')} />
        )}

        {activeView === 'bookmarks' && (
          <BookmarksPage
            bookmarkedIds={bookmarkedIds}
            onNavigateHome={() => router.push('/')}
            onSelectArticle={handleSelectArticle}
            onToggleBookmark={handleToggleBookmark}
            onClearBookmarks={handleClearBookmarks}
          />
        )}
      </main>

      {/* Professional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLeadMagnet={() => handleOpenLeadMagnet()}
        onOpenSitemap={() => setIsSitemapOpen(true)}
        onOpenNextjsArchitecture={() => setIsNextjsModalOpen(true)}
      />

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleSelectArticle}
      />

      <LeadMagnetModal
        isOpen={isLeadMagnetOpen}
        onClose={() => setIsLeadMagnetOpen(false)}
        defaultGoal={leadMagnetGoal}
      />

      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
      />

      <NextjsArchitectureModal
        isOpen={isNextjsModalOpen}
        onClose={() => setIsNextjsModalOpen(false)}
      />
    </div>
  );
}
