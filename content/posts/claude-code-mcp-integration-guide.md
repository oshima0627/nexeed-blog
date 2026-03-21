---
title: "Claude Code 機能解説 #3：MCP（Model Context Protocol）―― Jira・Slack・GitHubを自然言語で操作する"
date: "2026-03-21T03:30:12"
category: "ITエンジニア"
excerpt: "MCPはClaude Codeを外部ツールに接続するオープン規格です。Jira・Slack・GitHub・Notion・PostgreSQLなど数百のサービスと連携でき、「JIRAのチケットを読んで実装してPRを作成して」という複合タスクを1コマンドで実現します。設定方法・スコープ管理・主要サーバー一覧を公式ドキュメントをもとに解説します。"
coverImage: "/james-harrison-vpOeXr5wmR4-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/mcp"
  - "https://www.builder.io/blog/claude-code-with-jira"
  - "https://www.oflight.co.jp/en/columns/claude-code-mcp-integration-guide-2026"
  - "https://thoughtminds.ai/blog/claude-mcp-integration-how-to-connect-claude-code-to-tools-via-mcp"
  - "https://modelcontextprotocol.io/introduction"
---

# Claude Code 機能解説 #3：MCP（Model Context Protocol）

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第3回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide)

---

## MCPとは何か

**MCP（Model Context Protocol）** は、AnthropicがAIとツールを繋ぐために2024年11月に公開したオープン規格です。Claude Codeを外部のAPIやデータベース・サービスと接続するための「共通アダプター」だと考えると分かりやすいでしょう。

従来、AIに外部ツールを使わせるには専用のプラグインやAPI統合をゼロから実装する必要がありました。MCPはその仕組みを標準化し、**どのサービスも同じプロトコルで接続できる**ようにしました。

2026年3月時点でMCP SDKの月間ダウンロード数は9,700万回を超え、GitHubリポジトリに公開されているサーバー数は**10,000以上**に達しています（複数の業界レポートより）。

---

## MCPでできること

MCPサーバーを接続すると、Claude Codeは以下のような複合タスクを自然言語だけで実行できるようになります。

| 指示例 | 動作 |
|--------|------|
| 「JIRAのENG-4521を読んで実装してGitHubにPRを作成して」 | Jiraを参照 → コード実装 → PR作成 |
| 「SentryとStatsigでENG-4521の機能の使用状況を確認して」 | 2つのモニタリングツールから同時にデータ取得 |
| 「このfeatureを使った10人のユーザーのメールアドレスをPostgreSQLから調べて」 | DB直接クエリ |
| 「Slackに投稿された新しいFigmaデザインに合わせてメールテンプレートを更新して」 | Slack + Figmaの情報を統合して実装 |
| 「その10人にフィードバックセッションへの招待メールのGmailドラフトを作成して」 | Gmail API連携 |

これらの指示はすべて、MCPサーバーが設定済みであれば**1つのプロンプトで実行**できます。

---

## MCPサーバーの追加方法

MCPサーバーの接続方式は3種類あります。

### 方式1：リモートHTTPサーバー（推奨）

クラウドサービスへの接続に使う最も一般的な方式です。

```bash
# 基本構文
claude mcp add --transport http <名前> <URL>

# 例：Notionに接続
claude mcp add --transport http notion https://mcp.notion.com/mcp

# 認証ヘッダーが必要な場合
claude mcp add --transport http my-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### 方式2：リモートSSEサーバー（非推奨）

SSE（Server-Sent Events）方式は非推奨です。可能であればHTTPサーバーを使ってください。

```bash
# 例：Asanaに接続（SSE）
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

### 方式3：ローカルstdioサーバー

ローカルのプロセスとして動作するサーバーです。システムへの直接アクセスが必要なツールや自作スクリプトに適しています。

```bash
# 例：AirtableのMCPサーバーをローカルで動かす
claude mcp add --transport stdio \
  --env AIRTABLE_API_KEY=YOUR_KEY \
  airtable -- npx -y airtable-mcp-server
```

> **注意：オプションの順序**
> `--transport`、`--env`、`--scope`などのオプションはすべてサーバー名より**前**に記述します。`--`（ダブルダッシュ）の後がサーバー起動コマンドです。

---

## インストールスコープ：どこに設定を保存するか

MCPサーバーは3つのスコープで管理できます。

| スコープ | 保存場所 | 適した用途 |
|----------|----------|-----------|
| **local**（デフォルト） | `~/.claude.json`（プロジェクトパス配下） | 個人用・実験的な設定・機密情報を含む認証 |
| **project** | `.mcp.json`（プロジェクトルート） | チームで共有・Git管理・プロジェクト固有のツール |
| **user** | `~/.claude.json`（全プロジェクト共通） | 個人の全プロジェクトで使う汎用ツール |

```bash
# チームで共有するプロジェクトスコープで追加
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp

# 全プロジェクトで使うユーザースコープで追加
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

プロジェクトスコープで追加すると、プロジェクトルートに `.mcp.json` が生成されます。これをGitにコミットすれば、チーム全員が同じMCPサーバーを使えます。

```json
// .mcp.json（Gitにコミットする）
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

環境変数は `${VAR_NAME}` 構文で参照でき、APIキーなどの機密情報をファイルに直接書かずに済みます。

---

## 主要MCPサーバー一覧

Claude Codeで使える代表的なMCPサーバーをカテゴリ別に紹介します。

### 開発・プロジェクト管理

| サービス | 追加コマンド | できること |
|----------|-------------|-----------|
| **GitHub** | `claude mcp add --transport http github https://api.githubcopilot.com/mcp/` | Issue/PR作成、コード検索、ブランチ管理 |
| **Jira** | `claude mcp add --transport sse jira https://mcp.atlassian.com/...` | チケット参照・作成・コメント追加 |
| **Linear** | `claude mcp add --transport http linear https://mcp.linear.app/sse` | タスク管理・課題トラッキング |

### コミュニケーション・ドキュメント

| サービス | 追加コマンド | できること |
|----------|-------------|-----------|
| **Slack** | `claude mcp add --transport http slack https://mcp.slack.com/...` | メッセージ送信・チャンネル参照 |
| **Notion** | `claude mcp add --transport http notion https://mcp.notion.com/mcp` | ページ作成・データベース操作 |
| **Google Drive** | （OAuthセットアップが必要） | ドキュメント参照・更新 |

### データ・インフラ

| サービス | 用途 |
|----------|------|
| **PostgreSQL** | DBへの直接クエリ |
| **Stripe** | 決済データの参照・操作 |
| **AWS / GCP / Azure** | クラウドリソース管理 |
| **Sentry** | エラーログの分析 |
| **Playwright** | ブラウザ自動テスト |

GitHub上の公式リポジトリ（[modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)）には数百のサーバーが公開されています。

---

## よく使うMCP管理コマンド

```bash
# 設定済みサーバーの一覧
claude mcp list

# 特定サーバーの詳細
claude mcp get github

# サーバーの削除
claude mcp remove github

# セッション内でサーバー状態を確認
/mcp
```

`/mcp` コマンドはセッション内で使え、接続状況の確認やOAuth認証が必要なリモートサーバーへの認証にも使います。

---

## 実践的な活用例

### Jira × GitHub の連携ワークフロー

```
> Jiraの「ENG-4521」チケットの内容を読んで、
  該当機能を実装し、GitHubにPRを作成して。
  PRのタイトルと説明にはJiraチケットのタイトルを使うこと。
```

内部で起きていること：
1. MCPのJiraツールでチケット内容を取得
2. コードを実装（ファイル編集）
3. MCPのGitHubツールでPRを作成

人間がやれば30分以上かかる作業が自動化されます。

### Slack通知の自動化（Hooksとの組み合わせ）

MCPと[Hooks（#4回で解説予定）]を組み合わせると、「GitHubにPRを作成したら自動でSlackに通知する」といった連携も実現できます。

```bash
# PostToolUseフックでPR作成後にSlack通知
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "mcp__github__create_pull_request",
      "hooks": [{
        "type": "command",
        "command": "echo PR作成完了 | slack-notify"
      }]
    }]
  }
}
```

---

## セキュリティ上の注意点

MCPサーバーを使う際は以下に注意してください。

1. **サードパーティサーバーは慎重に選ぶ**：Anthropicが検証していないサーバーも多数あります。信頼できるソースのものを使ってください
2. **プロンプトインジェクションのリスク**：外部コンテンツを取得するMCPサーバー（Webスクレイピングなど）は、悪意あるコンテンツが紛れ込む可能性があります
3. **APIキーの管理**：`.mcp.json` にAPIキーを直接書かず、必ず `${ENV_VAR}` 構文で環境変数経由で渡してください
4. **プロジェクトスコープの承認**：`.mcp.json` からのサーバー接続は初回に承認ダイアログが表示されます

---

## トラブルシューティング

| 問題 | 対処法 |
|------|--------|
| サーバーに接続できない | `/mcp` で接続状態を確認。タイムアウトは `MCP_TIMEOUT=10000 claude` で延長可能 |
| ツールの出力が大きすぎる警告 | `MAX_MCP_OUTPUT_TOKENS=50000` で上限を引き上げる |
| 多数のサーバーでコンテキストが圧迫される | MCPツール検索機能が自動でオンデマンド読み込みに切り替え |
| Windows で「Connection closed」エラー | `cmd /c` ラッパーを使う：`-- cmd /c npx -y @some/package` |
| デバッグしたい | `claude mcp serve --debug` でデバッグモード起動 |

---

## まとめ

| ポイント | 内容 |
|----------|------|
| **MCPとは** | AIと外部ツールを繋ぐオープン規格（Anthropic製） |
| **接続方式** | HTTP（推奨）/ SSE（非推奨）/ stdio（ローカル） |
| **スコープ** | local（個人）/ project（チーム共有）/ user（全プロジェクト） |
| **主な用途** | Jira・GitHub・Slack・Notion・DB・クラウドなど数百のサービス |
| **セキュリティ** | APIキーは環境変数経由・サードパーティサーバーは慎重に |

次回（#4）は **Hooks ―― ファイル編集・コミット前後のイベント駆動型自動化** を解説します。

---

## 参考・出典

- [Connect Claude Code to tools via MCP（Claude Code 公式ドキュメント）](https://code.claude.com/docs/en/mcp)
- [How to use Claude Code for Jira - Complete integration guide | Builder.io](https://www.builder.io/blog/claude-code-with-jira)
- [Claude Code MCP Integration Guide | Oflight Inc.](https://www.oflight.co.jp/en/columns/claude-code-mcp-integration-guide-2026)
- [Claude MCP Integration: Connect Claude Code to Tools | ThoughtMinds](https://thoughtminds.ai/blog/claude-mcp-integration-how-to-connect-claude-code-to-tools-via-mcp)
- [Model Context Protocol 公式サイト](https://modelcontextprotocol.io/introduction)
- [MCP Servers リポジトリ（GitHub）](https://github.com/modelcontextprotocol/servers)
