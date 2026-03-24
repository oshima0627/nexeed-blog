---
title: "スマホのClaudeアプリでGitHub開発してVercelにデプロイする方法【2026年版】"
date: "2026-03-24T12:00:00"
category: "ITエンジニア"
excerpt: "Claude公式アプリのコード機能（Claude Code on the Web）を使えば、スマホだけでGitHubリポジトリのシステム開発からVercelへのデプロイまで完結できます。公式ドキュメントをもとにした正確なセットアップ手順を解説します。"
coverImage: "/harshit-katiyar-gEtJoCN1qpM-unsplash.jpg"
verified: true
sources:
  - title: "Claude Code on the web - Claude Code Docs（公式）"
    url: "https://code.claude.com/docs/en/claude-code-on-the-web"
  - title: "Using the GitHub Integration | Claude Help Center（公式）"
    url: "https://support.claude.com/en/articles/10167454-using-the-github-integration"
  - title: "Claude Code GitHub Actions - Claude Code Docs（公式）"
    url: "https://code.claude.com/docs/en/github-actions"
  - title: "Deploying GitHub Projects with Vercel（公式）"
    url: "https://vercel.com/docs/git/vercel-for-github"
  - title: "Claude Code on the Web でスマホだけでアプリを開発しリリースしてみた - Zenn"
    url: "https://zenn.dev/ruwatana/articles/claude-code-on-the-web-for-app-development"
---

「外出先でもコードを書きたい」「PCを開かずにスマホだけで開発を進めたい」——そんなニーズに応えるのが、Claudeの**スマホアプリから使えるコード機能**です。

本記事では、ClaudeのiOS/Androidアプリを使ってGitHubリポジトリで開発し、Vercelにデプロイするまでの手順を、公式ドキュメントをもとに解説します。

> **注意**：本記事で解説する「Claude Code on the Web」は、2026年3月時点で**Research Preview（研究プレビュー）段階**の機能です。今後、仕様が変更される可能性があります。

---

## この記事でわかること

- ClaudeアプリのコードをスマホでGitHubリポジトリに接続する方法
- スマホからタスクを指示して自動でコーディングさせる流れ
- 変更をPull Requestとしてマージし、Vercelへ自動デプロイする方法

---

## 1. 前提条件・必要なもの

公式ドキュメント（[Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)）によると、利用には以下が必要です。

| 必要なもの | 内容 |
|-----------|------|
| **Claudeのプランサブスクリプション** | Pro / Max / Team / Enterprise（無料プランは対象外） |
| **GitHubアカウント** | リポジトリのオーナーまたは管理者権限が必要 |
| **Claudeモバイルアプリ** | iOS版 または Android版（無料でインストール可能） |
| **対象リポジトリ** | GitHubのみ対応（GitLabや他のサービスは現時点で非対応） |

**重要**：Claude Code on the Webは、2026年3月時点でGitHubのみ対応しています。GitLabなど他のGitホスティングサービスは利用不可です（公式ドキュメント明記）。

---

## 2. Claudeアプリをスマホにインストールする

まずClaude公式アプリをスマホにインストールします。

- **iPhone（iOS）**：[App Store からインストール](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684)
- **Android**：[Google Play からインストール](https://play.google.com/store/apps/details?id=com.anthropic.claude)

インストール後、Pro・Max・Team・Enterpriseのいずれかのプランでサインインしてください。

---

## 3. Claude Code on the Web のセットアップ

### ステップ1：claude.ai/code にアクセスする

スマホのブラウザまたはClaudeアプリから **[claude.ai/code](https://claude.ai/code)** にアクセスします。

### ステップ2：GitHubアカウントを連携する

初回アクセス時にGitHubアカウントとの連携を求められます。「Connect GitHub」をタップして認証を完了させます。

### ステップ3：Claude GitHub Appをリポジトリにインストールする

GitHubとの連携後、開発に使うリポジトリに **Claude GitHub App** をインストールします。

[https://github.com/apps/claude](https://github.com/apps/claude) からインストールするか、セットアップ画面の案内に沿って進めてください。

アプリが要求するリポジトリ権限（公式ドキュメントより）：

| 権限 | レベル |
|------|--------|
| Contents（ファイルの読み書き） | Read & Write |
| Issues | Read & Write |
| Pull requests | Read & Write |

### ステップ4：クラウド環境を選択する

Claude Code on the Webでは、タスクがAnthropicが管理する**隔離されたクラウドVM（仮想マシン）**上で実行されます。

デフォルトの環境には以下のツールチェーンが事前インストールされています（公式ドキュメントより）：

- **Node.js**（最新LTS）/ npm, yarn, pnpm, bun
- **Python** 3.x / pip, poetry
- **Ruby** / gem, bundler
- **PHP** 8.4 / **Java** / **Go** / **Rust** / **C++（GCC、Clang）**
- **PostgreSQL** 16 / **Redis** 7.0

---

## 4. スマホからタスクを指示して開発する

### 開発の基本的な流れ

セットアップが完了すると、以下の流れでスマホだけで開発が進みます。

```
スマホで開発タスクを自然言語で入力
    ↓
ClaudeがAnthropicのクラウドVM上でリポジトリをクローン
    ↓
コード実装・テスト実行・ファイル変更を自動で実行
    ↓
スマホで進捗をリアルタイム確認
    ↓
差分（Diff）レビューをアプリ上で確認・フィードバック
    ↓
Pull Requestを作成
    ↓
GitHubでマージ → Vercelが自動デプロイ
```

### タスクの入力例

自然言語でそのまま指示できます：

```
ユーザー登録フォームのバリデーションを追加して。
メールアドレスの形式チェックとパスワードの8文字以上チェックを実装すること。

認証トークンを環境変数から読み込むように修正して。
現在はハードコードされているので直してほしい。

src/api/users.ts にあるgetUserById関数のN+1クエリ問題を修正して。
```

### タスク実行中の進捗確認

タスク実行中は、Claudeアプリのセッション画面でリアルタイムに進捗が確認できます。

「Running npm test...」「Created branch feature/add-validation」といった実行ログが表示されます。

**セッションはPCを閉じても継続します**。スマホのアプリからいつでも状況確認が可能です。

### 差分レビュー（Diff View）機能

タスクが完了すると、変更されたファイルの差分をアプリ上で確認できます（Diff View機能）。

- 変更ファイルの一覧を確認
- ファイルごとに追加・削除行を確認
- 修正が必要な場合はコメントで追加指示を送る

問題がなければ「Create PR」をタップするだけでPull Requestが作成されます。

---

## 5. VercelでGitHubリポジトリを自動デプロイする

### Vercelのセットアップ（初回のみ）

まだVercelとGitHubを連携していない場合は、以下の手順で設定します（出典：[Vercel公式ドキュメント](https://vercel.com/docs/git/vercel-for-github)）。

1. [vercel.com](https://vercel.com) にアクセスしてアカウントを作成
2. ダッシュボードから「**Add New Project**」→「**Import Git Repository**」をクリック
3. GitHubアカウントのアクセスを許可
4. デプロイするリポジトリを選択
5. フレームワーク（Next.js、React、Vueなど）を自動検出・設定
6. 環境変数を設定（APIキー等）して「**Deploy**」

### 自動デプロイの仕組み

Vercel連携後は、GitHubへのプッシュやマージに連動して自動デプロイが走ります。

| 操作 | Vercelの動作 |
|------|-------------|
| `main`ブランチへのマージ | 本番環境（Production）に自動デプロイ |
| Pull Requestの作成 | PR専用のプレビューURLを自動発行 |
| PRのクローズ | プレビュー環境を自動削除 |

### スマホだけで完結するデプロイまでのワークフロー

```
① ClaudeアプリでタスクをGitHubリポジトリに指示
    ↓
② Claudeが自動でブランチを作成しコードを実装
    ↓
③ VercelがPRを検知してプレビューURLを自動発行
    ④ スマホからプレビューURLで動作確認
    ↓
⑤ GitHubアプリでPRをマージ（mainブランチへ）
    ↓
⑥ Vercelが本番環境に自動デプロイ完了
```

このすべての操作が、スマホだけで完結します。

---

## 6. セキュリティについて

公式ドキュメントに記載されているセキュリティの仕組みを紹介します。

- **隔離されたVM**：各セッションはAnthropicが管理する独立したVMで実行されます
- **認証情報はVM内に入らない**：GitHubの認証はセキュリティプロキシ経由で処理されるため、Claudeのサンドボックス内には実際のGitHubトークンは存在しません
- **プッシュ先の制限**：セキュリティ上の理由から、git pushは現在作業中のブランチのみに制限されています

---

## 7. 注意点・現在の制限事項（2026年3月時点）

公式ドキュメントに明記されている制限事項です：

- **GitHubのみ対応**：GitLabや Bitbucketなど他のGitホスティングサービスは現時点で非対応
- **有料プランが必須**：Pro / Max / Team / Enterprise（無料プランは利用不可）
- **Research Preview段階**：機能は随時改善中であり、仕様が変更される可能性あり
- **セッション共有に注意**：セッションを公開設定にすると、プライベートリポジトリのコードが見えてしまう可能性があります。共有前に確認が必要です

---

## 8. CLAUDE.mdでClaudeへのルールを事前定義する

開発品質を上げるために、リポジトリのルートに `CLAUDE.md` ファイルを作成しておくことを推奨します。

Claudeはタスク実行前にこのファイルを読み込み、プロジェクトのルールに沿ったコードを生成します。

```markdown
# プロジェクトルール

## 技術スタック
- フロントエンド: Next.js 15 / TypeScript
- スタイリング: Tailwind CSS
- テスト: Jest + React Testing Library

## コーディング規約
- TypeScriptを必ず使用する（anyは禁止）
- 関数コンポーネントとReact Hooksを使用する
- コメントは日本語で記述する
- すべての変更にユニットテストを追加すること

## コミット規約
- feat: 新機能追加
- fix: バグ修正
- refactor: リファクタリング
```

---

## まとめ

| 機能 | 内容 |
|------|------|
| **Claude Code on the Web** | スマホからGitHubリポジトリへのコーディングタスクを指示 |
| **クラウドVM** | タスクはAnthropicのサーバーで自動実行（スマホのリソース不要） |
| **Diff View** | スマホ上で変更内容を確認・フィードバック |
| **VercelのGitHub連携** | PRマージで本番環境に自動デプロイ |

Claude Code on the Webは現在Research Previewですが、すでに「スマホで指示→クラウドでコーディング→PRマージ→Vercel自動デプロイ」という開発サイクルをスマホだけで完結させることができます。

Pro以上のプランをお使いの方はぜひ試してみてください。

---

## 参考・出典

- [Claude Code on the web - Claude Code Docs（公式）](https://code.claude.com/docs/en/claude-code-on-the-web) - Anthropic
- [Claude Code GitHub Actions - Claude Code Docs（公式）](https://code.claude.com/docs/en/github-actions) - Anthropic
- [Claude Code Mobile: iPhone, Android & SSH (2026) | Sealos Blog](https://sealos.io/blog/claude-code-on-phone/)
- [Deploying GitHub Projects with Vercel（公式）](https://vercel.com/docs/git/vercel-for-github) - Vercel
- [Claude Code on the Web でスマホだけでアプリを開発しリリースしてみた](https://zenn.dev/ruwatana/articles/claude-code-on-the-web-for-app-development) - Zenn
