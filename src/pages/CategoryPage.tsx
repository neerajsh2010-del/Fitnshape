import React, { useState } from 'react';
import { Filter, ArrowUpDown, Search, BookOpen, Clock } from 'lucide-react';
import { Article, CategoryType } from '../types';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';

interface CategoryPageProps {
  categoryName: string;
  onNavigateHome: () => void;
  onSelectArticle: (article: Article) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (e: React.MouseEvent, articleId: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryName,
  onNavigateHome,
  onSelectArticle,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const isAllBlog = categoryName === 'All' || categoryName === 'Blog';
  const categoryMeta = CATEGORIES.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'time'>('latest');

  // Filter articles
  const articlesInCategory = ARTICLES.filter((art) => {
    if (!isAllBlog && art.category.toLowerCase() !== categoryName.toLowerCase()) {
      return false;
    }
    if (selectedSubcategory !== 'All' && art.subcategory !== selectedSubcategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = art.title.toLowerCase().includes(q);
      const inExcerpt = art.excerpt.toLowerCase().includes(q);
      const inTags = art.tags.some((t) => t.toLowerCase().includes(q));
      return inTitle || inExcerpt || inTags;
    }
    return true;
  });

  // Sort articles
  const sortedArticles = [...articlesInCategory].sort((a, b) => {
    if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
    if (sortBy === 'time') return parseInt(a.readingTime) - parseInt(b.readingTime);
    return 0; // Default latest order
  });

  const availableSubcategories = categoryMeta
    ? ['All', ...categoryMeta.subcategories]
    : ['All', 'Cardio', 'Strength', 'Protein', 'Mobility', 'Sleep'];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <SeoHead
        title={categoryMeta ? `${categoryMeta.name} – Evidence-Based Guides & Science` : 'All Articles & Archives'}
        description={categoryMeta?.description || 'Explore the complete archive of Fitnshape fitness, workouts, nutrition, healthy recipes, and mobility articles.'}
        category={categoryMeta?.name}
        pageType="category"
      />

      {/* Hero Category Banner */}
      <div className="bg-[#132E22] text-white py-14 px-4 sm:px-8 border-b border-[#1D4332] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: categoryMeta?.name || 'All Articles', active: true },
            ]}
            className="text-emerald-200/80 mb-3"
          />

          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
              Fitnshape Editorial Hub
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              {categoryMeta?.name || 'Complete Editorial Archive'}
            </h1>
            <p className="text-base text-emerald-100/90 leading-relaxed font-normal">
              {categoryMeta?.description ||
                'Browse hundreds of clinical guides, tested training templates, and nutrient-dense recipes designed to elevate your vitality.'}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="bg-white p-4 rounded-2xl border border-[#D5DFD8] shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Interactive Subcategory Filter Controls */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-[#64746B] uppercase tracking-wider mr-1 shrink-0">
                Topics:
              </span>
              {availableSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                    selectedSubcategory === sub
                      ? 'bg-[#132E22] text-white shadow-2xs font-bold'
                      : 'bg-[#FAF8F5] text-[#4A6B56] hover:bg-[#EBF1EC] border border-[#E8EFE9]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* In-category Search & Sort */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Filter this section..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#D5DFD8] text-xs text-[#1C1F1D] placeholder-[#8FA696] focus:outline-none focus:ring-1 focus:ring-[#132E22]"
                />
                <Search className="w-3.5 h-3.5 text-[#8FA696] absolute left-2.5 top-2" />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort articles"
                className="px-3 py-1.5 rounded-lg border border-[#D5DFD8] text-xs text-[#1C1F1D] bg-white focus:outline-none cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="time">Shortest Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="py-4 text-xs text-[#64746B] flex items-center justify-between">
          <span>
            Showing <strong className="text-[#132E22]">{sortedArticles.length}</strong> articles
            {selectedSubcategory !== 'All' && ` in ${selectedSubcategory}`}
          </span>
        </div>

        {/* Article Grid */}
        {sortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onSelect={onSelectArticle}
                isBookmarked={bookmarkedIds.includes(art.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#D5DFD8] p-12 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-[#A3B8AC] mx-auto opacity-70" />
            <h3 className="font-editorial text-lg font-bold text-[#132E22]">
              No articles found matching filters
            </h3>
            <p className="text-xs text-[#64746B] max-w-sm mx-auto">
              Try resetting your search query or selecting "All" to browse all published articles.
            </p>
            <button
              onClick={() => {
                setSelectedSubcategory('All');
                setSearchQuery('');
              }}
              className="py-2 px-4 rounded-lg bg-[#132E22] text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
