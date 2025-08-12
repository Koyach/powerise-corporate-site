"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDb } from "@/lib/firebase/admin";
import type { Post } from "@/lib/firebase/types";

export interface PostFormData {
  title: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  tags?: string[];
  publishedAt?: Date;
}

// お知らせ作成
export async function createPost(formData: PostFormData) {
  try {
    const now = new Date();
    const publishedAt = formData.status === 'published' 
      ? (formData.publishedAt || now) 
      : now;

    const postData = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || '',
      status: formData.status,
      tags: formData.tags || [],
      author: 'admin', // 現在は固定値
      publishedAt: publishedAt,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await adminDb.collection('posts').add(postData);
    
    console.log('Post created with ID:', docRef.id);
    
    // 関連ページを再検証
    revalidatePath('/admin/posts');
    revalidatePath('/news');
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error: 'Failed to create post' };
  }
}

// お知らせ更新
export async function updatePost(id: string, formData: PostFormData) {
  try {
    const now = new Date();
    const publishedAt = formData.status === 'published' 
      ? (formData.publishedAt || now) 
      : undefined;

    const updateData: any = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || '',
      status: formData.status,
      tags: formData.tags || [],
      updatedAt: now,
    };

    if (publishedAt) {
      updateData.publishedAt = publishedAt;
    }

    await adminDb.collection('posts').doc(id).update(updateData);
    
    console.log('Post updated:', id);
    
    // 関連ページを再検証
    revalidatePath('/admin/posts');
    revalidatePath('/news');
    revalidatePath(`/news/${id}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating post:', error);
    return { success: false, error: 'Failed to update post' };
  }
}

// お知らせ削除
export async function deletePost(id: string) {
  try {
    await adminDb.collection('posts').doc(id).delete();
    
    console.log('Post deleted:', id);
    
    // 関連ページを再検証
    revalidatePath('/admin/posts');
    revalidatePath('/news');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: 'Failed to delete post' };
  }
}

// 管理者用：全ての投稿を取得
export async function getAllPostsAction(): Promise<Post[]> {
  try {
    const snapshot = await adminDb
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get();

    const posts: Post[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        publishedAt: data.publishedAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        status: data.status,
        tags: data.tags || [],
        author: data.author,
      } as Post;
    });

    return posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// 特定の投稿を取得（管理者用）
export async function getPostByIdAction(id: string): Promise<Post | null> {
  try {
    const doc = await adminDb.collection('posts').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      publishedAt: data.publishedAt?.toDate(),
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
      status: data.status,
      tags: data.tags || [],
      author: data.author,
    } as Post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
