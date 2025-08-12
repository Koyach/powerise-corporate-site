// Firebase configuration and utilities - main export file

// Client-side Firebase exports
export { default as app, auth, db, analytics } from './client';

// Admin SDK exports (server-side only)
export { default as adminApp, adminAuth, adminDb } from './admin';

// Types
export type { Post, Work, Contact, AdminUser } from './types';

// Collection utilities
export {
  COLLECTIONS,
  convertTimestamps,
  postsCollection,
  worksCollection,
  contactsCollection,
  createPost,
  getPost,
  getPosts,
  createWork,
  getWork,
  getWorks,
  createContact,
} from './collections';

// Re-export commonly used Firebase functions for convenience
export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export {
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
