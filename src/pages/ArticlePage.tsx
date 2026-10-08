import React, { useState, useEffect } from 'react';
import { 
  Clock, Calendar, User, Bookmark, Share2, Check, Copy, ChefHat, 
  Dumbbell, Flame, Sparkles, MessageSquare, ChevronDown, ChevronUp, 
  ArrowLeft, ThumbsUp, Send, CheckCircle2, ShieldCheck, Download
} from 'lucide-react';
import { Article, Comment } from '../types';
import { AUTHORS } from '../data/authors';
import { ARTICLES } from '../data/articles';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArticleCard } from '../components/ArticleCard';
import { SeoHead } from '../components/SeoHead';
import { 
  transformArticleFaqSectionsToSchema, 
  injectFaqSchemaToHead, 
  FaqJsonLd 
} from '../utils/seoSchema';

interface ArticlePageProps {
  article: Article;
  onNavigateHome: () => void;
  onNavigateCategory: (category: string) => void;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, articleId: string) => void;
  onOpenLeadMagnet: () => void;
  onNavigateAuthor?: (authorId: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  onNavigateHome,
  onNavigateCategory,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  onOpenLeadMagnet,
  onNavigateAuthor,
}) => {
  const author = AUTHORS.find((a) => a.id === article.authorId);
  const relatedArticles = ARTICLES.filter((a) => article.relatedArticleIds.includes(a.id));

  // Recipe interactive states
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Share link copy notification
  const [copiedLink, setCopiedLink] = useState(false);

  // FAQ accordion state
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  // Reading progress
  const [readingProgress, setReadingProgress] = useState(0);

  // Interactive Comments state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      articleId: article.id,
      authorName: 'Sarah Jenkins, MD',
      date: '2 days ago',
      content: 'Superb breakdown of the clinical literature. Especially appreciate highlighting the difference between acute lactate spikes and sustained aerobic mitochondrial biogenesis.',
      likes: 12,
    },
    {
      id: 'c2',
      articleId: article.id,
      authorName: 'David K., Marathoner',
      date: 'Yesterday',
      content: 'Incorporated this protocol into my Sunday long runs and my recovery metrics have improved noticeably. The talk-test metric is dead-on accurate.',
      likes: 6,
    },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Scroll reading progress listener & inject FAQ schema for Google Rich Results
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Transform article FAQ sections into structured JSON-LD FAQPage schema markup and inject into document head
    if (article.faqs && article.faqs.length > 0) {
      injectFaqSchemaToHead(article.faqs, 'fitnshape-article-faq-schema');
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      const existingFaqScript = document.getElementById('fitnshape-article-faq-schema');
      if (existingFaqScript) existingFaqScript.remove();
    };
  }, [article.id, article.faqs]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentContent.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      articleId: article.id,
      authorName: newCommentName,
      date: 'Just now',
      content: newCommentContent,
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentName('');
    setNewCommentContent('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  return (
    <article className="min-h-screen bg-[#FAF8F5] pb-24">
      <SeoHead
        title={article.title}
        description={article.excerpt}
        article={article}
        category={article.category}
        pageType="article"
      />

      {/* Structured FAQPage JSON-LD Schema markup injected directly into article template */}
      <FaqJsonLd faqs={article.faqs} />

      {/* Reading Progress Indicator Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div
          className="h-full bg-[#E06B43] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Article Header Container */}
      <header className="bg-white border-b border-[#D5DFD8] pt-6 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: article.category, onClick: () => onNavigateCategory(article.category) },
              { label: article.title, active: true },
            ]}
          />

          {/* Category & Read Time Kicker (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#64746B] pt-4 mb-3">
            <button
              onClick={() => onNavigateCategory(article.category)}
              className="font-bold text-[#4A6B56] hover:text-[#132E22] uppercase tracking-wider transition-colors cursor-pointer"
            >
              {article.category}
            </button>
            <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
            <span>{article.subcategory}</span>
            <span aria-hidden="true" className="text-[#A3B8AC]">·</span>
            <span className="flex items-center gap-1 font-medium text-[#132E22]">
              <Clock className="w-3.5 h-3.5 text-[#E06B43]" />
              {article.readingTime}
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#132E22] tracking-tight leading-[1.15] mb-4">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#4A6B56] leading-relaxed mb-6 font-normal">
            {article.subtitle}
          </p>

          {/* Author Byline & Medical Review Stamp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#E8EFE9]">
            <div className="flex items-center gap-3.5">
              {author && (
                <button
                  type="button"
                  onClick={() => onNavigateAuthor && onNavigateAuthor(author.id)}
                  className="rounded-full cursor-pointer hover:opacity-90 transition-opacity"
                  title={`View ${author.name}'s profile and credentials`}
                >
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D5DFD8]"
                  />
                </button>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => onNavigateAuthor && author && onNavigateAuthor(author.id)}
                  className="font-bold text-sm text-[#132E22] hover:text-[#E06B43] transition-colors cursor-pointer text-left block"
                >
                  {author?.name}
                </button>
                <div className="text-xs text-[#64746B]">{author?.role}</div>
                <div className="text-[11px] text-[#8FA696] flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>Published {article.publishDate}</span>
                  {article.reviewedBy && (
                    <>
                      <span>·</span>
                      <span className="text-[#334D3D] font-medium flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3 text-[#4A6B56]" /> Medically reviewed by {article.reviewedBy}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Social Sharing & Bookmark Actions */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={(e) => onToggleBookmark(e, article.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#EBF1EC] border-[#4A6B56] text-[#132E22]'
                    : 'bg-white border-[#D5DFD8] text-[#64746B] hover:text-[#132E22]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-[#E06B43]' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-[#D5DFD8] text-[#64746B] hover:text-[#132E22] transition-colors cursor-pointer"
                title="Copy article link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-8 space-y-8">
          {/* Featured Image */}
          <figure className="rounded-2xl overflow-hidden bg-[#E8EFE9] border border-[#D5DFD8] shadow-sm">
            <img
              src={article.featuredImage}
              alt={article.imageAlt}
              className="w-full h-auto aspect-[16/10] object-cover"
            />
            <figcaption className="p-3 text-[11px] text-[#64746B] italic bg-white border-t border-[#E8EFE9]">
              Photo: {article.imageAlt} · Fitnshape Editorial Photography
            </figcaption>
          </figure>

          {/* Quick Table of Contents on Mobile/Tablet */}
          <nav aria-label="Table of contents" className="p-5 rounded-xl bg-white border border-[#D5DFD8] shadow-2xs">
            <h3 className="font-editorial text-sm font-bold uppercase tracking-wider text-[#132E22] mb-2.5 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#E06B43] rounded-full" />
              In This Article
            </h3>
            <ul className="space-y-1.5 text-xs text-[#4A6B56]">
              {article.tableOfContents.map((item, idx) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="hover:text-[#E06B43] hover:underline flex items-center gap-2 transition-colors py-0.5"
                  >
                    <span className="text-[10px] text-[#8FA696] font-mono">0{idx + 1}.</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Introduction Paragraphs */}
          <div className="prose prose-stone max-w-none space-y-4 text-base text-[#1C1F1D] leading-relaxed">
            {article.introduction.map((para, i) => (
              <p
                key={i}
                className={i === 0 ? 'text-lg sm:text-xl font-normal text-[#2D312E] leading-relaxed first-letter:text-4xl first-letter:font-editorial first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-[#132E22]' : ''}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Body Sections */}
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="pt-6 space-y-4 scroll-mt-24">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#132E22] tracking-tight">
                {section.heading}
              </h2>

              {section.subheading && (
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#4A6B56] -mt-2">
                  {section.subheading}
                </h3>
              )}

              {section.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[#1C1F1D] text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {section.callout && (
                <aside
                  aria-label={section.callout.title || 'Key Note'}
                  className={`p-5 rounded-xl border my-5 ${
                    section.callout.type === 'science'
                      ? 'bg-[#EBF1EC] border-[#4A6B56]/30 text-[#132E22]'
                      : 'bg-[#FBEFE9] border-[#E06B43]/30 text-[#1C1F1D]'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1 text-[#E06B43]">
                    <Sparkles className="w-4 h-4" />
                    <span>{section.callout.title || 'Key Clinical Insight'}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{section.callout.text}</p>
                </aside>
              )}

              {section.keyPoints && (
                <div className="bg-white p-5 rounded-xl border border-[#D5DFD8] my-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#132E22] mb-2.5">
                    Key Action Points
                  </h4>
                  <ul className="space-y-2 text-sm text-[#334D3D]">
                    {section.keyPoints.map((kp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#4A6B56] shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}

          {/* Interactive Recipe Card (If Article has Recipe Data) */}
          {article.recipeData && (
            <section
              id="recipe-card"
              className="bg-white rounded-2xl border-2 border-[#132E22] p-6 sm:p-8 my-8 shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EFE9]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E06B43] mb-1">
                    <ChefHat className="w-4 h-4" />
                    <span>Fitnshape Kitchen · Clinical Recipe</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#132E22]">
                    {article.title}
                  </h3>
                </div>

                {/* Serving Scaler */}
                <div className="flex items-center gap-2 self-start sm:self-auto bg-[#FAF8F5] p-1.5 rounded-lg border border-[#D5DFD8]">
                  <span className="text-xs text-[#64746B] font-semibold pl-2">Servings:</span>
                  {[1, 2, 4].map((mult) => (
                    <button
                      key={mult}
                      type="button"
                      onClick={() => setServingsMultiplier(mult)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                        servingsMultiplier === mult
                          ? 'bg-[#132E22] text-white'
                          : 'text-[#4A6B56] hover:bg-[#EBF1EC]'
                      }`}
                    >
                      {article.recipeData!.servings * mult}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nutrition Macro Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-6 border-b border-[#E8EFE9] text-center">
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8EFE9]">
                  <div className="text-[10px] font-bold uppercase text-[#64746B]">Calories</div>
                  <div className="text-xl font-bold text-[#132E22]">{article.recipeData.calories}</div>
                  <div className="text-[10px] text-[#8FA696]">per serving</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8EFE9]">
                  <div className="text-[10px] font-bold uppercase text-[#E06B43]">Protein</div>
                  <div className="text-xl font-bold text-[#132E22]">{article.recipeData.protein}g</div>
                  <div className="text-[10px] text-[#8FA696]">high density</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8EFE9]">
                  <div className="text-[10px] font-bold uppercase text-[#2A6F97]">Carbs</div>
                  <div className="text-xl font-bold text-[#132E22]">{article.recipeData.carbs}g</div>
                  <div className="text-[10px] text-[#8FA696]">complex</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8EFE9]">
                  <div className="text-[10px] font-bold uppercase text-[#D4A373]">Healthy Fat</div>
                  <div className="text-xl font-bold text-[#132E22]">{article.recipeData.fat}g</div>
                  <div className="text-[10px] text-[#8FA696]">monounsaturated</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8EFE9] col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-bold uppercase text-[#4A6B56]">Fiber</div>
                  <div className="text-xl font-bold text-[#132E22]">{article.recipeData.fiber}g</div>
                  <div className="text-[10px] text-[#8FA696]">prebiotic</div>
                </div>
              </div>

              {/* Time stats */}
              <div className="flex items-center gap-6 py-4 text-xs text-[#64746B] border-b border-[#E8EFE9]">
                <div><strong className="text-[#132E22]">Prep:</strong> {article.recipeData.prepTime}</div>
                <div><strong className="text-[#132E22]">Cook:</strong> {article.recipeData.cookTime}</div>
                <div><strong className="text-[#132E22]">Total:</strong> {article.recipeData.totalTime}</div>
              </div>

              {/* Interactive Ingredients Checklist */}
              <div className="py-6 border-b border-[#E8EFE9]">
                <h4 className="font-editorial text-lg font-bold text-[#132E22] mb-3">
                  Ingredients Checklist (Tap to check off)
                </h4>
                <ul className="space-y-2.5">
                  {article.recipeData.ingredients.map((ing, idx) => {
                    const isChecked = !!checkedIngredients[idx];
                    return (
                      <li
                        key={idx}
                        onClick={() => toggleIngredient(idx)}
                        className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                          isChecked ? 'bg-[#EBF1EC]/60 text-[#8FA696]' : 'hover:bg-[#FAF8F5] text-[#1C1F1D]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-1 rounded text-[#132E22] focus:ring-[#132E22] cursor-pointer"
                        />
                        <span className={`text-sm ${isChecked ? 'line-through text-[#8FA696]' : ''}`}>
                          <strong className="font-semibold text-[#132E22]">{ing.amount}</strong> {ing.item}
                          {ing.notes && <span className="text-xs text-[#64746B] italic ml-1.5">({ing.notes})</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="pt-6 space-y-4">
                <h4 className="font-editorial text-lg font-bold text-[#132E22] mb-3">
                  Preparation Instructions
                </h4>
                <ol className="space-y-4">
                  {article.recipeData.instructions.map((step) => (
                    <li key={step.step} className="flex gap-4">
                      <div className="w-7 h-7 rounded-full bg-[#132E22] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {step.step}
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-[#132E22]">{step.title}</h5>
                        <p className="text-sm text-[#334D3D] leading-relaxed">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {/* Interactive Workout Card (If Article has Workout Data) */}
          {article.workoutData && (
            <section
              id="workout-card"
              className="bg-white rounded-2xl border-2 border-[#132E22] p-6 sm:p-8 my-8 shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EFE9]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E06B43] mb-1">
                    <Dumbbell className="w-4 h-4" />
                    <span>Fitnshape Training Lab · Structured Protocol</span>
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-[#132E22]">
                    {article.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold bg-[#EBF1EC] text-[#132E22] px-3 py-1 rounded-md">
                    Level: {article.workoutData.difficulty}
                  </span>
                  <span className="font-semibold bg-[#FAF8F5] text-[#64746B] border border-[#D5DFD8] px-3 py-1 rounded-md">
                    {article.workoutData.duration}
                  </span>
                </div>
              </div>

              {/* Target Muscles & Equipment */}
              <div className="py-4 border-b border-[#E8EFE9] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <strong className="text-[#132E22] block mb-1">Muscles Targeted:</strong>
                  <span className="text-[#4A6B56]">{article.workoutData.musclesTargeted.join(', ')}</span>
                </div>
                <div>
                  <strong className="text-[#132E22] block mb-1">Required Equipment:</strong>
                  <span className="text-[#4A6B56]">{article.workoutData.equipment.join(', ')}</span>
                </div>
              </div>

              {/* Exercises Table */}
              <div className="pt-6 space-y-4">
                <h4 className="font-editorial text-lg font-bold text-[#132E22]">
                  The Exercise Routine
                </h4>
                <div className="space-y-3">
                  {article.workoutData.exercises.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8EFE9] space-y-2 hover:border-[#4A6B56]/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h5 className="font-bold text-base text-[#132E22]">{ex.name}</h5>
                          <span className="text-xs text-[#4A6B56]">{ex.targetMuscle}</span>
                        </div>
                        <div className="text-right text-xs font-semibold text-[#132E22] bg-white px-2.5 py-1 rounded border border-[#D5DFD8]">
                          {ex.sets} Sets × {ex.reps}
                        </div>
                      </div>

                      <div className="text-xs text-[#64746B] flex items-center justify-between pt-1">
                        <span><strong>Rest:</strong> {ex.rest}</span>
                      </div>

                      <div className="text-xs text-[#334D3D] bg-white p-2.5 rounded-lg border border-[#E8EFE9] italic">
                        <strong>Form Cue:</strong> {ex.formCue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Accordion FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <section id="faqs" className="pt-8 space-y-4 scroll-mt-24">
              <h2 className="font-editorial text-2xl font-bold text-[#132E22]">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {article.faqs.map((faq, idx) => {
                  const isOpen = !!openFaqs[idx];
                  return (
                    <div
                      key={idx}
                      className="border border-[#D5DFD8] rounded-xl bg-white overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#132E22] hover:bg-[#FAF8F5] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-[#E06B43] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#8FA696] shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-1 text-sm text-[#4A6B56] leading-relaxed border-t border-[#F5F2EB] bg-[#FAF8F5]/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Contextual Lead Magnet CTA */}
          <section className="bg-[#132E22] rounded-2xl p-7 text-white relative overflow-hidden mt-12">
            <div className="relative z-10 space-y-3 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
                Free Digital Resource
              </span>
              <h3 className="font-editorial text-2xl font-bold text-white leading-snug">
                Take this protocol further with our Free 7-Day Starter Guide.
              </h3>
              <p className="text-xs sm:text-sm text-[#CADAD0] leading-relaxed">
                Includes printable grocery shopping lists, 21 balanced high-protein recipes, and a 12-week progressive overload log.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenLeadMagnet}
                  className="py-3 px-6 rounded-lg bg-[#E06B43] hover:bg-[#C5532C] text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Get My Free Guide</span>
                </button>
              </div>
            </div>
          </section>

          {/* Author Bio Card */}
          {author && (
            <aside aria-label="Author Profile" className="p-6 rounded-2xl bg-white border border-[#D5DFD8] flex flex-col sm:flex-row gap-5 items-start mt-8 shadow-2xs">
              <button
                type="button"
                onClick={() => onNavigateAuthor && onNavigateAuthor(author.id)}
                className="cursor-pointer shrink-0 rounded-full hover:opacity-90 transition-opacity"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D5DFD8]"
                />
              </button>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigateAuthor && onNavigateAuthor(author.id)}
                    className="font-editorial text-lg font-bold text-[#132E22] hover:text-[#E06B43] transition-colors cursor-pointer text-left"
                  >
                    About {author.name}
                  </button>
                  <span className="text-xs text-[#4A6B56] font-semibold">{author.articleCount} Published Articles</span>
                </div>
                <div className="text-xs font-semibold text-[#E06B43]">{author.credentials}</div>
                <p className="text-xs text-[#64746B] leading-relaxed pt-1">{author.bio}</p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigateAuthor && onNavigateAuthor(author.id)}
                    className="text-xs font-bold text-[#132E22] hover:text-[#E06B43] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Author Profile & Publication History</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </aside>
          )}

          {/* Interactive Comments Section */}
          <section id="comments" className="pt-10 border-t border-[#D5DFD8] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-2xl font-bold text-[#132E22] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#4A6B56]" />
                <span>Discussion ({comments.length})</span>
              </h3>
              <span className="text-xs text-[#64746B]">Moderated by Editorial Team</span>
            </div>

            {/* Post Comment Form */}
            <form onSubmit={handleAddComment} className="bg-white p-5 rounded-2xl border border-[#D5DFD8] space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#132E22]">
                Leave a Question or Reflection
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Jordan Smith)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#D5DFD8] text-xs text-[#1C1F1D] focus:ring-1 focus:ring-[#132E22] focus:outline-none"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Share your experience or ask our editorial team a question..."
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] text-xs text-[#1C1F1D] focus:ring-1 focus:ring-[#132E22] focus:outline-none"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-[#8FA696]">Respectful and evidence-based dialogue only.</span>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-[#132E22] hover:bg-[#1D4332] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3 h-3 text-[#E06B43]" />
                  <span>Submit Comment</span>
                </button>
              </div>
              {commentSubmitted && (
                <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-md">
                  Thank you! Your comment has been posted to the discussion thread.
                </div>
              )}
            </form>

            {/* Comments List */}
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 rounded-xl bg-white border border-[#E8EFE9] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#132E22]">{comment.authorName}</span>
                    <span className="text-[11px] text-[#8FA696]">{comment.date}</span>
                  </div>
                  <p className="text-xs text-[#4A6B56] leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles ("Read Next") */}
          {relatedArticles.length > 0 && (
            <section className="pt-10 border-t border-[#D5DFD8] space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl font-bold text-[#132E22]">
                  Recommended Next Reads
                </h3>
                <span className="text-xs text-[#64746B]">Handpicked by editors</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedArticles.map((rel) => (
                  <ArticleCard
                    key={rel.id}
                    article={rel}
                    onSelect={onSelectArticle}
                    isBookmarked={false}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 space-y-6">
          {/* Sticky Table of Contents Container */}
          <div className="sticky top-24 space-y-6">
            <div className="p-5 rounded-2xl bg-white border border-[#D5DFD8] shadow-2xs">
              <h4 className="font-editorial text-sm font-bold uppercase tracking-wider text-[#132E22] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#E06B43] rounded-full" />
                Table of Contents
              </h4>
              <ul className="space-y-2 text-xs text-[#4A6B56]">
                {article.tableOfContents.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-[#E06B43] hover:underline transition-colors block py-1 border-b border-[#F5F2EB] last:border-b-0"
                    >
                      <span className="text-[10px] text-[#8FA696] font-mono mr-1.5">0{idx + 1}.</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Lead Magnet Box */}
            <div className="p-5 rounded-2xl bg-[#EBF1EC] border border-[#D5DFD8] text-center space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E06B43]">
                Free Download
              </span>
              <h5 className="font-editorial text-lg font-bold text-[#132E22] leading-snug">
                7-Day Starter Guide
              </h5>
              <p className="text-xs text-[#4A6B56] leading-relaxed">
                Workouts, recipes, and daily habit trackers delivered instantly to your inbox.
              </p>
              <button
                type="button"
                onClick={onOpenLeadMagnet}
                className="w-full py-2.5 px-4 rounded-lg bg-[#E06B43] hover:bg-[#C5532C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Download Free Guide
              </button>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};
