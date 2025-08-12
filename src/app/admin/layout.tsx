'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { LoadingScreen } from '@/components/ui';

// Note: metadata は server component でのみ使用可能
// 管理者ページのメタデータは各ページで個別に設定

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user, isAdmin, isLoading, logout, initialize } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return unsubscribe;
  }, [initialize]);

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, isAdmin, isLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // ローディング中
  if (isLoading) {
    return <LoadingScreen message="認証状態を確認中..." />;
  }

  // 未認証または非管理者の場合は何も表示しない（リダイレクト中）
  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* サイドバー */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">POWERISE Admin</h1>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                ダッシュボード
              </Link>
            </li>
            <li>
              <Link
                href="/admin/posts"
                className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                お知らせ管理
              </Link>
            </li>
            <li>
              <Link
                href="/admin/works"
                className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                制作実績管理
              </Link>
            </li>
            <li>
              <Link
                href="/admin/contacts"
                className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                お問い合わせ管理
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            ログアウト
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="ml-64">
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <h2 className="text-lg font-semibold text-gray-900">管理画面</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user.email}</span>
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
