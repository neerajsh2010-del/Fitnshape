import React, { useState } from 'react';
import { X, Layers, Code, FileText, Check, Copy, ExternalLink, Terminal } from 'lucide-react';

interface NextjsArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NextjsArchitectureModal: React.FC<NextjsArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'routes' | 'export'>('structure');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fileTree = `fitnshape/
├── app/
│   ├── layout.tsx             # Root layout with fonts, metadata & Schema.org JSON-LD
│   ├── page.tsx               # Homepage Server/Client Component
│   ├── sitemap.ts             # Dynamic Next.js Metadata Route for XML Sitemap
│   ├── robots.ts              # Dynamic Next.js Metadata Route for robots.txt
│   ├── article/
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic Article route with generateMetadata()
│   ├── author/
│   │   └── [id]/
│   │       └── page.tsx       # Dynamic Author Profile & Publication History route
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic Category archive with generateMetadata()
│   ├── resources/
│   │   └── page.tsx           # Clinical Tools & Macro Calculator page
│   ├── about/
│   │   └── page.tsx           # Editorial Standards & Advisory Board page
│   └── contact/
│       └── page.tsx           # Editorial Desk contact page
├── src/
│   ├── components/            # Reusable components (Navbar, Footer, FitnshapeLogo...)
│   ├── data/                  # Articles, Categories, Authors, Resources datasets
│   └── types/                 # TypeScript interfaces and Next.js declarations
├── next.config.mjs            # Next.js 15 configuration (remote image patterns)
└── package.json`;

  const copyStructure = () => {
    navigator.clipboard.writeText(fileTree);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2118]/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#D5DFD8] overflow-hidden flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Next.js App Router Architecture"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D5DFD8] bg-white">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#E06B43]" />
            <h3 className="font-editorial text-lg font-bold text-[#132E22]">
              Next.js 15 App Router Architecture
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#64746B] hover:text-[#132E22] hover:bg-[#F5F2EB]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-[#F5F2EB] border-b border-[#E8EFE9]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'structure'
                  ? 'bg-[#132E22] text-white shadow-2xs'
                  : 'bg-white text-[#4A6B56] hover:bg-[#EBF1EC]'
              }`}
            >
              Directory Structure
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'routes'
                  ? 'bg-[#132E22] text-white shadow-2xs'
                  : 'bg-white text-[#4A6B56] hover:bg-[#EBF1EC]'
              }`}
            >
              App Router Routes
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'export'
                  ? 'bg-[#132E22] text-white shadow-2xs'
                  : 'bg-white text-[#4A6B56] hover:bg-[#EBF1EC]'
              }`}
            >
              Deployment & Vercel
            </button>
          </div>

          {activeTab === 'structure' && (
            <button
              onClick={copyStructure}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#D5DFD8] text-xs font-semibold text-[#132E22]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'structure' && (
            <div className="space-y-3">
              <p className="text-xs text-[#4A6B56] leading-relaxed">
                The Fitnshape application is structured in the official <strong>Next.js 15 App Router</strong> paradigm. All pages, layouts, dynamic routes (`[slug]`), and metadata routes (`sitemap.ts`, `robots.ts`) are located in the <code className="bg-[#EBF1EC] px-1 py-0.5 rounded text-[#132E22]">/app</code> directory.
              </p>
              <pre className="bg-[#1C1F1D] text-[#E8EFE9] p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
                {fileTree}
              </pre>
            </div>
          )}

          {activeTab === 'routes' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#D5DFD8] space-y-1">
                <strong className="text-[#132E22] block font-mono text-xs">/</strong>
                <span className="text-[#64746B]">Page: <code>app/page.tsx</code> — Homepage with 14 magazine sections, hero, featured articles, and lead magnet.</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#D5DFD8] space-y-1">
                <strong className="text-[#132E22] block font-mono text-xs">/article/[slug]</strong>
                <span className="text-[#64746B]">Page: <code>app/article/[slug]/page.tsx</code> — Dynamic article reader with <code>generateMetadata()</code>, JSON-LD, TOC, and recipe/workout cards.</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#D5DFD8] space-y-1">
                <strong className="text-[#132E22] block font-mono text-xs">/category/[slug]</strong>
                <span className="text-[#64746B]">Page: <code>app/category/[slug]/page.tsx</code> — Dynamic category archive for Fitness, Workouts, Nutrition, Healthy Recipes, Yoga, Health, Lifestyle.</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#D5DFD8] space-y-1">
                <strong className="text-[#132E22] block font-mono text-xs">/sitemap.xml</strong>
                <span className="text-[#64746B]">Route: <code>app/sitemap.ts</code> — Returns crawler-optimized XML sitemap with all articles, categories, and priority rankings.</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-[#D5DFD8] space-y-1">
                <strong className="text-[#132E22] block font-mono text-xs">/robots.txt</strong>
                <span className="text-[#64746B]">Route: <code>app/robots.ts</code> — Standard Next.js crawler directives and sitemap reference.</span>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-3 text-xs text-[#334D3D] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#EBF1EC] border border-[#D5DFD8] space-y-2">
                <h4 className="font-bold text-[#132E22]">Dual-Engine Compatibility</h4>
                <p>
                  1. <strong>Live AI Studio Preview:</strong> Operates using Vite with clean HTML5 History API URL routing, ensuring instant rendering and compliance with AI Studio's sandbox container constraints.
                </p>
                <p>
                  2. <strong>Next.js Production:</strong> The codebase includes the complete <code className="font-mono bg-white px-1.5 py-0.5 rounded">/app</code> router tree, <code className="font-mono bg-white px-1.5 py-0.5 rounded">next.config.mjs</code>, <code className="font-mono bg-white px-1.5 py-0.5 rounded">app/layout.tsx</code>, and dynamic <code className="font-mono bg-white px-1.5 py-0.5 rounded">generateMetadata</code> implementations ready for any Next.js deployment.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D5DFD8] space-y-2 font-mono text-[11px] text-[#132E22]">
                <div className="text-[10px] uppercase font-bold text-[#64746B] font-sans">Vercel / Next.js Build Command:</div>
                <div className="bg-[#FAF8F5] p-2 rounded border border-[#E8EFE9]">npx next build</div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-[#FAF8F5] border-t border-[#D5DFD8] text-[11px] text-[#64746B] flex items-center justify-between">
          <span>Framework: Next.js 15 App Router</span>
          <button
            onClick={onClose}
            className="text-[#132E22] font-semibold hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
