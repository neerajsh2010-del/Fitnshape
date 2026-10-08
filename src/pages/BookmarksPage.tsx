import React from 'react';
import { Bookmark, BookOpen, Trash2 } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';

interface BookmarksPageProps {
  bookmarkedIds: string[];
  onNavigateHome: () => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (e: React.MouseEvent, articleId: string) => void;
  onClearBookmarks: () => void;
}

export const BookmarksPage: React.FC<BookmarksPageProps> = ({
  bookmarkedIds,
  onNavigateHome,
  onSelectArticle,
  onToggleBookmark,
  onClearBookmarks,
}) => {
  const savedArticles = ARTICLES.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <SeoHead
        title="Saved Reading List & Bookmarks"
        description="Access your saved fitness workouts, healthy recipes, and clinical wellness articles."
      />

      <div className="bg-[#132E22] text-white py-14 px-4 sm:px-8 border-b border-[#1D4332]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'Saved Reading List', active: true },
            ]}
            className="text-emerald-200/80 mb-3"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
                Your Reading Queue
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Saved Articles ({savedArticles.length})
              </h1>
              <p className="text-sm text-emerald-100/90 font-normal">
                Articles bookmarked on your device for easy offline reading and reference.
              </p>
            </div>

            {savedArticles.length > 0 && (
              <button
                onClick={onClearBookmarks}
                className="self-start sm:self-auto py-2 px-3.5 rounded-lg bg-[#0D2118] border border-[#2D5A42] hover:bg-red-950/40 text-xs text-red-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Saved</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10">
        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onSelect={onSelectArticle}
                isBookmarked={true}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#D5DFD8] p-12 text-center space-y-4 max-w-lg mx-auto mt-8">
            <div className="w-14 h-14 rounded-full bg-[#EBF1EC] text-[#132E22] flex items-center justify-center mx-auto">
              <Bookmark className="w-7 h-7 text-[#E06B43]" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#132E22]">
              No Saved Articles Yet
            </h3>
            <p className="text-xs text-[#64746B] leading-relaxed">
              Tap the bookmark icon on any article card or guide header to save it for your next gym session, meal prep day, or quiet morning read.
            </p>
            <button
              onClick={onNavigateHome}
              className="py-2.5 px-5 rounded-lg bg-[#132E22] hover:bg-[#1D4332] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-block"
            >
              Browse Latest Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
