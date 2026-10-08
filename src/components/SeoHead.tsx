import React, { useEffect } from 'react';
import { Article, CategoryType, Author } from '../types';
import { AUTHORS } from '../data/authors';
import { generateFaqSchema, generateAuthorSchema } from '../utils/seoSchema';

interface SeoHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  article?: Article;
  category?: CategoryType;
  author?: Author;
  pageType?: 'home' | 'article' | 'category' | 'resources' | 'about' | 'contact' | 'author';
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'Fitnshape | Fitness, Health & Nutrition Magazine',
  description = 'Move Better. Eat Better. Live Better. Fitnshape is your premier evidence-based publication for workouts, nutrition science, healthy recipes, yoga, and mindful wellness.',
  canonicalUrl,
  article,
  category,
  author,
  pageType = 'home',
}) => {
  useEffect(() => {
    // Dynamically update document title
    const fullTitle = title.includes('Fitnshape') ? title : `${title} | Fitnshape`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Update OpenGraph Image
    if (article?.featuredImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', article.featuredImage);
    } else if (author?.avatar) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', author.avatar);
    }

    // Manage dynamic JSON-LD structured data script
    const existingJsonLd = document.getElementById('fitnshape-dynamic-schema');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const schemas: object[] = [];

    // Base Website / Organization schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: 'Fitnshape',
      url: 'https://fitnshape.in',
      logo: 'https://fitnshape.in/logo.png',
      slogan: 'Move Better. Eat Better. Live Better.',
      publishingPrinciples: 'https://fitnshape.in/about#editorial-standards',
      sameAs: [
        'https://instagram.com/fitnshape',
        'https://youtube.com/fitnshape',
        'https://pinterest.com/fitnshape',
        'https://x.com/fitnshape',
      ],
    });

    // 1. Comprehensive Article Schema with Rich Author Profile Markup & Publication History
    if (article) {
      const matchedAuthor = AUTHORS.find((a) => a.id === article.authorId);
      
      const authorSchemaObj = matchedAuthor
        ? generateAuthorSchema(matchedAuthor)
        : {
            '@type': 'Person',
            name: article.authorId,
            url: `https://fitnshape.in/author/${article.authorId}`,
          };

      const articleSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: [article.featuredImage],
        datePublished: article.publishDate,
        dateModified: article.updatedDate || article.publishDate,
        author: authorSchemaObj,
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: 'Fitnshape',
          logo: {
            '@type': 'ImageObject',
            url: 'https://fitnshape.in/logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://fitnshape.in/article/${article.slug}`,
        },
      };

      // Reviewer schema if medically reviewed
      if (article.reviewedBy) {
        articleSchema.reviewedBy = {
          '@type': 'Person',
          name: article.reviewedBy,
          jobTitle: 'Medical Reviewer & Clinical Specialist',
          worksFor: {
            '@type': 'NewsMediaOrganization',
            name: 'Fitnshape',
            url: 'https://fitnshape.in',
          },
        };
      }

      schemas.push(articleSchema);

      // Recipe Schema if applicable
      if (article.recipeData) {
        const recipe = article.recipeData;
        const recipeSchema: any = {
          '@context': 'https://schema.org',
          '@type': 'Recipe',
          name: article.title,
          image: [article.featuredImage],
          description: article.excerpt,
          author: authorSchemaObj,
          prepTime: `PT${parseInt(recipe.prepTime) || 15}M`,
          cookTime: `PT${parseInt(recipe.cookTime) || 20}M`,
          totalTime: `PT${parseInt(recipe.totalTime) || 35}M`,
          recipeYield: `${recipe.servings} servings`,
          recipeCategory: article.subcategory,
          nutrition: {
            '@type': 'NutritionInformation',
            calories: `${recipe.calories} calories`,
            proteinContent: `${recipe.protein}g`,
            carbohydrateContent: `${recipe.carbs}g`,
            fatContent: `${recipe.fat}g`,
            fiberContent: `${recipe.fiber}g`,
          },
          recipeIngredient: recipe.ingredients.map((i) => `${i.amount} ${i.item}`),
          recipeInstructions: recipe.instructions.map((ins) => ({
            '@type': 'HowToStep',
            text: ins.text,
            name: ins.title,
          })),
        };
        schemas.push(recipeSchema);
      }

      // HowTo Schema if workout
      if (article.workoutData) {
        const workout = article.workoutData;
        const howToSchema: any = {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: article.title,
          description: article.excerpt,
          totalTime: workout.duration,
          step: workout.exercises.map((ex, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: ex.name,
            text: `${ex.sets} sets of ${ex.reps} (Rest: ${ex.rest}). Form cue: ${ex.formCue}`,
          })),
        };
        schemas.push(howToSchema);
      }

      // FAQPage Schema if article has FAQs
      const faqSchema = generateFaqSchema(article.faqs);
      if (faqSchema) {
        schemas.push(faqSchema);
      }

      // BreadcrumbList Schema
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://fitnshape.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: article.category,
            item: `https://fitnshape.in/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: `https://fitnshape.in/article/${article.slug}`,
          },
        ],
      };
      schemas.push(breadcrumbSchema);
    }

    // 2. Standalone Author Profile Schema (for Author Page)
    if (author) {
      const personSchema: any = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        image: author.avatar,
        url: `https://fitnshape.in/author/${author.id}`,
        worksFor: {
          '@type': 'NewsMediaOrganization',
          name: 'Fitnshape',
          url: 'https://fitnshape.in',
        },
      };

      if (author.alumniOf) {
        personSchema.alumniOf = {
          '@type': 'EducationalOrganization',
          name: author.alumniOf,
        };
      }

      if (author.credentials) {
        personSchema.hasCredential = [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certification',
            name: author.credentials,
          },
        ];
      }

      if (author.knowsAbout) {
        personSchema.knowsAbout = author.knowsAbout;
      }

      if (author.socialLinks) {
        personSchema.sameAs = Object.values(author.socialLinks).filter(Boolean);
      }

      schemas.push(personSchema);
    }

    const script = document.createElement('script');
    script.id = 'fitnshape-dynamic-schema';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemas, null, 2);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('fitnshape-dynamic-schema');
      if (el) el.remove();
    };
  }, [title, description, canonicalUrl, article, category, author, pageType]);

  return null;
};
