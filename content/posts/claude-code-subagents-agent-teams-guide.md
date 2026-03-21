---
title: "Claude Code 機能解説 #5：Sub-agents と Agent Teams ―― 並列AIエージェントで大規模タスクを分担する"
date: "2026-03-21T10:53:55"
category: "ITエンジニア"
excerpt: "Claude Codeのサブエージェントは、独立したコンテキストで特化型AIが動く仕組みです。2026年2月に追加されたAgent Teamsは複数Claudeインスタンスが直接通信し並列協調する実験的機能。使い分けと設定方法を公式ドキュメントをもとに解説します。"
coverImage: "/florian-olivo-4hbJ-eymZ1o-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/ja/sub-agents"
  - "https://code.claude.com/docs/ja/agent-teams"
  - "https://zenn.dev/toono_f/articles/claude-code-agent-teams-guide"
  - "https://techracho.bpsinc.jp/morimorihoge/2026_03_13/157217"
  - "https://recruit.group.gmo/engineer/jisedai/blog/claude-code-driven-development/"
---

# Claude Code 機能解説 #5：Sub-agents と Agent Teams

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第5回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide)

---

## 2つのマルチエージェント機能

Claude Code には、タスクを複数のAIに分担させる仕組みが2つあります。

| | サブエージェント（Sub-agents） | Agent Teams（エージェントチーム） |
|---|---|---|
| 概要 | 特化型AIアシスタントを呼び出す | 複数Claudeが直接通信して協調する |
| 通信 | メインエージェントのみに報告 | チームメンバー間で直接メッセージ可能 |
| コンテキスト | セッション内で共有 | 各メンバーが独立したコンテキストを持つ |
| 状態 | 安定版（本番環境で利用可） | **実験的**（2026年2月追加） |
| コスト | 低い | 高い（メンバー数に比例） |

この2つは設計思想が根本的に異なります。**サブエージェント**は「調べてきて」「このファイルを分析して」という単発タスクの委譲。**Agent Teams**は「フロントとバックを同時に開発して」という複数チームの協調作業です。

---

## サブエージェント（Sub-agents）

### サブエージェントとは

サブエージェントは、特定の種類のタスクを処理するための**特化した AI アシスタント**です。各サブエージェントは以下を備えた独自の環境で実行されます。

- **独立したコンテキストウィンドウ**（メイン会話とは別の記憶領域）
- **カスタムシステムプロンプト**（専門的な役割の定義）
- **制限されたツールアクセス**（必要なツールのみ付与）
- **指定されたモデル**（高速・低コストの Haiku 等も選択可）

Claude がサブエージェントの説明に一致するタスクに遭遇すると、自動的にそのサブエージェントへ委譲されます。結果はメイン会話へ要約して返されます。

### サブエージェントのメリット

| メリット | 内容 |
|---|---|
| コンテキスト保持 | 探索作業の大量出力をメイン会話から切り離せる |
| 制約の強制 | サブエージェントが使えるツールを限定できる |
| 設定の再利用 | ユーザーレベルで保存すれば全プロジェクトで使える |
| コスト制御 | 単純タスクには Haiku などの低コストモデルを割り当てられる |

### 組み込みサブエージェント

Claude Code には最初から以下のサブエージェントが含まれています（公式ドキュメント準拠）。

| エージェント | モデル | 用途 |
|---|---|---|
| **Explore** | Haiku（高速） | コードベースの検索・分析（読み取り専用） |
| **Plan** | メイン会話と同じ | Plan Mode 時のコードベース調査（読み取り専用） |
| **general-purpose** | メイン会話と同じ | 複雑なマルチステップタスク（全ツール使用可） |

`Explore` エージェントは、変更を加えずにコードを調査するときに Claude が自動的に使います。徹底度レベル（quick / medium / very thorough）を Claude が判断して指定します。

### カスタムサブエージェントの作成

サブエージェントは **YAMLフロントマターを含む Markdown ファイル** で定義します。

#### 保存場所とスコープ

| 場所 | スコープ | Git 管理 |
|---|---|---|
| `.claude/agents/` | 現在のプロジェクトのみ | **可能**（チーム共有推奨） |
| `~/.claude/agents/` | 全プロジェクト共通 | 不可 |

#### 基本的なファイル構造

```markdown
---
name: code-reviewer
description: コード品質・セキュリティ・保守性をレビューする。コード変更後に積極的に使用すること。
tools: Read, Grep, Glob, Bash
model: sonnet
---

あなたはシニアコードレビュアーです。呼び出されたら以下を実施してください：
1. git diff で最近の変更を確認
2. 変更されたファイルを重点的にレビュー
3. 優先度別（Critical / Warning / Suggestion）にフィードバックを整理して報告
```

#### フロントマターの主要フィールド

| フィールド | 必須 | 説明 |
|---|---|---|
| `name` | ○ | 小文字とハイフンの一意な識別子 |
| `description` | ○ | Claude がいつ使うかを判断するための説明（詳細なほど良い） |
| `tools` | - | 使用できるツールのリスト（省略時は全ツールを継承） |
| `disallowedTools` | - | 拒否するツールのリスト |
| `model` | - | `sonnet` / `opus` / `haiku` / `inherit`（省略時は inherit） |
| `permissionMode` | - | `default` / `acceptEdits` / `dontAsk` / `bypassPermissions` / `plan` |
| `maxTurns` | - | 最大エージェントターン数 |
| `memory` | - | 永続メモリスコープ：`user` / `project` / `local` |
| `isolation` | - | `worktree` で独立した git worktree で実行 |
| `hooks` | - | サブエージェント固有のライフサイクルフック |

#### /agents コマンドで作成する

CLI で `/agents` と入力すると対話メニューが開きます。

1. **Create new agent** を選択
2. スコープ（User-level / Project-level）を選択
3. **Generate with Claude** でAIに生成させるか手動で記述
4. ツールアクセスの選択（読み取り専用など）
5. モデルの選択
6. 保存 → 即座に利用可能（再起動不要）

### 実践パターン

#### パターン1：大量出力をメイン会話から分離

テスト実行・ログ解析など大量出力が予想されるタスクはサブエージェントに委譲します。

```
サブエージェントを使ってテストスイートを実行し、失敗したテストとエラーメッセージだけを報告してください
```

詳細出力はサブエージェントのコンテキストに留まり、要約だけがメイン会話に返ります。

#### パターン2：独立した調査を並行実行

```
認証モジュール・データベース・APIモジュールを別々のサブエージェントで並行して調査してください
```

各サブエージェントが独立して探索し、Claude が結果を統合します。

#### パターン3：サブエージェントをチェーンする

```
code-reviewer サブエージェントでパフォーマンス問題を特定し、次に optimizer サブエージェントで修正してください
```

---

## Agent Teams（エージェントチーム）

### Agent Teams とは

2026年2月5日（Claude Code v2.1.32）にリリースされた実験的機能です。**複数の Claude Code インスタンスがチームとして協調動作**します。

#### アーキテクチャ

```
Team Lead（メインセッション）
    ├── Teammate A（独立したセッション）
    ├── Teammate B（独立したセッション）
    └── Teammate C（独立したセッション）
         ↕ 直接メッセージ可能
    共有タスクリストで依存関係を管理
```

- **Team Lead**：タスクを分解して各 Teammate に割り振る
- **Teammates**：独立したコンテキストウィンドウで自律的に実行し、完了を報告
- **直接通信**：Teammates 同士がリードを介さずにメッセージをやり取りできる（サブエージェントとの最大の差異）
- **最大10並列**：チームメンバーは最大10人まで

### サブエージェントとの違い

| | サブエージェント | Agent Teams |
|---|---|---|
| Teammate 間の通信 | 不可 | **直接可能** |
| コンテキスト | 親セッション内で共有 | 各メンバーが独立して保持 |
| タスク管理 | なし | 共有タスクリスト＋依存関係管理 |
| ユーザーからの直接指示 | 不可 | **各 Teammate に直接指示可能** |
| 安定性 | 安定版 | 実験的 |

### 有効化方法

Agent Teams はデフォルトで無効です。以下のいずれかで有効化します。

**環境変数で有効化：**

```bash
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude
```

**settings.json で有効化：**

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### 起動方法

Agent Teams を示唆する指示を出すと自動的に起動します。

```
フロントエンドとバックエンドを同時に開発してください
```

```
プログラマー2名・デザイナー1名のチームで取り組んでください
```

### CLAUDE.md との連携

プロジェクトルートの `CLAUDE.md` に書いたルールは**全 Teammate に自動適用**されます。個別にプロンプトを書く必要がなく、チーム全体でコーディング規約を統一できます。

### コスト・注意点

Agent Teams は各 Teammate が独立したコンテキストウィンドウを持つため、**トークン消費がメンバー数に比例して増加**します。

Anthropic の公式ドキュメントによると、Teammate が Plan Mode で動作する場合、標準セッションと比べて**最大7倍のトークン消費**になることがあります。

また現時点では実験的機能のため、出力品質が60〜70%程度にとどまるケースがあり、手戻りが生じやすい場面も報告されています（TechRacho / GMOインターネット技術ブログより）。

---

## 使い分けの判断基準

| シナリオ | 推奨 |
|---|---|
| コードベースを素早く調査したい | **Explore サブエージェント** |
| ファイル分析・テスト実行など単発タスク | **サブエージェント** |
| 同リポジトリ内の独立した複数タスク | **サブエージェント（並行）** |
| フロント・バック・インフラを同時並行開発 | **Agent Teams** |
| チームメンバーが互いに参照しながら進める | **Agent Teams** |
| コスト最小化が重要 | **サブエージェント** |
| 本番環境での重要タスク | **サブエージェント（安定版）** |

---

## まとめ

- **サブエージェント**：安定版。単発・独立タスクの委譲に最適。カスタムエージェントを Markdown ファイルで定義してチームと共有できる
- **Agent Teams**：実験的機能（2026年2月追加）。Teammate 同士が直接通信して並列協調するため、大規模タスクの壁打ち時間を3〜5倍短縮できるが、コストとトークン消費に注意が必要

どちらも `CLAUDE.md` と組み合わせることで、チームのルールを全エージェントに一括適用できます。シリーズ第2回で解説した CLAUDE.md とこの機能の組み合わせが、Claude Code チーム活用の核心です。

---

## 次回予告

次回（#6）は **Voice Mode（音声入力）―― スペースキーを押しながら話すだけでコーディング指示** を解説します。

---

## 出典

- [カスタムサブエージェントの作成（公式・日本語）](https://code.claude.com/docs/ja/sub-agents)
- [エージェントチーム（公式・日本語）](https://code.claude.com/docs/ja/agent-teams)
- [Claude Code Agent Teams の始め方（Zenn）](https://zenn.dev/toono_f/articles/claude-code-agent-teams-guide)
- [Claude Code Agent Teams をうまく働かせるコツ（TechRacho）](https://techracho.bpsinc.jp/morimorihoge/2026_03_13/157217)
- [Claude Code による AI 駆動開発 〜Subagents と Agent Teams の比較〜（GMO）](https://recruit.group.gmo/engineer/jisedai/blog/claude-code-driven-development/)
