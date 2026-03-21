---
title: "Claude Code 機能解説 #8：Claude Code on the Web ―― ブラウザだけでクラウド実行・並列タスク・PR自動生成"
date: "2026-03-21T12:30:00"
category: "ITエンジニア"
excerpt: "Claude Code on the Web は、ローカル環境不要でブラウザからコーディングタスクを実行できるクラウド版 Claude Code です。GitHubと連携しPRを自動生成。並列実行やターミナルとのセッション移行も可能。公式ドキュメントをもとに機能・設定・セキュリティを解説します。"
coverImage: "/fotis-fotopoulos-6sAl6aQ4OWI-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/ja/claude-code-on-the-web"
  - "https://dev.classmethod.jp/articles/trying-claude-code-on-the-web/"
  - "https://zenn.dev/oikon/articles/claude-code-web-sandbox"
  - "https://miralab.co.jp/media/claude-code-on-the-web/"
---

# Claude Code 機能解説 #8：Claude Code on the Web

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第8回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide) ／ 第7回：[Remote Control](/posts/claude-code-remote-control-guide)

---

## Claude Code on the Web とは

**Claude Code on the Web** は、ブラウザから直接 Claude Code のタスクを実行できるクラウド版です。従来のターミナル版と異なり、**ローカルに開発環境を構築する必要がありません**。

[claude.ai/code](https://claude.ai/code) にアクセスして GitHub リポジトリを接続するだけで、Anthropic が管理するクラウドの仮想マシン上でコードが実行されます。現在はリサーチプレビューとして提供中です。

### こんな用途に最適

| ユースケース | 説明 |
|---|---|
| **アーキテクチャの質問** | コードの設計や実装方法について相談する |
| **バグ修正・ルーチンタスク** | 明確に定義されていて、頻繁な操舵が不要な作業 |
| **並列作業** | 複数のバグ修正を同時に並列処理する |
| **ローカルにないリポジトリ** | クローンしていないコードで直接作業する |
| **バックエンド変更** | テストを書いてからテストに合格するコードを実装する |

---

## Remote Control との違い

前回解説した Remote Control と、今回の Claude Code on the Web は同じ `claude.ai/code` を使いますが、**実行場所が根本的に異なります**。

| | Remote Control | Claude Code on the Web |
|---|---|---|
| **実行場所** | 自分の PC（ローカル） | Anthropic のクラウド VM |
| **ローカルファイル** | ○ 直接アクセス可能 | × クローンが必要 |
| **MCP サーバー** | ○ ローカル設定が使える | 限定的 |
| **ターミナル起動** | 必要 | 不要 |
| **PC の電源** | ON のまま必要 | 不要（クラウドで完結） |
| **主な用途** | 進行中のローカル作業を別デバイスで継続 | ローカル環境なしにタスクを開始 |

ローカルの作業を別デバイスで続けたい → **Remote Control**
ローカル環境なしでリポジトリの作業をしたい → **Claude Code on the Web**

---

## 利用条件

| 条件 | 内容 |
|---|---|
| **対応プラン** | Pro・Max・Team・Enterprise（Enterprise は管理設定で有効化が必要） |
| **対応リポジトリ** | **GitHub のみ**（GitLab・Bitbucket は現時点で非対応） |
| **Claude GitHub App** | リポジトリへのインストールが必要 |

---

## 基本的な使い方

### 1. セットアップ

1. [claude.ai/code](https://claude.ai/code) にアクセス
2. GitHub アカウントを接続
3. 対象リポジトリに Claude GitHub App をインストール
4. デフォルト環境（ネットワーク設定など）を選択
5. コーディングタスクを入力して送信

タスクが完了すると、変更が自動的にブランチにプッシュされ、**プルリクエストの作成**ができます。

### 2. ターミナルからクラウドにタスクを送る

ターミナルから `--remote` フラグを使って Web 上に新しいタスクを起動できます。

```bash
claude --remote "src/auth/login.ts の認証バグを修正して"
```

これにより `claude.ai` 上に新しい Web セッションが作成されます。クラウドで実行されている間、ローカルでは別の作業ができます。

#### 並列タスクの実行

`--remote` を複数回実行することで、それぞれ独立したセッションを並列実行できます。

```bash
claude --remote "auth.spec.ts の不安定なテストを修正して"
claude --remote "API ドキュメントを更新して"
claude --remote "ロガーを構造化出力にリファクタリングして"
```

`/tasks` コマンドでセッションの進捗を一覧確認できます。

#### 計画してからリモートで実行するパターン

複雑なタスクはまずローカルで計画を立て、実行だけクラウドに任せるのが効果的です。

```bash
# まず Plan Mode で計画を立てる
claude --permission-mode plan

# 計画に満足したらリモートで自律実行
claude --remote "docs/migration-plan.md の移行計画を実行して"
```

### 3. diff ビューで変更を確認

Claude がファイルを変更すると、`+12 -1` のような差分インジケーターが表示されます。これをタップすると、ファイルごとに変更を確認できる **diff ビュー**が開きます。

diff ビューでできること：

- ファイルごとに追加・削除行を確認
- 特定の変更箇所にコメントして修正リクエスト
- GitHub に切り替えなくても複数ラウンドのフィードバックを実施

### 4. Web セッションをターミナルに引き継ぐ（テレポート）

Web で進めていたセッションをターミナルに持ち込んで、ローカルで続きの作業ができます。

```bash
# ターミナルから特定セッションを引き継ぐ
claude --teleport

# または Claude Code 内から
/teleport   # または /tp
```

テレポートすると、Claude は正しいリポジトリを確認し、Web セッションのブランチをフェッチ・チェックアウトして、**会話履歴ごとターミナルに引き継ぎます**。

> **注意**：セッション移行は **Web → ターミナルの一方向のみ**です。進行中のターミナルセッションを Web にプッシュすることはできません。`--remote` は常に「新しい」Web セッションを作成します。

---

## クラウド環境の仕様

### プリインストール済み言語・ツール

汎用イメージには主要な言語・ツールがプリインストールされています。

| 分類 | 内容 |
|---|---|
| **言語** | Python 3.x・Node.js（LTS）・Ruby 3.3・PHP 8.4・Java（OpenJDK）・Go・Rust・C++ |
| **パッケージ管理** | pip・poetry・npm・yarn・pnpm・bun・gem・bundler・cargo など |
| **データベース** | PostgreSQL 16・Redis 7.0 |
| **テスト・ビルド** | 各言語の主要フレームワーク |

インストール済みツールを確認するには Claude に以下を依頼します：

```bash
check-tools
```

### セットアップスクリプト

デフォルトイメージにないツール（`gh` CLI など）はセットアップスクリプトで追加できます。スクリプトは **Claude Code 起動前・新規セッション開始時のみ**実行されます。

```bash
#!/bin/bash
apt update && apt install -y gh
```

環境設定ダイアログの **Setup script** フィールドに記述します。

### SessionStart フックとの使い分け

| | セットアップスクリプト | SessionStart フック |
|---|---|---|
| **設定場所** | クラウド環境 UI | リポジトリの `.claude/settings.json` |
| **実行タイミング** | Claude Code 起動前・新規セッションのみ | Claude Code 起動後・再開含む全セッション |
| **適したもの** | クラウド専用ツールのインストール | `npm install` など環境共通のセットアップ |

---

## ネットワークアクセスの設定

| レベル | 説明 | 用途 |
|---|---|---|
| **なし** | インターネット完全遮断 | 最高セキュリティ（パッケージインストール不可） |
| **Limited（デフォルト）** | npm・PyPI・RubyGems・crates.io など主要レジストリのみ | 一般的な開発。セキュリティと利便性のバランス◎ |
| **Full** | インターネット全開放 | 外部 API の呼び出しが必要な場合 |

デフォルトの「Limited」では、GitHub・npm・PyPI・Docker Hub・Azure・GCP・AWS など多数のドメインへのアクセスが許可されています。

---

## セキュリティと分離

- **分離された VM**：各セッションは独立した Anthropic 管理の仮想マシンで実行
- **認証情報の保護**：git 認証情報は専用プロキシが管理し、サンドボックス内に直接入らない
- **ネットワーク制御**：セキュリティプロキシ経由で全アウトバウンドトラフィックを制御
- **gVisor 基盤**：Google 製のコンテナセキュリティ技術でサンドボックス強化

---

## セッション管理

### 共有

| プラン | 共有オプション |
|---|---|
| Pro・Max | プライベート / **パブリック**（claude.ai にログインしているすべてのユーザーに表示） |
| Team・Enterprise | プライベート / **チーム**（組織内メンバーに表示） |

> **注意**：パブリック共有前にプライベートリポジトリのコードや認証情報が含まれていないか確認してください。

### アーカイブと削除

- **アーカイブ**：セッションリストから非表示にして整理（後から表示可能）
- **削除**：セッションとそのデータを永続的に削除（取り消し不可）

---

## モバイル対応

Claude Code on the Web は iOS / Android の Claude アプリからも利用できます。外出先でタスクを開始し、進捗を監視できます。

Claude アプリがない場合は Claude Code 内で `/mobile` を入力するとダウンロード用の QR コードが表示されます。

---

## 料金・レート制限

Claude Code on the Web の追加料金はなく、Pro / Max プランの使用量に従ってトークンを消費します。ただし、**複数のタスクを並列実行するほどレート制限を多く消費します**。

---

## 制限事項

| 制限 | 内容 |
|---|---|
| リポジトリ | **GitHub のみ**（GitLab・Bitbucket 等は非対応） |
| テレポート | Web → ターミナルの一方向のみ |
| カスタムイメージ | スナップショット・カスタムコンテナイメージは現時点で非対応 |
| Bun | セキュリティプロキシとの互換性の問題があり一部動作しない |

---

## ターミナル版・Remote Control との使い分けまとめ

| 状況 | 推奨する方法 |
|---|---|
| ローカルで作業中、別デバイスから操作したい | **Remote Control** |
| ローカル環境なしでリポジトリにタスクを実行したい | **Claude Code on the Web** |
| 複数のタスクを並列処理したい | **Claude Code on the Web**（`--remote` を複数実行） |
| ローカルファイル・MCP サーバーを活用したい | **ターミナル版** |
| 計画はローカルで、実行はクラウドで | **Plan Mode → `--remote`** |

---

## まとめ

Claude Code on the Web は「どこからでも、環境構築なしに、コードをクラウドで動かす」ための機能です。

特に `--remote` を使った**並列タスク実行**は、複数のバグ修正や機能追加を同時に走らせてPRを自動生成できる強力なワークフローです。ローカルで立てた計画を `--remote` でクラウドに投げ、結果をdiffビューで確認してPRを作成するフローを身につけると、開発速度が大きく向上します。

---

## 出典

- [ウェブ上の Claude Code（公式ドキュメント・日本語）](https://code.claude.com/docs/ja/claude-code-on-the-web)
- [Claude Code のターミナルとwebの連携を試してみた（DevelopersIO）](https://dev.classmethod.jp/articles/trying-claude-code-on-the-web/)
- [Claude Code on the Web の仕様を徹底解剖（Zenn）](https://zenn.dev/oikon/articles/claude-code-web-sandbox)
- [Claude Code on the Webとは？使い方と料金！WEB版とローカル版の違いとは（MiraLabAI）](https://miralab.co.jp/media/claude-code-on-the-web/)
