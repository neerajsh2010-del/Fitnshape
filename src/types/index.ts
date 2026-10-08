export type CategoryType = 
  | 'Fitness'
  | 'Workouts'
  | 'Nutrition'
  | 'Healthy Recipes'
  | 'Yoga & Mobility'
  | 'Health & Wellness'
  | 'Lifestyle';

export interface Author {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  avatar: string;
  articleCount: number;
  alumniOf?: string;
  knowsAbout?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  medicalReviewer?: boolean;
}

export interface RecipeData {
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  dietaryTags: string[];
  ingredients: { item: string; amount: string; notes?: string }[];
  instructions: { step: number; title: string; text: string }[];
  chefTips?: string[];
}

export interface WorkoutExercise {
  name: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  rest: string;
  formCue: string;
}

export interface WorkoutData {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  equipment: string[];
  musclesTargeted: string[];
  warmup: string[];
  exercises: WorkoutExercise[];
  cooldown: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleContentSection {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  callout?: {
    type: 'tip' | 'science' | 'caution' | 'quote';
    title?: string;
    text: string;
  };
  keyPoints?: string[];
  image?: {
    url: string;
    caption: string;
    alt: string;
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: CategoryType;
  subcategory: string;
  tags: string[];
  featuredImage: string;
  imageAlt: string;
  authorId: string;
  reviewedBy?: string;
  publishDate: string;
  updatedDate: string;
  readingTime: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  tableOfContents: { id: string; title: string }[];
  introduction: string[];
  sections: ArticleContentSection[];
  conclusion?: string;
  recipeData?: RecipeData;
  workoutData?: WorkoutData;
  faqs?: FaqItem[];
  relatedArticleIds: string[];
  viewsCount: number;
  commentsCount: number;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  content: string;
  likes: number;
  replyTo?: string;
}

export interface LeadMagnetLead {
  name: string;
  email: string;
  goal: string;
  experienceLevel: string;
  timestamp: string;
}
