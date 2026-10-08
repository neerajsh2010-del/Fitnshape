import React, { useState } from 'react';
import { Calculator, ArrowRight, RefreshCw, Flame, Target, Dumbbell } from 'lucide-react';

export const CalculatorTool: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState<number>(32);
  const [weight, setWeight] = useState<number>(155); // lbs or kg
  const [height, setHeight] = useState<number>(67); // inches or cm
  const [activity, setActivity] = useState<number>(1.375); // Light active
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('lose');

  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    proteinGrams: number;
    carbGrams: number;
    fatGrams: number;
  } | null>(null);

  const calculateMacros = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert to kg and cm for Mifflin-St Jeor formula
    const weightKg = unit === 'imperial' ? weight * 0.453592 : weight;
    const heightCm = unit === 'imperial' ? height * 2.54 : height;

    // Mifflin-St Jeor Formula
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = Math.round(bmr * activity);

    let targetCalories = tdee;
    if (goal === 'lose') {
      targetCalories = Math.round(tdee - 450); // Moderate deficit
    } else if (goal === 'gain') {
      targetCalories = Math.round(tdee + 350); // Lean surplus
    }

    // Evidence-based macro breakdown
    // Protein: ~2.0g per kg of bodyweight
    const proteinGrams = Math.round(weightKg * 2.0);
    const proteinCals = proteinGrams * 4;

    // Fats: ~25% of total calories
    const fatCals = Math.round(targetCalories * 0.25);
    const fatGrams = Math.round(fatCals / 9);

    // Remaining cals to carbohydrates
    const carbCals = Math.max(0, targetCalories - proteinCals - fatCals);
    const carbGrams = Math.round(carbCals / 4);

    setResult({
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D5DFD8] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EFE9]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#E06B43] mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactive Tool</span>
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#132E22]">
            Evidence-Based Macro & Daily Calorie Calculator
          </h3>
          <p className="text-xs text-[#64746B] mt-0.5">
            Mifflin-St Jeor clinical energy formula calibrated with active athletic macronutrient distributions.
          </p>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              if (unit !== 'imperial') {
                setUnit('imperial');
                setWeight(Math.round(weight * 2.20462));
                setHeight(Math.round(height / 2.54));
              }
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              unit === 'imperial' ? 'bg-white text-[#132E22] shadow-xs' : 'text-[#64746B]'
            }`}
          >
            Imperial (lbs / in)
          </button>
          <button
            type="button"
            onClick={() => {
              if (unit !== 'metric') {
                setUnit('metric');
                setWeight(Math.round(weight * 0.453592));
                setHeight(Math.round(height * 2.54));
              }
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              unit === 'metric' ? 'bg-white text-[#132E22] shadow-xs' : 'text-[#64746B]'
            }`}
          >
            Metric (kg / cm)
          </button>
        </div>
      </div>

      <form onSubmit={calculateMacros} className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#132E22] uppercase tracking-wider mb-1">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  gender === 'female'
                    ? 'border-[#132E22] bg-[#EBF1EC] text-[#132E22] font-bold'
                    : 'border-[#D5DFD8] text-[#64746B]'
                }`}
              >
                Female
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                  gender === 'male'
                    ? 'border-[#132E22] bg-[#EBF1EC] text-[#132E22] font-bold'
                    : 'border-[#D5DFD8] text-[#64746B]'
                }`}
              >
                Male
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#132E22] mb-1">Age</label>
              <input
                type="number"
                min={16}
                max={95}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] text-sm text-[#1C1F1D]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#132E22] mb-1">
                Weight ({unit === 'imperial' ? 'lbs' : 'kg'})
              </label>
              <input
                type="number"
                min={30}
                max={400}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] text-sm text-[#1C1F1D]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#132E22] mb-1">
              Height ({unit === 'imperial' ? 'inches' : 'cm'})
            </label>
            <input
              type="number"
              min={100}
              max={240}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] text-sm text-[#1C1F1D]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#132E22] uppercase tracking-wider mb-1">
              Weekly Activity Level
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] text-xs text-[#1C1F1D]"
            >
              <option value={1.2}>Sedentary (Desk job, minimal exercise)</option>
              <option value={1.375}>Light Active (1-3 workouts or brisk walks)</option>
              <option value={1.55}>Moderately Active (3-5 intense workouts/wk)</option>
              <option value={1.725}>Very Active (6-7 intense training sessions)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#132E22] uppercase tracking-wider mb-1">
              Current Target Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-[#D5DFD8] text-xs text-[#1C1F1D]"
            >
              <option value="lose">Sustainable Fat Loss (~450 kcal deficit)</option>
              <option value="maintain">Maintenance & Athletic Performance</option>
              <option value="gain">Lean Hypertrophy & Muscle Growth (+350 kcal)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-lg bg-[#132E22] hover:bg-[#1D4332] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E06B43]" />
              Calculate My Daily Targets
            </button>
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-[#FAF8F5] rounded-xl border border-[#D5DFD8] p-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A6B56]">
              Your Recommended Daily Blueprint
            </span>

            {result ? (
              <div className="mt-3 space-y-4">
                <div className="flex items-baseline justify-between border-b border-[#E8EFE9] pb-3">
                  <div>
                    <div className="text-2xl font-editorial font-bold text-[#132E22]">
                      {result.targetCalories.toLocaleString()} <span className="text-xs font-sans font-normal text-[#64746B]">kcal/day</span>
                    </div>
                    <div className="text-[11px] text-[#64746B]">
                      Maintenance (TDEE): {result.tdee} kcal
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#EBF1EC] text-[#132E22]">
                    {goal === 'lose' ? 'Deficit' : goal === 'gain' ? 'Surplus' : 'Maintain'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-white p-2.5 rounded-lg border border-[#E8EFE9]">
                    <div className="text-[10px] uppercase font-bold text-[#E06B43]">Protein</div>
                    <div className="text-lg font-bold text-[#132E22]">{result.proteinGrams}g</div>
                    <div className="text-[10px] text-[#64746B]">~{result.proteinGrams * 4} kcal</div>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-[#E8EFE9]">
                    <div className="text-[10px] uppercase font-bold text-[#2A6F97]">Carbs</div>
                    <div className="text-lg font-bold text-[#132E22]">{result.carbGrams}g</div>
                    <div className="text-[10px] text-[#64746B]">~{result.carbGrams * 4} kcal</div>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-[#E8EFE9]">
                    <div className="text-[10px] uppercase font-bold text-[#D4A373]">Fats</div>
                    <div className="text-lg font-bold text-[#132E22]">{result.fatGrams}g</div>
                    <div className="text-[10px] text-[#64746B]">~{result.fatGrams * 9} kcal</div>
                  </div>
                </div>

                <p className="text-[11px] text-[#64746B] leading-tight">
                  Target 3–4 meals with 30–40g protein each to continuously optimize the leucine threshold.
                </p>
              </div>
            ) : (
              <div className="mt-6 text-center py-6 text-xs text-[#64746B] space-y-2">
                <Dumbbell className="w-8 h-8 text-[#A3B8AC] mx-auto opacity-60" />
                <p>Adjust your metrics and tap calculate to receive your customized clinical breakdown.</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
