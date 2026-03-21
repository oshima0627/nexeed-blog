---
title: "Claude Code 機能解説 #11：カスタムスラッシュコマンド（Skills）―― チームで共有できる独自コマンドを作る"
date: "2026-03-21T16:00:00"
category: "ITエンジニア"
excerpt: "Claude Code の Skills 機能を使うと /deploy や /fix-issue などの独自コマンドを数分で作れます。SKILL.md に指示を書くだけ。個人・プロジェクト・組織の3階層で管理でき、引数渡し・動的コンテキスト注入・サブエージェント実行などの高度な機能も備えます。"
coverImage: "/harshit-katiyar-CxOPZszqCQ0-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/skills"
  - "https://agentskills.io"
  - "https://github.com/anthropics/claude-code-action"
---

# Claude Code 機能解説 #11：カスタムスラッシュコマンド（Skills）

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第11回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide) ／ 第7回：[Remote Control](/posts/claude-code-remote-control-guide) ／ 第8回：[Git Worktree](/posts/claude-code-git-worktree-guide) ／ 第9回：[/loop コマンド](/posts/claude-code-loop-command-guide) ／ 第10回：[GitHub Actions 連携](/posts/claude-code-github-actions-guide)

---

## Skills とは

**Skills（スキル）** は Claude Code の機能を拡張する独自コマンドです。`SKILL.md` ファイルに指示を書くと、それが `/コマンド名` として使えるようになります。

```
/fix-issue 123        # Issue #123 を実装
/deploy staging       # ステージング環境にデプロイ
/pr-summary           # 現在の PR をサマリー化
/explain-code         # コードをわかりやすく説明
```

Claude が自然言語で呼びかけに反応するだけでなく、「このコマンドを実行して」と明確に指定できます。チームの規約やデプロイ手順を Skills に落とし込めば、誰が使っても同じ品質の作業が実現します。

> **従来の `.claude/commands/` との関係**：`commands/` フォルダに置いたMarkdownファイルも同様に `/コマンド名` として動作します。Skills はこれに加えてサブディレクトリ・サブエージェント実行・自動起動制御などの高度機能を備えます。既存の `commands/` ファイルはそのまま動き続けます。

> **オープンスタンダード準拠**：Claude Code Skills は [Agent Skills](https://agentskills.io) オープンスタンダードに基づいており、他のAIツールとも共通の仕組みで動作します。

---

## 組み込み Skills（バンドル済み）

Claude Code には最初から使えるバンドル Skills が存在します。

| スキル | 用途 |
|--------|------|
| `/batch <指示>` | コードベース全体への大規模変更を並列エージェントで処理 |
| `/simplify [フォーカス]` | 変更したファイルを3並列エージェントでレビュー＆改善 |
| `/loop [間隔] <プロンプト>` | 定期的にプロンプトを繰り返し実行 |
| `/debug [説明]` | セッションのデバッグログを読んでトラブルシューティング |
| `/claude-api` | Claude API リファレンスを読み込む |

---

## 最初の Skill を作る

### ステップ1：ディレクトリを作成

```bash
# 個人用（全プロジェクトで使える）
mkdir -p ~/.claude/skills/explain-code

# プロジェクト用（このリポジトリだけ）
mkdir -p .claude/skills/fix-issue
```

### ステップ2：SKILL.md を書く

すべての Skill は `SKILL.md` が必要です。YAMLフロントマター（`---` で囲む）と、その後のMarkdown本文で構成されます。

```yaml
---
name: explain-code
description: コードをビジュアル図と例え話で説明する。「これどう動く？」「仕組みを教えて」と聞かれたときに使う
---

コードを説明するときは必ず以下を含めてください：

1. **まず例え話**：日常のものに例える
2. **ASCII図を描く**：フロー・構造・関係性を可視化する
3. **コードを順に追う**：何が起きているか順番に説明する
4. **よくある誤解を挙げる**：ハマりやすいポイントを1つ

説明は会話調にしてください。難しい概念は複数の例え話を使ってください。
```

### ステップ3：テスト

```
# Claudeが自動で使うパターン（descriptionに合う質問をする）
このコードはどう動く？

# 直接呼び出すパターン
/explain-code src/auth/login.ts
```

---

## Skills の保存場所と優先順位

| 保存場所 | パス | 適用範囲 |
|---------|------|---------|
| エンタープライズ | managed settings | 組織全ユーザー |
| 個人 | `~/.claude/skills/<name>/SKILL.md` | 全プロジェクト |
| プロジェクト | `.claude/skills/<name>/SKILL.md` | このプロジェクトのみ |
| プラグイン | `<plugin>/skills/<name>/SKILL.md` | プラグイン有効時 |

同名の Skill が複数の場所にある場合、**エンタープライズ > 個人 > プロジェクト** の順で優先されます。

モノレポ対応として、`packages/frontend/` のファイルを編集中は `packages/frontend/.claude/skills/` も自動で探索されます。

---

## フロントマター全項目

```yaml
---
name: my-skill                    # スキル名（スラッシュコマンドになる）
description: このスキルの説明      # Claude が自動起動する際の判断に使う
argument-hint: "[issue-number]"   # オートコンプリートのヒント
disable-model-invocation: true    # true = 自分だけが呼べる（Claude は自動起動しない）
user-invocable: false             # false = / メニューに表示しない
allowed-tools: Read, Grep, Glob   # このスキル実行中に許可するツール
model: claude-opus-4-6            # 使用モデル
effort: high                      # 思考レベル（low / medium / high / max）
context: fork                     # fork = サブエージェントとして実行
agent: Explore                    # サブエージェントの種類
---
```

---

## 呼び出し制御：誰がいつ実行するか

| フロントマター | 自分が呼べる | Claudeが自動起動 | コンテキストへの読み込み |
|--------------|------------|----------------|----------------------|
| （デフォルト） | ✅ | ✅ | 説明文が常に入る |
| `disable-model-invocation: true` | ✅ | ❌ | 説明文もなし |
| `user-invocable: false` | ❌ | ✅ | 説明文が常に入る |

副作用があるコマンド（デプロイ、Slack 送信など）は `disable-model-invocation: true` を付けて、意図せず Claude が実行しないようにしましょう。

```yaml
---
name: deploy
description: 本番環境にデプロイする
disable-model-invocation: true    # 必ず人間が明示的に実行する
---

$ARGUMENTS を本番環境にデプロイする：

1. テストスイートを実行する
2. アプリケーションをビルドする
3. デプロイターゲットにプッシュする
4. デプロイ成功を確認する
```

---

## 引数を渡す

```
/fix-issue 123
/migrate-component SearchBar React Vue
```

### `$ARGUMENTS` で受け取る

```yaml
---
name: fix-issue
description: GitHub Issue を修正する
disable-model-invocation: true
---

GitHub Issue $ARGUMENTS をチームのコーディング規約に従って修正してください。

1. Issue の内容を読む
2. 要件を理解する
3. 修正を実装する
4. テストを書く
5. コミットを作成する
```

`/fix-issue 123` を実行すると、`$ARGUMENTS` が `123` に置き換わります。

### 位置引数で受け取る（`$0`、`$1`、`$2`...）

```yaml
---
name: migrate-component
description: コンポーネントをフレームワーク間で移行する
---

$0 コンポーネントを $1 から $2 に移行してください。
既存の動作とテストをすべて保持してください。
```

`/migrate-component SearchBar React Vue` → `$0=SearchBar`、`$1=React`、`$2=Vue`

---

## 利用可能な変数

| 変数 | 内容 |
|------|------|
| `$ARGUMENTS` | スキル名の後ろ全体 |
| `$ARGUMENTS[N]` | N番目（0始まり）の引数 |
| `$N` | `$ARGUMENTS[N]` の短縮形 |
| `${CLAUDE_SESSION_ID}` | 現在のセッションID |
| `${CLAUDE_SKILL_DIR}` | このSKILL.mdがあるディレクトリのパス |

```yaml
---
name: session-logger
description: このセッションの作業をログに記録する
---

logs/${CLAUDE_SESSION_ID}.log に以下を記録してください：

$ARGUMENTS
```

---

## 動的コンテキスト注入

`` !`コマンド` `` 構文を使うと、スキル実行前にシェルコマンドを実行してその出力を埋め込みます。Claude にはコマンド自体ではなく、実行結果が渡ります。

```yaml
---
name: pr-summary
description: 現在のPRの変更をサマリー化する
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## PR の情報
- 差分：!`gh pr diff`
- コメント：!`gh pr view --comments`
- 変更ファイル：!`gh pr diff --name-only`

## タスク
上記のPRをサマリーにまとめてください。変更の目的・影響範囲・レビューポイントを簡潔に。
```

スキル実行時の流れ：
1. `` !`gh pr diff` `` など各コマンドが先に実行される
2. 出力がプレースホルダーに置き換わる
3. 実際のPRデータが埋め込まれた状態で Claude に渡る

---

## サブエージェントで実行する

`context: fork` を付けると、メインの会話履歴と切り離された独立したエージェントとして実行されます。

```yaml
---
name: deep-research
description: トピックを徹底的にリサーチする
context: fork
agent: Explore      # Explore / Plan / general-purpose / カスタム名
---

$ARGUMENTS について徹底的にリサーチしてください：

1. Glob と Grep で関連ファイルを探す
2. コードを読んで分析する
3. 具体的なファイル参照付きでまとめる
```

`agent` フィールドで使うエージェントを指定します。組み込み（`Explore`、`Plan`、`general-purpose`）または `.claude/agents/` のカスタム定義が指定できます。

---

## サポートファイルで構造化する

SKILL.md だけでなく、複数ファイルをスキルディレクトリに置けます。

```
my-skill/
├── SKILL.md          # メイン（必須）
├── reference.md      # 詳細リファレンス（必要時だけ読み込む）
├── examples.md       # 出力サンプル
└── scripts/
    └── helper.py     # 実行スクリプト
```

SKILL.md からサポートファイルを参照しておくと、Claude は必要なときだけ読み込みます。

```markdown
## 追加リソース

- 完全なAPIの詳細は [reference.md](reference.md) を参照
- 使用例は [examples.md](examples.md) を参照
```

> **SKILL.md は500行以内**を推奨。詳細なリファレンスは別ファイルに分けましょう。

---

## 実用的な Skills サンプル

### コミット作成（手動専用）

```yaml
---
name: commit
description: 変更をコミットする
disable-model-invocation: true
---

現在の変更をコミットしてください：

1. `git diff` と `git status` で変更を確認する
2. 変更内容を1〜2文で要約したコミットメッセージを作る
3. 関係するファイルのみステージングする
4. コミットを作成する

コミットメッセージはプレフィックス（feat/fix/docs/refactor など）から始めること。
```

### PR レビューリクエスト作成

```yaml
---
name: review-pr
description: PRのレビュー依頼コメントを作成する
allowed-tools: Bash(gh *)
---

Pull Request $ARGUMENTS のレビュー依頼を作成してください：

1. `gh pr view $ARGUMENTS` で PR の内容を確認する
2. 変更の概要・目的・影響範囲をまとめる
3. レビュアーに見てほしいポイントを3つ挙げる
4. PRにコメントを投稿する
```

### 型チェック付きリファクタリング

```yaml
---
name: refactor-safe
description: TypeScriptの型安全性を保ちながらリファクタリングする
allowed-tools: Read, Edit, Bash(npm run typecheck)
---

$ARGUMENTS をリファクタリングしてください：

1. まず `npm run typecheck` で現在の型エラーを確認する
2. リファクタリングを実施する
3. `npm run typecheck` を再実行して型エラーがないことを確認する
4. エラーがあれば修正してから完了とする
```

---

## チームへの共有方法

| 方法 | 手順 |
|------|------|
| **プロジェクト共有** | `.claude/skills/` を Git にコミット。メンバーが `git pull` するだけで使える |
| **プラグイン化** | プラグインの `skills/` ディレクトリに置く |
| **組織展開** | managed settings で全メンバーに配布 |

---

## トラブルシューティング

| 症状 | 確認事項 |
|------|---------|
| Skill が自動起動しない | `description` に自然な言い回しが含まれているか。`/スキル名` で直接呼び出してみる |
| Skill が頻繁に起動しすぎる | `description` をより具体的にする。`disable-model-invocation: true` を検討 |
| Claude がスキルを認識しない | スキル数が多い場合はコンテキストバジェットを超えている可能性。`/context` で確認し、`SLASH_COMMAND_TOOL_CHAR_BUDGET` 環境変数で上限を調整 |

---

## まとめ

| ポイント | 内容 |
|---------|------|
| **作り方** | `SKILL.md` にフロントマター＋Markdown指示を書くだけ |
| **保存場所** | 個人（`~/.claude/`）・プロジェクト（`.claude/`）・組織の3階層 |
| **引数** | `$ARGUMENTS`・`$0`〜`$N` で柔軟に受け取れる |
| **実行制御** | `disable-model-invocation` で手動専用、`user-invocable: false` でClaude専用 |
| **動的データ** | `` !`コマンド` `` でシェル出力をプロンプトに注入 |
| **サブエージェント** | `context: fork` で独立した隔離環境で実行 |
| **チーム共有** | `.claude/skills/` を Git にコミットするだけ |

Skills の最大の価値は「チームの暗黙知をコマンドに変換できる」点です。デプロイ手順、コードレビュー観点、リファクタリングルール、Issue 対応フロー——こうしたものを SKILL.md に書いてリポジトリに入れると、新メンバーでも `/コマンド` 1つで同じ品質の作業ができるようになります。

---

## 次回予告

次回（#12）は **Security Scanning ―― AIが脆弱性を発見・検証・修正提案まで行うセキュリティスキャン** を解説します。

---

## 参考・出典

- [Extend Claude with skills（公式ドキュメント）](https://code.claude.com/docs/en/skills)
- [Agent Skills オープンスタンダード](https://agentskills.io)
- [anthropics/claude-code-action（GitHub）](https://github.com/anthropics/claude-code-action)
