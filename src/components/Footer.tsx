import React, { useState } from 'react';
import { ArrowRight, Mail, ShieldAlert, Heart, FileText, CheckCircle2 } from 'lucide-react';
import { FitnshapeLogo } from './FitnshapeLogo';
import { CategoryType } from '../types';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
  onOpenLeadMagnet: () => void;
  onOpenSitemap: () => void;
  onOpenNextjsArchitecture?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLeadMagnet,
  onOpenSitemap,
  onOpenNextjsArchitecture,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0D2118] text-[#FAF8F5] pt-16 pb-12 border-t border-[#1D4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Newsletter Banner */}
        <div className="bg-[#132E22] rounded-2xl p-8 sm:p-10 border border-[#1D4332] mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
                The Fitnshape Editorial Dispatch
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Get Evidence-Based Fitness & Nutrition Every Saturday.
              </h3>
              <p className="text-sm text-[#CADAD0] max-w-xl leading-relaxed">
                Join 45,000+ mindful athletes and wellness seekers. No diet fads or bro-science—just peer-reviewed workout protocols, seasonal whole-food recipes, and restorative mobility practices.
              </p>
            </div>

            <div className="lg:col-span-5">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="flex-1 px-4 py-3 rounded-lg bg-[#0D2118] border border-[#2D5A42] text-sm text-white placeholder-[#8FA696] focus:outline-none focus:ring-2 focus:ring-[#E06B43]"
                    />
                    <button
                      type="submit"
                      className="py-3 px-5 rounded-lg bg-[#E06B43] hover:bg-[#C5532C] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#A3B8AC]">
                    <span>Weekly delivery</span>
                    <span>·</span>
                    <span>Unsubscribe anytime in 1-click</span>
                    <span>·</span>
                    <span>Zero spam</span>
                  </div>
                </form>
              ) : (
                <div className="bg-[#0D2118] border border-[#2D5A42] p-4 rounded-lg flex items-center gap-3 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div className="text-xs">
                    <strong className="block text-white text-sm">You’re subscribed!</strong>
                    Check your inbox for this week’s editorial digest and starter guide.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-[#1D4332]">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <FitnshapeLogo size="lg" theme="dark" showTagline={true} />
            <p className="text-xs text-[#CADAD0] leading-relaxed max-w-sm pt-2">
              Fitnshape is an independent digital magazine dedicated to evidence-based training, functional nutrition, whole-food recipes, and restorative lifestyle practices.
            </p>
            <div className="pt-2 text-xs text-[#A3B8AC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Independent & Medically Reviewed</span>
            </div>
          </div>

          {/* Navigation Column 1: Core Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Movement
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CADAD0]">
              <li>
                <button
                  onClick={() => onNavigate('category', 'Fitness')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Fitness
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'Workouts')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Workouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'Yoga & Mobility')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Yoga & Mobility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'Lifestyle')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Lifestyle
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Nourish & Health */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Nourishment
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CADAD0]">
              <li>
                <button
                  onClick={() => onNavigate('category', 'Nutrition')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Nutrition Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'Healthy Recipes')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Healthy Recipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('category', 'Health & Wellness')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Health & Wellness
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  All Articles Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 3: Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Resources & Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CADAD0]">
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Macro & TDEE Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLeadMagnet}
                  className="text-[#E06B43] hover:text-[#FFA07A] font-semibold transition-colors cursor-pointer"
                >
                  7-Day Starter Guide PDF
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Printable Checklists
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bookmarks')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  My Saved Bookmarks
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Column 4: Publication & About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Publication
            </h4>
            <ul className="space-y-2.5 text-xs text-[#CADAD0]">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  About Fitnshape
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Editorial Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Contact & Press Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSitemap}
                  className="hover:text-white hover:underline transition-colors cursor-pointer text-[#E06B43] flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>XML Sitemap & SEO</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical & Health Disclaimer */}
        <div className="py-6 border-b border-[#1D4332] text-[11px] text-[#8FA696] leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#E06B43] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#CADAD0]">Medical Disclaimer:</strong> The content published on Fitnshape is provided solely for educational and informational purposes and does not constitute individual medical diagnosis, treatment, or clinical nutrition prescription. Always seek the advice of your qualified healthcare provider, physician, or physical therapist before beginning any new exercise routine, dietary change, or supplement protocol.
          </p>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8FA696]">
          <div>
            © {new Date().getFullYear()} Fitnshape.in. All rights reserved. “Move Better. Eat Better. Live Better.”
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Affiliate Disclosure
            </button>
            <span>·</span>
            <button
              onClick={onOpenSitemap}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Robots.txt & Sitemap
            </button>
            {onOpenNextjsArchitecture && (
              <>
                <span>·</span>
                <button
                  onClick={onOpenNextjsArchitecture}
                  className="text-emerald-400 hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Next.js App Router Specs
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
