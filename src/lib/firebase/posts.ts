// News/Posts specific functions for the frontend
import { getPosts as getPostsFromCollection, getPost as getPostFromCollection } from './collections';
import { Post } from './types';

/**
 * Get published posts for the public news page
 * @param limit - Number of posts to retrieve (default: 10)
 * @returns Array of published posts
 */
export const getPosts = async (limit: number = 10): Promise<Post[]> => {
  return await getPostsFromCollection('published', limit);
};

/**
 * Get all published posts for static generation
 * @returns Array of all published posts
 */
export const getAllPosts = async (): Promise<Post[]> => {
  return await getPostsFromCollection('published', 1000); // Large number to get all posts
};

/**
 * Get a single post by ID
 * @param id - Post ID
 * @returns Post object or null if not found
 */
export const getPost = async (id: string): Promise<Post | null> => {
  const post = await getPostFromCollection(id);
  // Only return published posts for public access
  if (post && post.status === 'published') {
    return post;
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
