import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, FileCode, Bot } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { AUTHORS } from '../data/authors';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'sitemap' | 'robots'>('sitemap');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const today = '2026-10-08';

  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Static Pages -->
  <url>
    <loc>https://fitnshape.in/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fitnshape.in/resources</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://fitnshape.in/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://fitnshape.in/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Category Hubs -->
${CATEGORIES.map(
  (c) => `  <url>
    <loc>https://fitnshape.in/category/${c.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
).join('\n')}

  <!-- Editorial Author Profiles -->
${AUTHORS.map(
  (au) => `  <url>
    <loc>https://fitnshape.in/author/${au.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
).join('\n')}

  <!-- Published Articles & Recipes -->
${ARTICLES.map(
  (a) => `  <url>
    <loc>https://fitnshape.in/article/${a.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${a.featuredImage}</image:loc>
      <image:title>${a.title.replace(/&/g, '&amp;')}</image:title>
    </image:image>
  </url>`
).join('\n')}
</urlset>`;

  const robotsTxt = `# robots.txt for Fitnshape Magazine (https://fitnshape.in)
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/private/

# Sitemaps
Sitemap: https://fitnshape.in/sitemap.xml
Sitemap: https://fitnshape.in/sitemap-news.xml

# Crawl-delay
Crawl-delay: 1`;

  const currentContent = tab === 'sitemap' ? xmlSitemap : robotsTxt;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2118]/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#D5DFD8] overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-label="SEO Sitemap & Robots.txt"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D5DFD8] bg-white">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#E06B43]" />
            <h3 className="font-editorial text-lg font-bold text-[#132E22]">
              Search Engine Optimization (SEO) Files
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#64746B] hover:text-[#132E22] hover:bg-[#F5F2EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#F5F2EB] border-b border-[#E8EFE9]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('sitemap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'sitemap'
                  ? 'bg-[#132E22] text-white shadow-2xs'
                  : 'bg-white text-[#4A6B56] hover:bg-[#EBF1EC]'
              }`}
            >
              sitemap.xml ({ARTICLES.length + CATEGORIES.length + 4} URLs)
            </button>
            <button
              onClick={() => setTab('robots')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'robots'
                  ? 'bg-[#132E22] text-white shadow-2xs'
                  : 'bg-white text-[#4A6B56] hover:bg-[#EBF1EC]'
              }`}
            >
              robots.txt
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D5DFD8] hover:bg-[#EBF1EC] text-xs font-semibold text-[#132E22] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#64746B]" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#1C1F1D] text-[#E8EFE9] font-mono text-xs leading-relaxed">
          <pre className="whitespace-pre">{currentContent}</pre>
        </div>

        <div className="px-6 py-3 bg-[#FAF8F5] border-t border-[#D5DFD8] text-[11px] text-[#64746B] flex items-center justify-between">
          <span>Compliant with Google Search Console, Google Discover & Bing Webmaster</span>
          <span>Automatic canonical routing enabled</span>
        </div>
      </div>
    </div>
  );
};
