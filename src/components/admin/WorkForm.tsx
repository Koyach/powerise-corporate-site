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
import { createWork, updateWork } from '@/app/actions/workActions';
import type { Work } from '@/lib/firebase/types';

const workSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内で入力してください'),
  description: z.string().min(1, '概要は必須です').max(500, '概要は500文字以内で入力してください'),
  content: z.string().min(1, '詳細は必須です'),
  category: z.string().min(1, 'カテゴリは必須です'),
  status: z.enum(['draft', 'published'] as const),
  tags: z.string().optional(),
  featuredImage: z.string().url('有効なURLを入力してください').optional().or(z.literal('')),
  clientName: z.string().optional(),
  projectUrl: z.string().url('有効なURLを入力してください').optional().or(z.literal('')),
  technologies: z.string().min(1, '使用技術は必須です'),
  publishedAt: z.string().optional(),
});

type WorkFormData = z.infer<typeof workSchema>;

interface WorkFormProps {
  work?: Work;
  mode: 'create' | 'edit';
}

export function WorkForm({ work, mode }: WorkFormProps) {
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
  } = useForm<WorkFormData>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      title: work?.title || '',
      description: work?.description || '',
      content: work?.content || '',
      category: work?.category || '',
      status: work?.status || 'draft',
      tags: work?.tags?.join(', ') || '',
      featuredImage: work?.featuredImage || '',
      clientName: work?.clientName || '',
      projectUrl: work?.projectUrl || '',
      technologies: work?.technologies?.join(', ') || '',
      publishedAt: work?.publishedAt 
        ? new Date(work.publishedAt).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16),
    },
  });

  const status = watch('status');

  const onSubmit = async (data: WorkFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      const formData = {
        title: data.title,
        description: data.description,
        content: data.content,
        category: data.category,
        status: data.status,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        featuredImage: data.featuredImage || '',
        clientName: data.clientName || '',
        projectUrl: data.projectUrl || '',
        technologies: data.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
      };

      let result;
      if (mode === 'create') {
        result = await createWork(formData);
      } else if (work?.id) {
        result = await updateWork(work.id, formData);
      }

      if (result?.success) {
        setSuccess(mode === 'create' ? '制作実績を作成しました' : '制作実績を更新しました');
        setTimeout(() => {
          router.push('/admin/works');
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

  const categories = [
    'Webサイト',
    'Webアプリケーション',
    'ECサイト',
    'コーポレートサイト',
    'ランディングページ',
    'システム開発',
    'モバイルアプリ',
    'その他'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === 'create' ? '制作実績新規作成' : '制作実績編集'}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === 'create' ? '新しい制作実績を作成します' : '制作実績の内容を編集します'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/admin/works')}
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
              placeholder="制作実績のタイトルを入力してください"
              error={errors.title?.message}
            />
          </div>

          {/* 概要 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              概要 <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="制作実績の概要を入力してください（一覧ページに表示されます）"
              rows={3}
              error={errors.description?.message}
            />
          </div>

          {/* カテゴリと使用技術 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* カテゴリ */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                {...register('category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">カテゴリを選択してください</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* 使用技術 */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 mb-2">
                使用技術 <span className="text-red-500">*</span>
              </label>
              <Input
                id="technologies"
                {...register('technologies')}
                placeholder="技術をカンマ区切りで入力（例: React, TypeScript, Next.js）"
                error={errors.technologies?.message}
              />
            </div>
          </div>

          {/* クライアント名とプロジェクトURL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* クライアント名 */}
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                クライアント名
              </label>
              <Input
                id="clientName"
                {...register('clientName')}
                placeholder="クライアント名（任意）"
                error={errors.clientName?.message}
              />
            </div>

            {/* プロジェクトURL */}
            <div>
              <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-2">
                プロジェクトURL
              </label>
              <Input
                id="projectUrl"
                {...register('projectUrl')}
                placeholder="https://example.com"
                error={errors.projectUrl?.message}
              />
            </div>
          </div>

          {/* アイキャッチ画像 */}
          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
              アイキャッチ画像URL
            </label>
            <Input
              id="featuredImage"
              {...register('featuredImage')}
              placeholder="https://example.com/image.jpg"
              error={errors.featuredImage?.message}
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
              placeholder="タグをカンマ区切りで入力してください（例: WordPress, レスポンシブ, SEO対応）"
              error={errors.tags?.message}
            />
          </div>

          {/* 詳細 */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              詳細 <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              {...register('content')}
              placeholder="制作実績の詳細を入力してください"
              rows={12}
              error={errors.content?.message}
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
              onClick={() => router.push('/admin/works')}
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
