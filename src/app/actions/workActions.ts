"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDb } from "@/lib/firebase/admin";
import type { Work } from "@/lib/firebase/types";

export interface WorkFormData {
  title: string;
  description: string;
  content: string;
  category: string;
  status: 'draft' | 'published';
  tags?: string[];
  images?: string[];
  featuredImage?: string;
  clientName?: string;
  projectUrl?: string;
  technologies: string[];
  publishedAt?: Date;
}

// 制作実績作成
export async function createWork(formData: WorkFormData) {
  try {
    const now = new Date();
    const publishedAt = formData.status === 'published' 
      ? (formData.publishedAt || now) 
      : now;

    // スラッグを生成（タイトルから）
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const workData = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      slug: slug,
      category: formData.category,
      status: formData.status,
      tags: formData.tags || [],
      images: formData.images || [],
      featuredImage: formData.featuredImage || '',
      clientName: formData.clientName || '',
      projectUrl: formData.projectUrl || '',
      technologies: formData.technologies,
      publishedAt: publishedAt,
      updatedAt: now,
    };

    const docRef = await adminDb.collection('works').add(workData);
    
    console.log('Work created with ID:', docRef.id);
    
    // 関連ページを再検証
    revalidatePath('/admin/works');
    revalidatePath('/works');
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating work:', error);
    return { success: false, error: 'Failed to create work' };
  }
}

// 制作実績更新
export async function updateWork(id: string, formData: WorkFormData) {
  try {
    const now = new Date();
    const publishedAt = formData.status === 'published' 
      ? (formData.publishedAt || now) 
      : undefined;

    // スラッグを再生成
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    const updateData: any = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      slug: slug,
      category: formData.category,
      status: formData.status,
      tags: formData.tags || [],
      images: formData.images || [],
      featuredImage: formData.featuredImage || '',
      clientName: formData.clientName || '',
      projectUrl: formData.projectUrl || '',
      technologies: formData.technologies,
      updatedAt: now,
    };

    if (publishedAt) {
      updateData.publishedAt = publishedAt;
    }

    await adminDb.collection('works').doc(id).update(updateData);
    
    console.log('Work updated:', id);
    
    // 関連ページを再検証
    revalidatePath('/admin/works');
    revalidatePath('/works');
    revalidatePath(`/works/${id}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating work:', error);
    return { success: false, error: 'Failed to update work' };
  }
}

// 制作実績削除
export async function deleteWork(id: string) {
  try {
    await adminDb.collection('works').doc(id).delete();
    
    console.log('Work deleted:', id);
    
    // 関連ページを再検証
    revalidatePath('/admin/works');
    revalidatePath('/works');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting work:', error);
    return { success: false, error: 'Failed to delete work' };
  }
}

// 管理者用：全ての制作実績を取得
export async function getAllWorksAction(): Promise<Work[]> {
  try {
    const snapshot = await adminDb
      .collection('works')
      .orderBy('updatedAt', 'desc')
      .get();

    const works: Work[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        content: data.content,
        slug: data.slug,
        category: data.category,
        status: data.status,
        tags: data.tags || [],
        images: data.images || [],
        featuredImage: data.featuredImage || '',
        clientName: data.clientName || '',
        projectUrl: data.projectUrl || '',
        technologies: data.technologies || [],
        publishedAt: data.publishedAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Work;
    });

    return works;
  } catch (error) {
    console.error('Error fetching all works:', error);
    return [];
  }
}

// 特定の制作実績を取得（管理者用）
export async function getWorkByIdAction(id: string): Promise<Work | null> {
  try {
    const doc = await adminDb.collection('works').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      content: data.content,
      slug: data.slug,
      category: data.category,
      status: data.status,
      tags: data.tags || [],
      images: data.images || [],
      featuredImage: data.featuredImage || '',
      clientName: data.clientName || '',
      projectUrl: data.projectUrl || '',
      technologies: data.technologies || [],
      publishedAt: data.publishedAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as Work;
  } catch (error) {
    console.error('Error fetching work:', error);
    return null;
  }
}
