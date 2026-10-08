import { CategoryType } from '../types';

export interface CategoryMeta {
  name: CategoryType;
  slug: string;
  description: string;
  heroImage: string;
  subcategories: string[];
  articleCount: number;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    name: 'Fitness',
    slug: 'fitness',
    description: 'Evidence-based conditioning, cardiovascular health, athletic progression, and habit systems.',
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['Cardio Training', 'Athletic Conditioning', 'Zone 2 Training', 'Recovery Science'],
    articleCount: 16,
  },
  {
    name: 'Workouts',
    slug: 'workouts',
    description: 'Tested strength programs, hypertrophy splits, home bodyweight circuits, and corrective protocols.',
    heroImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['Strength & Hypertrophy', 'Full Body Splits', 'Home & Dumbbell', 'Core & Stability'],
    articleCount: 22,
  },
  {
    name: 'Nutrition',
    slug: 'nutrition',
    description: 'Demystifying macronutrients, metabolic health, clean fueling, gut microbiome, and supplementation.',
    heroImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['Metabolic Health', 'Protein Science', 'Gut Microbiome', 'Micronutrients', 'Hydration'],
    articleCount: 20,
  },
  {
    name: 'Healthy Recipes',
    slug: 'healthy-recipes',
    description: 'Chef-crafted, nutrient-dense whole-food meals with complete macro breakdowns and prep guides.',
    heroImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['High Protein Bowls', 'Quick Weeknight Dinners', 'Gut-Friendly Breakfasts', 'Post-Workout Shakes'],
    articleCount: 18,
  },
  {
    name: 'Yoga & Mobility',
    slug: 'yoga-and-mobility',
    description: 'Decompress tight joints, expand thoracic mobility, restore hips, and master restorative flow.',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['Hip Mobility', 'Spine & Posture', 'Morning Flow', 'Active Recovery', 'Breathwork'],
    articleCount: 14,
  },
  {
    name: 'Health & Wellness',
    slug: 'health-and-wellness',
    description: 'Circadian rhythms, sleep architecture, stress physiology, longevity markers, and preventive care.',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['Sleep Optimization', 'Nervous System', 'Longevity Science', 'Stress & Cortisol'],
    articleCount: 15,
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Sustainable daily routines, habit formation, travel fitness, and balanced living rituals.',
    heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop',
    subcategories: ['Morning Habits', 'Mindful Living', 'Desk Worker Health', 'Travel Wellness'],
    articleCount: 11,
  },
];
