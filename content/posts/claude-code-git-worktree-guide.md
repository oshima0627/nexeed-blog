---
title: "Claude Code 機能解説 #8：Git Worktree（ギットワークツリー）―― 並列セッションを衝突なしに動かす隔離環境"
date: "2026-03-21T13:30:00"
category: "ITエンジニア"
excerpt: "Claude Code の Git Worktree サポートは、複数のAIセッションが同じリポジトリで衝突せず並列作業できる隔離環境を提供します。--worktree フラグやサブエージェントの isolation: worktree、Desktop の自動Worktree設定まで公式ドキュメントをもとに徹底解説します。"
coverImage: "/chris-ried-ieic5Tq8YMk-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/ja/common-workflows"
  - "https://zenn.dev/hiraoku/articles/74f4b3083b582f"
  - "https://qiita.com/NaokiIshimura/items/47f4744e1b27d417ef54"
  - "https://www.threads.com/@boris_cherny/post/DVAAnexgRUj/"
  - "https://x.com/dani_avila7/status/2025030088815738891"
---

# Claude Code 機能解説 #8：Git Worktree（ギットワークツリー）

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第8回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide) ／ 第7回：[Remote Control](/posts/claude-code-remote-control-guide)

---

## Git Worktree とは

**Git Worktree（ワークツリー）** は、同じ Git リポジトリから複数の作業ディレクトリを作成できる Git の標準機能です。各作業ディレクトリは独自のブランチとファイル状態を持ちながら、リポジトリの履歴とリモート接続を共有します。

Claude Code はこの仕組みをネイティブサポートし、**複数のAIセッションが同じリポジトリ内でファイルを上書き合わずに並列作業できる隔離環境**を提供します。

「Claude に認証モジュールのリファクタリングを任せながら、別のセッションでバグ修正も並行して進めたい」——そのような場面でWorktreeが威力を発揮します。

---

## なぜWorktreeが必要なのか

通常、複数の Claude セッションが同じリポジトリで作業すると、**ファイルの変更が衝突**します。

```
セッションA：src/auth.ts を書き換え中
セッションB：同じ src/auth.ts を書き換え中
→ どちらかの変更が上書きされる
```

Worktreeはこれを解決します。各セッションが独立したディレクトリと独立したブランチを持つため、**互いの変更が物理的に分離**されます。

| | Worktreeなし | Worktreeあり |
|---|---|---|
| 並列セッション | ファイルが衝突する | 各セッションが独立したコピーを持つ |
| ブランチ管理 | 手動でstash・切り替えが必要 | 各セッションに専用ブランチ |
| コンフリクト | 作業中に発生する | マージ時のみ（コントロール可能） |
| セッション独立性 | 低い | 高い |

---

## `--worktree` フラグで起動する

Claude Code v2.1.49 以降、`--worktree`（短縮形：`-w`）フラグが追加されました。

```bash
# "feature-auth" という名前のworktreeでClaudeを起動
# .claude/worktrees/feature-auth/ に新規ブランチで作成
claude --worktree feature-auth

# 別のターミナルで別のworktreeを起動（並列実行）
claude --worktree bugfix-123

# 名前を省略すると自動生成（例："bright-running-fox"）
claude --worktree
```

`--worktree` を使うと以下が自動処理されます。

| 処理 | 内容 |
|------|------|
| ディレクトリ作成 | `.claude/worktrees/<名前>/` にリポジトリのコピーを作成 |
| ブランチ作成 | `worktree-<名前>` というブランチを自動作成 |
| Claude 起動 | 新しいworktreeディレクトリ内でClaudeを起動 |
| 元セッション保護 | メインのセッションはそのまま継続 |

セッション中にClaude に「work in a worktree」や「start a worktree」と伝えるだけでも自動的に作成されます。

---

## サブエージェントのWorktree隔離

サブエージェント（Sub-agents）でも worktree 隔離を利用できます。`isolation: worktree` をエージェント定義の frontmatter に追加するだけです。

```markdown
---
name: feature-builder
description: 新機能を独立したworktreeで実装する。他のセッションと並列実行できる。
tools: Read, Edit, Write, Bash, Glob, Grep
model: sonnet
isolation: worktree
---

あなたは機能実装の専門エージェントです。
割り当てられた機能を独立したworktree内で実装し、
完了したらメインエージェントに結果を報告してください。
```

この設定により：

- 各サブエージェントが**独自のworktreeで並列実行**される
- サブエージェント終了時に変更がなければ**worktreeは自動削除**される
- 変更があればブランチとパスが返され、後でレビューできる

Claude に「use worktrees for your agents」と指示するだけでも、自動的にworktree隔離が有効になります。

### 並列リファクタリングの実践例

```
> src/api、src/components、src/hooks の3つを
  それぞれ独立したサブエージェントで同時リファクタリングしてください。
  worktreeを使って並列実行してください。
```

3つのサブエージェントが独立したworktreeで並列実行され、それぞれが別ブランチで作業します。完了後にメインエージェントが結果を統合します。

---

## Worktree のクリーンアップ

worktreeセッションを終了すると、Claude が変更の有無に応じてクリーンアップを判断します（公式ドキュメント準拠）。

| 状態 | 動作 |
|------|------|
| **変更なし** | worktreeとブランチを**自動削除** |
| **変更・コミットあり** | 保持するか削除するかをユーザーに確認 |

確認時の選択肢：

- **保持**：ディレクトリとブランチをそのまま残す。後でブランチをチェックアウトして続きを作業できる
- **削除**：worktreeディレクトリとブランチを削除。コミットされていない変更も含めてすべて破棄

> **推奨設定**：`.claude/worktrees/` を `.gitignore` に追加して、worktreeの内容がメインリポジトリの未追跡ファイルとして表示されないようにしましょう。

```gitignore
# .gitignore
.claude/worktrees/
```

---

## ExitWorktree ツール（v2.1.72）

Claude Code v2.1.72 で `ExitWorktree` ツールが追加されました。

これ以前は、worktreeに入ったら抜ける手段がなく、セッションを終了するしかありませんでした。`ExitWorktree` により、**worktree内で作業して確認し、元のディレクトリに戻る**という1セッション完結のフローが可能になりました。

```
# worktreeで作業
> ExitWorktree  ← これで元のディレクトリに戻れる
```

---

## 手動でWorktreeを作成する

`--worktree` フラグを使わず、Git コマンドで直接Worktreeを作成することもできます。ブランチの場所や名前を細かく制御したい場合に便利です。

```bash
# 新しいブランチで worktree を作成
git worktree add ../project-feature-a -b feature-a

# 既存のブランチで worktree を作成
git worktree add ../project-bugfix bugfix-123

# worktree で Claude を起動
cd ../project-feature-a && claude

# 作業完了後のクリーンアップ
git worktree list                              # 一覧確認
git worktree remove ../project-feature-a      # 削除
```

> **注意**：各 worktree で Claude を起動したら、プロジェクトの初期セットアップが必要です。`npm install` や仮想環境のセットアップなど、プロジェクトの標準セットアップを忘れずに実行してください。

---

## Claude Code Desktop での自動Worktree設定

Claude Code Desktop では、**すべての新しいセッションに対してWorktreeを自動有効化**できます。

この設定により：
- ブランチの切り替えが不要になる
- エージェント同士がお互いの作業を上書きしない
- 複数のタスクを常に隔離した状態で並列実行できる

また、`.worktreeinclude` ファイルを使うと、worktreeに含めるパスを `.gitignore` と同じ記法で指定できます。

```
# .worktreeinclude
# .gitignoreで除外されたファイルもworktreeに含める例
!.env.local
!node_modules/.cache
```

---

## Git 以外のバージョン管理システムへの対応

デフォルトではGitで動作しますが、SVN・Perforce・Mercurialなど他のVCSでもWorktreeを使えます。`WorktreeCreate` と `WorktreeRemove` フックを設定して、カスタムのworktree作成・削除ロジックを提供します。

```json
{
  "hooks": {
    "WorktreeCreate": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "svn copy . ../project-worktrees/$WORKTREE_NAME"
          }
        ]
      }
    ],
    "WorktreeRemove": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "rm -rf ../project-worktrees/$WORKTREE_NAME"
          }
        ]
      }
    ]
  }
}
```

これらのフックを設定すると、`--worktree` 使用時にデフォルトのGit動作が置き換えられます。

---

## よくある落とし穴と対処法

### 落とし穴1：同じブランチで複数のWorktreeを作成する

各Worktreeは必ず独自のブランチを持つ必要があります。同じブランチを複数のWorktreeで共有しようとするとエラーになります。

```bash
# ❌ 同じブランチで2つのworktreeは作れない
git worktree add ../worktree-a feature-x
git worktree add ../worktree-b feature-x  # エラー

# ✓ 別々のブランチを使う
git worktree add ../worktree-a feature-x-auth
git worktree add ../worktree-b feature-x-ui
```

### 落とし穴2：同じファイルを複数のWorktreeで編集する

異なるWorktree内のエージェントが同じファイルを編集すると、マージ時にコンフリクトが発生します。**事前にファイル領域を分割**してから並列実行しましょう。

```
# 推奨：タスクをドメインで分割
Worktree A → src/api/**（APIレイヤー）
Worktree B → src/components/**（UIコンポーネント）
Worktree C → src/hooks/**（カスタムフック）
```

### 落とし穴3：Sparse Checkout との非互換

`--worktree` フラグはフルな作業ツリーが必要です。**Sparse Checkout（一部ファイルのみチェックアウト）との組み合わせはサポート外**です。Sparse Checkoutを使っているリポジトリでは手動でWorktreeを作成してください。

### 落とし穴4：サブモジュールの共有

サブモジュールは全Worktree間で共有されます。異なるWorktreeで異なるサブモジュールの状態が必要な場合、コンフリクトが発生します。この場合はWorktreeではなく**別クローン**の使用を検討してください。

---

## Worktree vs Agent Teams の使い分け

| シナリオ | 推奨 |
|----------|------|
| エージェント間の通信・議論が不要 | **Worktree + サブエージェント** |
| エージェント間でお互いの発見を共有したい | **[Agent Teams](/posts/claude-code-subagents-agent-teams-guide)**（実験的） |
| コスト最小化が重要 | **Worktree**（Agent Teamsより低コスト） |
| 本番環境・重要タスク | **Worktree**（安定版） |
| 同リポジトリの独立した複数ドメイン | **Worktree** |

---

## まとめ

| ポイント | 内容 |
|----------|------|
| **有効化** | `claude --worktree <名前>` で即座に隔離環境を作成 |
| **サブエージェント** | frontmatterに `isolation: worktree` を追加するだけ |
| **自動クリーンアップ** | 変更なし→自動削除、変更あり→ユーザー確認 |
| **ExitWorktree** | worktreeから元ディレクトリに戻れる（v2.1.72以降） |
| **.gitignore** | `.claude/worktrees/` を追加して汚染を防ぐ |
| **注意点** | 同一ブランチの複数worktree・Sparse Checkoutは非対応 |

Git Worktreeは「AIが1つのタスクを順番にこなす」から「複数のAIが独立して並列作業する」への移行を支える基盤機能です。サブエージェントと組み合わせることで、大規模なリファクタリングやマルチドメインの同時開発が現実的になります。

---

## 次回予告

次回（#9）は **/loop コマンド ―― プロンプトの定期自動実行** を解説します。

---

## 参考・出典

- [Git worktree を使用して並列 Claude Code セッションを実行する（公式・日本語）](https://code.claude.com/docs/ja/common-workflows)
- [Claude Code が Git Worktree をネイティブサポート ── 並列セッションから Subagent まで（Zenn）](https://zenn.dev/hiraoku/articles/74f4b3083b582f)
- [Claude Code のエージェント定義に1行追加するだけで git worktree が自動生成される isolation: worktree が便利すぎる（Qiita）](https://qiita.com/NaokiIshimura/items/47f4744e1b27d417ef54)
- [Introducing built-in git worktree support for Claude Code（Threads / Boris Cherny）](https://www.threads.com/@boris_cherny/post/DVAAnexgRUj/)
- [Claude Code Desktop now lets you enable Worktrees automatically（X / Daniel San）](https://x.com/dani_avila7/status/2025030088815738891)
