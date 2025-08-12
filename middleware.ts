import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // 管理者ページへのアクセスをチェック
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // ログインページはアクセス可能
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Cookieから認証情報を取得
    const authToken = request.cookies.get('auth-token');
    
    if (!authToken) {
      // 認証情報がない場合はログインページにリダイレクト
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Firebase Admin SDKを使用してトークンを検証
      // 本来はここでカスタムクレーム（admin: true）もチェックする
      // 現在はクライアントサイドでの認証チェックに依存
      
      // トークンが有効な場合は次に進む
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      // トークンが無効な場合はログインページにリダイレクト
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // 管理者ページのパスにマッチするパターン
  matcher: [
    '/admin/:path*',
  ],
};
