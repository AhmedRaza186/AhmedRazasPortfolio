import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../data/site';

export const SEO = ({ title, description, url, image }) => {
  const seoTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.role}`;
  const seoDescription = description || siteConfig.description;
  const seoUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const seoImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}/og-image.jpg`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="author" content={siteConfig.name} />
      <link rel="canonical" href={seoUrl} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
};
