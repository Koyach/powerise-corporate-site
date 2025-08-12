import Link from 'next/link';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Heading } from '@/components/ui';

export default function Services() {
  return (
    <div className="bg-white font-jp">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-violet to-rich-lavender text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heading level="h1" color="default" align="center" className="text-white mb-4">
            サービス
          </Heading>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            お客様のニーズに合わせた幅広いソリューションを提供しています
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Development */}
            <Card variant="elevated" className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-deep-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-deep-violet rounded-full"></div>
                </div>
                <CardTitle className="text-xl">システム開発</CardTitle>
                <CardDescription>
                  最新技術を活用したスケーラブルなシステム開発
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-charcoal/80 mb-6 leading-relaxed">
                  お客様のビジネス要件に応じて、Webアプリケーション、モバイルアプリ、
                  業務システムなど様々なシステムを開発いたします。
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-deep-violet mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">Webアプリケーション開発</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-deep-violet mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">モバイルアプリ開発</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-deep-violet mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">業務システム開発</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-deep-violet mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">API・データベース設計</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="sm">お問い合わせ</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Web Development */}
            <Card variant="elevated" className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-rich-lavender/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-rich-lavender rounded-full"></div>
                </div>
                <CardTitle className="text-xl">Webサイト制作</CardTitle>
                <CardDescription>
                  レスポンシブ対応の高品質なWebサイト
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-charcoal/80 mb-6 leading-relaxed">
                  コーポレートサイト、ECサイト、ランディングページなど、
                  目的に応じた効果的なWebサイトを制作いたします。
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-rich-lavender mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">コーポレートサイト</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-rich-lavender mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">ECサイト構築</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-rich-lavender mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">ランディングページ</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-rich-lavender mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">CMS導入・カスタマイズ</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="sm">お問い合わせ</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Design */}
            <Card variant="elevated" className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <CardTitle className="text-xl">デザイン</CardTitle>
                <CardDescription>
                  ユーザー体験を重視したUI/UXデザイン
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-charcoal/80 mb-6 leading-relaxed">
                  ブランディング、UI/UXデザイン、グラフィックデザインなど、
                  魅力的で機能的なデザインを提供いたします。
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">UI/UXデザイン</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">ブランディング</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">ロゴ・グラフィックデザイン</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-sm text-charcoal/80">プロトタイピング</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Link href="/contact">
                  <Button variant="primary" size="sm">お問い合わせ</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 bg-white-lilac">
        <div className="max-w-6xl mx-auto">
          <Heading level="h2" color="primary" align="center" className="mb-4">
            技術スタック
          </Heading>
          <p className="text-center text-charcoal/70 mb-12 max-w-2xl mx-auto">
            最新の技術トレンドを取り入れながら、安定性と拡張性を重視した開発を行っています
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card variant="default">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">フロントエンド</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-charcoal/80">
                  <div>React / Next.js</div>
                  <div>Vue.js / Nuxt.js</div>
                  <div>TypeScript</div>
                  <div>Tailwind CSS</div>
                </div>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">バックエンド</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-charcoal/80">
                  <div>Node.js / Express</div>
                  <div>Python / Django</div>
                  <div>PHP / Laravel</div>
                  <div>Java / Spring Boot</div>
                </div>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">データベース</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-charcoal/80">
                  <div>PostgreSQL</div>
                  <div>MySQL</div>
                  <div>MongoDB</div>
                  <div>Firebase</div>
                </div>
              </CardContent>
            </Card>

            <Card variant="default">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">インフラ・ツール</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-charcoal/80">
                  <div>AWS / GCP</div>
                  <div>Docker</div>
                  <div>Git / GitHub</div>
                  <div>CI/CD</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Heading level="h2" color="primary" align="center" className="mb-12">
            開発プロセス
          </Heading>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-deep-violet text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-charcoal mb-2">ヒアリング・要件定義</h3>
                <p className="text-charcoal/80">
                  お客様のご要望や課題を詳しくお聞きし、プロジェクトの目標と要件を明確に定義します。
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-rich-lavender text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-charcoal mb-2">設計・プロトタイピング</h3>
                <p className="text-charcoal/80">
                  要件に基づいてシステム設計を行い、ワイヤーフレームやプロトタイプを作成します。
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-charcoal mb-2">開発・実装</h3>
                <p className="text-charcoal/80">
                  アジャイル開発手法を採用し、定期的にお客様と進捗を共有しながら開発を進めます。
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-charcoal mb-2">テスト・品質保証</h3>
                <p className="text-charcoal/80">
                  徹底的なテストを実施し、品質の高いシステムの提供を保証します。
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-charcoal mb-2">リリース・運用サポート</h3>
                <p className="text-charcoal/80">
                  システムのリリースから運用まで、継続的なサポートを提供します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heading level="h2" color="default" align="center" className="text-white mb-6">
            プロジェクトを始めませんか？
          </Heading>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            お客様のビジネス課題やご要望をお聞かせください。
            最適なソリューションをご提案いたします。
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button variant="cta" size="lg">
                無料相談を申し込む
              </Button>
            </Link>
            <Link href="/works">
              <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                制作実績を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
