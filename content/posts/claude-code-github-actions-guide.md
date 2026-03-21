---
title: "Claude Code 機能解説 #10：GitHub Actions 連携 ―― @claude メンションで PR 作成・バグ修正・コードレビューを自動化する"
date: "2026-03-21T14:30:00"
category: "ITエンジニア"
excerpt: "Claude Code GitHub Actions を使うと、Issue や PR のコメントに @claude と書くだけでAIがコードの実装・レビュー・PR作成を自動で行います。セットアップから CLAUDE.md 活用、AWS Bedrock / Google Vertex AI との連携まで公式ドキュメントをもとに解説します。"
coverImage: "/jj-ying-9Qwbfa_RM94-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/github-actions"
  - "https://github.com/anthropics/claude-code-action"
  - "https://github.com/anthropics/claude-code-action/blob/main/docs/security.md"
  - "https://github.com/anthropics/claude-code-action/tree/main/examples"
---

# Claude Code 機能解説 #10：GitHub Actions 連携

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第10回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide) ／ 第7回：[Remote Control](/posts/claude-code-remote-control-guide) ／ 第8回：[Git Worktree](/posts/claude-code-git-worktree-guide) ／ 第9回：[/loop コマンド](/posts/claude-code-loop-command-guide)

---

## Claude Code GitHub Actions とは

**Claude Code GitHub Actions** は、GitHub のワークフローにAI自動化を組み込む機能です。PR や Issue のコメントで `@claude` とメンションするだけで、Claude がコードを分析し、機能を実装し、バグを修正し、PR を作成します。

```
@claude implement this feature based on the issue description
@claude fix the TypeError in the user dashboard component
@claude how should I implement user authentication for this endpoint?
```

コメント1行で Claude がリポジトリを読み込み、コードを書き、PR まで作成します。

> **注記**：全PRに自動でレビューを投稿したい場合は [GitHub Code Review](/posts/claude-code-2026-latest-updates) 機能も合わせて確認してください。

---

## できること

| 操作 | 内容 |
|------|------|
| **即座の PR 作成** | Issue や要望を伝えると変更を含む PR を自動作成 |
| **コード実装** | Issue を読んで動くコードを書きコミットまで行う |
| **バグ修正** | エラーメッセージから原因を特定して修正 |
| **コードレビュー** | PR の diff を分析してレビューコメントを投稿 |
| **質問への回答** | コードベースを参照して設計や実装方針を説明 |
| **定期レポート** | schedule トリガーで毎朝コミットサマリーを生成など |

Claude は `CLAUDE.md` のガイドライン・既存コードのパターンに従って作業するため、チームの規約を守った結果を返します。

---

## セットアップ

### 方法1：クイックセットアップ（推奨）

Claude Code ターミナルで1コマンド実行するだけです。

```bash
/install-github-app
```

対話的にGitHubアプリのインストールと必要なシークレットの設定を案内してくれます。

> **前提条件**：リポジトリの管理者権限が必要です。AWS Bedrock / Google Vertex AI 経由の場合はこの方法は使えません（後述の手動セットアップを利用）。

### 方法2：手動セットアップ

**ステップ1：GitHub App をインストール**

[https://github.com/apps/claude](https://github.com/apps/claude) からリポジトリにインストールします。

必要な権限：

| 権限 | レベル |
|------|--------|
| Contents | Read & Write |
| Issues | Read & Write |
| Pull requests | Read & Write |

**ステップ2：API キーをシークレットに追加**

リポジトリの Settings → Secrets and variables → Actions で `ANTHROPIC_API_KEY` を追加します。

> **警告**：API キーをワークフローファイルに直接書かないでください。必ず GitHub Secrets を使用してください。

**ステップ3：ワークフローファイルを追加**

`.github/workflows/claude.yml` を作成します（[公式サンプル](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml)を参照）。

---

## 基本ワークフロー

最もシンプルな設定です。PR や Issue のコメントで `@claude` に反応します。

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
          # @claude メンションに自動応答
```

### PR 自動レビュー

PR が開かれるたびに自動でコードレビューを実行します。

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
          prompt: "Review this pull request for code quality, correctness, and security. Analyze the diff, then post your findings as review comments."
          claude_args: "--max-turns 5"
```

### 定期レポート生成

毎朝9時にコミットサマリーや Issue の状況レポートを生成します。

```yaml
name: Daily Report
on:
  schedule:
    - cron: "0 9 * * *"
jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Generate a summary of yesterday's commits and open issues"
          claude_args: "--model claude-opus-4-6"
```

---

## Action パラメーター一覧

| パラメーター | 説明 | 必須 |
|------------|------|------|
| `prompt` | Claude への指示（省略時は @claude メンションに応答） | いいえ |
| `claude_args` | Claude Code CLI への引数をまとめて渡す | いいえ |
| `anthropic_api_key` | Claude API キー | はい（直接API使用時） |
| `github_token` | GitHub APIアクセス用トークン | いいえ |
| `trigger_phrase` | 反応するトリガー（デフォルト：`@claude`） | いいえ |
| `use_bedrock` | AWS Bedrock を使用する | いいえ |
| `use_vertex` | Google Vertex AI を使用する | いいえ |

### `claude_args` でよく使う CLI 引数

```yaml
claude_args: "--max-turns 10 --model claude-sonnet-4-6 --allowedTools Edit,Read,Bash"
```

| 引数 | 説明 |
|------|------|
| `--max-turns` | 最大会話ターン数（デフォルト：10） |
| `--model` | 使用するモデル |
| `--allowedTools` | 許可するツールをカンマ区切りで指定 |
| `--disallowedTools` | 禁止するツール |
| `--append-system-prompt` | システムプロンプトを追記 |
| `--mcp-config` | MCP 設定ファイルのパス |

> **モデル切り替え**：デフォルトは Sonnet です。高精度が必要なタスクには `--model claude-opus-4-6` を指定します。

---

## CLAUDE.md でチーム規約を徹底させる

リポジトリルートに `CLAUDE.md` を置くと、Claude が PR 作成・レビュー時に自動で参照します。

```markdown
# プロジェクトルール

## コーディング規約
- TypeScript を使用する
- ESLint の設定に従う
- コンポーネントは関数コンポーネントで書く

## テスト
- すべての新機能に単体テストを追加すること
- テストカバレッジは 80% 以上を維持する

## PR
- タイトルは日本語でも可
- レビューコメントには行番号を含めること
```

この内容に従った実装・レビューが自動で行われます。

---

## エンタープライズ向け：AWS Bedrock / Google Vertex AI 連携

社内データをクラウドプロバイダー経由で処理したい場合、Bedrock や Vertex AI と連携できます。

### AWS Bedrock を使う場合

1. AWS で GitHub Actions 用の OIDC ID プロバイダーを設定
2. Bedrock 権限を持つ IAM ロールを作成
3. カスタム GitHub App を作成（推奨）
4. ワークフローで `use_bedrock: "true"` を指定

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    github_token: ${{ steps.app-token.outputs.token }}
    use_bedrock: "true"
    claude_args: '--model us.anthropic.claude-sonnet-4-6 --max-turns 10'
```

> Bedrock のモデルIDはリージョンプレフィックス付き（例：`us.anthropic.claude-sonnet-4-6`）です。

### Google Vertex AI を使う場合

1. Vertex AI API を有効化
2. Workload Identity Federation を設定
3. サービスアカウントに `Vertex AI User` ロールを付与
4. ワークフローで `use_vertex: "true"` を指定

```yaml
- uses: anthropics/claude-code-action@v1
  with:
    github_token: ${{ steps.app-token.outputs.token }}
    use_vertex: "true"
    claude_args: '--model claude-sonnet-4@20250514 --max-turns 10'
  env:
    ANTHROPIC_VERTEX_PROJECT_ID: ${{ steps.auth.outputs.project_id }}
    CLOUD_ML_REGION: us-east5
```

いずれも**静的なアクセスキーが不要**（OIDC / Workload Identity による一時認証）でセキュリティが高いです。

---

## コスト管理

GitHub Actions との連携では2種類のコストが発生します。

| コスト種別 | 内容 | 対策 |
|-----------|------|------|
| **GitHub Actions 分** | Ubuntu ランナーの使用時間 | タイムアウト・同時実行数を設定する |
| **API トークン** | プロンプト・レスポンスのトークン数 | `--max-turns` で上限を設ける |

```yaml
# コスト最適化の設定例
jobs:
  claude:
    timeout-minutes: 10          # ジョブ全体のタイムアウト
    concurrency:
      group: claude-${{ github.ref }}
      cancel-in-progress: true   # 同一ブランチの並列実行を制限
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          claude_args: "--max-turns 5"  # ターン数を絞る
```

---

## トラブルシューティング

| 症状 | 確認事項 |
|------|---------|
| `@claude` に反応しない | GitHub App のインストール状態・ワークフローが有効か・`ANTHROPIC_API_KEY` が正しく設定されているか |
| Claude のコミットで CI が動かない | GitHub App を使っているか（`actions/github-token` ではなく App Token を使う） |
| 認証エラー | API キーの有効性・Bedrock/Vertex の権限設定 |
| `@claude` ではなく `/claude` と書いてしまう | コメントでは `@claude`（`/` ではなく `@`）を使用する |

---

## まとめ

| ポイント | 内容 |
|---------|------|
| **起動方法** | `/install-github-app`（推奨）または手動セットアップ |
| **トリガー** | Issue・PRコメントの `@claude` メンション、または schedule・push などの GitHub イベント |
| **モデル** | デフォルト Sonnet。Opus 4.6 は `--model claude-opus-4-6` で指定 |
| **規約の徹底** | `CLAUDE.md` に書いたルールを Claude が自動参照 |
| **エンタープライズ** | AWS Bedrock・Google Vertex AI と連携可能 |
| **セキュリティ** | API キーは必ず GitHub Secrets に格納。コードは GitHub ランナー上で処理 |
| **コスト管理** | `--max-turns`・タイムアウト・同時実行制御で無駄を防ぐ |

Claude Code GitHub Actions は「AIに手元でコーディングを任せる」体験を CI/CD パイプラインにそのまま持ち込む機能です。チーム開発で `@claude` を使いこなすと、Issue 起票から実装・PR作成・レビューまでのサイクルが大幅に短縮されます。

---

## 次回予告

次回（#11）は **カスタムスラッシュコマンド（Skills）―― チームで共有できる独自コマンドを作る** を解説します。

---

## 参考・出典

- [Claude Code GitHub Actions（公式ドキュメント）](https://code.claude.com/docs/en/github-actions)
- [anthropics/claude-code-action（GitHub リポジトリ）](https://github.com/anthropics/claude-code-action)
- [Claude Code Action セキュリティドキュメント](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)
- [ワークフロー サンプル集](https://github.com/anthropics/claude-code-action/tree/main/examples)
