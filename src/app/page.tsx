import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Heading } from '@/components/ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-jp">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-violet to-rich-lavender text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Heading level="h1" color="default" align="center" className="text-white mb-6">
            POWERISE
          </Heading>
          <Heading level="h2" color="default" align="center" className="text-white/90 mb-8 font-normal">
            システム開発・Webサイト制作・デザインで<br />
            お客様のビジネス成長をサポート
          </Heading>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            パワーライズは、最新技術と創造性を組み合わせて、
            お客様のビジネス課題を解決し、成長を加速させるソリューションを提供します。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="cta" size="lg">
              お問い合わせ
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-deep-violet">
              サービス詳細
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 bg-white-lilac">
        <div className="max-w-6xl mx-auto">
          <Heading level="h2" color="primary" align="center" className="mb-4">
            事業内容
          </Heading>
          <p className="text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
            お客様のニーズに合わせた幅広いソリューションを提供しています
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center">
              <CardHeader>
                <CardTitle>システム開発</CardTitle>
                <CardDescription>
                  最新技術を活用したスケーラブルなシステム開発
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70">
                  Web アプリケーション、モバイルアプリ、業務システムなど、
                  お客様の要件に応じたカスタムソリューションを開発します。
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">詳細を見る</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <CardTitle>Webサイト制作</CardTitle>
                <CardDescription>
                  レスポンシブ対応の高品質なWebサイト
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70">
                  コーポレートサイト、ECサイト、ランディングページなど、
                  目的に応じた効果的なWebサイトを制作します。
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">詳細を見る</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <CardTitle>デザイン</CardTitle>
                <CardDescription>
                  ユーザー体験を重視したUI/UXデザイン
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70">
                  ブランディング、UI/UXデザイン、グラフィックデザインなど、
                  魅力的で機能的なデザインを提供します。
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" size="sm">詳細を見る</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Heading level="h2" color="primary" align="center" className="mb-4">
            最新のお知らせ
          </Heading>
          <p className="text-center text-charcoal/70 mb-12">
            パワーライズの最新情報をお届けします
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <CardDescription className="text-xs text-rich-lavender">
                  2024.12.01
                </CardDescription>
                <CardTitle className="text-base">新サービス「AI導入支援」を開始</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70">
                  企業のAI導入をトータルサポートする新サービスを開始いたします。
                </p>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardDescription className="text-xs text-rich-lavender">
                  2024.11.15
                </CardDescription>
                <CardTitle className="text-base">年末年始休業のお知らせ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70">
                  2024年12月29日〜2025年1月3日まで年末年始休業とさせていただきます。
                </p>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader>
                <CardDescription className="text-xs text-rich-lavender">
                  2024.11.01
                </CardDescription>
                <CardTitle className="text-base">制作実績ページを更新</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70">
                  新たに手がけたプロジェクトの事例を制作実績ページに追加しました。
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-10">
            <Button variant="primary">すべてのお知らせを見る</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heading level="h2" color="default" align="center" className="text-white mb-6">
            お客様のビジネス成長を<br />
            一緒に実現しませんか？
          </Heading>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            プロジェクトのご相談やお見積もりなど、お気軽にお問い合わせください。
            専門スタッフが丁寧にサポートいたします。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="cta" size="lg">
              無料相談を申し込む
            </Button>
            <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
              制作実績を見る
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
