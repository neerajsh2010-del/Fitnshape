import React from 'react';
import { FaqItem, Article, Author } from '../types';
import { ARTICLES } from '../data/articles';

export interface FaqPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface AuthorSchemaPerson {
  '@type': 'Person';
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  url: string;
  worksFor: {
    '@type': 'NewsMediaOrganization';
    name: string;
    url: string;
  };
  alumniOf?: {
    '@type': 'EducationalOrganization';
    name: string;
  };
  hasCredential?: Array<{
    '@type': 'EducationalOccupationalCredential';
    credentialCategory: string;
    name: string;
  }>;
  knowsAbout?: string[];
  sameAs?: string[];
  workExample?: Array<{
    '@type': 'Article';
    headline: string;
    url: string;
    datePublished: string;
    description?: string;
  }>;
  interactionStatistic?: {
    '@type': 'InteractionCounter';
    interactionType: string;
    userInteractionCount: number;
  };
}

/**
 * Transforms article FAQ sections into structured JSON-LD FAQPage schema markup.
 * Sanitizes input and maps questions and answers to Schema.org standards
 * for Google Rich Snippets and FAQ search feature eligibility.
 * 
 * @param faqs Array of FaqItem objects (question & answer pairs)
 * @returns Structured FAQPage JSON-LD schema object or null if invalid/empty
 */
export function transformArticleFaqSectionsToSchema(faqs?: FaqItem[]): FaqPageSchema | null {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  // Filter out invalid or blank FAQ items
  const validEntities = faqs
    .filter((faq) => faq && typeof faq.question === 'string' && typeof faq.answer === 'string')
    .map((faq) => ({
      question: faq.question.trim(),
      answer: faq.answer.trim(),
    }))
    .filter((faq) => faq.question.length > 0 && faq.answer.length > 0);

  if (validEntities.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validEntities.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// Convenient alias for backward-compatibility
export const generateFaqSchema = transformArticleFaqSectionsToSchema;

/**
 * Serializes the FAQPage schema to a formatted JSON string for injection.
 */
export function faqSchemaToJsonString(faqs?: FaqItem[], indent = 2): string | null {
  const schema = transformArticleFaqSectionsToSchema(faqs);
  return schema ? JSON.stringify(schema, null, indent) : null;
}

/**
 * Helper function to inject structured FAQPage schema directly into the HTML document head.
 * Injects or updates an application/ld+json script tag for enhanced SEO visibility.
 * 
 * @param faqs Array of FAQ items from the article
 * @param scriptId Unique DOM identifier for the script tag
 */
export function injectFaqSchemaToHead(
  faqs?: FaqItem[],
  scriptId = 'fitnshape-article-faq-schema'
): void {
  if (typeof document === 'undefined') return;

  const existingScript = document.getElementById(scriptId);
  const schema = transformArticleFaqSectionsToSchema(faqs);

  if (!schema) {
    if (existingScript) existingScript.remove();
    return;
  }

  const scriptContent = JSON.stringify(schema, null, 2);

  if (existingScript) {
    existingScript.textContent = scriptContent;
  } else {
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = scriptContent;
    document.head.appendChild(script);
  }
}

/**
 * Generates comprehensive Author schema markup linking to author profile page,
 * educational credentials, areas of expertise, and complete publication history.
 *
 * @param author The Author entity
 * @param publicationHistory Optional list of articles written by this author
 */
export function generateAuthorSchema(
  author: Author,
  publicationHistory?: Article[]
): AuthorSchemaPerson {
  // Retrieve author's articles if not explicitly passed
  const articlesList = publicationHistory || ARTICLES.filter((a) => a.authorId === author.id);

  const authorSchema: AuthorSchemaPerson = {
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
    authorSchema.alumniOf = {
      '@type': 'EducationalOrganization',
      name: author.alumniOf,
    };
  }

  if (author.credentials) {
    authorSchema.hasCredential = [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional Certification & Degree',
        name: author.credentials,
      },
    ];
  }

  if (author.knowsAbout && author.knowsAbout.length > 0) {
    authorSchema.knowsAbout = author.knowsAbout;
  }

  if (author.socialLinks) {
    authorSchema.sameAs = Object.values(author.socialLinks).filter(Boolean);
  }

  // Comprehensive publication history linking to author articles
  if (articlesList && articlesList.length > 0) {
    authorSchema.workExample = articlesList.map((art) => ({
      '@type': 'Article',
      headline: art.title,
      url: `https://fitnshape.in/article/${art.slug}`,
      datePublished: art.publishDate,
      description: art.excerpt,
    }));

    authorSchema.interactionStatistic = {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/WriteAction',
      userInteractionCount: articlesList.length,
    };
  }

  return authorSchema;
}

/**
 * React Component for injecting structured FAQPage Schema markup
 * into the article page template for Google Rich Results.
 */
export const FaqJsonLd: React.FC<{ faqs?: FaqItem[]; scriptId?: string }> = ({
  faqs,
  scriptId = 'fitnshape-article-faq-jsonld',
}) => {
  const jsonString = faqSchemaToJsonString(faqs, 2);

  if (!jsonString) return null;

  return React.createElement('script', {
    id: scriptId,
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: jsonString },
  });
};

