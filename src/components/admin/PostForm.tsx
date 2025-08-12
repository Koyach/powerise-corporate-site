'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';
import { createPost, updatePost } from '@/app/actions/postActions';
import type { Post } from '@/lib/firebase/types';

const postSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内で入力してください'),
  content: z.string().min(1, '本文は必須です'),
  excerpt: z.string().max(300, '概要は300文字以内で入力してください').optional(),
  status: z.enum(['draft', 'published'] as const),
  tags: z.string().optional(),
  publishedAt: z.string().optional(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  post?: Post;
  mode: 'create' | 'edit';
}

export function PostForm({ post, mode }: PostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      status: post?.status || 'draft',
      tags: post?.tags?.join(', ') || '',
      publishedAt: post?.publishedAt 
        ? new Date(post.publishedAt).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    },
  });

  const status = watch('status');

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const formData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || '',
        status: data.status,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      };

      let result;
      if (mode === 'create') {
        result = await createPost(formData);
      } else if (post?.id) {
        result = await updatePost(post.id, formData);
      }

      if (result?.success) {
        setSuccess(mode === 'create' ? '投稿を作成しました' : '投稿を更新しました');
        setTimeout(() => {
          router.push('/admin/posts');
        }, 1500);
      } else {
        setError(result?.error || '操作に失敗しました');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('操作に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'お知らせ新規作成' : 'お知らせ編集'}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === 'create' ? '新しいお知らせを作成します' : 'お知らせの内容を編集します'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/admin/posts')}
          disabled={isSubmitting}
        >
          戻る
        </Button>
      </div>

      {/* メッセージ */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          {success}
        </Alert>
      )}

      {/* フォーム */}
      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* タイトル */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              {...register('title')}
              placeholder="お知らせのタイトルを入力してください"
              error={errors.title?.message}
            />
          </div>

          {/* 概要 */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              概要
            </label>
            <Textarea
              id="excerpt"
              {...register('excerpt')}
              placeholder="お知らせの概要を入力してください（一覧ページに表示されます）"
              rows={3}
              error={errors.excerpt?.message}
            />
          </div>

          {/* 本文 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              本文 <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder="お知らせの本文を入力してください"
              rows={12}
              error={errors.content?.message}
            />
          </div>

          {/* タグ */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              タグ
            </label>
            <Input
              id="tags"
              {...register('tags')}
              placeholder="タグをカンマ区切りで入力してください（例: 重要, メンテナンス, お知らせ）"
              error={errors.tags?.message}
            />
          </div>

          {/* ステータスと公開日時 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ステータス */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                ステータス <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="draft">下書き</option>
                <option value="published">公開</option>
              </select>
            </div>

            {/* 公開日時 */}
            {status === 'published' && (
              <div>
                <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 mb-2">
                  公開日時
                </label>
                <Input
                  id="publishedAt"
                  type="datetime-local"
                  {...register('publishedAt')}
                  error={errors.publishedAt?.message}
                />
              </div>
            )}
          </div>

          {/* 送信ボタン */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/posts')}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  {mode === 'create' ? '作成中...' : '更新中...'}
                </div>
              ) : (
                mode === 'create' ? '作成' : '更新'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
