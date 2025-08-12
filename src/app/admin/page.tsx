'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { Card, Button, LoadingSpinner } from '@/components/ui';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isAdmin, initialize } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return unsubscribe;
  }, [initialize]);

  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" className="text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="mt-1 text-gray-500">
          POWERISE管理画面へようこそ、{user.email}さん
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  お知らせ
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  12件
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  制作実績
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  8件
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  お問い合わせ
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  3件
                </dd>
              </dl>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  月間PV
                </dt>
                <dd className="text-lg font-medium text-gray-900">
                  2,847
                </dd>
              </dl>
            </div>
          </div>
        </Card>
      </div>

      {/* クイックアクション */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            クイックアクション
          </h3>
          <div className="space-y-3">
            <Link href="/admin/posts/new">
              <Button className="w-full justify-start" variant="outline">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                新しいお知らせを作成
              </Button>
            </Link>
            <Link href="/admin/works/new">
              <Button className="w-full justify-start" variant="outline">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                新しい制作実績を追加
              </Button>
            </Link>
            <Link href="/admin/contacts">
              <Button className="w-full justify-start" variant="outline">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                お問い合わせを確認
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            最近の活動
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900">
                  お知らせ「新サービス開始のお知らせ」を公開しました
                </p>
                <p className="text-xs text-gray-500">2時間前</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900">
                  制作実績「ECサイトリニューアル」を追加しました
                </p>
                <p className="text-xs text-gray-500">1日前</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-900">
                  新しいお問い合わせが届きました
                </p>
                <p className="text-xs text-gray-500">2日前</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
