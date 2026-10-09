import React from 'react';
import { ShieldCheck, Heart, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { AUTHORS } from '../data/authors';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SeoHead } from '../components/SeoHead';
import { FitnshapeLogo } from '../components/FitnshapeLogo';

interface AboutPageProps {
  onNavigateHome: () => void;
  onOpenLeadMagnet: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onOpenLeadMagnet,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      <SeoHead
        title="About Fitnshape | Editorial Standards & Medical Review Process"
        description="Learn about Fitnshape's mission, certified editorial board, evidence-based review methodology, and independent publishing standards."
        pageType="about"
      />

      {/* Header */}
      <div className="bg-[#132E22] text-white py-14 px-4 sm:px-8 border-b border-[#1D4332]">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Home', onClick: onNavigateHome },
              { label: 'About Fitnshape', active: true },
            ]}
            className="text-emerald-200/80 mb-3"
          />

          <span className="text-xs font-bold uppercase tracking-wider text-[#E06B43]">
            Our Editorial Standards
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mt-1 mb-3">
            Move Better. Eat Better. Live Better.
          </h1>
          <p className="text-base text-emerald-100/90 leading-relaxed font-normal">
            Fitnshape was founded on a simple premise: wellness journalism should be rooted in rigorous exercise science, clinical dietetics, and sustainable human habit design—never fleeting fads or marketing hype.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-16">
        {/* The 4 Editorial Pillars */}
        <section className="space-y-6">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#132E22]">
            Our Core Publishing Principles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#D5DFD8] space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EBF1EC] text-[#132E22] flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-[#E06B43]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#132E22]">
                1. Peer-Reviewed Evidence First
              </h3>
              <p className="text-xs text-[#64746B] leading-relaxed">
                Every claim we publish regarding hypertrophy, heart rate zones, or metabolic health is cross-referenced with randomized controlled trials (RCTs) and systematic meta-analyses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5DFD8] space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EBF1EC] text-[#132E22] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-[#132E22]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#132E22]">
                2. Clinical & Medical Review Board
              </h3>
              <p className="text-xs text-[#64746B] leading-relaxed">
                Our articles are written or clinically reviewed by registered dietitians (RD), certified strength coaches (CSCS), and licensed doctors of physical therapy (DPT).
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5DFD8] space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EBF1EC] text-[#132E22] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 text-[#E06B43]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#132E22]">
                3. Real Whole Food & Practical Recipes
              </h3>
              <p className="text-xs text-[#64746B] leading-relaxed">
                No extreme starvation protocols or impossible grocery lists. Our culinary team develops high-protein, nutrient-rich meals using whole ingredients that normal people can cook in under 30 minutes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#D5DFD8] space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#EBF1EC] text-[#132E22] flex items-center justify-center font-bold">
                <Users className="w-5 h-5 text-[#132E22]" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#132E22]">
                4. Zero Unrealistic Hype or Fake Claims
              </h3>
              <p className="text-xs text-[#64746B] leading-relaxed">
                We reject crash diets, rapid "detox" tea scams, and unsustainable gym extremes. We champion longevity, joint resilience, and sustainable consistency for the decades ahead.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Board */}
        <section className="space-y-6">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#132E22]">
              Meet the Author & Editorial Lead
            </h2>
            <p className="text-xs sm:text-sm text-[#4A6B56] mt-1">
              Evidence-based fitness guidance and science-backed nutrition communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUTHORS.map((author) => (
              <div
                key={author.id}
                className="bg-white p-6 rounded-2xl border border-[#D5DFD8] flex gap-4 items-start shadow-2xs col-span-2"
              >
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D5DFD8] shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-editorial text-lg font-bold text-[#132E22]">
                    Author: {author.name}
                  </h3>
                  <div className="text-xs text-[#E06B43] font-semibold">{author.credentials}</div>
                  <div className="text-[11px] text-[#64746B] font-medium">{author.role}</div>
                  <p className="text-xs text-[#4A6B56] pt-1 leading-relaxed">{author.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Standards Notice */}
        <section id="editorial-standards" className="bg-[#EBF1EC] p-8 rounded-2xl border border-[#D5DFD8] space-y-3">
          <h3 className="font-editorial text-xl font-bold text-[#132E22]">
            Our Financial Independence & Affiliate Policy
          </h3>
          <p className="text-xs text-[#334D3D] leading-relaxed">
            Fitnshape may earn a small referral commission if you purchase products through select editorial links. However, our product testing and recommendations are strictly independent: brands cannot pay for favorable reviews, and our advisory board holds final veto authority over any endorsed tool or equipment.
          </p>
        </section>
      </div>
    </div>
  );
};
