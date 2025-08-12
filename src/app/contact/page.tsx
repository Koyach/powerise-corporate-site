'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Alert } from '@/components/ui/Alert';

const contactSchema = z.object({
  name: z.string().min(1, 'お名前は必須です').max(100, 'お名前は100文字以内で入力してください'),
  email: z.string().min(1, 'メールアドレスは必須です').email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, '件名は必須です').max(200, '件名は200文字以内で入力してください'),
  message: z.string().min(1, 'お問い合わせ内容は必須です').max(2000, 'お問い合わせ内容は2000文字以内で入力してください'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'お問い合わせの送信に失敗しました');
      }

      setSubmitStatus({
        type: 'success',
        message: 'お問い合わせを受け付けました。お返事まで今しばらくお待ちください。',
      });
      reset();
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'お問い合わせの送信に失敗しました。しばらく時間をおいて再度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-lilac py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <Heading level="h1" color="primary" align="center" className="mb-4">
            お問い合わせ
          </Heading>
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto">
            システム開発、Webサイト制作、デザインに関するご相談やご質問など、
            お気軽にお問い合わせください。担当者より折り返しご連絡させていただきます。
          </p>
        </div>

        {/* お問い合わせフォーム */}
        <Card className="p-8">
          {/* ステータスメッセージ */}
          {submitStatus.type && (
            <div className="mb-6">
              <Alert variant={submitStatus.type === 'success' ? 'success' : 'error'}>
                {submitStatus.message}
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 基本情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* お名前 */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="山田 太郎"
                  error={errors.name?.message}
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="yamada@example.com"
                  error={errors.email?.message}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 電話番号 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                  電話番号
                </label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  placeholder="03-1234-5678"
                  error={errors.phone?.message}
                />
              </div>

              {/* 会社名 */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-charcoal mb-2">
                  会社名・団体名
                </label>
                <Input
                  id="company"
                  {...register('company')}
                  placeholder="株式会社サンプル"
                  error={errors.company?.message}
                />
              </div>
            </div>

            {/* 件名 */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-charcoal mb-2">
                件名 <span className="text-red-500">*</span>
              </label>
              <Input
                id="subject"
                {...register('subject')}
                placeholder="Webサイト制作についてのご相談"
                error={errors.subject?.message}
              />
            </div>

            {/* お問い合わせ内容 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                {...register('message')}
                placeholder="お問い合わせ内容をできるだけ詳しくご記入ください。&#10;&#10;例：&#10;・制作予定のWebサイトの規模や機能&#10;・希望する納期&#10;・予算感&#10;・その他ご要望など"
                rows={8}
                error={errors.message?.message}
              />
            </div>

            {/* プライバシーポリシー */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>個人情報の取り扱いについて</strong>
                <br />
                お送りいただいた個人情報は、お問い合わせへの回答および弊社サービスのご案内のみに使用し、
                第三者への提供や目的外の使用は一切行いません。
              </p>
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="min-w-[200px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    送信中...
                  </div>
                ) : (
                  '送信する'
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* 連絡先情報 */}
        <div className="mt-12 text-center">
          <Heading level="h2" color="secondary" align="center" className="mb-6">
            その他のお問い合わせ方法
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">お急ぎの場合</h3>
              <p className="text-gray-600 mb-3">
                お電話でのお問い合わせも承っております
              </p>
              <p className="text-lg font-medium text-deep-violet">
                03-1234-5678
              </p>
              <p className="text-sm text-gray-500 mt-1">
                平日 9:00〜18:00
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">メールでのお問い合わせ</h3>
              <p className="text-gray-600 mb-3">
                直接メールでもお気軽にご連絡ください
              </p>
              <p className="text-lg font-medium text-deep-violet">
                info@powerise.co.jp
              </p>
              <p className="text-sm text-gray-500 mt-1">
                24時間受付
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
