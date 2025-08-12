import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase/admin';

// バリデーションスキーマ
const contactSchema = z.object({
  name: z.string().min(1, 'お名前は必須です').max(100, 'お名前は100文字以内で入力してください'),
  email: z.string().min(1, 'メールアドレスは必須です').email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, '件名は必須です').max(200, '件名は200文字以内で入力してください'),
  message: z.string().min(1, 'お問い合わせ内容は必須です').max(2000, 'お問い合わせ内容は2000文字以内で入力してください'),
});

export async function POST(request: NextRequest) {
  try {
    // リクエストボディの取得
    const body = await request.json();
    
    // バリデーション
    const validatedData = contactSchema.parse(body);
    
    // Firestoreに保存するデータを準備
    const contactData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || '',
      company: validatedData.company || '',
      subject: validatedData.subject,
      message: validatedData.message,
      submittedAt: new Date(),
      status: 'new' as const,
    };
    
    // Firestoreに保存
    const docRef = await adminDb.collection('contacts').add(contactData);
    
    console.log('Contact form submitted:', {
      id: docRef.id,
      email: contactData.email,
      subject: contactData.subject,
    });
    
    // 成功レスポンス
    return NextResponse.json(
      {
        success: true,
        message: 'お問い合わせを受け付けました',
        id: docRef.id,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // バリデーションエラーの場合
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'バリデーションエラー',
          details: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }
    
    // その他のエラー
    return NextResponse.json(
      {
        success: false,
        error: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください。',
      },
      { status: 500 }
    );
  }
}

// GET メソッドは許可しない
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
