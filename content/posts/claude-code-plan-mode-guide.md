---
title: "Claude Code 機能解説 #1：Plan Mode（プランモード）―― 実行前に「設計図」を確認する"
date: "2026-03-21"
category: "ITエンジニア"
excerpt: "Claude CodeのPlan Modeは、AIがコードを書き始める前に「読み取り専用」で設計図を作成し、開発者がレビューしてから実行に移せる機能です。複数ファイルにまたがる変更や大規模リファクタリングで特に威力を発揮します。有効化方法・実践的なワークフロー・ベストプラクティスをすべて解説します。"
coverImage: "/blake-connally-IKUYGCFmfw4-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/common-workflows"
  - "https://claudelog.com/mechanics/plan-mode/"
  - "https://www.datacamp.com/tutorial/claude-code-plan-mode"
  - "https://codewithmukesh.com/blog/plan-mode-claude-code/"
  - "https://claudefa.st/blog/guide/mechanics/planning-modes"
  - "https://www.builder.io/blog/claude-code-tips-best-practices"
---

# Claude Code 機能解説 #1：Plan Mode（プランモード）

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第1回です。今後、CLAUDE.md、MCP、Hooks、Agent Teams など主要機能を順次解説していきます。

---

## Claude Codeの主要機能一覧（シリーズ全体像）

本シリーズで取り上げる機能は以下の通りです。

| # | 機能名 | 概要 |
|---|--------|------|
| **1** | **Plan Mode** ← 今回 | 実行前に設計図を作成・確認 |
| 2 | CLAUDE.md / Memory | 永続的な指示と自動記憶 |
| 3 | MCP（Model Context Protocol） | Jira・Slack・Google Driveなど外部ツール連携 |
| 4 | Hooks | ファイル編集・コミット前後の自動処理 |
| 5 | Agent Teams / Sub-agents | 並列AIエージェントによる大規模タスク分担 |
| 6 | Voice Mode | 音声入力によるハンズフリー操作 |
| 7 | Remote Control | スマホ・タブレットからのローカル作業継続 |
| 8 | Git Worktree | 並列作業のための隔離環境 |
| 9 | /loop コマンド | プロンプトの定期自動実行 |
| 10 | GitHub Actions 連携 | CI/CDパイプラインでのコードレビュー自動化 |
| 11 | カスタムスラッシュコマンド（Skills） | チーム共有ワークフローのパッケージ化 |
| 12 | Security Scanning | コードベースの脆弱性自動検出 |

---

## Plan Modeとは何か

**Plan Mode** は、Claude Codeが「読み取り専用」状態で動作する特別なモードです。

通常、Claude Codeに指示を出すとすぐにファイルの編集やコマンドの実行を始めます。一方、Plan Modeでは **ファイルの読み込み・コードベースの調査・質問の提示** のみを行い、**一切のコード変更を行いません**。変更を加えるのは、開発者が計画を確認して「実行してよい」と承認した後だけです。

「AIに大きな変更を頼んだら、意図しない方向に突っ走ってしまった」という経験はないでしょうか。Plan Modeはその問題を解決するための安全弁です。

---

## Plan Modeで「できること」「できないこと」

### できること（読み取り専用ツール）

| ツール | 役割 |
|--------|------|
| Read | ファイルの内容を読む |
| LS | ディレクトリ一覧を表示する |
| Glob | ファイルパターンで検索する |
| Grep | コード内のキーワードを検索する |
| Task | リサーチ用サブエージェントを起動する |
| TodoRead / TodoWrite | タスク一覧の確認・更新 |
| WebFetch / WebSearch | Webコンテンツの取得・調査 |

### できないこと（書き込み系ツールはすべてブロック）

- Edit / MultiEdit（ファイル編集）
- Write（ファイル作成）
- Bash（コマンド実行）
- NotebookEdit（Jupyter編集）
- 状態を変更するMCPツール

コードを一行も書かずに「現状の把握」だけを行うため、Plan Mode中は何かが壊れる心配がありません。

---

## Plan Modeの有効化方法（4通り）

### 方法1：Shift+Tabキーで切り替える（最も手軽）

Claude Code実行中に **Shift+Tab** を押すとモードが切り替わります。

```
通常モード → 自動承認モード（Auto-Accept）→ Plan Mode
```

画面下部に `⏸ plan mode on` と表示されれば有効になっています。

### 方法2：/plan コマンドを打つ

セッション内で `/plan` と入力するだけです（2026年1月に追加）。

```
> /plan
```

### 方法3：起動時にフラグを指定する

```bash
claude --permission-mode plan
```

最初からPlan Modeで始めたい場合に便利です。

### 方法4：設定ファイルでデフォルトにする

毎回Plan Modeから始めたい場合は `settings.json` に記述します。

```json
// .claude/settings.json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

---

## 推奨ワークフロー：Explore → Plan → Execute → Commit

公式ドキュメントでも推奨されている4ステップワークフローが効果的です。

```
1. Explore（調査）
   ↓ Plan Modeで現状のコードを理解する
2. Plan（計画）
   ↓ Claudeが設計図を作成・提示する
3. Execute（実行）
   ↓ 承認後、通常モードで実装する
4. Commit（コミット）
   ↓ 変更内容を確認してコミット
```

### 実際の使用例：認証システムをOAuth2に移行する

```bash
# Plan Modeで起動
claude --permission-mode plan
```

```
> 認証システムをOAuth2に移行したい。詳細な移行計画を作成してほしい。
```

Claudeは現在の実装を調査し、計画を提示します。その後、追加で質問できます。

```
> 後方互換性はどうする？
> データベースのマイグレーションは？
```

計画に納得したら、Shift+Tabでモードを切り替えて実行開始です。

---

## 実践的なテクニック

### Ctrl+G で計画を直接編集する

Claudeが計画を提示したとき、**Ctrl+G** を押すとテキストエディタで計画ファイルを直接編集できます。「このステップを変えたい」「制約を追加したい」という細かい修正をClaude抜きで行えるため、実装前の方向修正が格段に楽になります。

### Opus 4.6 を使う（Max/Team/Enterpriseプラン）

Plan Modeでのみ Opus 4.6（100万トークンのコンテキスト）を使い、実行フェーズでは Sonnet 4.6 に切り替えるというハイブリッド運用が可能です。

```
/model → 「Use Opus in plan mode, Sonnet 4.6 otherwise」を選択
```

大規模なコードベースを計画フェーズで丸ごと把握させ、実装は高速なSonnetに任せることでコストを抑えつつ精度を上げられます。

### 計画書をPRの説明文に再利用する

Claudeが生成した計画書は、そのままPull Requestの説明文として使えます。計画承認後に計画ファイルをコピーしてPR本文に貼り付けるだけで、「何を変えたのか・なぜ変えたのか」が明確なPRが完成します。

```
計画ファイルを保存する例
→ 2026-03-20-auth-oauth2-migration.md
```

### 大きなリファクタリングは複数回のPlan Modeに分割する

「1セッションで全部やろう」とすると計画の整合性が崩れやすくなります。実績のあるやり方は、機能フェーズごとに計画を分割することです。

```
Plan 1: auth-extraction  → ログイン処理の分離
Plan 2: db-migration     → DBスキーマの変更
Plan 3: frontend-update  → フロントエンドの修正
```

セッション名には `claude -n "セッション名"` で命名し、`claude --resume セッション名` で再開できます。

---

## Plan Modeを使うべき場面・使わなくてよい場面

### 使うべき場面

| 場面 | 理由 |
|------|------|
| 2ファイル以上にまたがる変更 | コンテキストを失うリスクを下げる |
| 未知のコードベースを調査する | 変更なしで全体像を把握できる |
| 大規模リファクタリング | 実行前に計画の方向性を確認できる |
| 依存関係が複雑な変更 | 影響範囲を事前に把握できる |
| アーキテクチャ上の重要な判断 | 間違えたときのコストが高い |

### 使わなくてよい場面

| 場面 | 理由 |
|------|------|
| 1ファイル内の小さなバグ修正 | 計画のオーバーヘッドが無駄 |
| 変更内容が1文で説明できる場合 | 直接実行する方が速い |
| すでに自分でコードを把握している | Claudeに調査させる意味が薄い |

---

## まとめ

Plan Modeは「AIが先走って意図しない変更を行う」リスクを大幅に下げる、Claude Codeの最重要機能の1つです。

| ポイント | 内容 |
|----------|------|
| **安全性** | 読み取り専用のため計画中に何も壊れない |
| **有効化** | Shift+Tab × 2回 または `/plan` または `--permission-mode plan` |
| **Ctrl+G** | 計画書をエディタで直接編集できる |
| **Opus 4.6連携** | 計画フェーズだけOpusを使うハイブリッド運用 |
| **計画書の活用** | PR説明文・セッション命名・フェーズ分割 |

次回（#2）は **CLAUDE.md と Memory（永続的な指示と自動記憶）** を解説します。

---

## 参考・出典

- [Common workflows（Claude Code 公式ドキュメント）](https://code.claude.com/docs/en/common-workflows)
- [Claude Code Plan Mode: Design Review-First Refactoring Loops | DataCamp](https://www.datacamp.com/tutorial/claude-code-plan-mode)
- [Plan Mode in Claude Code - Think Before You Build | codewithmukesh](https://codewithmukesh.com/blog/plan-mode-claude-code/)
- [Claude Code Planning Mode: Shift+Tab Twice | claudefa.st](https://claudefa.st/blog/guide/mechanics/planning-modes)
- [Plan Mode（ClaudeLog）](https://claudelog.com/mechanics/plan-mode/)
- [50 Claude Code Tips and Best Practices | Builder.io](https://www.builder.io/blog/claude-code-tips-best-practices)
