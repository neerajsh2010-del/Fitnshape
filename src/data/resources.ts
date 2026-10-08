export interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  pages: number;
  format: string;
  category: string;
  badge: string;
  downloadUrl: string;
  features: string[];
}

export const RESOURCES: DownloadableResource[] = [
  {
    id: 'starter-guide-7-day',
    title: 'The 7-Day Fitness & Nutrition Starter Protocol',
    description: 'A comprehensive, evidence-based blueprint featuring 7 days of structured bodyweight & dumbbell workouts, 21 balanced high-protein recipes, and science-backed sleep habits.',
    pages: 28,
    format: 'PDF Guide & Printable Notion Template',
    category: 'Starter Guides',
    badge: 'Most Popular',
    downloadUrl: '#download-starter-guide',
    features: [
      'Complete 7-day workout split with video demo links',
      'Grocery shopping master list categorized by macro',
      'Meal prep timeline to save 4 hours every Sunday',
      'Habit tracker sheet for daily water, steps, & sleep',
    ],
  },
  {
    id: 'macro-nutrition-cheat-sheet',
    title: 'Clinical Macro & Micronutrient Quick-Reference Guide',
    description: 'Created by Registered Dietitians to help you calculate your exact daily protein, carbohydrate, and fat targets based on your training volume and metabolic goals.',
    pages: 14,
    format: 'High-Res PDF Reference',
    category: 'Nutrition Science',
    badge: 'RD Approved',
    downloadUrl: '#download-macro-sheet',
    features: [
      'Leucine threshold guide for 40 common protein sources',
      'Pre- & post-workout carbohydrate timing tables',
      'Healthy fat distribution matrix for hormone balance',
    ],
  },
  {
    id: 'desk-worker-mobility-poster',
    title: 'The Daily Desk-Worker Joint Decompression Routine',
    description: 'A printable desk-side infographic illustrating 6 non-negotiable physical therapy drills to reset tight hip flexors, rounded shoulders, and lumbar compression.',
    pages: 6,
    format: 'Printable High-Res Poster + PDF',
    category: 'Mobility & Therapy',
    badge: 'PT Recommended',
    downloadUrl: '#download-mobility-poster',
    features: [
      'Visual step-by-step form cues for every drill',
      'Ergonomic workstation setup checklist',
      'Hourly micro-break timer protocol',
    ],
  },
  {
    id: 'strength-hypertrophy-logbook',
    title: 'The 12-Week Progressive Overload Training Logbook',
    description: 'A structured workout tracking notebook designed to eliminate guesswork, monitor weekly tonnage, and keep progressive overload on track.',
    pages: 36,
    format: 'Printable Workout Journal PDF',
    category: 'Workouts',
    badge: 'Coach Tested',
    downloadUrl: '#download-logbook',
    features: [
      'Double-progression calculation formulas',
      'RPE (Rate of Perceived Exertion) calibrated scale',
      'Plate math cheat sheet for barbells',
    ],
  },
];
