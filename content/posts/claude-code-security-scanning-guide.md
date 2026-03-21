---
title: "Claude Code 機能解説 #12：Security Scanning ―― AIが脆弱性を発見・検証・修正提案まで行うセキュリティスキャン"
date: "2026-03-21T18:00:00"
category: "ITエンジニア"
excerpt: "2026年2月に発表されたClaude Code Security Scanningは、従来の静的解析ツールを超えたAI駆動の脆弱性検出機能です。コードの文脈を理解して推論し、ビジネスロジック欠陥まで検出。/security-reviewコマンドとGitHub Actionsで手軽に導入できます。"
coverImage: "/christian-lue-7dEyTJ7-8os-unsplash.jpg"
verified: true
sources:
  - "https://github.com/anthropics/claude-code-security-review"
  - "https://code.claude.com/docs/en/security"
  - "https://www.penligent.ai/hackinglabs/claude-code-security-breaks-the-old-model-of-code-scanning/"
  - "https://venturebeat.com/security/anthropic-claude-code-security-reasoning-vulnerability-hunting"
---

# Claude Code 機能解説 #12：Security Scanning

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の最終回（第12回）です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide) ／ 第7回：[Remote Control](/posts/claude-code-remote-control-guide) ／ 第8回：[Git Worktree](/posts/claude-code-git-worktree-guide) ／ 第9回：[/loop コマンド](/posts/claude-code-loop-command-guide) ／ 第10回：[GitHub Actions 連携](/posts/claude-code-github-actions-guide) ／ 第11回：[Skills](/posts/claude-code-skills-custom-slash-commands-guide)

---

## Claude Code Security Scanning とは

2026年2月20日、Anthropic は **Claude Code Security Scanning**（セキュリティスキャン）を発表しました。コードベース全体の脆弱性を検出し、各検出結果を多段階で検証して偽陽性を排除し、修正パッチを提案する機能です。

> 内部テストでは、Opus 4.6 がオープンソースの本番コードベースから **500件以上の未知の高深刻度脆弱性**を発見しました。中には数十年間見逃されていたものも含まれます。
> —— Anthropic 公式発表より（VentureBeat 報道による）

現時点では **Enterprise・Team プランのユーザー**と**オープンソースリポジトリのメンテナー**を対象にした限定リサーチプレビューとして提供されています。

---

## 従来の静的解析との違い

従来の SAST（Static Application Security Testing）ツールはルールベースで動作します。既知のパターンに一致するコードを検出するため、単純な脆弱性には強い一方、複雑なロジックが絡む問題は見逃しがちです。

Claude Code Security Scanning はコードを**推論**します。

| 特性 | Claude Code | 従来の SAST |
|------|------------|------------|
| **コンテキスト理解** | コードの意図・データフロー・コンポーネント間の関係を把握 | パターンマッチングのみ |
| **偽陽性率** | 低い（AIが実際の脆弱性かを判断） | 高い |
| **説明の質** | 脆弱性の原因・影響・修正方法を詳細に説明 | 最小限 |
| **カスタマイズ性** | 組織固有のルールを追加可能 | 制限的 |
| **言語対応** | 言語非依存 | 言語ごとに制限あり |
| **ビジネスロジック欠陥** | 検出可能 | ほぼ検出不可 |

---

## 検出できる脆弱性

### インジェクション攻撃
- SQL インジェクション
- コマンド インジェクション
- NoSQL インジェクション
- XXE（XML External Entity）
- LDAP / XPath インジェクション

### 認証・認可の欠陥
- 不正な認証実装
- 権限昇格
- 直接オブジェクト参照（IDOR）
- セッション管理の欠陥

### データ漏洩
- ハードコードされたシークレット・APIキー
- 機密データのログ出力
- PII（個人識別情報）の不適切な取り扱い

### 暗号化関連
- 弱い暗号アルゴリズムの使用
- 不適切なキー管理
- 安全でない乱数生成

### ビジネスロジック欠陥
- レース条件（Race Condition）
- TOCTOU（Time-of-Check-Time-of-Use）問題

### クロスサイトスクリプティング（XSS）
- 反射型 / 保存型 / DOM ベース XSS

### サプライチェーン
- 脆弱性のある依存関係
- タイポスクワッティング

### コード実行
- デシリアライゼーション経由の RCE
- Pickle / Eval インジェクション

### 設定のセキュリティ
- 欠落しているセキュリティヘッダ
- 許可的すぎる CORS 設定

> **自動除外される偽陽性**：DoS脆弱性、レート制限、メモリ/CPU枯渇、未検証の一般的な入力検証、オープンリダイレクトは意図的に除外されます。

---

## 5段階の分析プロセス

```
1. PR・コード変更の分析
         ↓
2. コンテキスト理解（変更の目的・潜在リスクを検査）
         ↓
3. 検出結果の生成（詳細な説明と対応策を含む）
         ↓
4. 偽陽性フィルタリング（Claude が自己検証して低影響を除外）
         ↓
5. PR コメントへの投稿（特定行にレビューコメント）
```

すべての検出結果に**信頼度スコア**と**深刻度評価**が付きます。修正は人間が承認するまで適用されません。

---

## 導入方法

### 方法1：`/security-review` コマンド（推奨）

Claude Code ターミナルで直接実行できます。

```
/security-review
```

これだけでコードベースの包括的なセキュリティレビューを開始します。カスタマイズしたい場合は、リポジトリから `security-review.md` をコピーして `.claude/commands/` に置き、組織固有のルールを追記します。

### 方法2：GitHub Actions 連携

PR が作成されるたびに自動でセキュリティスキャンを実行する設定です。

`.github/workflows/security.yml` を作成します。

```yaml
name: Security Review

permissions:
  pull-requests: write   # PR へのコメント投稿に必要
  contents: read

on:
  pull_request:

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.sha || github.sha }}
          fetch-depth: 2

      - uses: anthropics/claude-code-security-review@main
        with:
          comment-pr: true
          claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
```

---

## GitHub Actions のパラメーター

| パラメーター | 説明 | デフォルト | 必須 |
|------------|------|----------|------|
| `claude-api-key` | Claude API キー | なし | ✅ |
| `comment-pr` | PR へコメントを投稿する | `true` | |
| `upload-results` | 結果を Artifacts にアップロード | `true` | |
| `exclude-directories` | スキャン除外ディレクトリ（カンマ区切り） | なし | |
| `claude-model` | 使用するモデル | `claude-opus-4-1-20250805` | |
| `claudecode-timeout` | タイムアウト（分） | `20` | |
| `run-every-commit` | 毎コミット分析（キャッシュスキップ） | `false` | |
| `false-positive-filtering-instructions` | カスタムフィルタリング指示ファイル | なし | |
| `custom-security-scan-instructions` | カスタムスキャン指示ファイル | なし | |

### 出力

| 出力 | 内容 |
|------|------|
| `findings-count` | 検出した脆弱性の件数 |
| `results-file` | 結果 JSON ファイルのパス |

---

## Diff-Aware スキャン（差分対応）

PR に対して実行した場合、**変更されたファイルのみをスキャン**します。コードベース全体を毎回スキャンするのではなく、差分に集中するため高速かつコスト効率的です。

```yaml
# 全コミットに対してスキャン（キャッシュを使わない場合）
with:
  run-every-commit: "true"
```

---

## セキュリティ上の注意点

### 外部コントリビューターからのプロンプトインジェクション対策

悪意あるコードに含まれたプロンプトで Claude を操作しようとする攻撃（プロンプトインジェクション）への対策として、外部コントリビューターからの PR は承認後にのみワークフローを実行する設定を推奨します。

```
GitHub Settings → Actions →
"Require approval for all external contributors" を有効化
```

### コードの機密性

ソースコードを外部のAIモデルに送ることになるため、IP（知的財産）や法的コンプライアンスの観点から確認が必要な場合があります。特に EU AI Act が適用される組織では事前確認が重要です。

---

## Claude Code 組み込みのセキュリティ機能

Security Scanning 以外にも、Claude Code は日常のコーディングにおいてさまざまなセキュリティ保護を組み込んでいます。

### 権限ベースアーキテクチャ

デフォルトで読み取り専用。ファイル編集・コマンド実行など副作用がある操作には明示的な承認が必要です。

### 書き込み範囲の制限

Claude Code が書き込めるのは、**起動したフォルダとそのサブフォルダのみ**です。親ディレクトリへの書き込みには明示的な許可が必要です。

### プロンプトインジェクション対策

| 保護機能 | 内容 |
|---------|------|
| コマンドブロックリスト | `curl`・`wget` などウェブから任意のコンテンツを取得するコマンドはデフォルト禁止 |
| コンテキスト分析 | 有害な指示を含むリクエストを検出 |
| 入力サニタイズ | コマンドインジェクションを防ぐ処理 |
| 独立したコンテキストウィンドウ | Web フェッチは別コンテキストで実行し、悪意あるプロンプトの注入を防ぐ |
| 信頼の確認 | 初回実行・新しい MCP サーバーは信頼を確認してから実行 |

### サンドボックス

`/sandbox` コマンドで Bash ツールをファイルシステムおよびネットワーク隔離で実行できます。Claude Code が自律的に作業できる安全な境界を定義します。

### クラウド実行環境のセキュリティ

Claude Code on the Web（クラウド環境）では追加の保護が入ります。

| 機能 | 内容 |
|------|------|
| 隔離された VM | セッションごとに独立した VM で実行 |
| ネットワーク制限 | デフォルトでネットワークアクセス制限あり |
| ブランチ制限 | 現在のブランチへの push のみ許可 |
| 監査ログ | すべての操作をログ記録 |
| 自動クリーンアップ | セッション終了後に環境を削除 |

---

## チームへの展開

### managed settings での組織統一

`.claude/settings.json` で組織全体のセキュリティ設定を統一できます。

```json
{
  "permissions": {
    "deny": [
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(rm -rf *)"
    ]
  }
}
```

### Hooks で ConfigChange を監視

セッション中に設定が変更されたときのみ、承認を求める Hooks も設定できます（[#4 Hooks 記事](/posts/claude-code-hooks-automation-guide)参照）。

```json
{
  "hooks": {
    "ConfigChange": [
      {
        "matcher": "",
        "hooks": [{"type": "command", "command": "echo '設定変更を検出しました'"}]
      }
    ]
  }
}
```

---

## まとめ

| ポイント | 内容 |
|---------|------|
| **発表** | 2026年2月20日、Enterprise・Team・OSS限定プレビュー |
| **特徴** | ルールベースを超えた推論型スキャン。ビジネスロジック欠陥も検出 |
| **検証** | 多段階で偽陽性を排除。信頼度スコア・深刻度評価付き |
| **実績** | Opus 4.6 が本番OSS から500件超の未知の高深刻度脆弱性を発見 |
| **導入** | `/security-review` コマンドまたは GitHub Actions |
| **差分対応** | PR の変更ファイルのみをスキャン（Diff-Aware） |
| **人間承認** | すべての修正は開発者が確認・承認してから適用 |
| **既存保護** | 権限制御・書き込み制限・プロンプトインジェクション対策・サンドボックスも内蔵 |

Claude Code は「使うAIツール」から「セキュリティを能動的に守るAI」へと進化しています。Security Scanning は単なる脆弱性チェッカーではなく、コードの文脈を理解した上で推論し、開発チームと協働してセキュリティを高める機能です。

---

## シリーズのまとめ

12回にわたる「Claude Code 機能解説」シリーズはこれで完結です。

| # | 機能 | 記事 |
|---|------|------|
| 1 | Plan Mode | [記事を読む](/posts/claude-code-plan-mode-guide) |
| 2 | CLAUDE.md / Memory | [記事を読む](/posts/claude-code-claude-md-memory-guide) |
| 3 | MCP | [記事を読む](/posts/claude-code-mcp-integration-guide) |
| 4 | Hooks | [記事を読む](/posts/claude-code-hooks-automation-guide) |
| 5 | Agent Teams / Sub-agents | [記事を読む](/posts/claude-code-subagents-agent-teams-guide) |
| 6 | Voice Mode | [記事を読む](/posts/claude-code-voice-mode-guide) |
| 7 | Remote Control | [記事を読む](/posts/claude-code-remote-control-guide) |
| 8 | Git Worktree | [記事を読む](/posts/claude-code-git-worktree-guide) |
| 9 | /loop コマンド | [記事を読む](/posts/claude-code-loop-command-guide) |
| 10 | GitHub Actions 連携 | [記事を読む](/posts/claude-code-github-actions-guide) |
| 11 | カスタムスラッシュコマンド（Skills） | [記事を読む](/posts/claude-code-skills-custom-slash-commands-guide) |
| 12 | Security Scanning | 本記事 |

---

## 参考・出典

- [anthropics/claude-code-security-review（GitHub リポジトリ）](https://github.com/anthropics/claude-code-security-review)
- [Claude Code Security（公式ドキュメント）](https://code.claude.com/docs/en/security)
- [Claude Code Security Breaks the Old Model of Code Scanning（Penligent）](https://www.penligent.ai/hackinglabs/claude-code-security-breaks-the-old-model-of-code-scanning/)
- [Anthropic's Claude Code Security is available now after finding 500+ vulnerabilities（VentureBeat）](https://venturebeat.com/security/anthropic-claude-code-security-reasoning-vulnerability-hunting)
