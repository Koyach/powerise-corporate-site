'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { getAllPostsAction, deletePost } from '@/app/actions/postActions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';
import { formatDate } from '@/lib/firebase/posts';
import type { Post } from '@/lib/firebase/types';

export default function AdminPostsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getAllPostsAction();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('投稿の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`「${title}」を削除してもよろしいですか？`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      const result = await deletePost(id);
      
      if (result.success) {
        setPosts(posts.filter(post => post.id !== id));
      } else {
        setError(result.error || '削除に失敗しました');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
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
          <h1 className="text-2xl font-bold text-gray-900">お知らせ管理</h1>
          <p className="text-gray-600 mt-1">投稿の作成、編集、削除ができます</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* 投稿一覧 */}
      {posts.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-600">まだ投稿がありません</p>
          <Link href="/admin/posts/new" className="mt-4 inline-block">
            <Button>最初の投稿を作成</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {post.title}
                    </h3>
                    <span className={getStatusBadge(post.status)}>
                      {post.status === 'published' ? '公開' : '下書き'}
                    </span>
                  </div>
                  
                  {post.excerpt && (
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>作成: {formatDate(post.createdAt)}</span>
                    {post.updatedAt && post.updatedAt.getTime() !== post.createdAt.getTime() && (
                      <span>更新: {formatDate(post.updatedAt)}</span>
                    )}
                    {post.status === 'published' && post.publishedAt && (
                      <span>公開: {formatDate(post.publishedAt)}</span>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <span>タグ: {post.tags.join(', ')}</span>
                    )}
                  </div>
                </div>

                {/* アクション */}
                <div className="flex items-center gap-2 ml-4">
                  {post.status === 'published' && (
                    <Link href={`/news/${post.id}`}>
                      <Button variant="outline" size="sm">
                        表示
                      </Button>
                    </Link>
                  )}
                  
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id, post.title)}
                    disabled={deleteLoading === post.id}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    {deleteLoading === post.id ? (
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
