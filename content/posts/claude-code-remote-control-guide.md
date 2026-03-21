---
title: "Claude Code 機能解説 #7：Remote Control（リモートコントロール）―― スマホ・別デバイスからローカル作業を継続する"
date: "2026-03-21T11:59:32"
category: "ITエンジニア"
excerpt: "Claude Code の Remote Control は、PCで動かしているセッションをスマホやタブレット・別のブラウザから操作できる機能です。コードはローカルのまま、QRコードを読み取るだけで接続完了。2026年2月リリース。設定方法・利用条件・セキュリティを公式ドキュメントをもとに解説します。"
coverImage: "/joakim-honkasalo-DurC25GdOvk-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/ja/remote-control"
  - "https://dev.classmethod.jp/articles/claude-coderemotecontrol-enables-you-to-work-on-your-local-machine-from-your-smartphone/"
  - "https://zenn.dev/schroneko/articles/claude-code-remote-control-and-mobile-notification"
  - "https://zenn.dev/boku_yaji/articles/8f5f8bfa576b0e"
  - "https://www.sbbit.jp/article/cont1/181439"
---

# Claude Code 機能解説 #7：Remote Control（リモートコントロール）

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第7回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide)

---

## Remote Control とは

**Remote Control** は、PCのターミナルで動いている Claude Code セッションを、**スマートフォン・タブレット・別のPCのブラウザから操作できる機能**です。

2026年2月25日にリリースされ、`claude.ai/code` または Claude モバイルアプリ（iOS/Android）経由で接続します。

### 何ができるか

| できること | 内容 |
|---|---|
| ローカル環境をそのまま使う | ファイルシステム・MCP サーバー・ツール・プロジェクト設定はすべて PC 上のまま |
| 複数デバイスから同時操作 | ターミナル・ブラウザ・スマホのどこからでもメッセージを送受信 |
| 切断からの自動復帰 | PC がスリープ・ネットワーク切断から復帰すると自動再接続 |

### クラウド実行との違い

Remote Control は「PC のローカル処理をスマホからリモコン操作する」仕組みです。**コードは一切クラウドに移動しません**。Anthropic のサーバーはWebクライアントとローカルセッションの間のメッセージ中継のみを担います。

| | Remote Control | Web 上の Claude Code |
|---|---|---|
| 実行場所 | **自分の PC（ローカル）** | Anthropic 管理のクラウド |
| ローカルファイルへのアクセス | ○ | △（リポジトリのクローンが必要） |
| MCP サーバー | ○（ローカル設定が使える） | 限定的 |
| 用途 | 進行中のローカル作業を別デバイスで継続 | ローカル環境なしに始めたいとき |

---

## 利用条件

| 条件 | 内容 |
|---|---|
| Claude Code バージョン | **v2.1.51 以上**（`claude --version` で確認） |
| 対応プラン | **Pro・Max・Team・Enterprise**（APIキー単体は不可） |
| 認証 | claude.ai アカウントでサインイン済みであること |
| ワークスペース信頼 | プロジェクトディレクトリで一度 `claude` を実行して信頼を受け入れること |
| Team/Enterprise | 管理設定で Claude Code を有効化する必要あり |

> **注意**：Anthropic API キーのみでの認証では利用できません。`/login` で claude.ai アカウントにサインインしてください。

---

## 使い方

### パターン1：Remote Control モードで新規セッションを開始

```bash
cd /path/to/my-project
claude remote-control
# または名前を付ける場合
claude remote-control --name "My Project"
```

実行するとターミナルに**セッション URL と QR コード**が表示されます。

| フラグ | 説明 |
|---|---|
| `--name "My Project"` | セッションリストに表示される名前を設定 |
| `--verbose` | 詳細な接続・セッションログを表示 |
| `--sandbox` | ファイルシステム・ネットワーク分離（サンドボックス）を有効化 |

### パターン2：進行中のセッションでリモートを有効化

すでに Claude Code で作業中に「スマホからも見たい」と思ったら：

```
/remote-control
# または短縮形
/rc

# 名前を付ける場合
/remote-control My Project
```

現在の**会話履歴を引き継いだまま**リモートセッションが開始されます。

### スマホ・別デバイスからの接続方法

接続には3つの方法があります。

| 方法 | 手順 |
|---|---|
| **QR コードをスキャン**（最速） | ターミナルに表示された QR コードをスマホカメラで読み取り → Claude アプリが起動 |
| **セッション URL を開く** | ターミナルに表示された URL を任意のブラウザで開く |
| **claude.ai/code から選択** | セッション一覧でコンピュータアイコン＋緑のドットのセッションをタップ |

> Claude アプリがない場合は、Claude Code 内で `/mobile` と入力すると iOS/Android のダウンロード QR コードが表示されます。

---

## 全セッションで自動有効化する

毎回 `claude remote-control` や `/rc` を入力するのが面倒な場合は、すべてのセッションで自動的に有効にできます。

### /config から設定（推奨）

1. Claude Code 内で `/config` を実行
2. **Enable Remote Control for all sessions** を `true` に設定

### settings.json から設定

`~/.claude/settings.json` に追記します。

```json
{
  "env": {
    "CLAUDE_CODE_REMOTE_CONTROL_AT_STARTUP": "true"
  }
}
```

---

## 接続とセキュリティ

Remote Control の通信の仕組みは以下の通りです（公式ドキュメントより）。

- ローカルの Claude Code セッションは**アウトバウンド HTTPS リクエストのみ**を行う
- PC 上のインバウンドポートは一切開かない
- Remote Control 開始時に Anthropic API に登録し、作業をポーリング
- 別デバイスから接続すると、Anthropic サーバーがクライアントとローカルセッション間のメッセージを**ストリーミング接続経由でルーティング**

すべてのトラフィックは **TLS 経由**で Anthropic API を通過します。接続は複数の短命な認証情報を使用し、それぞれ単一目的にスコープされて独立して有効期限が切れます。

---

## 制限事項

| 制限 | 内容 |
|---|---|
| 同時接続数 | 1 セッションにつき **1 つのリモート接続**のみ |
| ターミナルを開いたまま | ターミナルを閉じると **セッションが終了**する |
| ネットワーク障害のタイムアウト | 約 **10 分以上**ネットワーク切断が続くとセッション終了 → `claude remote-control` で再開 |

---

## 活用シーン

### シーン1：移動中に長時間タスクを監視

```
# 自宅PCで起動
claude remote-control --name "API リファクタリング"

# 外出先からスマホで確認・指示
```

ビルドやテストの実行中に外出して、スマホから進捗を確認しながら次の指示を出す使い方。

### シーン2：ソファに移動して続きを指示

デスクで大規模なリファクタリングを開始し、途中でソファに移動。スマホから続きの指示を送りながらリラックスして作業。

### シーン3：会議中のバックグラウンド確認

Claude に長時間タスクを任せながら会議に出席。合間にスマホで進捗を確認し、必要なら指示を追加。

---

## スマホへのプッシュ通知を受け取る（応用）

デフォルトでは Claude がスマホに通知を送る機能はありません。Hooks と組み合わせることで、Claude が入力待ちになったタイミングで**スマホにプッシュ通知**を送る環境を構築できます。

iOS の場合、**Bark**（AES-256 暗号化対応のプッシュ通知アプリ）が紹介されています。`Notification` イベントの Hook に Bark のエンドポイントへの curl コマンドを設定することで実現できます。

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "curl -s 'https://api.day.app/YOUR_KEY/Claude%20Code/入力待ちです'"
          }
        ]
      }
    ]
  }
}
```

Hooks の設定方法は[第4回の記事](/posts/claude-code-hooks-automation-guide)を参照してください。

---

## まとめ

| 操作 | コマンド |
|---|---|
| Remote Control で新規セッション開始 | `claude remote-control` |
| 名前付きで起動 | `claude remote-control --name "プロジェクト名"` |
| 進行中セッションでリモート有効化 | `/remote-control` または `/rc` |
| Claude アプリのダウンロード QR 表示 | `/mobile` |
| 全セッション自動有効化 | `/config` → Enable Remote Control for all sessions → true |

Remote Control は「どこにいてもローカル環境のフルパワーを使い続ける」ための機能です。コードをクラウドに上げることなく、スマホをリモコンとして使えます。Sub-agents や Hooks と組み合わせれば、長時間の自動化タスクをスマホでモニタリングしながら管理するワークフローが実現できます。

---

## 次回予告

次回（#8）は **Git Worktree（ギットワークツリー）―― 並列セッションを衝突なしに動かす隔離環境** を解説します。

---

## 出典

- [任意のデバイスからローカルセッションを続行する Remote Control（公式・日本語）](https://code.claude.com/docs/ja/remote-control)
- [Claude Code の Remote Control でスマホからローカルマシンの作業を継続可能に（DevelopersIO）](https://dev.classmethod.jp/articles/claude-coderemotecontrol-enables-you-to-work-on-your-local-machine-from-your-smartphone/)
- [Claude Code のリモートコントロールとスマホ通知の始め方（Zenn）](https://zenn.dev/schroneko/articles/claude-code-remote-control-and-mobile-notification)
- [Claude Code をスマホから使い倒す（Zenn）](https://zenn.dev/boku_yaji/articles/8f5f8bfa576b0e)
- [米 Anthropic が Claude Code の遠隔操作機能 Remote Control を提供開始（ビジネス+IT）](https://www.sbbit.jp/article/cont1/181439)
