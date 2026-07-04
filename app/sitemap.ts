import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://velvette.app', lastModified: new Date() },
    { url: 'https://velvette.app/dashboard', lastModified: new Date() },
    { url: 'https://velvette.app/manuscript', lastModified: new Date() },
    { url: 'https://velvette.app/worldbuilding', lastModified: new Date() },
    { url: 'https://velvette.app/characters', lastModified: new Date() },
    { url: 'https://velvette.app/settings', lastModified: new Date() },
  ];
}
