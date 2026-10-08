import { MetadataRoute } from 'next';
import { ARTICLES } from '../src/data/articles';
import { CATEGORIES } from '../src/data/categories';
import { AUTHORS } from '../src/data/authors';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fitnshape.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const authorRoutes: MetadataRoute.Sitemap = AUTHORS.map((author) => ({
    url: `${baseUrl}/author/${author.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((art) => ({
    url: `${baseUrl}/article/${art.slug}`,
    lastModified: new Date(art.updatedDate || art.publishDate),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...articleRoutes];
}
