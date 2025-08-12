// Firebase Firestore collection references and utilities

import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from './client';
import { Post, Work, Contact } from './types';

// Collection names
export const COLLECTIONS = {
  POSTS: 'posts',
  WORKS: 'works',
  CONTACTS: 'contacts',
} as const;

// Helper function to convert Firestore timestamps to Date objects
export const convertTimestamps = (data: DocumentData): DocumentData => {
  const converted = { ...data };
  Object.keys(converted).forEach(key => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate();
    }
  });
  return converted;
};

// Posts collection utilities
export const postsCollection = collection(db, COLLECTIONS.POSTS);

export const createPost = async (postData: Omit<Post, 'id'>): Promise<string> => {
  const docRef = await addDoc(postsCollection, {
    ...postData,
    publishedAt: Timestamp.fromDate(postData.publishedAt),
    updatedAt: Timestamp.fromDate(postData.updatedAt),
  });
  return docRef.id;
};

export const getPost = async (id: string): Promise<Post | null> => {
  const docRef = doc(db, COLLECTIONS.POSTS, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...convertTimestamps(docSnap.data())
    } as Post;
  }
  return null;
};

export const getPosts = async (
  status: 'published' | 'draft' | 'all' = 'published',
  limitCount: number = 10
): Promise<Post[]> => {
  let q = query(
    postsCollection,
    orderBy('publishedAt', 'desc'),
    limit(limitCount)
  );

  if (status !== 'all') {
    q = query(
      postsCollection,
      where('status', '==', status),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    );
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data())
  })) as Post[];
};

// Works collection utilities
export const worksCollection = collection(db, COLLECTIONS.WORKS);

export const createWork = async (workData: Omit<Work, 'id'>): Promise<string> => {
  const docRef = await addDoc(worksCollection, {
    ...workData,
    publishedAt: Timestamp.fromDate(workData.publishedAt),
    updatedAt: Timestamp.fromDate(workData.updatedAt),
  });
  return docRef.id;
};

export const getWork = async (id: string): Promise<Work | null> => {
  const docRef = doc(db, COLLECTIONS.WORKS, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...convertTimestamps(docSnap.data())
    } as Work;
  }
  return null;
};

export const getWorks = async (
  status: 'published' | 'draft' | 'all' = 'published',
  limitCount: number = 10
): Promise<Work[]> => {
  let q = query(
    worksCollection,
    orderBy('publishedAt', 'desc'),
    limit(limitCount)
  );

  if (status !== 'all') {
    q = query(
      worksCollection,
      where('status', '==', status),
      orderBy('publishedAt', 'desc'),
      limit(limitCount)
    );
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data())
  })) as Work[];
};

// Admin-specific work utilities
export const updateWork = async (id: string, workData: Partial<Work>): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.WORKS, id);
  const updateData: any = { ...workData };
  
  // Convert Date objects to Firestore Timestamps
  if (updateData.publishedAt instanceof Date) {
    updateData.publishedAt = Timestamp.fromDate(updateData.publishedAt);
  }
  if (updateData.updatedAt instanceof Date) {
    updateData.updatedAt = Timestamp.fromDate(updateData.updatedAt);
  }
  
  await updateDoc(docRef, updateData);
};

export const deleteWork = async (id: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.WORKS, id);
  await deleteDoc(docRef);
};

// Get all works for admin (including drafts)
export const getAllWorksForAdmin = async (): Promise<Work[]> => {
  const q = query(
    worksCollection,
    orderBy('updatedAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...convertTimestamps(doc.data())
  })) as Work[];
};

// Contacts collection utilities
export const contactsCollection = collection(db, COLLECTIONS.CONTACTS);

export const createContact = async (contactData: Omit<Contact, 'id'>): Promise<string> => {
  const docRef = await addDoc(contactsCollection, {
    ...contactData,
    submittedAt: Timestamp.fromDate(contactData.submittedAt),
  });
  return docRef.id;
};
