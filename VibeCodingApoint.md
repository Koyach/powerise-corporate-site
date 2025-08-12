承知いたしました。ご提示いただいた「コーポレートサイト開発要件定義書」に基づき、経験豊富なソフトウェアアーキテクト兼アジャイル開発のコーチとして、AI（Cursor）でのVibe Codingを最大化するための開発タスクリストを生成します。

技術的な依存関係を考慮し、具体的かつ実行可能なステップに分解しました。

-----

### **全体像：開発エピックと主要タスク**

まずは、プロジェクトの全体像を把握するためのエピック（大きな機能単位）と、それに紐づく主要なタスクを以下に示します。

  * **エピック1: 🏗️ プロジェクト基盤構築**
      * Next.jsプロジェクトのセットアップ
      * Tailwind CSSの導入とテーマ設定
      * Firebaseプロジェクトとの連携
      * 基本的なディレクトリ構造の設計
  * **エピック2: 🎨 共通UIコンポーネント開発**
      * ボタン、カード、インプット等の汎用コンポーネント実装
      * レイアウト用コンポーネント（コンテナ、セクション等）の実装
  * **エピック3: 🔐 管理者認証機能**
      * Firebase Authenticationによるログイン機能の実装
      * 管理者専用ページのアクセス制御
  * **エピック4: 📢 お知らせ機能開発**
      * お知らせ一覧・詳細ページの静的生成（SSG/ISR）
      * 管理者向けお知らせCRUD機能（作成・読み取り・更新・削除）の実装
  * **エピック5: ポートフォリオ機能開発**
      * 制作実績一覧・詳細ページの静的生成（SSG/ISR）
      * 管理者向け制作実績CRUD機能の実装
  * **エピック6: ✉️ お問い合わせ機能開発**
      * お問い合わせフォームのUI実装
      * API Routeによるデータ保存処理
  * **エピック7: 📄 静的ページ群の開発**
      * トップページ
      * 事業内容ページ
      * 企業情報ページ
  * **エピック8: 🚀 全体統合とデプロイ**
      * ヘッダー、フッターを含む全体レイアウトの構築
      * Vercelへのデプロイと環境変数の設定
      * 最終的な動作確認と最適化

-----

### **実装計画：開発チャンク（実行ステップ）**

ここから、実際の開発手順を具体的な「実装チャンク」として提示します。この順番通りにCursorへ指示を出すことで、スムーズな開発が可能です。

#### **ステップ1：【最重要】プロジェクトの初期設定と基盤構築**

このステップでは、開発の土台となる環境を構築します。すべての基本設定をここで行います。

  - [ ] **Next.jsプロジェクトの作成**

      * ターミナルで `npx create-next-app@latest corporate-site --typescript --tailwind --eslint` を実行し、プロジェクトを作成します。`App Router` を選択してください。

  - [ ] **必要ライブラリのインストール**

      * `npm install zustand react-hook-form firebase firebase-admin zod` を実行します。

  - [ ] **ディレクトリ構造の整理**

      * `src` フォルダを作成し、`app`, `components`, `lib`, `styles` などの主要なフォルダをその中に移動または作成します。
      * `src/app`
      * `src/components` (UIコンポーネント用)
      * `src/lib` (Firebase関連のロジック用)
      * `src/styles` (グローバルCSS用)

  - [ ] **Tailwind CSSのテーマ設定**

      * `tailwind.config.ts` を開き、要件定義書のカラーパレットとタイポグラフィ設定を `theme.extend` に追加します。

    <!-- end list -->

    ```ts
    // tailwind.config.ts
    import type { Config } from 'tailwindcss'

    const config: Config = {
      content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
        extend: {
          colors: {
            'deep-violet': '#4C2A85',
            'rich-lavender': '#907AD6',
            'gold': '#FFD700',
            'charcoal': '#333333',
            'off-white': '#F0F0F0',
            'dark-slate': '#1A1A2E',
            'white-lilac': '#F8F7FC',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            jp: ['"Noto Sans JP"', 'sans-serif'],
          },
        },
      },
      plugins: [],
    }
    export default config
    ```

  - [ ] **グローバルCSSとフォントの設定**

      * `src/styles/globals.css` の中身を一度空にし、Tailwindの基本ディレクティブと、`body` の基本スタイルを定義します。
      * `src/app/layout.tsx` でGoogle Fonts（Inter, Noto Sans JP）をインポートし、`<body>` タグに `font-sans` と `font-jp` を適用します。

#### **ステップ2：Firebaseプロジェクトのセットアップと連携**

  - [ ] **Firebaseプロジェクトの作成**

      * Firebaseコンソールで新規プロジェクトを作成します。
      * Authentication (メール/パスワード) と Cloud Firestore を有効にします。

  - [ ] **WebアプリのFirebase設定**

      * FirebaseプロジェクトにWebアプリを登録し、表示される`firebaseConfig`オブジェクトをコピーします。
      * `src/lib/firebase/client.ts` ファイルを作成し、`firebaseConfig` を用いてFirebaseアプリを初期化するコードを記述します。

  - [ ] **Firebase Admin SDKの設定**

      * Firebaseコンソールの「プロジェクトの設定」\>「サービスアカウント」から新しい秘密鍵を生成し、JSONファイルをダウンロードします。
      * プロジェクトのルートに `.env.local` ファイルを作成し、ダウンロードしたJSONファイルの中身を環境変数として保存します。(例: `FIREBASE_SERVICE_ACCOUNT_KEY=...`)
      * `.gitignore` に `.env.local` を追加します。
      * `src/lib/firebase/admin.ts` ファイルを作成し、環境変数を使ってAdmin SDKを初期化するコードを記述します。

  - [ ] **Firestoreセキュリティルールの設定**

      * FirebaseコンソールのFirestoreデータベース \>「ルール」タブで、要件定義に基づいたセキュリティルールを設定します。

    <!-- end list -->

    ```
    // rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // お知らせと制作実績は誰でも読めるが、書き込みは管理者のみ
        match /posts/{postId} {
          allow read: if true;
          allow write: if request.auth != null && request.auth.token.admin == true;
        }
        match /works/{workId} {
          allow read: if true;
          allow write: if request.auth != null && request.auth.token.admin == true;
        }
        // お問い合わせは誰でも作成できるが、読み取りや更新は不可
        match /contacts/{contactId} {
          allow read, update, delete: if false;
          allow create: if true;
        }
      }
    }
    ```

#### **ステップ3：共通UIコンポーネントの実装**

  - [ ] **ボタンコンポーネントの作成**
      * `src/components/ui/Button.tsx` を作成し、`primary`, `cta` などのバリアントを持つボタンを実装します。`tailwind-variants` や `cva` の利用を推奨します。
  - [ ] **カードコンポーネントの作成**
      * `src/components/ui/Card.tsx` を作成し、ホバーエフェクトを含む汎用的なカードコンポーネントを実装します。
  - [ ] **フォーム要素コンポーネントの作成**
      * `src/components/ui/Input.tsx` と `src/components/ui/Textarea.tsx` を作成し、フォーカス時のスタイルを適用します。
  - [ ] **見出しコンポーネントの作成**
      * `src/components/ui/Heading.tsx` を作成し、`h1`, `h2`, `h3` のスタイルを適用できるコンポーネントを実装します。

#### **ステップ4：お知らせ機能（閲覧側）の実装**

  - [ ] **お知らせデータ取得関数の作成**
      * `src/lib/firebase/posts.ts` に、Firestoreからお知らせ一覧と個別のお知らせを取得するための関数 `getPosts()` と `getPost(id)` を実装します。
  - [ ] **お知らせ一覧ページの作成 (SSG)**
      * `src/app/news/page.tsx` を作成します。
      * `getPosts()` を使ってビルド時に全お知らせデータを取得し、一覧表示します。`Card`コンポーネントを活用します。
  - [ ] **お知らせ詳細ページの作成 (SSG)**
      * `src/app/news/[id]/page.tsx` を作成します。
      * `generateStaticParams` でビルド時に静的パスを生成します。
      * `getPost(id)` を使って個別のお知らせデータを取得し、詳細を表示します。

#### **ステップ5：制作実績機能（閲覧側）の実装**

  - [ ] **制作実績データ取得関数の作成**
      * `src/lib/firebase/works.ts` に、Firestoreから制作実績一覧と個別の実績を取得するための関数 `getWorks()` と `getWork(id)` を実装します。
  - [ ] **制作実績一覧ページの作成 (SSG)**
      * `src/app/works/page.tsx` を作成し、`getWorks()` を使って全実績を一覧表示します。
  - [ ] **制作実績詳細ページの作成 (SSG)**
      * `src/app/works/[id]/page.tsx` を作成し、`generateStaticParams` と `getWork(id)` を使って詳細ページを実装します。

#### **ステップ6：管理者認証機能の実装**

  - [ ] **管理者用レイアウトの作成**
      * `src/app/admin/layout.tsx` を作成し、管理者ページの共通レイアウト（サイドバーなど）を定義します。
  - [ ] **ログインページの作成**
      * `src/app/admin/login/page.tsx` を作成し、メールアドレスとパスワードの入力フォームを設置します。
  - [ ] **認証ロジックの実装**
      * Firebase Authenticationの `signInWithEmailAndPassword` を使用してログイン処理を実装します。
      * 認証状態をグローバルに管理するため、`src/lib/store/authStore.ts` にZustandストアを作成します。
  - [ ] **管理者アクセスの保護**
      * `middleware.ts` をプロジェクトルートに作成し、`/admin` 配下へのアクセスを認証済みかつカスタムクレーム `admin: true` を持つユーザーに限定します。
      * （補足: カスタムクレームの設定は、Firebase FunctionsやAdmin SDKを使った別途スクリプトで、特定のUIDを持つユーザーに対して行います。）

#### **ステップ7：お知らせ管理機能（CRUD）の実装**

  - [ ] **お知らせCRUDサーバーアクションの作成**
      * `src/app/actions/postActions.ts` ファイルを作成します。
      * `"use server";` を先頭に記述し、お知らせの作成(`createPost`)、更新(`updatePost`)、削除(`deletePost`)を行う非同期関数を実装します。内部では `firebase-admin` を使用します。
  - [ ] **管理者向けお知らせ一覧ページの作成**
      * `src/app/admin/posts/page.tsx` を作成し、お知らせの一覧と「新規作成」「編集」「削除」ボタンを表示します。
  - [ ] **お知らせ作成・編集フォームの作成**
      * `src/components/admin/PostForm.tsx` を作成し、`react-hook-form` と `zod` を使ってバリデーション付きのフォームを実装します。
      * `src/app/admin/posts/new/page.tsx` と `src/app/admin/posts/edit/[id]/page.tsx` からこのフォームを呼び出し、それぞれ作成・更新のサーバーアクションを呼び出します。

#### **ステップ8：制作実績管理機能（CRUD）の実装**

  - [ ] **制作実績CRUDサーバーアクションの作成**
      * `src/app/actions/workActions.ts` に、制作実績のCRUD操作を行うサーバーアクションを実装します。
  - [ ] **管理者向け制作実績管理UIの作成**
      * `src/app/admin/works/` 以下に、お知らせ管理機能と同様の構成で、制作実績の管理ページ（一覧、新規作成、編集）を作成します。

#### **ステップ9：お問い合わせ機能の実装**

  - [ ] **お問い合わせフォームページの作成**
      * `src/app/contact/page.tsx` を作成します。
      * `react-hook-form` と `zod` を用いて、フォームとバリデーションを実装します。
  - [ ] **お問い合わせAPI Routeの作成**
      * `src/app/api/contacts/route.ts` を作成します。
      * `POST`リクエストを受け取り、リクエストボディを検証し、`firebase-admin` を使ってFirestoreの `contacts` コレクションにデータを保存する処理を記述します。
  - [ ] **フォームとAPIの連携**
      * フォームの `onSubmit` で `fetch` を使い、作成したAPIエンドポイントにデータを送信します。送信後の成功・失敗メッセージをUIに表示します。

#### **ステップ10：静的ページと全体レイアウトの構築**

  - [ ] **ヘッダーとフッターの作成**
      * `src/components/layout/Header.tsx` と `src/components/layout/Footer.tsx` を作成します。ナビゲーションリンクを含みます。
  - [ ] **ルートレイアウトの更新**
      * `src/app/layout.tsx` に `Header` と `Footer` を組み込み、サイト全体の共通レイアウトを完成させます。
  - [ ] **トップページの作成**
      * `src/app/page.tsx` を編集し、ヒーローセクション、事業内容への導線、最新のお知らせや制作実績などを表示します。
  - [ ] **固定ページの作成**
      * `src/app/about/page.tsx` (企業情報) と `src/app/services/page.tsx` (事業内容) を、要件に従って静的コンテンツで作成します。

#### **ステップ11：Vercelへのデプロイと最終確認**

  - [ ] **Vercelプロジェクトの作成**
      * VercelにGitHubリポジトリを連携して、新しいプロジェクトを作成します。フレームワークはNext.jsが自動で選択されます。
  - [ ] **環境変数の設定**
      * Vercelのプロジェクト設定 \> Environment Variablesに、`.env.local` に記述した `FIREBASE_SERVICE_ACCOUNT_KEY` を登録します。Webアプリ用の `firebaseConfig` の値も同様に登録します（`NEXT_PUBLIC_` プレフィックスを付ける）。
  - [ ] **デプロイと動作確認**
      * リポジトリにpushして自動デプロイを実行します。
      * デプロイされたURLにアクセスし、SSGされたページの表示速度、フォームの動作、管理者機能など、すべての機能が本番環境で正しく動作することを確認します。
  - [ ] **画像最適化の確認**
      * ブラウザの開発者ツールを使い、`next/image` によって画像がWebP形式に変換され、適切にリサイズされていることを確認します。