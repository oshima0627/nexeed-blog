---
title: "Claude Code 機能解説 #2：CLAUDE.md と Memory ―― AIに「覚えておいてほしいこと」を永続させる"
date: "2026-03-21T03:19:59"
category: "ITエンジニア"
excerpt: "Claude Codeは毎回セッションを初期化します。しかし「CLAUDE.md」と「Auto Memory」を使えば、コーディング規約・ビルドコマンド・アーキテクチャ方針などをAIに永続的に記憶させられます。2つのメモリシステムの仕組み、書き方のコツ、チームでの運用方法を公式ドキュメントをもとに徹底解説します。"
coverImage: "/altumcode-XMFZqrGyV-Q-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/memory"
  - "https://claudefa.st/blog/guide/mechanics/auto-memory"
  - "https://alirezarezvani.medium.com/the-new-claude-codes-auto-memory-feature-just-changed-how-my-team-works-here-is-the-setup-i-5126174b35dc"
  - "https://www.morphllm.com/claude-md-examples"
  - "https://institute.sfeir.com/en/claude-code/claude-code-memory-system-claude-md/tutorial/"
---

# Claude Code 機能解説 #2：CLAUDE.md と Memory

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第2回です。
> 第1回：[Plan Mode（プランモード）](/posts/claude-code-plan-mode-guide)

---

## なぜ「メモリ」が必要なのか

Claude Codeは**毎回のセッションを白紙の状態で開始**します。前回「pnpm を使うこと」「コードスタイルはESLintの設定に従うこと」と伝えても、翌日のセッションでは覚えていません。

これを解決するのが2つのメモリシステムです。

| 仕組み | 書くのは誰 | 役割 |
|--------|-----------|------|
| **CLAUDE.md** | 開発者自身 | ルール・方針・コンテキストを永続化する |
| **Auto Memory（MEMORY.md）** | Claude自身 | 作業を通じて発見した知識を自動で蓄積する |

---

## CLAUDE.md とは

**CLAUDE.md** は、プロジェクトルートに置くMarkdownファイルです。Claude Codeは毎セッション起動時にこのファイルを読み込み、システムプロンプトの直後にコンテキストとして注入します。「チームの憲法」と捉えると分かりやすいでしょう。

### 置き場所と適用範囲

CLAUDE.mdは3つのスコープで管理できます。

| スコープ | 置き場所 | 共有範囲 |
|----------|----------|----------|
| **プロジェクト** | `./CLAUDE.md` または `./.claude/CLAUDE.md` | Gitでチーム全員と共有 |
| **ユーザー（個人）** | `~/.claude/CLAUDE.md` | 自分のすべてのプロジェクトに適用 |
| **組織（Enterprise）** | `/etc/claude-code/CLAUDE.md`（Linux） | マシン上の全ユーザーに強制適用 |

より具体的なスコープの設定が、より広いスコープより優先されます。

### /init コマンドで自動生成する

最初から手書きしなくても、`/init` コマンドを使えばClaudeがコードベースを解析して自動でCLAUDE.mdを作成してくれます。

```
> /init
```

生成後は自分でカスタマイズするだけでOKです。

---

## CLAUDE.mdに書くべき内容

### 実践的なテンプレート例

```markdown
# プロジェクト: My App

## ビルドとテスト
- ビルド: `pnpm build`
- テスト: `pnpm test`
- Lint: `pnpm lint`
- 開発サーバー: `pnpm dev`（ポート3000）

## コーディング規約
- インデント: スペース2つ（タブ禁止）
- 型定義: TypeScript strict モードを使用
- コンポーネント: 関数コンポーネントのみ（クラスコンポーネント禁止）
- import: パスエイリアスを使う（例: `@/components/...`）

## アーキテクチャ
- APIハンドラーは `src/api/handlers/` に配置
- ビジネスロジックは `src/services/` に配置
- 状態管理はZustand（ReduxやContextは新規追加しない）

## Git
- コミットメッセージはConventional Commits形式
- PRは必ずdraftから作成し、CIが通ってからReview Readyに変更
- `main` ブランチへの直接プッシュ禁止

## 注意事項
- ステージング環境はポート3001を使う
- APIテストにはローカルのRedisが必要（`redis-server`）
- `.env.example` を参考に `.env.local` を作ること
```

### 効果的な書き方の3原則

**1. 具体的に書く**

```markdown
# ✗ 悪い例（曖昧）
コードをきれいに書くこと

# ✓ 良い例（具体的）
- インデント: スペース2つ
- 1ファイルの最大行数: 300行
- 関数の引数は4つ以下
```

**2. 箇条書きを使う**

公式ドキュメントの調査によると、箇条書きはナラティブな段落より**60%高い従順率**を示します。Claudeは明示的な指示として解釈しやすくなります。

**3. 200行以内に収める**

CLAUDE.mdはセッションごとにコンテキストウィンドウに読み込まれます。長すぎると指示の遵守率が下がります。200行を超える場合は後述の `rules/` ディレクトリに分割してください。

---

## .claude/rules/ ディレクトリ：モジュール化されたルール管理

大規模なプロジェクトでは、CLAUDE.mdを単一ファイルで管理するのが困難になります。`.claude/rules/` ディレクトリを使うと、ルールをトピック別に分割できます。

```
your-project/
├── CLAUDE.md                  # メインの簡潔な指示
└── .claude/
    └── rules/
        ├── code-style.md      # コーディングスタイル
        ├── testing.md         # テスト規約
        ├── security.md        # セキュリティ要件
        └── api-design.md      # API設計方針
```

### パス限定ルール（path-specific rules）

特定のファイルタイプにのみ適用するルールは、フロントマターで指定できます。

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API開発ルール

- すべてのAPIエンドポイントに入力バリデーションを必須とする
- エラーレスポンスは共通フォーマットを使う（`src/types/api.ts` 参照）
- OpenAPIドキュメントコメントを必ず追加する
```

このルールは `src/api/` 配下のTypeScriptファイルを開いたときのみ読み込まれます。常時コンテキストを消費しないため、効率的です。

### @import 構文で他のファイルを参照する

README や package.json など、既存のドキュメントを取り込むこともできます。

```markdown
# プロジェクト概要
@README.md の内容を参照すること。

# 利用可能なnpmコマンド
@package.json のscriptsセクションを参照すること。

# Gitワークフロー
@docs/git-workflow.md のガイドラインに従うこと。
```

---

## Auto Memory：Claudeが自動で書くメモ

**Auto Memory** は、Claude Codeが作業中に自動でメモを取り、次回のセッションで活用する機能です。Claude Code **v2.1.59以降** で利用可能で、デフォルトで有効になっています。

### 保存場所と構造

```
~/.claude/projects/<プロジェクト名>/memory/
├── MEMORY.md          # インデックス（毎セッション最初の200行が読み込まれる）
├── debugging.md       # デバッグパターンの詳細メモ
├── api-conventions.md # API設計の決定事項
└── ...
```

Claudeは作業中に「これは次回も役立つ」と判断した情報を自動保存します。典型的な保存内容：

- よく使うビルドコマンドの発見
- デバッグで判明したプロジェクト固有の注意点
- 開発者が好む命名規則やスタイル
- 繰り返し登場するアーキテクチャパターン

### MEMORY.mdの仕組み

- `MEMORY.md` の **最初の200行のみ** がセッション開始時に読み込まれます
- 詳細なメモは `debugging.md` などのトピックファイルに分割して保存されます
- トピックファイルは必要に応じてオンデマンドで読み込まれます

### 明示的に記憶させる

セッション中に「このことを覚えておいて」と直接伝えられます。

```
> pnpmを使うこと、npmは使わないでほしいと覚えておいて
> APIテストにはローカルのRedisインスタンスが必要と記憶して
> ステージング環境はポート3001を使うと書き留めておいて
```

Claudeはこれらを即座に該当するメモリファイルに保存します。

### /memory コマンドで管理する

```
> /memory
```

セッション内でこのコマンドを実行すると、現在読み込まれているすべてのCLAUDE.mdファイルとAuto Memoryの内容を確認・編集できます。

---

## CLAUDE.md vs Auto Memory：使い分けの整理

| 観点 | CLAUDE.md | Auto Memory（MEMORY.md） |
|------|-----------|--------------------------|
| **書くのは誰** | あなた | Claude |
| **内容** | ルール・制約・方針 | Claudeが発見した知識・観察 |
| **Gitで共有** | ✅ する | ❌ しない（マシンローカル） |
| **起動時の読み込み** | ✅ 全文 | ✅ 先頭200行 |
| **用途** | コーディング規約、ワークフロー、アーキテクチャ | ビルドコマンド、デバッグ知見、スタイルの好み |

**ベストプラクティス：**
- CLAUDE.mdは「あなたの要件」を記述する場所
- Auto Memoryは「Claudeがあなたについて学んだこと」を保存する場所
- Auto Memoryに誤りがあれば `MEMORY.md` を直接編集して修正できる

---

## チームでの運用方法

### Gitignoreの設定

```gitignore
# Auto Memoryはマシンローカルのためバージョン管理対象外
.claude/projects/
~/.claude/projects/

# CLAUDE.mdとrules/はチームで共有するためGitに含める
# （除外しない）
```

### モノレポでの活用

大規模なモノレポでは、各サブプロジェクトに独自の CLAUDE.md を置き、ルートの CLAUDE.md には共通ルールのみ記述するのが効果的です。

```
monorepo/
├── CLAUDE.md              # 共通ルール（CI/CDなど）
├── packages/
│   ├── frontend/
│   │   └── CLAUDE.md      # フロントエンド固有のルール
│   └── backend/
│       └── CLAUDE.md      # バックエンド固有のルール
```

他チームのCLAUDE.mdが干渉する場合は除外設定を使います。

```json
// .claude/settings.local.json
{
  "claudeMdExcludes": [
    "**/other-team/.claude/rules/**"
  ]
}
```

---

## よくあるトラブルと解決策

### 「Claudeが CLAUDE.md の指示を無視する」

1. `/memory` で該当ファイルが読み込まれているか確認する
2. 指示をより具体的に書き直す（「きれいなコードを書け」→「インデントはスペース2つ」）
3. 矛盾する指示がないかチェックする
4. ファイルが200行を超えていれば `rules/` に分割する

### 「/compact の後に指示が消えた」

`/compact`（コンテキスト圧縮）後も CLAUDE.md は完全に保持されます。ただし **チャット内でのみ伝えた指示は消えます**。重要な指示は必ずCLAUDE.mdに書いてください。

### 「Auto Memoryに何が保存されているか分からない」

`/memory` コマンドでAuto Memoryフォルダを参照できます。すべてMarkdownファイルなので、直接編集・削除も可能です。

---

## まとめ

| ポイント | 内容 |
|----------|------|
| **CLAUDE.md** | プロジェクトルートに置くチームの「憲法」。Gitで共有する |
| **Auto Memory** | Claudeが自動で書くメモ。マシンローカル |
| **/init** | CLAUDE.mdの自動生成コマンド |
| **rules/** | ルールをトピック別・パス別に分割する仕組み |
| **/memory** | メモリファイルを確認・編集するコマンド |
| **200行ルール** | CLAUDE.mdは200行以内に抑えると遵守率が上がる |

次回（#3）は **MCP（Model Context Protocol）―― Jira・Slack・GitHubを自然言語で操作する** を解説します。

---

## 参考・出典

- [How Claude remembers your project（Claude Code 公式ドキュメント）](https://code.claude.com/docs/en/memory)
- [Claude Code Auto Memory: How Your AI Learns Your Project | claudefa.st](https://claudefa.st/blog/guide/mechanics/auto-memory)
- [Claude Code's Auto-Memory: How To Use Memory in Claude Code | Medium](https://alirezarezvani.medium.com/the-new-claude-codes-auto-memory-feature-just-changed-how-my-team-works-here-is-the-setup-i-5126174b35dc)
- [CLAUDE.md Examples and Best Practices 2026 | morphllm](https://www.morphllm.com/claude-md-examples)
- [The CLAUDE.md Memory System - Tutorial | SFEIR Institute](https://institute.sfeir.com/en/claude-code/claude-code-memory-system-claude-md/tutorial/)
