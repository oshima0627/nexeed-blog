---
title: "Claude Code 機能解説 #9：/loop コマンド ―― プロンプトの定期自動実行でデプロイ監視・PR確認をバックグラウンドに任せる"
date: "2026-03-21T14:00:00"
category: "ITエンジニア"
excerpt: "/loop コマンドはセッション内でプロンプトを指定間隔で繰り返し実行するスケジューラーです。デプロイ完了の確認、PR レビューの定期チェック、1回限りのリマインダーまで自然言語で設定できます。Claude Code v2.1.72 以降の公式ドキュメントをもとに徹底解説します。"
coverImage: "/gabriel-heinzer-g5jpH62pwes-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/scheduled-tasks"
  - "https://dev.classmethod.jp/articles/claude-code-loop-command/"
  - "https://qiita.com/kai_kou/items/329e8be64b397ff645a8"
  - "https://dev.classmethod.jp/en/articles/comparing-claude-code-loop-and-claude-cowork-schedule/"
  - "https://smartscope.blog/en/generative-ai/claude/claude-code-loop-command-session-scheduler/"
---

# Claude Code 機能解説 #9：/loop コマンド

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第9回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide) ／ 第7回：[Remote Control](/posts/claude-code-remote-control-guide) ／ 第8回：[Git Worktree](/posts/claude-code-git-worktree-guide)

---

## /loop コマンドとは

**`/loop`** は、指定したプロンプトをセッション内で**一定間隔で繰り返し自動実行**するスケジューラーです（Claude Code **v2.1.72 以降**）。

```
/loop 5m check if the deployment finished and tell me what happened
```

上記の1行で、「5分ごとにデプロイ完了を確認して報告する」という定期タスクが設定されます。CI の完了待ち、PR のレビューコメント確認、長時間ビルドの監視など、**今まで手動で何度も確認していた繰り返し作業をバックグラウンドに委譲**できます。

> **要件**：`claude --version` で v2.1.72 以上であることを確認してください。

---

## 基本構文

間隔は先頭・末尾いずれに置いてもよく、省略もできます（公式ドキュメント準拠）。

| 形式 | 例 | 解釈 |
|------|-----|------|
| 先頭に間隔 | `/loop 30m check the build` | 30分ごと |
| 末尾に every 句 | `/loop check the build every 2 hours` | 2時間ごと |
| 間隔省略 | `/loop check the build` | **デフォルト：10分ごと** |

### 対応する時間単位

| 単位 | 意味 | 備考 |
|------|------|------|
| `s` | 秒 | cron の粒度により最低1分に切り上げ |
| `m` | 分 | `7m` などは最も近いきりの良い値に丸め |
| `h` | 時間 | `90m` → `1h` のように変換 |
| `d` | 日 | — |

丸めが発生した場合は Claude が採用した値を通知します。

---

## 主なユースケース

### 1. デプロイ完了の監視

```
/loop 5m check if the deployment finished and tell me what happened
```

5分ごとに本番デプロイの完了状態を確認し、結果を報告します。完了したら別の作業を続けながら自動で気づけます。

### 2. PR レビューの自動チェック

```
/loop 20m /review-pr 1234
```

スラッシュコマンドもそのまま定期実行できます。20分おきに PR #1234 のレビュー状況を確認し、コメントへの対応漏れを防ぎます。

### 3. 長時間ビルドの監視

```
/loop 10m check whether the integration tests passed
```

テストが通ったかどうかを10分ごとに確認。成功・失敗を自動で報告するので結果待ちで張り付く必要がなくなります。

### 4. 定時リマインダー

```
remind me at 3pm to push the release branch
```

自然言語で1回限りのリマインダーを設定できます。`/loop` を使わず日時を伝えるだけで Claude がスケジュールします。

### 5. 任意の時間後に確認

```
in 45 minutes, check whether the integration tests passed
```

「45分後に」という相対時間指定にも対応。設定直後に実行時刻を確認してくれます。

---

## タスクの管理方法

スケジュールされたタスクの確認・キャンセルは自然言語で操作できます。

```
スケジュールタスクは何がある？
デプロイの定期確認をキャンセルして
what scheduled tasks do I have?
cancel the deploy check job
```

内部的に使われているツールは次の3つです。

| ツール | 役割 |
|--------|------|
| `CronCreate` | タスクを新規作成。5フィールドのcron式・プロンプト・繰り返し有無を受け付ける |
| `CronList` | 全タスクのID・スケジュール・プロンプトを一覧表示 |
| `CronDelete` | IDを指定してタスクをキャンセル |

各タスクには8文字のIDが発行されます。1セッションあたり最大 **50タスク** まで登録できます。

---

## 実行のタイミングと仕組み

スケジューラーは毎秒、実行すべきタスクがないかチェックします。

### 「ターンとターンの間」に実行される

Claude が応答中（レスポンス生成中）には割り込みません。**現在のターンが終わってからアイドル状態になったときに実行**されます。Claude がビジーだった間の実行予定は、アイドルになったときに1回だけ実行されます（ミスした分はまとめて実行されません）。

### ジッター（実行時刻のゆらぎ）

複数のセッションが同時刻に API を叩くのを防ぐため、実行時刻に小さなランダムなズレが加わります。

| タスク種別 | ジッター |
|-----------|--------|
| 繰り返しタスク | 周期の最大10%遅延（上限15分）。30分おきなら最大3分ズレる |
| 1回限りのタスク（毎時0分・30分） | 最大90秒早く実行 |

正確なタイミングが重要な場合は、`:00` や `:30` 以外の分を指定するとジッターが適用されません（例：`/loop` ではなく `CronCreate` で `3 9 * * *` のように指定）。

### タイムゾーン

全時刻は**ローカルタイムゾーンで解釈**されます。`0 9 * * *` は「Claude Code を動かしている端末の時刻で9:00」を意味します。UTC ではありません。

### 3日間の有効期限

繰り返しタスクは**作成から3日後に自動期限切れ**になります。最後に1回実行されてから自動削除されます。長期的なスケジューリングが必要な場合は期限前に再作成するか、後述の Desktop Scheduled Tasks を使います。

---

## cron 式リファレンス

`CronCreate` は標準的な5フィールドのcron式に対応しています。

```
分 時 日 月 曜日
```

| 例 | 意味 |
|----|------|
| `*/5 * * * *` | 5分ごと |
| `0 * * * *` | 毎時0分（1時間ごと） |
| `7 * * * *` | 毎時7分 |
| `0 9 * * *` | 毎日午前9時（ローカル） |
| `0 9 * * 1-5` | 平日の午前9時 |
| `30 14 15 3 *` | 3月15日 14:30 |

**非対応**：`L`・`W`・`?` などの拡張構文、`MON`・`JAN` などの名前エイリアス。

---

## /loop を無効化する

セキュリティ上の理由などで `/loop` を使わせたくない場合、環境変数で無効化できます。

```bash
export CLAUDE_CODE_DISABLE_CRON=1
```

設定後は cron ツールと `/loop` が使用不可になり、既存のタスクも実行されなくなります。

---

## セッションスコープの制限

`/loop` はセッション内にのみ存在します。次の点に注意してください。

| 制限 | 内容 |
|------|------|
| **セッション終了で消滅** | ターミナルを閉じると全タスクが削除される |
| **起動後も持続しない** | Claude Code を再起動すると全タスクがリセット |
| **ミス分はまとめて実行されない** | ビジー中に来た予定はアイドル後に1回のみ実行 |

長期・常駐型のスケジューリングが必要な場合は以下を検討してください。

---

## 永続化が必要な場合の代替手段

| 手段 | 特徴 | 対応OS |
|------|------|--------|
| **Desktop Scheduled Tasks** | アプリ再起動後も持続。GUI で設定可能 | macOS・Windows のみ |
| **GitHub Actions** | `schedule` トリガーで CI/CD と連携 | 全環境 |
| **headless モード** | `claude -p "..."` を OS の cron で呼び出す | 全環境（Linux 推奨） |

Linux ユーザーは Desktop Scheduled Tasks が使えないため、`/loop`（セッション内）か OS の cron で `claude -p` を呼び出す方法が選択肢になります。

---

## まとめ

| ポイント | 内容 |
|---------|------|
| **起動バージョン** | Claude Code v2.1.72 以降 |
| **基本構文** | `/loop <間隔> <プロンプト>` |
| **デフォルト間隔** | 省略時は10分ごと |
| **1回限りリマインダー** | 自然言語で「○時に～して」と伝えるだけ |
| **スキルの繰り返し実行** | `/loop 20m /review-pr 1234` のようにスラッシュコマンドも可 |
| **管理** | 自然言語で一覧確認・キャンセル可能（内部：CronCreate/List/Delete） |
| **有効期限** | 繰り返しタスクは作成から3日で自動削除 |
| **制限** | セッションスコープ。端末を閉じると消える |
| **無効化** | `CLAUDE_CODE_DISABLE_CRON=1` で無効化 |

`/loop` はシンプルな1行で「監視・確認・リマインド」の繰り返し作業をバックグラウンドに委譲できる強力な機能です。デプロイ待ちで画面に張り付く時間や、PRのレビューコメントを見逃すリスクを大幅に減らせます。

---

## 次回予告

次回（#10）は **Desktop Scheduled Tasks ―― アプリ再起動後も続く永続スケジューラー** を解説します。

---

## 参考・出典

- [Run prompts on a schedule（公式ドキュメント・英語）](https://code.claude.com/docs/en/scheduled-tasks)
- [Claude Codeにcronみたいな定期タスク実行機能が追加されました（DevelopersIO）](https://dev.classmethod.jp/articles/claude-code-loop-command/)
- [Claude Code スケジューリング完全ガイド — /loop コマンドと Desktop scheduled tasks（Qiita）](https://qiita.com/kai_kou/items/329e8be64b397ff645a8)
- [Regular task automation: /loop vs /schedule 比較（DevelopersIO 英語版）](https://dev.classmethod.jp/en/articles/comparing-claude-code-loop-and-claude-cowork-schedule/)
- [What Is the Claude Code /loop Command?（SmartScope）](https://smartscope.blog/en/generative-ai/claude/claude-code-loop-command-session-scheduler/)
