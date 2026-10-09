import React from 'react';
import { Bookmark, Clock, Eye, ChefHat, Dumbbell } from 'lucide-react';
import { Article } from '../types';
import { AUTHORS } from '../data/authors';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  variant?: 'standard' | 'large' | 'compact' | 'horizontal';
  isBookmarked?: boolean;
  onToggleBookmark?: (e: React.MouseEvent, articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  variant = 'standard',
  isBookmarked = false,
  onToggleBookmark,
}) => {
  const author = AUTHORS.find((a) => a.id === article.authorId);

  if (variant === 'compact') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer flex gap-4 py-3.5 border-b border-[#E8EFE9] last:border-b-0 hover:bg-[#F5F2EB]/50 px-2 rounded-lg transition-colors"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-[#E8EFE9]">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            {/* Zero-Pill clean metadata kicker */}
            <div className="text-[11px] font-semibold text-[#4A6B56] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>{article.category}</span>
              <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
              <span className="font-normal text-[#64746B]">{article.readingTime}</span>
            </div>

            <h4 className="font-editorial text-sm sm:text-base font-bold text-[#132E22] leading-snug group-hover:text-[#E06B43] transition-colors line-clamp-2">
              {article.title}
            </h4>
          </div>

          <div className="text-[11px] text-[#64746B] flex items-center gap-2 mt-1">
            <span>Author: {author?.name || 'Admin'}</span>
            <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
            <span>{article.publishDate}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-2xl bg-white border border-[#D5DFD8] hover:border-[#4A6B56]/40 transition-all duration-300 shadow-xs hover:shadow-md"
      >
        <div className="md:col-span-5 aspect-[16/10] md:aspect-auto rounded-xl overflow-hidden bg-[#E8EFE9] relative">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
          {article.recipeData && (
            <div className="absolute top-3 left-3 bg-[#132E22]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
              <ChefHat className="w-3.5 h-3.5 text-[#E06B43]" />
              <span>{article.recipeData.protein}g Protein</span>
            </div>
          )}
          {article.workoutData && (
            <div className="absolute top-3 left-3 bg-[#132E22]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
              <Dumbbell className="w-3.5 h-3.5 text-[#E06B43]" />
              <span>{article.workoutData.duration}</span>
            </div>
          )}
        </div>

        <div className="md:col-span-7 flex flex-col justify-between">
          <div>
            {/* Zero-Pill clean metadata */}
            <div className="flex items-center justify-between text-xs text-[#64746B] mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#4A6B56] uppercase tracking-wider">{article.category}</span>
                <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
                <span>{article.subcategory}</span>
                <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#8FA696]" />
                  {article.readingTime}
                </span>
              </div>

              {onToggleBookmark && (
                <button
                  type="button"
                  onClick={(e) => onToggleBookmark(e, article.id)}
                  className={`p-1.5 rounded-full hover:bg-[#F5F2EB] transition-colors ${
                    isBookmarked ? 'text-[#E06B43]' : 'text-[#8FA696] hover:text-[#132E22]'
                  }`}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>

            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#132E22] group-hover:text-[#E06B43] transition-colors leading-snug mb-2.5">
              {article.title}
            </h3>

            <p className="text-sm text-[#4A6B56] line-clamp-2 leading-relaxed mb-4">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#E8EFE9] text-xs text-[#64746B]">
            <div className="flex items-center gap-2.5">
              {author && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-6 h-6 rounded-full object-cover border border-[#D5DFD8]"
                />
              )}
              <span className="font-medium text-[#132E22]">Author: {author?.name || 'Admin'}</span>
            </div>

            <span className="text-[11px]">{article.publishDate}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'large') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer rounded-2xl bg-white border border-[#D5DFD8] overflow-hidden hover:border-[#4A6B56]/50 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#E8EFE9]">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
          {onToggleBookmark && (
            <button
              type="button"
              onClick={(e) => onToggleBookmark(e, article.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-xs transition-colors shadow-sm ${
                isBookmarked ? 'text-[#E06B43]' : 'text-[#64746B] hover:text-[#132E22]'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          )}

          {article.isTrending && (
            <div className="absolute top-4 left-4 bg-[#E06B43] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm">
              Trending
            </div>
          )}
        </div>

        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            {/* Zero-Pill clean metadata */}
            <div className="flex items-center gap-2 text-xs text-[#64746B] mb-2.5">
              <span className="font-bold text-[#4A6B56] uppercase tracking-wider">{article.category}</span>
              <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
              <span>{article.subcategory}</span>
              <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8FA696]" />
                {article.readingTime}
              </span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#132E22] group-hover:text-[#E06B43] transition-colors leading-tight mb-3">
              {article.title}
            </h3>

            <p className="text-[#4A6B56] text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {article.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E8EFE9]">
            <div className="flex items-center gap-3">
              {author && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#D5DFD8]"
                />
              )}
              <div>
                <div className="text-xs font-bold text-[#132E22]">Author: {author?.name || 'Admin'}</div>
                <div className="text-[11px] text-[#64746B]">{article.publishDate}</div>
              </div>
            </div>

            <div className="text-[11px] font-semibold text-[#132E22] group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Read Article</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Editorial Card
  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer rounded-2xl bg-white border border-[#D5DFD8] overflow-hidden hover:border-[#4A6B56]/50 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E8EFE9]">
        <img
          src={article.featuredImage}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
        />

        {onToggleBookmark && (
          <button
            type="button"
            onClick={(e) => onToggleBookmark(e, article.id)}
            className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs transition-colors shadow-2xs ${
              isBookmarked ? 'text-[#E06B43]' : 'text-[#64746B] hover:text-[#132E22]'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        )}

        {article.recipeData && (
          <div className="absolute bottom-3 left-3 bg-[#132E22]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
            <ChefHat className="w-3 h-3 text-[#E06B43]" />
            <span>{article.recipeData.totalTime}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill clean metadata */}
          <div className="flex items-center gap-2 text-[11px] text-[#64746B] mb-2">
            <span className="font-bold text-[#4A6B56] uppercase tracking-wider">{article.category}</span>
            <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#132E22] group-hover:text-[#E06B43] transition-colors leading-snug mb-2 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#4A6B56] line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E8EFE9] text-xs text-[#64746B]">
          <span className="truncate max-w-[140px] text-[#132E22] font-medium">Author: {author?.name || 'Admin'}</span>
          <span className="text-[11px]">{article.publishDate}</span>
        </div>
      </div>
    </article>
  );
};
