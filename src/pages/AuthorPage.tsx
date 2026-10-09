import React from 'react';
import { 
  ShieldCheck, Award, BookOpen, GraduationCap, Globe, 
  ExternalLink, Calendar, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { Author, Article } from '../types';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';

interface AuthorPageProps {
  author: Author;
  onNavigateHome: () => void;
  onSelectArticle: (article: Article) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (e: React.MouseEvent, articleId: string) => void;
}

export const AuthorPage: React.FC<AuthorPageProps> = ({
  author,
  onNavigateHome,
  onSelectArticle,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  // Find all articles written by this author
  const authorArticles = ARTICLES.filter((a) => a.authorId === author.id);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <SeoHead
        title={`${author.name} | Fitnshape Author & Editorial Profile`}
        description={author.bio}
        author={author}
        pageType="author"
      />

      {/* Hero Author Header Banner */}
      <div className="bg-[#132E22] text-white py-14 px-4 sm:px-8 border-b border-[#1D4332] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'Editorial Lead', onClick: onNavigateHome },
              { label: `Author: ${author.name}`, active: true },
            ]}
            className="text-emerald-200/80 mb-6"
          />

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative shrink-0">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-[#E06B43] text-white p-1.5 rounded-lg shadow-md" title="Verified Editorial Author">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43] bg-white/10 px-3 py-1 rounded-full">
                  Lead Author & Writer
                </span>
                {author.medicalReviewer && (
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Editorial Board
                  </span>
                )}
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                Author: {author.name}
              </h1>

              <div className="text-sm font-semibold text-emerald-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E06B43]" />
                <span>{author.credentials}</span>
              </div>

              <div className="text-xs text-[#CADAD0]">{author.role}</div>

              <p className="text-sm text-[#E8EFE9] leading-relaxed max-w-3xl pt-1">
                {author.bio}
              </p>

              {/* Education / AlumniOf metadata */}
              {author.alumniOf && (
                <div className="flex items-center gap-2 text-xs text-[#CADAD0] pt-1">
                  <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Educated at: <strong>{author.alumniOf}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Body: Credentials, Areas of Expertise & Publication History */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar: Credentials & Areas of Knowledge */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D5DFD8] shadow-2xs space-y-4">
            <h3 className="font-editorial text-lg font-bold text-[#132E22] border-b border-[#E8EFE9] pb-3">
              Editorial Credential Verification
            </h3>

            <div className="space-y-3 text-xs text-[#4A6B56]">
              <div>
                <strong className="block text-[#132E22] mb-0.5">Primary Accreditation:</strong>
                <span>{author.credentials}</span>
              </div>

              {author.alumniOf && (
                <div>
                  <strong className="block text-[#132E22] mb-0.5">Academic Background:</strong>
                  <span>{author.alumniOf}</span>
                </div>
              )}

              <div>
                <strong className="block text-[#132E22] mb-0.5">Editorial Role:</strong>
                <span>{author.role}</span>
              </div>

              <div>
                <strong className="block text-[#132E22] mb-0.5">Publishing Principles:</strong>
                <span>Adheres to Fitnshape Peer-Review & Evidence Guidelines</span>
              </div>
            </div>
          </div>

          {/* Areas of Expertise */}
          {author.knowsAbout && (
            <div className="bg-white p-6 rounded-2xl border border-[#D5DFD8] shadow-2xs space-y-3">
              <h3 className="font-editorial text-lg font-bold text-[#132E22] border-b border-[#E8EFE9] pb-3">
                Areas of Expertise (Schema)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {author.knowsAbout.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#FAF8F5] text-[#132E22] border border-[#D5DFD8] px-2.5 py-1 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Publication History */}
        <main className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#D5DFD8] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
                Publication History
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#132E22]">
                Articles Authored ({authorArticles.length})
              </h2>
            </div>
            <span className="text-xs text-[#64746B]">Peer-reviewed archives</span>
          </div>

          {authorArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {authorArticles.map((art) => (
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
            <div className="p-8 text-center bg-white rounded-2xl border border-[#D5DFD8] text-xs text-[#64746B]">
              No standalone articles currently assigned. Check back for upcoming editorial publications.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
