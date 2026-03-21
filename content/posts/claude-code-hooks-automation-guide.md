---
title: "Claude Code 機能解説 #4：Hooks（フック）―― ファイル編集・コミット前後を確実に自動化する"
date: "2026-03-21T09:00:00"
category: "ITエンジニア"
excerpt: "Claude Code の Hooks は、ファイル編集後の自動フォーマットや git コミット前の Lint チェックなど、AI の操作に連動してシェルコマンドを自動実行する仕組みです。CLAUDE.md の「指示」と違い、必ず実行される「保証」です。全イベント・設定方法・実践レシピを公式ドキュメントをもとに徹底解説します。"
coverImage: "/altumcode-FoTs3ntRoIs-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/ja/hooks-guide"
  - "https://code.claude.com/docs/ja/hooks"
  - "https://azukiazusa.dev/blog/claude-code-hooks-run-formatter/"
  - "https://dev.classmethod.jp/articles/claude-code-hooks-basic-usage/"
  - "https://tech-lab.sios.jp/archives/50794"
---

# Claude Code 機能解説 #4：Hooks（フック）

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第4回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide)

---

## Hooks とは何か

**Hooks（フック）** は、Claude Code のライフサイクルの特定のポイントで自動的にシェルコマンドを実行する仕組みです。

Claude Code を使っていると、「ファイルを編集するたびにフォーマッターを忘れずに走らせたい」「git commit の前に必ず Lint を通したい」という場面が出てきます。CLAUDE.md に指示を書く方法もありますが、AI はその指示を「忘れる」ことがあります。

Hooks が CLAUDE.md と根本的に異なるのは、**LLM の判断に依存しない**点です。

| | CLAUDE.md | Hooks |
|---|---|---|
| 性質 | AI への「お願い」（確率的） | シェルコマンドの「保証」（決定論的） |
| 実行 | LLM が必要と判断した場合のみ | 設定したイベントで必ず実行 |
| 用途 | コーディング規約・アーキテクチャ方針の共有 | フォーマット・Lint・通知・セキュリティガード |

長いセッションでAIがルールを「忘れて」しまう問題を、Hooks は根本から解決します。

---

## Hook のライフサイクルイベント

Claude Code は以下のイベントで Hook を起動できます（公式ドキュメント準拠、2026年3月時点）。

| イベント | 発火タイミング |
|---|---|
| `SessionStart` | セッション開始・再開時 |
| `UserPromptSubmit` | プロンプト送信後、AI 処理前 |
| `PreToolUse` | ツール実行直前（**ブロック可能**） |
| `PermissionRequest` | 許可ダイアログ表示時 |
| `PostToolUse` | ツール実行成功後 |
| `PostToolUseFailure` | ツール実行失敗後 |
| `Notification` | Claude Code が通知を送信するとき |
| `SubagentStart` | サブエージェント生成時 |
| `SubagentStop` | サブエージェント終了時 |
| `Stop` | Claude の応答完了時 |
| `ConfigChange` | 設定ファイル変更時 |
| `WorktreeCreate` | Worktree 作成時 |
| `WorktreeRemove` | Worktree 削除時 |
| `PreCompact` | コンテキスト圧縮前 |
| `PostCompact` | コンテキスト圧縮後 |
| `InstructionsLoaded` | CLAUDE.md 読み込み時 |
| `TaskCompleted` | タスク完了マーク時 |
| `SessionEnd` | セッション終了時 |

**最も重要なポイント**：`PreToolUse` は唯一「アクションをブロックできる」イベントです。セキュリティガードや危険コマンドのブロックにはこちらを使います。`PostToolUse` はツール実行後のため、元に戻すことはできません。

---

## Hook の種類

Hook には4つのタイプがあります。

### 1. command（コマンド型）
最も基本的なタイプ。シェルコマンドを実行します。

```json
{
  "type": "command",
  "command": "npx prettier --write $CLAUDE_FILE_PATHS"
}
```

### 2. prompt（プロンプト型）
決定論的なルールではなく判断が必要な場面で、Claude モデル（デフォルト: Haiku）に評価させます。

```json
{
  "type": "prompt",
  "prompt": "すべてのタスクが完了しているか確認してください。未完了なら {\"ok\": false, \"reason\": \"残りの作業\"} を返してください。"
}
```

### 3. agent（エージェント型）
ファイルの読み取りやコードの検索など、複数ステップの検証が必要な場合にサブエージェントを起動します。タイムアウトはデフォルト60秒。

### 4. http（HTTP型）
イベントデータを外部の HTTP エンドポイントに POST します。チーム共有の監査ログサービスなどに活用できます。

---

## 設定ファイルと配置場所

Hook の設定は `settings.json` に記述します。配置場所によって適用スコープが異なります。

| 配置場所 | スコープ | Git 管理 |
|---|---|---|
| `~/.claude/settings.json` | 全プロジェクト共通（個人） | 不可 |
| `.claude/settings.json` | 該当プロジェクトのみ | **可能**（チーム共有推奨） |
| `.claude/settings.local.json` | 該当プロジェクト（個人） | 不可（.gitignore対象） |

**チームで統一したいルール**（危険コマンドのブロック、必須フォーマットなど）は `.claude/settings.json` にコミットして共有するのがベストプラクティスです。

### 基本的な設定構造

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "シェルコマンド"
          }
        ]
      }
    ]
  }
}
```

`matcher` はツール名（またはイベントの種類）を正規表現でフィルタリングします。`Edit|Write` と書けば「Edit または Write ツール使用後のみ」発火します。

---

## 実践レシピ集

### レシピ1：ファイル編集後に Prettier を自動実行

最も需要が高い設定。Claude がファイルを編集するたびに、フォーマットが保証されます。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

> **注意**：このコマンドは JSON 解析に `jq` を使用します。未インストールの場合は `brew install jq`（macOS）または `apt-get install jq`（Ubuntu/Debian）でインストールしてください。

### レシピ2：git commit 前に Lint を強制

`PreToolUse` で Bash コマンドをインターセプトし、`git commit` が含まれる場合のみ Lint を実行します。Lint が失敗すれば commit を自動ブロックします。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'INPUT=$(cat); CMD=$(echo \"$INPUT\" | jq -r \".tool_input.command\"); if echo \"$CMD\" | grep -q \"git commit\"; then npm run lint || exit 2; fi'"
          }
        ]
      }
    ]
  }
}
```

### レシピ3：機密ファイルへの編集をブロック

`.env` や `package-lock.json` などへの変更を防ぎます。

`.claude/hooks/protect-files.sh` を作成：

```bash
#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "ブロック: $FILE_PATH は保護されたファイルです ($pattern)" >&2
    exit 2
  fi
done

exit 0
```

スクリプトを実行可能にして Hook に登録：

```bash
chmod +x .claude/hooks/protect-files.sh
```

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

### レシピ4：Claude が入力待ちになったときにデスクトップ通知

長時間のタスクを任せながら別の作業をしているときに便利です。

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'あなたの操作が必要です'"
          }
        ]
      }
    ]
  }
}
```

macOS の場合は `osascript -e 'display notification "あなたの操作が必要です" with title "Claude Code"'` に置き換えてください。

### レシピ5：コンテキスト圧縮後に重要情報を再注入

コンテキストウィンドウが満杯になると圧縮（サマリー）が走り、細かい情報が失われることがあります。`SessionStart` の `compact` マッチャーで自動再注入できます。

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "compact",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'リマインダー: npm ではなく Bun を使用。コミット前に bun test を実行すること。'"
          }
        ]
      }
    ]
  }
}
```

---

## 終了コードの意味

Hook スクリプトの終了コードで、Claude Code の動作が変わります。

| 終了コード | 動作 |
|---|---|
| `0` | 正常続行。stdout の内容は Claude のコンテキストに追加される |
| `2` | **アクションをブロック**。stderr の内容が Claude へのフィードバックになる |
| その他 | エラー扱いだが処理は続行。stderr はログに記録 |

`PreToolUse` でのみ意味を持つ構造化 JSON 出力もあります：

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "grep の代わりに rg を使用してください"
  }
}
```

`permissionDecision` には `"allow"` / `"deny"` / `"ask"` の3種類が指定できます。

---

## Hook の設定方法

### インタラクティブメニューから設定（推奨）

Claude Code CLI 上で `/hooks` と入力するとメニューが開きます。イベントの選択 → マッチャーの設定 → コマンドの入力 → 保存場所の選択という流れで、JSON を直接書かずに設定できます。`/hooks` 経由の変更は**即座に反映**されます。

### settings.json を直接編集

JSON を直接書いた場合、変更の反映には `/hooks` メニューを開くかセッションを再起動する必要があります。

---

## よくあるトラブルと対処法

### Hook が発火しない
- `/hooks` を開いて設定が正しいイベントの下に表示されているか確認
- `matcher` パターンはツール名に対して**大文字小文字を区別**する
- 非インタラクティブモード（`-p`）では `PermissionRequest` は発火しない（代わりに `PreToolUse` を使う）

### JSON 解析エラーが出る
`~/.bashrc` や `~/.zshrc` に無条件の `echo` がある場合、その出力が Hook の JSON 出力に混入し、パースに失敗します。以下のように修正してください：

```bash
# ~/.zshrc または ~/.bashrc
if [[ $- == *i* ]]; then
  echo "Shell ready"  # インタラクティブシェル時のみ実行
fi
```

### Stop hook が無限ループする
`Stop` hook は Claude の応答完了ごとに発火します。`stop_hook_active` フラグを確認して無限ループを防ぎます：

```bash
#!/bin/bash
INPUT=$(cat)
if [ "$(echo "$INPUT" | jq -r '.stop_hook_active')" = "true" ]; then
  exit 0
fi
# ... hook ロジック
```

### デバッグ方法
`Ctrl+O` で詳細モードを切り替えて Hook の出力を確認するか、`claude --debug` で実行詳細を全表示できます。

---

## まとめ

| ユースケース | イベント | 効果 |
|---|---|---|
| ファイル保存後の自動フォーマット | `PostToolUse` + `Edit\|Write` | コード品質の保証 |
| git commit 前の Lint 強制 | `PreToolUse` + `Bash` | バグのあるコードのコミット防止 |
| 機密ファイル保護 | `PreToolUse` + `Edit\|Write` | セキュリティ強化 |
| 入力待ち通知 | `Notification` | 別作業中でも見逃さない |
| 圧縮後のコンテキスト再注入 | `SessionStart` + `compact` | 長時間セッションの安定化 |

Hooks は Claude Code を「一般用途のアシスタント」から「チームのルールに従ったドメイン特化エージェント」に変える機能です。CLAUDE.md でコーディング規約を共有し、Hooks で確実な実行を保証する——この組み合わせが Claude Code 活用の基盤になります。

---

## 次回予告

次回（#5）は **Sub-agents と Agent Teams ―― 並列AIエージェントで大規模タスクを分担する** を解説します。

---

## 出典

- [hooks でワークフローを自動化する（公式・日本語）](https://code.claude.com/docs/ja/hooks-guide)
- [Hooks リファレンス（公式・日本語）](https://code.claude.com/docs/ja/hooks)
- [Claude Code の Hooks で作業が終わった後にフォーマッターを実行する](https://azukiazusa.dev/blog/claude-code-hooks-run-formatter/)
- [Claude Code Hooks の基本的な使い方（DevelopersIO）](https://dev.classmethod.jp/articles/claude-code-hooks-basic-usage/)
- [Claude Code Hooks ガイド（SIOS Tech Lab）](https://tech-lab.sios.jp/archives/50794)
