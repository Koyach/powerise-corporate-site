'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getAllContactsAction, updateContactStatus, deleteContact } from '@/app/actions/contactActions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';
import type { Contact } from '@/lib/firebase/types';

export default function AdminContactsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const fetchedContacts = await getAllContactsAction();
        setContacts(fetchedContacts);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('お問い合わせの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchContacts();
    }
  }, [user]);

  const handleStatusUpdate = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      setActionLoading(id);
      const result = await updateContactStatus(id, status);
      
      if (result.success) {
        setContacts(contacts.map(contact => 
          contact.id === id ? { ...contact, status } : contact
        ));
      } else {
        setError(result.error || 'ステータス更新に失敗しました');
      }
    } catch (err) {
      console.error('Error updating contact status:', err);
      setError('ステータス更新に失敗しました');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name}さんからのお問い合わせを削除してもよろしいですか？`)) {
      return;
    }

    try {
      setActionLoading(id);
      const result = await deleteContact(id);
      
      if (result.success) {
        setContacts(contacts.filter(contact => contact.id !== id));
      } else {
        setError(result.error || '削除に失敗しました');
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('削除に失敗しました');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    switch (status) {
      case 'new':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'read':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'replied':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return '新規';
      case 'read':
        return '確認済み';
      case 'replied':
        return '返信済み';
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">ログインが必要です</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">お問い合わせ管理</h1>
          <p className="text-gray-600 mt-1">お客様からのお問い合わせを管理できます</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-red-100 text-red-800 rounded">新規: {contacts.filter(c => c.status === 'new').length}</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">確認済み: {contacts.filter(c => c.status === 'read').length}</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded">返信済み: {contacts.filter(c => c.status === 'replied').length}</span>
        </div>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* お問い合わせ一覧 */}
      {contacts.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600">まだお問い合わせがありません</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {contact.subject}
                    </h3>
                    <span className={getStatusBadge(contact.status)}>
                      {getStatusText(contact.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">お名前:</span> {contact.name}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">メール:</span> 
                      <a href={`mailto:${contact.email}`} className="ml-1 text-blue-600 hover:text-blue-800">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div>
                        <span className="font-medium text-gray-700">電話:</span> {contact.phone}
                      </div>
                    )}
                    {contact.company && (
                      <div>
                        <span className="font-medium text-gray-700">会社:</span> {contact.company}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <span className="font-medium text-gray-700">お問い合わせ内容:</span>
                    <p className="text-gray-600 mt-1 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    受信日時: {formatDate(contact.submittedAt)}
                  </div>
                </div>

                {/* アクション */}
                <div className="flex flex-col gap-2 ml-4">
                  {contact.status === 'new' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(contact.id, 'read')}
                      disabled={actionLoading === contact.id}
                    >
                      {actionLoading === contact.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        '確認済みにする'
                      )}
                    </Button>
                  )}
                  
                  {contact.status === 'read' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(contact.id, 'replied')}
                      disabled={actionLoading === contact.id}
                    >
                      {actionLoading === contact.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        '返信済みにする'
                      )}
                    </Button>
                  )}

                  {contact.status === 'replied' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusUpdate(contact.id, 'read')}
                      disabled={actionLoading === contact.id}
                    >
                      {actionLoading === contact.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        '確認済みに戻す'
                      )}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(contact.id, contact.name)}
                    disabled={actionLoading === contact.id}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    {actionLoading === contact.id ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      '削除'
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
