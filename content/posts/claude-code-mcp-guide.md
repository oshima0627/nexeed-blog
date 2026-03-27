---
title: "Claude CodeのMCP連携ガイド - 外部ツールと接続して機能を拡張する"
date: "2026-03-27T12:00:00"
category: "MCP・拡張機能"
excerpt: "Model Context Protocol（MCP）を使ってClaude Codeの機能を拡張する方法を解説。GitHub、データベース、Slack等との連携設定から、カスタムMCPサーバーの構築まで。"
coverImage: "/nasa-Q1p7bh3SHj8-unsplash.jpg"
popular: true
---

# Claude CodeのMCP連携ガイド

Model Context Protocol（MCP）は、Claude Codeの機能を大幅に拡張できる仕組みです。外部のツールやサービスと連携することで、Claude Codeでできることの幅が広がります。

## MCPとは

MCPはAnthropicが策定したオープンプロトコルで、AIアシスタントと外部ツールを標準化された方法で接続します。Claude Codeは、MCPサーバーを通じて様々な外部サービスにアクセスできます。

### MCPの仕組み

```
Claude Code <-> MCPクライアント <-> MCPサーバー <-> 外部サービス
```

MCPサーバーは「ツール」を提供し、Claude Codeがそれらのツールを呼び出すことで外部サービスと連携します。

## MCPサーバーの設定方法

### 設定ファイルの場所

MCPサーバーの設定は以下の場所に記述します：

- **グローバル設定**: `~/.claude/settings.json`
- **プロジェクト設定**: `.claude/settings.json`（プロジェクトルート）

### 設定例

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}
```

## おすすめMCPサーバー

### GitHub MCP Server

GitHubのIssue、PR、リポジトリと直接連携できます：

- Issue・PRの一覧取得、作成、更新
- コードレビューの投稿
- リポジトリの検索

### Filesystem MCP Server

ファイルシステムへの高度なアクセスを提供します。特定のディレクトリへのアクセスを制限したい場合に便利です。

### Database MCP Servers

PostgreSQL、SQLiteなどのデータベースに直接接続できます。スキーマの確認やクエリの実行が可能です。

## MCPサーバーの管理

### インストール済みサーバーの確認

Claude Codeの設定画面から、現在設定されているMCPサーバーの一覧を確認できます。

### トラブルシューティング

MCPサーバーが正しく動作しない場合は以下を確認しましょう：

1. **コマンドパス**: MCPサーバーの実行コマンドが正しいか
2. **環境変数**: 必要なAPIキーやトークンが設定されているか
3. **ネットワーク**: 外部サービスへのアクセスが可能か

## カスタムMCPサーバーの作成

独自のMCPサーバーを作成して、社内ツールやAPIとClaude Codeを連携させることも可能です。TypeScriptやPythonのSDKが公式に提供されています。

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const server = new McpServer({
  name: "my-custom-server",
  version: "1.0.0",
});

// ツールの定義
server.tool("greet", { name: "string" }, async ({ name }) => {
  return { content: [{ type: "text", text: `Hello, ${name}!` }] };
});
```

## まとめ

MCPを活用することで、Claude Codeは単なるコーディングアシスタントから、開発ワークフロー全体をカバーする強力なツールへと進化します。まずは公式のMCPサーバーから試してみてください。
