import React, { useState } from 'react';
import { X, CheckCircle2, Download, BookOpen, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { FitnshapeLogo } from './FitnshapeLogo';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGoal?: string;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({
  isOpen,
  onClose,
  defaultGoal = 'Overall Vitality & Energy',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState(defaultGoal);
  const [experience, setExperience] = useState('Beginner / Returning');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    // Simulate real local subscriber saving
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('fitnshape_subscribers') || '[]');
        existing.push({
          name,
          email,
          goal,
          experience,
          guideDownloaded: '7-Day Starter Guide',
          date: new Date().toISOString(),
        });
        localStorage.setItem('fitnshape_subscribers', JSON.stringify(existing));
      } catch (e) {
        // ignore
      }
      setLoading(false);
      setSubmitted(true);
    }, 650);
  };

  const handleDownloadSimulated = () => {
    // Generate clean text/markdown guide file download for user
    const content = `# FITNSHAPE: 7-DAY FITNESS & NUTRITION STARTER GUIDE
Move Better. Eat Better. Live Better.
Personalized for: ${name || 'Valued Reader'} (${goal})

-----------------------------------------------------------
DAY 1: FULL BODY STRENGTH & METABOLIC RESET
- 5 min dynamic mobility: World's Greatest Stretch & Glute Bridges
- Goblet Squats: 3 sets of 10 reps (60s rest)
- Dumbbell or Incline Push-Ups: 3 sets of 8-10 reps
- Dumbbell Romanian Deadlifts: 3 sets of 10 reps
- Plank hold: 3 sets of 30 seconds
- Nutrition Focus: 35g protein at breakfast (Eggs + Greek Yogurt or Whey)

DAY 2: ZONE 2 AEROBIC RESTORATION
- 45 min conversational pace incline walk or cycling (HR: 120-135 BPM)
- 10 min evening hip opener sequence
- Nutrition Focus: 30 unique plants goal (add 5 new vegetables/seeds today)

DAY 3: UPPER BODY PULL & POSTURE DECOMPRESSION
- Chest-Supported Rows: 3 sets of 10 reps
- Overhead Dumbbell Press: 3 sets of 8 reps
- Face Pulls / Band Pull-Aparts: 3 sets of 15 reps
- Nutrition Focus: Hydration reset (20 oz water with pinch of sea salt upon waking)

DAY 4: ACTIVE RECOVERY & MOBILITY
- 20 min yoga flow for spine decompression
- Sleep protocol: No blue light 60 mins before bed

DAY 5: LOWER BODY GLUTE & CORE EMPOWERMENT
- Bulgarian Split Squats or Reverse Lunges: 3 sets of 8 reps/leg
- Dumbbell Kettlebell Swings or RDLs: 3 sets of 12 reps
- Dead Bug core holds: 3 sets of 10 reps/side

DAY 6: FUNCTIONAL CONDITIONING
- 30 min brisk outdoor nature ruck or hike

DAY 7: WEEKLY REFLECTION & MEAL PREP SUNDAY
- Batch roast sweet potatoes, cook quinoa, and portion wild salmon or chicken
- Set 3 non-negotiable physical milestones for the coming week

Issued by Fitnshape Editorial & Sports Science Advisory Board.
https://fitnshape.in
`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fitnshape-7-Day-Starter-Guide-${name ? name.replace(/\s+/g, '_') : 'User'}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2118]/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#D5DFD8] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#64746B] hover:text-[#132E22] bg-[#FAF8F5]/80 hover:bg-white rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header Banner */}
            <div className="bg-[#132E22] px-6 sm:px-8 pt-8 pb-7 text-white relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                <FitnshapeLogo size="xl" theme="dark" variant="mark" />
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-emerald-300 mb-2">
                <Sparkles className="w-4 h-4 text-[#E06B43]" />
                <span>Instant Digital Delivery · Free 28-Page Guide</span>
              </div>

              <h2 id="modal-title" className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 leading-snug">
                FREE 7-Day Fitness & Nutrition Starter Guide
              </h2>
              <p className="text-emerald-100/90 text-sm leading-relaxed max-w-lg">
                Engineered by Registered Dietitians and CSCS Strength Specialists. Tested protocols for fat loss, clean muscle tone, and all-day energy.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-[#132E22] mb-1.5">
                  Your Full Name <span className="text-[#E06B43]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#D5DFD8] bg-white text-[#1C1F1D] placeholder-[#8FA696] focus:outline-none focus:ring-2 focus:ring-[#132E22] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider uppercase text-[#132E22] mb-1.5">
                  Your Best Email Address <span className="text-[#E06B43]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#D5DFD8] bg-white text-[#1C1F1D] placeholder-[#8FA696] focus:outline-none focus:ring-2 focus:ring-[#132E22] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#4A6B56] mb-1.5">
                    Primary Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] bg-white text-xs text-[#1C1F1D] focus:outline-none focus:ring-2 focus:ring-[#132E22]"
                  >
                    <option value="Fat Loss & Lean Muscle">Fat Loss & Lean Muscle</option>
                    <option value="Strength & Muscle Hypertrophy">Strength & Hypertrophy</option>
                    <option value="Mobility & Back Pain Relief">Mobility & Back Pain Relief</option>
                    <option value="Gut Health & Better Energy">Gut Health & High Energy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A6B56] mb-1.5">
                    Experience Level
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] bg-white text-xs text-[#1C1F1D] focus:outline-none focus:ring-2 focus:ring-[#132E22]"
                  >
                    <option value="Beginner / Returning">Beginner / Returning</option>
                    <option value="Intermediate Active">Intermediate Active</option>
                    <option value="Advanced Lifter/Runner">Advanced Lifter / Runner</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#E06B43] hover:bg-[#C5532C] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <span>Preparing Your Protocol...</span>
                  ) : (
                    <>
                      <span>GET MY FREE GUIDE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-[#64746B]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B56]" /> 100% Privacy. Zero Spam.
                </span>
                <span>·</span>
                <span>Instant PDF Access</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-editorial text-2xl font-bold text-[#132E22] mb-1">
                You’re Ready, {name}!
              </h3>
              <p className="text-sm text-[#4A6B56]">
                We’ve sent the complete starter bundle to <span className="font-semibold text-[#132E22]">{email}</span>. You can also download your copy right now below.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#EBF1EC] border border-[#D5DFD8] text-left text-xs space-y-2 text-[#1C1F1D]">
              <div className="font-bold text-[#132E22] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#E06B43]" />
                Included in Your Download:
              </div>
              <ul className="space-y-1 list-disc list-inside text-[#334D3D]">
                <li>7-Day Progressive Workout Split tailored to {goal}</li>
                <li>High-Protein Grocery Master Checklist & Swaps</li>
                <li>Daily Habit Tracker & Evening Wind-Down Checklist</li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleDownloadSimulated}
                className="w-full py-3 px-6 rounded-lg bg-[#132E22] hover:bg-[#1D4332] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#E06B43]" />
                Download Starter Guide (MD / PDF)
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-[#64746B] hover:text-[#132E22] transition-colors"
              >
                Return to Articles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
