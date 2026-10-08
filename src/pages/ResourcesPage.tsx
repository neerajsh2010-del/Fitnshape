import React from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';
import { RESOURCES } from '../data/resources';
import { CalculatorTool } from '../components/CalculatorTool';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';

interface ResourcesPageProps {
  onNavigateHome: () => void;
  onOpenLeadMagnet: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  onNavigateHome,
  onOpenLeadMagnet,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <SeoHead
        title="Resources & Clinical Tools | Macro Calculator & Downloadable Guides"
        description="Free evidence-based fitness calculators, TDEE estimators, progressive overload logs, and the 7-Day Starter Guide."
        pageType="resources"
      />

      {/* Header */}
      <div className="bg-[#132E22] text-white py-14 px-4 sm:px-8 border-b border-[#1D4332]">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'Resources & Free Tools', active: true },
            ]}
            className="text-emerald-200/80 mb-3"
          />

          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
              Free Clinical Tools & Guides
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Evidence-Based Performance Toolkit
            </h1>
            <p className="text-base text-emerald-100/90 leading-relaxed font-normal">
              Scientific tools to eliminate guesswork from your training and nutrition. Designed by clinical dietitians and physical therapists.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 space-y-16">
        {/* Interactive Calculator Section */}
        <section>
          <div className="mb-6">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#132E22]">
              Clinical Energy & Macro Calculator
            </h2>
            <p className="text-xs sm:text-sm text-[#4A6B56] mt-1">
              Calculate your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and daily protein target.
            </p>
          </div>

          <CalculatorTool />
        </section>

        {/* Downloadable Guides Grid */}
        <section>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#132E22]">
                Free Downloadable Guides & Blueprints
              </h2>
              <p className="text-xs sm:text-sm text-[#4A6B56] mt-1">
                Printable templates, workout logbooks, and nutrition cheat sheets.
              </p>
            </div>

            <button
              onClick={onOpenLeadMagnet}
              className="py-2.5 px-5 rounded-lg bg-[#E06B43] hover:bg-[#C5532C] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Get 7-Day Starter Guide (Free)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-[#D5DFD8] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#4A6B56] uppercase tracking-wider">{res.category}</span>
                    <span className="bg-[#EBF1EC] text-[#132E22] font-semibold text-[10px] px-2 py-0.5 rounded-full">
                      {res.badge}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#132E22] mb-2 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#64746B] leading-relaxed mb-4">
                    {res.description}
                  </p>

                  <div className="space-y-1.5 py-3 border-t border-b border-[#E8EFE9] my-4 text-xs text-[#334D3D]">
                    {res.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B56] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#8FA696]">{res.pages} pages · {res.format}</span>
                  <button
                    onClick={onOpenLeadMagnet}
                    className="py-2 px-3.5 rounded-lg bg-[#132E22] hover:bg-[#1D4332] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#E06B43]" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
