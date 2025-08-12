'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useLoginForm } from '@/hooks/useLoginForm';
import { Button, Input, LoadingScreen, LoadingSpinner, ErrorAlert } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading, error } = useAuthStore();
  const { onSubmit, isSubmitting, errors, register } = useLoginForm();

  // ログイン済みの管理者は管理画面にリダイレクト
  useEffect(() => {
    if (user && isAdmin) {
      router.push('/admin');
    }
  }, [user, isAdmin, router]);

  if (isLoading) {
    return <LoadingScreen message="認証状態を確認中..." />;
  }

  // 既にログイン済みの場合は何も表示しない（リダイレクト中）
  if (user && isAdmin) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white-lilac py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-deep-violet">
            POWERISE 管理画面
          </h2>
          <p className="mt-2 text-center text-sm text-charcoal/70">
            管理者アカウントでログインしてください
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal">
                メールアドレス
              </label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className="mt-1"
                placeholder="admin@powerise.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal">
                パスワード
              </label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="current-password"
                className="mt-1"
                placeholder="パスワードを入力"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          {error && (
            <ErrorAlert 
              title="ログインエラー"
              message={error}
            />
          )}

          <div>
            <Button
              type="submit"
              className="group relative w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2 text-white" />
                  ログイン中...
                </div>
              ) : (
                'ログイン'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-50 px-2 text-gray-500">
                管理者のみアクセス可能
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
