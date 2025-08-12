'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getAllWorksAction, deleteWork } from '@/app/actions/workActions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';
import { formatDate } from '@/lib/firebase/works';
import type { Work } from '@/lib/firebase/types';

export default function AdminWorksPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const fetchedWorks = await getAllWorksAction();
        setWorks(fetchedWorks);
      } catch (err) {
        console.error('Error fetching works:', err);
        setError('制作実績の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWorks();
    }
  }, [user]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除してもよろしいですか？`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      const result = await deleteWork(id);
      
      if (result.success) {
        setWorks(works.filter(work => work.id !== id));
      } else {
        setError(result.error || '削除に失敗しました');
      }
    } catch (err) {
      console.error('Error deleting work:', err);
      setError('削除に失敗しました');
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs rounded-full font-medium";
    if (status === 'published') {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const getCategoryBadge = (category: string) => {
    return "px-2 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800";
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
          <h1 className="text-2xl font-bold text-gray-900">制作実績管理</h1>
          <p className="text-gray-600 mt-1">制作実績の作成、編集、削除ができます</p>
        </div>
        <Link href="/admin/works/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* 制作実績一覧 */}
      {works.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600">まだ制作実績がありません</p>
          <Link href="/admin/works/new" className="mt-4 inline-block">
            <Button>最初の制作実績を作成</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {works.map((work) => (
            <Card key={work.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {work.title}
                    </h3>
                    <span className={getStatusBadge(work.status)}>
                      {work.status === 'published' ? '公開' : '下書き'}
                    </span>
                    <span className={getCategoryBadge(work.category)}>
                      {work.category}
                    </span>
                  </div>
                  
                  {work.description && (
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {work.description}
                    </p>
                  )}

                  {/* クライアント名とプロジェクトURL */}
                  {(work.clientName || work.projectUrl) && (
                    <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                      {work.clientName && (
                        <span>クライアント: {work.clientName}</span>
                      )}
                      {work.projectUrl && (
                        <a 
                          href={work.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          サイトを見る
                        </a>
                      )}
                    </div>
                  )}

                  {/* 使用技術 */}
                  {work.technologies && work.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {work.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {work.updatedAt && (
                      <span>更新: {formatDate(work.updatedAt)}</span>
                    )}
                    {work.status === 'published' && work.publishedAt && (
                      <span>公開: {formatDate(work.publishedAt)}</span>
                    )}
                    {work.tags && work.tags.length > 0 && (
                      <span>タグ: {work.tags.join(', ')}</span>
                    )}
                  </div>
                </div>

                {/* アクション */}
                <div className="flex items-center gap-2 ml-4">
                  {work.status === 'published' && (
                    <Link href={`/works/${work.id}`}>
                      <Button variant="outline" size="sm">
                        表示
                      </Button>
                    </Link>
                  )}
                  
                  <Link href={`/admin/works/edit/${work.id}`}>
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(work.id, work.title)}
                    disabled={deleteLoading === work.id}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    {deleteLoading === work.id ? (
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
