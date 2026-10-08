import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, ArrowRight, Download, BookOpen } from 'lucide-react';
import { FitnshapeLogo } from './FitnshapeLogo';
import { CategoryType } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  onOpenSearch: () => void;
  onOpenLeadMagnet: () => void;
  bookmarksCount: number;
  onOpenNextjsArchitecture?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenLeadMagnet,
  bookmarksCount,
  onOpenNextjsArchitecture,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Fitness', view: 'category', category: 'Fitness' },
    { label: 'Workouts', view: 'category', category: 'Workouts' },
    { label: 'Nutrition', view: 'category', category: 'Nutrition' },
    { label: 'Healthy Recipes', view: 'category', category: 'Healthy Recipes' },
    { label: 'Yoga & Mobility', view: 'category', category: 'Yoga & Mobility' },
    { label: 'Health & Wellness', view: 'category', category: 'Health & Wellness' },
    { label: 'Lifestyle', view: 'category', category: 'Lifestyle' },
    { label: 'Blog', view: 'blog' },
    { label: 'Resources', view: 'resources' },
    { label: 'About', view: 'about' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleLinkClick = (link: (typeof navLinks)[0]) => {
    setMobileMenuOpen(false);
    if (link.view === 'category') {
      onNavigate('category', link.category);
    } else {
      onNavigate(link.view);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#D5DFD8]">
      {/* Top Editorial Utility Strip */}
      <div className="bg-[#132E22] text-[#E8EFE9] text-xs py-1.5 px-4 sm:px-8 border-b border-[#1D4332]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wider uppercase text-[10px] text-[#E06B43]">
              Evidence-Based Publication
            </span>
            <span className="hidden sm:inline text-[#4A6B56]">|</span>
            <span className="hidden sm:inline text-[#CADAD0] text-[11px] italic">
              “Move Better. Eat Better. Live Better.”
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {onOpenNextjsArchitecture && (
              <button
                onClick={onOpenNextjsArchitecture}
                className="flex items-center gap-1 text-emerald-300 hover:text-white transition-colors cursor-pointer font-medium"
                title="View Next.js 15 App Router architecture"
              >
                <span className="bg-emerald-800/80 text-emerald-200 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">NEXT.JS 15</span>
                <span className="hidden sm:inline">App Router</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('bookmarks')}
              className="flex items-center gap-1.5 text-[#E8EFE9] hover:text-white transition-colors cursor-pointer"
              title="View saved articles"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#E06B43]" />
              <span className="hidden sm:inline">Saved Articles</span>
              {bookmarksCount > 0 && (
                <span className="bg-[#E06B43] text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                  {bookmarksCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenLeadMagnet}
              className="hidden md:flex items-center gap-1 text-[#E06B43] hover:text-[#FFA07A] font-bold transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Get Free 7-Day Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Brand Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#132E22] rounded-lg p-1 -ml-1 text-left cursor-pointer shrink-0"
          aria-label="Fitnshape Home"
        >
          <FitnshapeLogo size="md" variant="horizontal" showTagline={false} />
        </button>

        {/* Center Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.slice(0, 8).map((link) => {
            const isActive =
              link.view === currentView ||
              (link.view === 'category' && currentView === `category-${link.category}`);

            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className={`px-2.5 py-1.5 text-[11px] xl:text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer rounded-md ${
                  isActive
                    ? 'text-[#132E22] font-bold border-b-2 border-[#3F5441]'
                    : 'text-[#4A554D] hover:text-[#132E22] hover:bg-[#EBF1EC]/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => onNavigate('blog')}
            className={`px-2.5 py-1.5 text-[11px] xl:text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer rounded-md ${
              currentView === 'blog' ? 'text-[#132E22] font-bold border-b-2 border-[#3F5441]' : 'text-[#4A554D] hover:text-[#132E22]'
            }`}
          >
            Blog
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-2.5 py-1.5 text-[11px] xl:text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer rounded-md ${
              currentView === 'contact' ? 'text-[#132E22] font-bold border-b-2 border-[#3F5441]' : 'text-[#4A554D] hover:text-[#132E22]'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Action Controls: Search & START YOUR JOURNEY button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full bg-white border border-[#D5DFD8] text-[#4A6B56] hover:text-[#132E22] hover:border-[#132E22] transition-colors shadow-2xs cursor-pointer"
            aria-label="Search articles"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenLeadMagnet}
            className="py-2.5 px-4 sm:px-5 rounded-md bg-[#3F5441] hover:bg-[#2F3F31] text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>START YOUR JOURNEY</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#132E22] hover:bg-[#EBF1EC] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar (Desktop) */}
      <nav
        aria-label="Primary navigation"
        className="hidden xl:block border-t border-[#E8EFE9] bg-[#FAF8F5]/90 overflow-x-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ul className="flex items-center justify-between py-2 text-xs font-medium text-[#1C1F1D]">
            {navLinks.map((link) => {
              const isActive =
                link.view === currentView ||
                (link.view === 'category' && currentView === `category-${link.category}`);

              return (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className={`py-1.5 px-2 hover:text-[#E06B43] transition-colors cursor-pointer whitespace-nowrap relative ${
                      isActive ? 'font-bold text-[#132E22]' : 'text-[#3D4D43]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#E06B43] rounded-full" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#D5DFD8] bg-[#FAF8F5] p-5 shadow-xl max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="mb-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-white border border-[#D5DFD8] text-xs text-[#64746B]"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#4A6B56]" />
                Search articles & topics...
              </span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#4A6B56] px-3 py-1">
              Editorial Sections
            </div>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#132E22] hover:bg-[#EBF1EC] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#8FA696] text-xs">→</span>
              </button>
            ))}
          </div>

          <div className="pt-5 mt-5 border-t border-[#E8EFE9] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('bookmarks');
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#132E22] bg-[#EBF1EC] rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#E06B43]" />
                Saved Articles & Reading List
              </span>
              <span className="bg-[#132E22] text-white px-2 py-0.5 rounded-full text-[10px]">
                {bookmarksCount}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadMagnet();
              }}
              className="w-full py-3 px-4 rounded-lg bg-[#E06B43] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Get Free 7-Day Starter Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
