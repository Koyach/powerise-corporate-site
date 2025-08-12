コーポレートサイト開発要件定義書
1. 概要
1.1. プロジェクトの目的
本プロジェクトは、企業の公式コーポレートサイトを新規に構築することを目的とする。主な目的は以下の通り。

企業の事業内容、技術力、制作実績を効果的に伝え、ブランドイメージと信頼性を向上させる。

潜在顧客、パートナー企業、求職者など、すべてのステークホルダーに対する情報発信のハブとする。

シンプルかつセキュアなシステムを構築し、長期的な運用・保守コストを最小限に抑える。

1.2. デザインコンセプト
「Innovative Authority（革新的な権威）」
企業の先進性と、その分野における専門的な権威性を両立させるデザインを目指す。大胆なヒーローイメージとクリーンなレイアウトで訪問者に強い印象を与えつつ、図解やデータを効果的に用いることで、技術的な裏付けと信頼性を直感的に伝える。

2. 機能要件
2.1. サイト訪問者向け機能
機能ID

機能名

概要

F-01

トップページ

企業のキャッチコピー、主要コンテンツへの導線を表示する。

F-02

事業内容ページ

企業の事業内容を分かりやすく説明する。

F-03

制作実績一覧・詳細

制作実績（ポートフォリオ）を一覧で表示し、各実績の詳細ページを閲覧できる。

F-04

お知らせ一覧・詳細

企業からの最新情報を一覧で表示し、各お知らせの詳細ページを閲覧できる。

F-05

企業情報ページ

企業の沿革、役員紹介、所在地などの基本情報を掲載する。

F-06

お問い合わせフォーム

サイト訪問者が企業へ問い合わせを送信できるフォーム。

2.2. 管理者向け機能
機能ID

機能名

概要

F-07

管理者認証

特定の権限を持つユーザーのみが管理画面にログインできる。

F-08

制作実績管理 (CRUD)

管理者は制作実績の追加、編集、削除ができる。

F-09

お知らせ管理 (CRUD)

管理者は知らせの追加、編集、削除ができる。

3. 技術仕様
3.1. 技術スタック
カテゴリ

ライブラリ/ツール

目的

フロントエンド

Next.js (React)

SEO、パフォーマンス、開発効率の最大化

スタイリング

Tailwind CSS

自由度とメンテナンス性の高いUI構築

状態管理

Zustand

シンプルで軽量なクライアントサイドの状態管理

フォーム

React Hook Form

効率的で堅牢なフォーム実装

バックエンド

Next.js (API Routes)

フロントエンドプロジェクト内でのサーバーサイドロジックの完結

DB連携

Firebase Admin SDK

サーバーサイドからの安全なFirestore操作

DB/認証

Cloud Firestore / Firebase Authentication

サーバーレスなデータ管理と認証

ホスティング

Vercel

Next.jsに最適化されたCI/CDとホスティング環境

3.2. Cloud Firestore データモデル
/ (Root)
├── posts/ (お知らせ)
│   └── {postId}/
│       ├── title: "string"
│       ├── content: "string" (Markdown)
│       ├── isPublished: "boolean"
│       ├── publishedAt: "timestamp"
│       └── createdAt: "timestamp"
│
├── works/ (制作実績)
│   └── {workId}/
│       ├── title: "string"
│       ├── description: "string"
│       ├── clientName: "string"
│       ├── mainImageUrl: "string"
│       ├── tags: ["array", "of", "strings"]
│       ├── releasedAt: "timestamp"
│       └── createdAt: "timestamp"
│
└── contacts/ (お問い合わせ)
    └── {contactId}/
        ├── name: "string"
        ├── email: "string"
        ├── company: "string"
        ├── message: "string"
        └── createdAt: "timestamp"

3.3. APIエンドポイント
メソッド

URI

機能概要

POST

/api/contacts

お問い合わせフォームの内容をFirestoreに保存し、管理者に通知する。

3.4. セキュリティ要件
サービスアカウントキー管理: Firebase Admin SDKのサービスアカウントキーは、VercelのEnvironment Variablesに登録し、ソースコードには一切含めない。

Firestoreセキュリティルール:

posts, worksコレクション: readは全ユーザーに許可。write（create, update, delete）は管理者権限を持つ認証済みユーザー（カスタムクレーム admin: true）のみに許可。

contactsコレクション: createは全ユーザーに許可。read, update, deleteは全ユーザーに対して拒否する。

3.5. パフォーマンス要件
静的サイト生成 (SSG/ISR): posts, worksなどの更新頻度が低いコンテンツは、ビルド時に静的ページとして生成（SSG）または一定時間ごとに再生成（ISR）し、CDNから高速に配信する。

画像最適化: Next.jsの<Image>コンポーネントを利用し、画像をWebP形式に変換、遅延読み込みを適用してページの表示速度を最適化する。

4. UI/UXデザイン定義
4.1. デザイン原則
明確なビジュアルヒエラルキー: 最も重要な情報が最も際立つように、サイズ、色、ウェイトを戦略的に使い分ける。

データと情報の視覚化: 複雑な情報をシンプルな図やインフォグラフィックで表現し、直感的な理解を促す。

意図のある余白: コンテンツ間に十分な余白を確保し、洗練された印象と可読性を両立させる。

4.2. カラーパレット
用途

カラー名

HEXコード

プライマリー

Deep Violet

#4C2A85

セカンダリー

Rich Lavender

#907AD6

アクセント

Gold

#FFD700

テキスト

Charcoal

#333333

テキスト(反転)

Off White

#F0F0F0

背景 (ダーク)

Dark Slate

#1A1A2E

背景 (ライト)

White Lilac

#F8F7FC

4.3. タイポグラフィ
要素

Font Family

Font Size (rem)

Font Weight

H1

Inter, sans-serif

3rem

700 (Bold)

H2

Inter, sans-serif

2.25rem

700 (Bold)

H3

Inter, sans-serif

1.5rem

600 (Semi-bold)

本文

Noto Sans JP, sans-serif

1rem

400 (Regular)

4.4. UIコンポーネントスタイル
コンポーネント

スタイル定義

ヒーローセクション

背景: Dark Slate (#1A1A2E) + 高画質画像。テキスト: 中央にH1、色はOff White (#F0F0F0)。

CTAボタン

背景: Gold (#FFD700), テキスト: Charcoal (#333333), 角丸 (rounded-full)。ホバー時: 拡大エフェクト。

プライマリーボタン

背景: Deep Violet (#4C2A85), テキスト: Off White (#F0F0F0), 角丸 (rounded-lg)。ホバー時: 明度が上がる。

カード

背景: White, 角丸 (rounded-xl), 影 (shadow-md)。ホバー時: 浮き上がるエフェクト。

インプット

背景: White, 角丸 (rounded-lg), フォーカス時: 枠線がDeep Violet (#4C2A85)になり、影が表示される。

