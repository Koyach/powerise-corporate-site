// Firebase Firestore document types

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
  author: string;
  tags?: string[];
  featuredImage?: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
  category: string;
  tags?: string[];
  images: string[];
  featuredImage: string;
  clientName?: string;
  projectUrl?: string;
  technologies: string[];
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  submittedAt: Date;
  status: 'new' | 'read' | 'replied';
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  lastLoginAt: Date;
}
