"use server";

import { adminDb } from "@/lib/firebase/admin";
import type { Contact } from "@/lib/firebase/types";

// 管理者用：全てのお問い合わせを取得
export async function getAllContactsAction(): Promise<Contact[]> {
  try {
    const snapshot = await adminDb
      .collection('contacts')
      .orderBy('submittedAt', 'desc')
      .get();

    const contacts: Contact[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        subject: data.subject,
        message: data.message,
        submittedAt: data.submittedAt?.toDate(),
        status: data.status,
      } as Contact;
    });

    return contacts;
  } catch (error) {
    console.error('Error fetching all contacts:', error);
    return [];
  }
}

// 特定のお問い合わせを取得（管理者用）
export async function getContactByIdAction(id: string): Promise<Contact | null> {
  try {
    const doc = await adminDb.collection('contacts').doc(id).get();
    
    if (!doc.exists) {
      return null;
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: data.company || '',
      subject: data.subject,
      message: data.message,
      submittedAt: data.submittedAt?.toDate(),
      status: data.status,
    } as Contact;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}

// お問い合わせのステータス更新
export async function updateContactStatus(id: string, status: 'new' | 'read' | 'replied') {
  try {
    await adminDb.collection('contacts').doc(id).update({
      status: status,
      updatedAt: new Date(),
    });
    
    console.log('Contact status updated:', id, status);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating contact status:', error);
    return { success: false, error: 'Failed to update contact status' };
  }
}

// お問い合わせ削除
export async function deleteContact(id: string) {
  try {
    await adminDb.collection('contacts').doc(id).delete();
    
    console.log('Contact deleted:', id);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting contact:', error);
    return { success: false, error: 'Failed to delete contact' };
  }
}
