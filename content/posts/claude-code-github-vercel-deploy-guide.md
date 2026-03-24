---
title: "Claude CodeとGitHubを連携してVercelにデプロイする完全ガイド"
date: "2026-03-24T10:00:00"
category: "ITエンジニア"
excerpt: "Claude CodeのGitHub連携機能を使ったアプリ開発の自動化と、VercelによるGitHubリポジトリの自動デプロイ手順をわかりやすく解説します。公式ドキュメントに基づいた正確な情報をお届けします。"
coverImage: "/harshit-katiyar-5sLNGV2EFRM-unsplash.jpg"
verified: true
sources:
  - title: "Claude Code GitHub Actions - Claude Code Docs"
    url: "https://code.claude.com/docs/en/github-actions"
  - title: "anthropics/claude-code-action - GitHub"
    url: "https://github.com/anthropics/claude-code-action"
  - title: "Deploying GitHub Projects with Vercel"
    url: "https://vercel.com/docs/git/vercel-for-github"
  - title: "Deploying Git Repositories with Vercel"
    url: "https://vercel.com/docs/git"
---

AIを活用した開発ワークフローの構築に興味はありますか？

本記事では、**Claude CodeとGitHubを連携してアプリ開発を自動化する方法**と、**VercelでGitHubリポジトリを自動デプロイする手順**を、公式ドキュメントをもとに正確に解説します。

---

## 目次

1. [Claude Code × GitHub連携とは](#claude-code--github連携とは)
2. [Claude CodeのGitHub連携セットアップ手順](#claude-codegithub連携セットアップ手順)
3. [GitHub Actionsワークフローの設定](#github-actionsワークフローの設定)
4. [VercelでGitHubリポジトリをデプロイする手順](#vercelでgithubリポジトリをデプロイする手順)
5. [VercelとGitHub連携の主な機能](#vercelとgithub連携の主な機能)
6. [よくあるトラブルと対処法](#よくあるトラブルと対処法)

---

## Claude Code × GitHub連携とは

**Claude Code GitHub Actions**は、GitHubのPull RequestやIssueに`@claude`とメンションするだけで、Claude AIがコードの分析・実装・PR作成を自動的に行う機能です。

公式ドキュメントによると、主な特徴は以下のとおりです（出典：[Claude Code GitHub Actions公式ドキュメント](https://code.claude.com/docs/en/github-actions)）。

- **即時PR作成**：必要な変更を説明するとClaudeが完全なPRを作成
- **コード自動実装**：IssueをPRに変換するコマンド1つで対応
- **プロジェクト標準の遵守**：`CLAUDE.md`のガイドラインと既存コードのパターンを尊重
- **簡単なセットアップ**：数分でセットアップ可能
- **セキュリティ優先**：コードはGitHubのランナー上に留まる

### 動作の仕組み

PRやIssueのコメントに `@claude` とメンションすると、GitHub Actionsが起動してClaudeが呼び出されます。Claudeはリポジトリ全体のコンテキストと `CLAUDE.md` の内容を読み込み、コーディング規約に従った実装を行います。

---

## Claude CodeのGitHub連携セットアップ手順

### 前提条件

- Anthropic APIキー（[console.anthropic.com](https://console.anthropic.com)から取得）
- GitHubリポジトリへの管理者権限

### 方法1：クイックセットアップ（推奨）

最も簡単な方法は、Claude Codeのターミナルから以下のコマンドを実行することです。

```bash
/install-github-app
```

このコマンドが対話形式でGitHub Appのインストールと必要なSecretの設定を案内してくれます。

> **注意**：このクイックセットアップは、Anthropic APIを直接利用しているユーザー向けです。AWS BedrockやGoogle Vertex AIを使用している場合は、後述の手動セットアップを参照してください。

### 方法2：手動セットアップ

クイックセットアップが利用できない場合や、手動で設定したい場合は以下の手順で行います。

#### ステップ1：Claude GitHub Appのインストール

以下のURLからGitHubのリポジトリにClaudeアプリをインストールします。

[https://github.com/apps/claude](https://github.com/apps/claude)

アプリが要求するリポジトリ権限は以下のとおりです。

| 権限 | レベル |
|------|--------|
| Contents（リポジトリファイル） | Read & Write |
| Issues | Read & Write |
| Pull requests | Read & Write |

#### ステップ2：APIキーをGitHub Secretsに追加

リポジトリの **Settings → Secrets and variables → Actions** から、以下のSecretを追加します。

```
ANTHROPIC_API_KEY: (Anthropic APIキーの値)
```

> **セキュリティ上の重要事項**：APIキーは絶対にリポジトリのコードに直接記載しないでください。必ずGitHub Secretsを使用してください。

#### ステップ3：ワークフローファイルの追加

[anthropics/claude-code-action](https://github.com/anthropics/claude-code-action)リポジトリの `examples/claude.yml` をコピーして、自分のリポジトリの `.github/workflows/` ディレクトリに配置します。

---

## GitHub Actionsワークフローの設定

### 基本的なワークフロー例

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          # PRやIssueのコメントで@claudeへの言及に反応する
```

このワークフローにより、以下のようなコメントをIssueやPRに残すだけでClaudeが自動的に動作します。

```
@claude このIssueの内容をもとに機能を実装してください
@claude このエンドポイントのユーザー認証をどう実装すべきか教えて
@claude ダッシュボードコンポーネントのTypeErrorを修正してください
```

### 自動コードレビューの設定

PRが作成・更新されるたびに自動でレビューするワークフロー：

```yaml
name: Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "このPRのコード品質、正確性、セキュリティをレビューしてください。差分を分析し、レビューコメントとして投稿してください。"
          claude_args: "--max-turns 5"
```

### CLAUDE.mdの活用

リポジトリのルートに `CLAUDE.md` ファイルを作成することで、Claudeに対してプロジェクト固有のルールを伝えられます。

```markdown
# プロジェクトルール

## コーディング規約
- TypeScriptを使用する
- 関数名はキャメルケースで記述する
- コメントは日本語で記述する

## テスト
- すべての変更にユニットテストを追加すること
- テストは `npm test` で実行可能であること
```

---

## VercelでGitHubリポジトリをデプロイする手順

VercelはGitHubと連携することで、コードのプッシュに連動した自動デプロイを実現できます（出典：[Vercel公式ドキュメント - Deploying GitHub Projects](https://vercel.com/docs/git/vercel-for-github)）。

### ステップ1：Vercelアカウントの作成

[vercel.com](https://vercel.com)にアクセスし、GitHubアカウントでサインアップします。

### ステップ2：プロジェクトのインポート

1. Vercelダッシュボードから **「Add New Project」** をクリック
2. **「Import Git Repository」** を選択
3. GitHubアカウントへのアクセス許可を付与

> 個人リポジトリのみ（Organizationリポジトリは除く）であれば、無料のHobbyプランで利用可能です。

### ステップ3：リポジトリの選択と設定

1. デプロイしたいリポジトリを選択
2. Vercelがフレームワーク（Next.js、React、Vueなど）を自動検出し、ビルド設定を自動構成
3. 必要に応じて環境変数を設定（APIキー、データベース接続情報など）

**環境変数の設定場所**：プロジェクト設定 → **Environment Variables** セクション

### ステップ4：デプロイの実行

「Deploy」ボタンをクリックすると初回デプロイが開始されます。完了すると本番URL（例：`your-project.vercel.app`）が発行されます。

### 設定後の自動デプロイの流れ

```
GitHubにpush
    ↓
Vercelが変更を検知（Webhookで自動通知）
    ↓
自動ビルド・デプロイ開始
    ↓
本番環境に反映
```

---

## VercelとGitHub連携の主な機能

### 1. 自動本番デプロイ

メインブランチ（`main`または`master`）へのプッシュやマージにより、自動的に本番環境にデプロイされます。

### 2. プレビューデプロイ

Pull Requestを作成すると、自動的にそのPR専用の一意のプレビューURL（例：`your-project-git-feature-abc.vercel.app`）が発行されます。これにより、本番環境に影響を与えることなく変更をレビューできます。

### 3. ロールバック

問題が発生した場合は、Vercelダッシュボードから以前のデプロイへ即座にロールバックが可能です。

### 4. カスタムドメインの設定

プロジェクト設定の **Domains** セクションからカスタムドメイン（独自ドメイン）を紐付けられます。

---

## Claude Code × VercelによるAI開発ワークフローの例

以上の設定を組み合わせることで、以下のような自動化ワークフローが実現できます。

```
1. GitHubのIssueに「@claude このユーザー認証機能を実装して」とコメント
    ↓
2. Claude Codeが自動でブランチを作成し、コードを実装してPRを作成
    ↓
3. VercelがPRを検知してプレビューデプロイを実行
    ↓
4. PRのコメントにプレビューURLが自動で追記される
    ↓
5. レビュー後にmainブランチにマージ
    ↓
6. Vercelが本番環境に自動デプロイ
```

---

## よくあるトラブルと対処法

公式ドキュメントに記載されているトラブルシューティング情報をもとにまとめました。

### @claudeコマンドに反応しない

- GitHub Appが正しくインストールされているか確認
- ワークフローが有効になっているか確認（Settings → Actions → General）
- `ANTHROPIC_API_KEY` がリポジトリSecretに設定されているか確認
- コメントに `/claude` ではなく `@claude` が含まれているか確認

### Vercelでデプロイが失敗する

- ビルドログをVercelダッシュボードで確認する（ビルドエラー、依存関係の不足など）
- 環境変数が正しく設定されているか確認
- プッシュ先ブランチがVercelのデプロイ対象ブランチになっているか確認

### Vercel OrganizationリポジトリのデプロイをHobbyプランで行いたい

GitHub OrganizationリポジトリをVercelでデプロイする場合、通常はVercelのTeamプラン（有料）が必要です。Hobbyプランで対応する場合は、GitHub Actionsと`vercel` CLIを組み合わせる方法があります（出典：[Vercel Knowledge Base](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel)）。

---

## まとめ

| 機能 | 設定の手軽さ | 自動化レベル |
|------|------------|------------|
| Claude Code GitHub連携 | `/install-github-app`コマンドで数分 | `@claude`メンションで自動実装 |
| VercelのGitHub連携 | ダッシュボードから数分 | pushするだけで自動デプロイ |

Claude CodeとVercelを組み合わせることで、コードの実装からデプロイまでを大幅に自動化できます。まずはClaudeのGitHubアプリをインストールし、`@claude`で小さなタスクを試してみることをおすすめします。

---

## 参考・出典

- [Claude Code GitHub Actions 公式ドキュメント](https://code.claude.com/docs/en/github-actions) - Anthropic
- [anthropics/claude-code-action - GitHub](https://github.com/anthropics/claude-code-action) - Anthropic
- [Deploying GitHub Projects with Vercel](https://vercel.com/docs/git/vercel-for-github) - Vercel公式ドキュメント
- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git) - Vercel公式ドキュメント
- [How can I use GitHub Actions with Vercel?](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel) - Vercel Knowledge Base
