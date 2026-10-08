import React, { useState, useEffect } from 'react';
import { Search, X, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const popularTags = ['Zone 2', 'Protein', 'Hypertrophy', 'Recipes', 'Mobility', 'Sleep', 'Gut Health'];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    if (!matchesTag) return false;

    if (!query.trim()) return selectedTag ? true : false;

    const q = query.toLowerCase();
    const inTitle = article.title.toLowerCase().includes(q);
    const inSubtitle = article.subtitle.toLowerCase().includes(q);
    const inExcerpt = article.excerpt.toLowerCase().includes(q);
    const inCategory = article.category.toLowerCase().includes(q);
    const inTags = article.tags.some((t) => t.toLowerCase().includes(q));

    return inTitle || inSubtitle || inExcerpt || inCategory || inTags;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#0D2118]/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#D5DFD8] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site Search"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#D5DFD8] bg-white">
          <Search className="w-5 h-5 text-[#4A6B56]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workouts, recipes, sleep protocols, nutrients..."
            className="flex-1 bg-transparent border-none text-[#132E22] placeholder-[#8FA696] focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8FA696] hover:text-[#132E22] text-xs px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64746B] hover:text-[#132E22] hover:bg-[#F5F2EB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Filters */}
        <div className="px-5 py-3 bg-[#F5F2EB]/60 border-b border-[#E8EFE9] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-[#64746B] uppercase tracking-wider shrink-0">
            Popular Topics:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors shrink-0 ${
                selectedTag === tag
                  ? 'bg-[#132E22] text-white font-medium'
                  : 'bg-white text-[#4A6B56] hover:bg-[#EBF1EC] border border-[#D5DFD8]'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="group p-3.5 rounded-xl bg-white border border-[#E8EFE9] hover:border-[#4A6B56]/50 hover:shadow-xs transition-all cursor-pointer flex gap-3.5 items-center"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#E8EFE9]">
                  <img
                    src={article.featuredImage}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-[#64746B] mb-0.5">
                    <span className="font-bold text-[#4A6B56] uppercase">{article.category}</span>
                    <span>·</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h4 className="font-editorial text-sm font-bold text-[#132E22] group-hover:text-[#E06B43] transition-colors truncate">
                    {article.title}
                  </h4>

                  <p className="text-xs text-[#64746B] line-clamp-1 mt-0.5">
                    {article.excerpt}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-[#8FA696] group-hover:text-[#132E22] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          ) : query || selectedTag ? (
            <div className="text-center py-12 text-sm text-[#64746B] space-y-2">
              <BookOpen className="w-8 h-8 text-[#A3B8AC] mx-auto opacity-70" />
              <p>No articles found matching your search. Try searching for "salmon", "cardio", or "sleep".</p>
            </div>
          ) : (
            <div className="py-8 px-4 text-center">
              <span className="text-xs font-semibold text-[#64746B] uppercase tracking-wider block mb-3">
                Featured Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                {ARTICLES.slice(0, 4).map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-2.5 rounded-lg bg-white border border-[#E8EFE9] hover:bg-[#F5F2EB] text-left text-xs font-medium text-[#132E22] transition-colors"
                  >
                    <div className="text-[10px] text-[#4A6B56] font-bold uppercase">{art.category}</div>
                    <div className="truncate font-bold mt-0.5">{art.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
