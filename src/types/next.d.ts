declare module 'next' {
  export interface Metadata {
    title?: string | { default: string; template: string };
    description?: string;
    keywords?: string[];
    authors?: { name: string; url?: string }[];
    creator?: string;
    publisher?: string;
    metadataBase?: URL;
    formatDetection?: {
      email?: boolean;
      address?: boolean;
      telephone?: boolean;
    };
    openGraph?: {
      title?: string;
      description?: string;
      url?: string;
      siteName?: string;
      images?: { url: string; width?: number; height?: number; alt?: string }[];
      locale?: string;
      type?: string;
      publishedTime?: string;
      modifiedTime?: string;
      authors?: string[];
    };
    twitter?: {
      card?: string;
      title?: string;
      description?: string;
      site?: string;
      creator?: string;
      images?: string[];
    };
    robots?: {
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        index?: boolean;
        follow?: boolean;
        'max-video-preview'?: number;
        'max-image-preview'?: string;
        'max-snippet'?: number;
      };
    };
  }

  export namespace MetadataRoute {
    export interface SitemapItem {
      url: string;
      lastModified?: string | Date;
      changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
      priority?: number;
    }
    export type Sitemap = SitemapItem[];

    export interface Robots {
      rules: {
        userAgent?: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      };
      sitemap?: string | string[];
      host?: string;
    }
  }

  export interface NextConfig {
    reactStrictMode?: boolean;
    images?: any;
    [key: string]: any;
  }
}
