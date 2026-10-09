import React, { useState } from 'react';
import { 
  ArrowRight, Flame, Clock, Bookmark, Sparkles, ChefHat, Dumbbell, 
  Download, ShieldCheck, CheckCircle2, TrendingUp, Compass, Award, 
  ExternalLink, ChevronRight, Activity, Zap, Star, Flower2, Leaf, 
  User, Heart, Send, Instagram, Facebook, Youtube
} from 'lucide-react';
import { Article, CategoryType } from '../types';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { AUTHORS } from '../data/authors';
import { ArticleCard } from '../components/ArticleCard';
import { CalculatorTool } from '../components/CalculatorTool';
import { SeoHead } from '../components/SeoHead';
import { FitnshapeLogo } from '../components/FitnshapeLogo';

interface HomePageProps {
  onSelectArticle: (article: Article) => void;
  onNavigateCategory: (category: string) => void;
  onNavigateView: (view: string) => void;
  onOpenLeadMagnet: (goal?: string) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (e: React.MouseEvent, articleId: string) => void;
  onNavigateAuthor?: (authorId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectArticle,
  onNavigateCategory,
  onNavigateView,
  onOpenLeadMagnet,
  bookmarkedIds,
  onToggleBookmark,
  onNavigateAuthor,
}) => {
  // Inline Lead Magnet form state
  const [inlineName, setInlineName] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineGoal, setInlineGoal] = useState('Sustainable Fat Loss & Tone');
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  // Footer newsletter strip email
  const [stripEmail, setStripEmail] = useState('');
  const [stripSubmitted, setStripSubmitted] = useState(false);

  // Lead editorial article
  const leadArticle = ARTICLES.find((a) => a.id === 'zone-2-cardio-longevity') || ARTICLES[0];
  const secondaryLead = ARTICLES.find((a) => a.id === 'four-day-strength-split') || ARTICLES[1];
  const tertiaryLead = ARTICLES.find((a) => a.id === 'protein-timing-science') || ARTICLES[2];

  // Specific categorized articles
  const workoutArticles = ARTICLES.filter((a) => a.category === 'Workouts' || a.category === 'Fitness');
  const nutritionArticles = ARTICLES.filter((a) => a.category === 'Nutrition');
  const recipeArticles = ARTICLES.filter((a) => a.category === 'Healthy Recipes');
  const mobilityArticles = ARTICLES.filter((a) => a.category === 'Yoga & Mobility');
  const wellnessArticles = ARTICLES.filter((a) => a.category === 'Health & Wellness' || a.category === 'Lifestyle');
  const trendingArticles = ARTICLES.filter((a) => a.isTrending);

  const handleInlineLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineName.trim() || !inlineEmail.trim()) return;
    setInlineSubmitted(true);
  };

  const handleStripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripEmail.trim()) return;
    setStripSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <SeoHead
        title="Fitnshape | Fitness, Health & Nutrition Magazine – Move Better. Eat Better. Live Better."
        description="Evidence-based fitness training, clinical nutrition science, nutrient-dense recipes, and mobility protocols curated by certified practitioners."
        pageType="home"
      />

      {/* =========================================================
          HERO SECTION (As per Reference Image)
          FEEL STRONG. LIVE BETTER. with Athletic Fitness Girl
         ========================================================= */}
      <section className="relative bg-[#FAF7F2] overflow-hidden pt-8 pb-16 lg:py-16 border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Terracotta Kicker */}
            <div className="text-xs font-bold uppercase tracking-widest text-[#D95B32]">
              STRONG BODY. CALM MIND. <span className="text-[#3F5441]">UNSTOPPABLE YOU.</span>
            </div>

            {/* Impact Condensed Headline */}
            <h1 className="font-impact text-6xl sm:text-7xl lg:text-[96px] tracking-normal leading-[0.88] text-[#1C1F1D] uppercase">
              Feel<br />
              Strong.<br />
              <span className="text-[#3F5441]">Live Better.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-[#5A685D] leading-relaxed max-w-md font-normal">
              Personalized fitness & wellness coaching to help you move better, feel better, and live the life you deserve.
            </p>

            {/* CTA Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onOpenLeadMagnet()}
                className="py-3.5 px-7 rounded-md bg-[#3F5441] hover:bg-[#2F3F31] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 cursor-pointer"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Proof / Trust indicator (as per reference) */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1C1F1D]">
                TRUSTED BY 1,000+ CLIENTS & READERS
              </div>

              <div className="flex items-center gap-2">
                {/* Overlapping client avatars */}
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#FAF7F2] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar 1"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#FAF7F2] object-cover"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar 2"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#FAF7F2] object-cover"
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar 3"
                  />
                  <img
                    className="inline-block h-7 w-7 rounded-full ring-2 ring-[#FAF7F2] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                    alt="Client avatar 4"
                  />
                </div>

                {/* 5 Stars Rating */}
                <div className="flex items-center text-[#D95B32] gap-0.5 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-[#1C1F1D] ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Photography of Athletic Fitness Woman */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#E8E2D8]">
              {/* Main Fitness Model Photo */}
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
                alt="Athletic fitness woman sitting poised on gym mat in sports bra and leggings in bright natural studio light"
                className="w-full h-full object-cover"
              />

              {/* Bottom Subtle Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Shaker / Bottle Branding Badge */}
              <div className="absolute bottom-4 right-4 bg-[#1C1F1D]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg border border-white/20">
                Fitnshape Pro
              </div>

              {/* Feature Article Quick Trigger */}
              <div 
                onClick={() => onSelectArticle(leadArticle)}
                className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-xl max-w-[240px] shadow-lg cursor-pointer hover:bg-white transition-colors"
              >
                <div className="text-[10px] font-bold uppercase text-[#D95B32] mb-0.5">Featured Protocol</div>
                <div className="text-xs font-bold text-[#1C1F1D] truncate">{leadArticle.title}</div>
                <div className="text-[10px] text-[#5A685D] mt-0.5 flex items-center gap-1">
                  <span>{leadArticle.readingTime}</span>
                  <span>·</span>
                  <span className="text-[#3F5441] font-semibold">Read Now →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: SIGNATURE PROGRAMS / FOCUS AREAS
          (Programs Designed For You - 3 Arched Cards as per Reference)
         ========================================================= */}
      <section className="py-16 sm:py-20 bg-[#F4EFE6] border-b border-[#E2DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#D95B32] mb-1">
                SIGNATURE PROGRAMS —
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#1C1F1D]">
                Programs Designed For You
              </h2>
            </div>

            <button
              onClick={() => onNavigateCategory('Workouts')}
              className="text-xs font-bold text-[#1C1F1D] hover:text-[#D95B32] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>VIEW ALL PROGRAMS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Arched Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: PERSONAL TRAINING */}
            <div 
              onClick={() => onNavigateCategory('Workouts')}
              className="group cursor-pointer rounded-2xl bg-white border border-[#DDD5C7] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD5C7]">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
                  alt="Personal training with dumbbell lifting in gym"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Circle Icon Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#3F5441] border-3 border-white text-white flex items-center justify-center shadow-md">
                  <Dumbbell className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-8 p-6 text-center space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#1C1F1D] uppercase tracking-wider group-hover:text-[#3F5441] transition-colors">
                    PERSONAL TRAINING
                  </h3>
                  <p className="text-xs text-[#5A685D] leading-relaxed mt-2">
                    1-on-1 training programs built around your goals, lifestyle, and fitness level.
                  </p>
                </div>

                <div className="pt-3">
                  <span className="text-xs font-bold text-[#1C1F1D] group-hover:text-[#D95B32] tracking-wider uppercase inline-flex items-center gap-1 transition-colors">
                    <span>EXPLORE</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: MIND + BODY (Mobility & Yoga) */}
            <div 
              onClick={() => onNavigateCategory('Yoga & Mobility')}
              className="group cursor-pointer rounded-2xl bg-white border border-[#DDD5C7] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD5C7]">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                  alt="Woman in serene yoga meditation and mobility posture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Circle Icon Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#D95B32] border-3 border-white text-white flex items-center justify-center shadow-md">
                  <Flower2 className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-8 p-6 text-center space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#1C1F1D] uppercase tracking-wider group-hover:text-[#D95B32] transition-colors">
                    MIND + BODY
                  </h3>
                  <p className="text-xs text-[#5A685D] leading-relaxed mt-2">
                    Improve mobility, reduce stress, and build a stronger mind-body connection.
                  </p>
                </div>

                <div className="pt-3">
                  <span className="text-xs font-bold text-[#1C1F1D] group-hover:text-[#D95B32] tracking-wider uppercase inline-flex items-center gap-1 transition-colors">
                    <span>EXPLORE</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: WELLNESS COACHING (Nutrition & Recipes) */}
            <div 
              onClick={() => onNavigateCategory('Healthy Recipes')}
              className="group cursor-pointer rounded-2xl bg-white border border-[#DDD5C7] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD5C7]">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
                  alt="Delicious healthy bowl with grilled chicken, avocado, and vegetables"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating Circle Icon Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#5A6F5E] border-3 border-white text-white flex items-center justify-center shadow-md">
                  <Leaf className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-8 p-6 text-center space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#1C1F1D] uppercase tracking-wider group-hover:text-[#3F5441] transition-colors">
                    WELLNESS COACHING
                  </h3>
                  <p className="text-xs text-[#5A685D] leading-relaxed mt-2">
                    Sustainable habits, better nutrition, and accountability to help you thrive every day.
                  </p>
                </div>

                <div className="pt-3">
                  <span className="text-xs font-bold text-[#1C1F1D] group-hover:text-[#D95B32] tracking-wider uppercase inline-flex items-center gap-1 transition-colors">
                    <span>EXPLORE</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: SECOND IMPACT BANNER (As per Reference Image)
          "BUILD A BODY. CREATE A LIFE." - Sunset Mountain Deck
         ========================================================= */}
      <section className="relative bg-[#212421] text-white overflow-hidden min-h-[460px] flex items-center">
        {/* Full background mountain sunset photography */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop')`,
          }}
        >
          {/* Dark gradient overlay on left for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text & Feature List */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top cursive script quote */}
            <div className="font-cursive text-2xl sm:text-3xl text-[#E89E7A] tracking-wide">
              You don&apos;t get the life you wish for.
            </div>

            {/* Big Impact Headline */}
            <h2 className="font-impact text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide leading-none uppercase">
              BUILD A BODY.<br />
              CREATE A LIFE.
            </h2>

            {/* Bottom cursive script quote */}
            <div className="font-cursive text-xl sm:text-2xl text-[#E89E7A] tracking-wide -mt-3">
              You get the life you work for.
            </div>

            {/* 3 Circular Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  PERSONALIZED APPROACH
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  REAL RESULTS THAT LAST
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  SUPPORT EVERY STEP OF THE WAY
                </div>
              </div>
            </div>

            {/* Terracotta CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenLeadMagnet()}
                className="py-3 px-6 rounded-md bg-[#D95B32] hover:bg-[#BF4D28] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>BOOK A SESSION / GET FREE GUIDE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right side: Woman in workout gear watching panoramic mountain sunrise */}
          <div className="lg:col-span-5 hidden lg:flex justify-end">
            <div className="w-72 h-80 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                alt="Athletic woman seated peacefully overlooking mountain ridge at golden hour sunset"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white text-[11px] font-semibold">
                Mindful Elevation · Fitnshape
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 4: CONNECT & WEEKLY WELLNESS TIPS STRIP
          (As per Reference Image Bottom Bar)
         ========================================================= */}
      <section className="bg-[#202E23] text-white py-6 px-4 sm:px-8 border-b border-[#2C3E30]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: Let's Connect */}
          <div className="md:col-span-3 space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#A5B8A8]">
              LET&apos;S CONNECT
            </div>
            <div className="flex items-center gap-3 text-white">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#D95B32] transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#D95B32] transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#D95B32] transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Center: Quote */}
          <div className="md:col-span-5 text-center text-xs font-bold uppercase tracking-wider text-[#E8EFE9] border-y md:border-y-0 md:border-x border-white/10 py-2 md:py-0 px-2">
            “THE STRONGEST PROJECT YOU&apos;LL EVER WORK ON IS <span className="text-[#D95B32]">YOU.</span>”
          </div>

          {/* Right: Get Weekly Wellness Tips Input */}
          <div className="md:col-span-4">
            {!stripSubmitted ? (
              <form onSubmit={handleStripSubmit} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#A5B8A8]">
                  GET WEEKLY WELLNESS TIPS
                </div>
                <div className="flex items-center">
                  <input
                    type="email"
                    required
                    value={stripEmail}
                    onChange={(e) => setStripEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 text-xs bg-[#17221A] border border-[#2F4233] text-white rounded-l focus:outline-none focus:border-[#D95B32]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#3F5441] hover:bg-[#D95B32] text-white rounded-r transition-colors cursor-pointer flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 5: LATEST EDITORIAL ARTICLES
          Magazine Content Cards
         ========================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F5441]">
              Fresh Off The Press
            </span>
            <h2 className="font-editorial text-3xl font-bold text-[#1C1F1D]">
              Latest Editorial Articles
            </h2>
          </div>
          <button
            onClick={() => onNavigateView('blog')}
            className="text-xs font-bold text-[#1C1F1D] hover:text-[#D95B32] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            <span>See All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <ArticleCard
              article={secondaryLead}
              onSelect={onSelectArticle}
              variant="large"
              isBookmarked={bookmarkedIds.includes(secondaryLead.id)}
              onToggleBookmark={onToggleBookmark}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <ArticleCard
              article={tertiaryLead}
              onSelect={onSelectArticle}
              variant="standard"
              isBookmarked={bookmarkedIds.includes(tertiaryLead.id)}
              onToggleBookmark={onToggleBookmark}
            />
            {ARTICLES[3] && (
              <ArticleCard
                article={ARTICLES[3]}
                onSelect={onSelectArticle}
                variant="standard"
                isBookmarked={bookmarkedIds.includes(ARTICLES[3].id)}
                onToggleBookmark={onToggleBookmark}
              />
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: TRENDING ARTICLES (01 - 04)
         ========================================================= */}
      <section className="py-14 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D95B32] mb-2">
            <TrendingUp className="w-4 h-4" />
            <span>Most Read This Week</span>
          </div>
          <h2 className="font-editorial text-3xl font-bold text-[#1C1F1D] mb-8">
            Trending in Fitness & Nutrition
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArticles.slice(0, 4).map((art, index) => (
              <article
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="group cursor-pointer p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#3F5441]/50 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#5A685D] mb-3">
                    <span className="font-impact text-3xl font-bold text-[#D95B32] opacity-80">
                      0{index + 1}
                    </span>
                    <span className="font-semibold text-[#3F5441] uppercase tracking-wider">{art.category}</span>
                  </div>

                  <h3 className="font-editorial text-base font-bold text-[#1C1F1D] group-hover:text-[#D95B32] transition-colors leading-snug mb-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-[#5A685D] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D8] mt-4 text-[11px] text-[#5A685D]">
                  <span>{art.readingTime}</span>
                  <span className="text-[#1C1F1D] font-semibold group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 7: CLINICAL RECIPES & NUTRITION SCIENCE
         ========================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D95B32] flex items-center gap-1.5">
              <ChefHat className="w-4 h-4" />
              Whole Food Kitchen
            </span>
            <h2 className="font-editorial text-3xl font-bold text-[#1C1F1D]">
              Featured Healthy Recipes
            </h2>
          </div>
          <button
            onClick={() => onNavigateCategory('Healthy Recipes')}
            className="text-xs font-bold text-[#D95B32] hover:text-[#BF4D28] uppercase tracking-wider flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>All Recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipeArticles.slice(0, 2).map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              onSelect={onSelectArticle}
              variant="horizontal"
              isBookmarked={bookmarkedIds.includes(art.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 8: INTERACTIVE MACRO & ENERGY CALCULATOR
         ========================================================= */}
      <section className="py-16 bg-[#F4EFE6] border-t border-[#E2DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D95B32]">
                Clinical Tool
              </span>
              <h2 className="font-editorial text-3xl font-bold text-[#1C1F1D]">
                Interactive Macro & Energy Calculator
              </h2>
            </div>
            <button
              onClick={() => onNavigateView('resources')}
              className="text-xs font-bold text-[#1C1F1D] hover:text-[#D95B32] uppercase tracking-wider flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Explore All Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <CalculatorTool />
        </div>
      </section>

      {/* =========================================================
          SECTION 9: FREE 7-DAY STARTER GUIDE LEAD MAGNET
         ========================================================= */}
      <section id="starter-guide-lead-magnet" className="py-16 bg-[#202E23] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <div className="bg-[#17221A] border border-[#2F4233] rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D95B32] bg-white/10 px-3 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Cost · 28-Page Digital Protocol</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                FREE 7-Day Fitness & Nutrition Starter Guide
              </h2>

              <p className="text-sm text-[#CADAD0] leading-relaxed">
                Take the guesswork out of getting in shape. Includes a full 7-day progressive workout split, 21 balanced high-protein recipes, and a printable habit tracker.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#CADAD0]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full workout video demos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Macro grocery master list</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Meal prep schedule</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant PDF download</span>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-5 bg-white text-[#1C1F1D] p-6 sm:p-7 rounded-2xl shadow-lg border border-[#DDD5C7]">
              {!inlineSubmitted ? (
                <form onSubmit={handleInlineLeadSubmit} className="space-y-3.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1C1F1D] mb-1">
                    Get Instant Access
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#3F5441] mb-1">
                      Your First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={inlineName}
                      onChange={(e) => setInlineName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD5C7] text-sm text-[#1C1F1D] focus:ring-2 focus:ring-[#3F5441] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#3F5441] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={inlineEmail}
                      onChange={(e) => setInlineEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD5C7] text-sm text-[#1C1F1D] focus:ring-2 focus:ring-[#3F5441] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#3F5441] mb-1">
                      Primary Fitness Goal
                    </label>
                    <select
                      value={inlineGoal}
                      onChange={(e) => setInlineGoal(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#DDD5C7] text-xs text-[#1C1F1D] focus:ring-2 focus:ring-[#3F5441] focus:outline-none"
                    >
                      <option value="Sustainable Fat Loss & Tone">Sustainable Fat Loss & Tone</option>
                      <option value="Muscle Strength & Hypertrophy">Muscle Strength & Hypertrophy</option>
                      <option value="Joint Mobility & Posture">Joint Mobility & Posture</option>
                      <option value="All-Day Energy & Gut Health">All-Day Energy & Gut Health</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-lg bg-[#D95B32] hover:bg-[#BF4D28] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 pt-3"
                  >
                    <span>GET MY FREE GUIDE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[10px] text-center text-[#8FA696] pt-1">
                    No spam. Unsubscribe anytime. 100% Privacy.
                  </div>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-editorial text-xl font-bold text-[#1C1F1D]">
                    Check Your Inbox, {inlineName}!
                  </h4>
                  <p className="text-xs text-[#5A685D] leading-relaxed">
                    We just sent the 7-Day Starter Guide bundle directly to <strong>{inlineEmail}</strong>.
                  </p>
                  <button
                    onClick={() => onOpenLeadMagnet(inlineGoal)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#3F5441] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Download Direct Copy (PDF)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
