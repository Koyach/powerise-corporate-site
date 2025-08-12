// Works specific functions for the frontend
import { getWorks as getWorksFromCollection, getWork as getWorkFromCollection } from './collections';
import { Work } from './types';

/**
 * Get published works for the public works page
 * @param limit - Number of works to retrieve (default: 12)
 * @returns Array of published works
 */
export const getWorks = async (limit: number = 12): Promise<Work[]> => {
  return await getWorksFromCollection('published', limit);
};

/**
 * Get all published works for static generation
 * @returns Array of all published works
 */
export const getAllWorks = async (): Promise<Work[]> => {
  return await getWorksFromCollection('published', 1000); // Large number to get all works
};

/**
 * Get a single work by ID
 * @param id - Work ID
 * @returns Work object or null if not found
 */
export const getWork = async (id: string): Promise<Work | null> => {
  const work = await getWorkFromCollection(id);
  // Only return published works for public access
  if (work && work.status === 'published') {
    return work;
  }
  return null;
};

/**
 * Format date for display
 * @param date - Date object
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Truncate text for excerpt
 * @param text - Text to truncate
 * @param length - Maximum length (default: 150)
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, length: number = 150): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

/**
 * Get works by category
 * @param category - Category name
 * @param limit - Number of works to retrieve
 * @returns Array of works in the specified category
 */
export const getWorksByCategory = async (category: string, limit: number = 12): Promise<Work[]> => {
  const allWorks = await getWorks(1000);
  return allWorks
    .filter(work => work.category === category)
    .slice(0, limit);
};

/**
 * Get unique categories from published works
 * @returns Array of unique category names
 */
export const getWorkCategories = async (): Promise<string[]> => {
  const allWorks = await getWorks(1000);
  const categories = allWorks.map(work => work.category);
  return [...new Set(categories)].filter(Boolean);
};
