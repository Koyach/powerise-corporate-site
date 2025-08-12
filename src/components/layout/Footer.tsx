import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { href: '/', label: 'トップ' },
    { href: '/services', label: 'サービス' },
    { href: '/works', label: '制作実績' },
    { href: '/news', label: 'お知らせ' },
    { href: '/about', label: '企業情報' },
    { href: '/contact', label: 'お問い合わせ' },
  ];

  return (
    <footer className="bg-dark-slate text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold text-off-white mb-4">
              POWERISE
            </div>
            <p className="text-off-white/80 text-sm leading-relaxed mb-4">
              システム開発・Webサイト制作・デザインで<br />
              お客様のビジネス成長をサポート
            </p>
            <p className="text-off-white/60 text-xs">
              株式会社パワーライズ
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サイトマップ</h3>
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="text-off-white/80 hover:text-off-white transition-colors duration-200 text-sm block"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
            <div className="space-y-3">
              <div>
                <p className="text-off-white/60 text-xs mb-1">メール</p>
                <a
                  href="mailto:info@powerise.co.jp"
                  className="text-off-white/80 hover:text-off-white transition-colors duration-200 text-sm"
                >
                  info@powerise.co.jp
                </a>
              </div>
              <div>
                <p className="text-off-white/60 text-xs mb-1">電話</p>
                <a
                  href="tel:03-1234-5678"
                  className="text-off-white/80 hover:text-off-white transition-colors duration-200 text-sm"
                >
                  03-1234-5678
                </a>
              </div>
              <div>
                <p className="text-off-white/60 text-xs mb-1">営業時間</p>
                <p className="text-off-white/80 text-sm">
                  平日 9:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-off-white/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-off-white/60 text-sm">
              © {currentYear} POWERISE Corporation. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-off-white/60 hover:text-off-white/80 transition-colors duration-200 text-sm"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="text-off-white/60 hover:text-off-white/80 transition-colors duration-200 text-sm"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
