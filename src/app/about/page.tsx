import { Heading, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function About() {
  return (
    <div className="bg-white font-jp">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-violet to-rich-lavender text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heading level="h1" color="default" align="center" className="text-white mb-4">
            企業情報
          </Heading>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            パワーライズは、お客様のビジネス成長をテクノロジーでサポートする企業です
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heading level="h2" color="primary" className="mb-6">
                私たちについて
              </Heading>
              <p className="text-charcoal/80 mb-6 leading-relaxed">
                株式会社パワーライズは、システム開発、Webサイト制作、デザインを通じて、お客様のビジネス課題を解決し、成長を加速させるソリューションを提供する企業です。
              </p>
              <p className="text-charcoal/80 mb-6 leading-relaxed">
                私たちは、最新技術と創造性を組み合わせ、お客様一人ひとりのニーズに応じたカスタムソリューションを開発しています。品質とユーザー体験を重視し、長期的なパートナーシップを築くことを大切にしています。
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                チーム一丸となって、お客様のビジネス成長に貢献できるよう、日々技術力の向上とサービス品質の向上に努めています。
              </p>
            </div>
            <div className="bg-white-lilac p-8 rounded-lg">
              <Heading level="h3" color="primary" className="mb-4 text-center">
                企業理念
              </Heading>
              <p className="text-center text-charcoal/80 italic text-lg leading-relaxed">
                「テクノロジーとクリエイティビティで<br />
                お客様の可能性を最大化する」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 px-4 bg-white-lilac">
        <div className="max-w-4xl mx-auto">
          <Heading level="h2" color="primary" align="center" className="mb-12">
            会社概要
          </Heading>
          
          <Card variant="elevated" className="overflow-hidden">
            <CardContent className="p-0">
              <div className="space-y-0">
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                  <div className="bg-gray-50 px-6 py-4 font-semibold text-charcoal">
                    会社名
                  </div>
                  <div className="md:col-span-3 px-6 py-4 text-charcoal/80">
                    株式会社パワーライズ（POWERISE Corporation）
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                  <div className="bg-gray-50 px-6 py-4 font-semibold text-charcoal">
                    設立
                  </div>
                  <div className="md:col-span-3 px-6 py-4 text-charcoal/80">
                    2020年4月1日
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                  <div className="bg-gray-50 px-6 py-4 font-semibold text-charcoal">
                    資本金
                  </div>
                  <div className="md:col-span-3 px-6 py-4 text-charcoal/80">
                    1,000万円
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                  <div className="bg-gray-50 px-6 py-4 font-semibold text-charcoal">
                    代表者
                  </div>
                  <div className="md:col-span-3 px-6 py-4 text-charcoal/80">
                    代表取締役社長　田中 太郎
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                  <div className="bg-gray-50 px-6 py-4 font-semibold text-charcoal">
                    所在地
                  </div>
                  <div className="md:col-span-3 px-6 py-4 text-charcoal/80">
                    〒100-0001<br />
                    東京都千代田区千代田1-1-1<br />
                    パワーライズビル 5F
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-200">
                  <div className="bg-gray-50 px-6 py-4 font-semibold text-charcoal">
                    事業内容
                  </div>
                  <div className="md:col-span-3 px-6 py-4 text-charcoal/80">
                    システム開発・Webサイト制作・UI/UXデザイン・<br />
                    ITコンサルティング・デジタルマーケティング支援
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="bg-gray-50 px-6 py-4 font-semibold text-charcoal">
                    従業員数
                  </div>
                  <div className="md:col-span-3 px-6 py-4 text-charcoal/80">
                    25名（2024年12月現在）
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <Heading level="h2" color="primary" align="center" className="mb-12">
            私たちの価値観
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-deep-violet/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-deep-violet rounded-full"></div>
                </div>
                <CardTitle className="text-lg">品質第一</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  お客様に最高品質のソリューションを提供するために、
                  常に技術力の向上と品質管理の徹底に取り組んでいます。
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-rich-lavender/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-rich-lavender rounded-full"></div>
                </div>
                <CardTitle className="text-lg">革新性</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  最新技術のトレンドを常にキャッチアップし、
                  革新的なアプローチでお客様の課題解決に挑戦します。
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
                <CardTitle className="text-lg">パートナーシップ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  お客様との長期的な信頼関係を築き、
                  真のビジネスパートナーとして共に成長していきます。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heading level="h2" color="default" align="center" className="text-white mb-6">
            お気軽にお問い合わせください
          </Heading>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            パワーライズについてのご質問や、プロジェクトのご相談など、お気軽にお問い合わせください。
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-8 sm:flex justify-center items-center">
            <div className="flex items-center justify-center">
              <span className="text-white/80 mr-2">📧</span>
              <a href="mailto:info@powerise.co.jp" className="text-white hover:text-white/80 transition-colors">
                info@powerise.co.jp
              </a>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-white/80 mr-2">📞</span>
              <a href="tel:03-1234-5678" className="text-white hover:text-white/80 transition-colors">
                03-1234-5678
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
