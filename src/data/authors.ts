import { Author } from '../types';

export const AUTHORS: Author[] = [
  {
    id: 'admin',
    name: 'Admin',
    role: 'Editorial Director & Lead Author',
    credentials: 'Lead Fitness & Nutrition Writer',
    bio: 'Admin is the editorial author and content director at Fitnshape, dedicated to evidence-based strength training, clinical nutrition science, and sustainable longevity protocols.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    articleCount: 24,
    alumniOf: 'Institute of Sports Medicine & Nutritional Sciences',
    knowsAbout: [
      'Evidence-Based Fitness',
      'Clinical Nutrition',
      'Hypertrophy & Biomechanics',
      'Mobility & Physical Conditioning',
      'Metabolic Longevity',
    ],
    socialLinks: {
      website: 'https://fitnshape.in/author/admin',
    },
    medicalReviewer: true,
  },
];

