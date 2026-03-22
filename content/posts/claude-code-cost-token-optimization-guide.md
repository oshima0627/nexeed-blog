---
title: "Claude Code 機能解説 #13：コスト最適化・トークン節約術 ―― 公式ドキュメントに基づくAPI費用削減の全手法"
date: "2026-03-22T10:00:00"
category: "ITエンジニア"
excerpt: "Claude Codeの平均コストは開発者1人あたり月100〜200ドル。公式ドキュメントに基づき、Prompt Caching・/compact・.claudeignore・モデル使い分けなど、実践的なトークン節約テクニックを網羅的に解説します。"
coverImage: "/fotis-fotopoulos-6sAl6aQ4OWI-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/costs"
  - "https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
  - "https://platform.claude.com/docs/en/about-claude/pricing"
  - "https://zenn.dev/shintaroamaike/articles/d53921404e4c09"
  - "https://qiita.com/ogison/items/d0645cf1a7a3c86395a3"
---

# Claude Code 機能解説 #13：コスト最適化・トークン節約術

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第13回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide) ／ 第6回：[Voice Mode](/posts/claude-code-voice-mode-guide) ／ 第7回：[Remote Control](/posts/claude-code-remote-control-guide) ／ 第8回：[Git Worktree](/posts/claude-code-git-worktree-guide) ／ 第9回：[/loop コマンド](/posts/claude-code-loop-command-guide) ／ 第10回：[GitHub Actions 連携](/posts/claude-code-github-actions-guide) ／ 第11回：[Skills](/posts/claude-code-skills-custom-slash-commands-guide) ／ 第12回：[Security Scanning](/posts/claude-code-security-scanning-guide)

---

## Claude Code のコスト実態

Anthropic の公式ドキュメントによると、Claude Code の平均コストは **開発者1人あたり1日6ドル**、90%のユーザーの日次コストは12ドル以下です。チームで API 利用する場合、Sonnet 4.6 で **月額100〜200ドル/人** が目安ですが、自動化やエージェントチームを多用すると大きく変動します。

> 公式：The average cost is $6 per developer per day, with daily costs remaining below $12 for 90% of users.
> —— [Manage costs effectively - Claude Code Docs](https://code.claude.com/docs/en/costs)

コストを意識せずに使い続けると、月末に予想外の請求が来ることも。本記事では、**公式ドキュメントに基づいた**コスト削減手法を体系的に解説します。

---

## なぜトークンが増えるのか

Claude Code のコストは「コンテキストサイズ × トークン単価」で決まります。コンテキストが大きくなる主な原因は以下の3つです。

1. **会話履歴の蓄積**：タスクをまたいでセッションを続けると、不要な過去のやり取りがコンテキストを圧迫する
2. **不要なファイル読み込み**：曖昧な指示で広範囲のファイルを読み込んでしまう
3. **MCP サーバーのツール定義**：未使用のツール定義が常にコンテキストに存在する

これらを理解した上で、各対策を見ていきましょう。

---

## 1. Prompt Caching（プロンプトキャッシング）

Claude Code は **Prompt Caching を自動で有効化**しています。設定不要で、繰り返し送信されるコンテキスト（CLAUDE.md、ツール定義、過去の会話など）がキャッシュされ、コスト削減に直結します。

### キャッシュの料金構造

| 種別 | 料金（通常入力トークン比） |
|------|--------------------------|
| キャッシュ書き込み（5分） | 1.25倍 |
| キャッシュ書き込み（1時間） | 2倍 |
| **キャッシュ読み込み** | **0.1倍（90%オフ）** |

キャッシュヒット時は通常入力価格の**10%**しか課金されません。5分間のキャッシュなら1回ヒットするだけで元が取れます。

### 効果を最大化するコツ

- **同一セッション内で作業を続ける**：セッションを跨ぐとキャッシュが無効化されます
- **CLAUDE.md を充実させる**：セッション開始時に読み込まれる CLAUDE.md の内容はキャッシュされやすく、繰り返し参照されるほど節約効果が高まります
- **2026年2月の仕様変更に注意**：2026年2月5日以降、キャッシュはワークスペースレベルで分離されました。同一組織内でも、ワークスペースが異なればキャッシュは共有されません

---

## 2. `/clear` と `/compact` でコンテキストを管理する

### `/clear`：不要な履歴を一掃

別のタスクに切り替えるときは、まず `/clear` でセッションをリセットします。古い会話履歴はトークンを無駄に消費するだけです。

```
/rename  # セッションに名前をつけて保存（後で /resume で戻れる）
/clear   # 会話履歴をリセット
```

### `/compact`：要約してコンテキストを圧縮

セッションを続けながらコンテキストを減らしたい場合は `/compact` を使います。会話履歴を要約し、実際のコンテキストスペースを解放します。

```
/compact Focus on code samples and API usage
```

カスタム指示を渡すと、要約時に保持してほしい情報を指定できます。CLAUDE.md に以下を書いておくと、自動でその内容が反映されます。

```markdown
# Compact instructions

When you are using compact, please focus on test output and code changes
```

### タイミングの目安

- コンテキストが **70%** を超えたら手動で `/compact`
- タスクが完了したら `/clear`
- `/cost` または `/context` でトークン残量を定期確認

---

## 3. `.claudeignore` で不要ファイルを除外する

プロジェクトルートに `.claudeignore` を作成すると、Claude が読み込むファイルを制限できます。`.gitignore` と同じ書式です。

```
# .claudeignore の例

# ロックファイル（巨大でトークンを浪費する）
package-lock.json
yarn.lock
pnpm-lock.yaml

# ビルド成果物
dist/
build/
.next/

# 画像・メディア
*.png
*.jpg
*.gif
*.mp4

# ログファイル
*.log
logs/

# テストのスナップショット
**/__snapshots__/
```

これだけで初期読み込み量を**数千トークン単位**で削減できます。

---

## 4. モデルをタスクに応じて使い分ける

Claude Code のデフォルトは Sonnet ですが、タスクの複雑さに応じてモデルを切り替えることでコストを最適化できます。

| モデル | 用途 | コスト感 |
|--------|------|---------|
| **Haiku 4.5** | 単純なコード補完・フォーマット | 最安（Sonnet の約1/3） |
| **Sonnet 4.6** | 通常のコーディング・バグ修正 | 標準（デフォルト） |
| **Opus 4.6** | 複雑な設計・アーキテクチャ判断 | 最高品質・最高コスト |

セッション中に切り替えるには `/model` コマンドを使います。

```
/model claude-haiku-4-5-20251001   # 軽量タスク
/model claude-sonnet-4-6           # 通常作業（デフォルト）
/model claude-opus-4-6             # 複雑な推論・設計
```

`/config` でデフォルトモデルを永続設定することも可能です。

---

## 5. Extended Thinking（拡張思考）の調整

Extended Thinking はデフォルトで有効になっており、複雑なタスクのパフォーマンスを大幅に向上させます。ただし、**思考トークンは出力トークンとして課金**されるため、不要な場面では抑制することでコストを下げられます。

```
/effort low    # 思考量を下げる（シンプルなタスク向け）
/effort high   # 思考量を上げる（複雑な推論向け）
```

環境変数で上限を設定することもできます：

```bash
MAX_THINKING_TOKENS=8000  # デフォルトより低い値に設定
```

---

## 6. MCP サーバーのオーバーヘッドを減らす

MCP サーバーはツール定義をコンテキストに常駐させるため、使っていないサーバーほどコストの無駄になります。

### 対策

**不使用のサーバーを無効化する**

```
/mcp  # 設定済みサーバー一覧を確認し、不要なものを無効化
```

**CLI ツールを優先する**

`gh`、`aws`、`gcloud` などの CLI ツールは、MCP サーバーと異なりコンテキストにツール定義を追加しません。公式ドキュメントでも「MCP より CLI を優先することで context-efficient になる」と明記されています。

**Tool Search を活用する**

MCP ツール定義がコンテキストの10%を超えると、Claude Code は自動的にツールを遅延読み込み（Lazy Loading）します。しきい値を下げることで、より早い段階から効果を得られます。

```bash
ENABLE_TOOL_SEARCH=auto:5  # ツールが5%を超えたら遅延読み込みを開始
```

---

## 7. Hooks でデータを前処理する

[Hooks](/posts/claude-code-hooks-automation-guide) を使うと、Claude が大量のデータを処理する前に事前フィルタリングできます。

**例：テスト出力を失敗分だけに絞る**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/filter-test-output.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command')

if [[ "$cmd" =~ ^(npm test|pytest|go test) ]]; then
  filtered_cmd="$cmd 2>&1 | grep -A 5 -E '(FAIL|ERROR|error:)' | head -100"
  echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"allow\",\"updatedInput\":{\"command\":\"$filtered_cmd\"}}}"
else
  echo "{}"
fi
```

10,000行のログを処理させる代わりに、エラー行のみ（数百トークン）を渡すことで大幅に削減できます。

---

## 8. CLAUDE.md をスリムに保つ

CLAUDE.md はセッション開始時に**毎回全文**がコンテキストに読み込まれます。特定のワークフロー（PR レビュー手順、DB マイグレーション手順など）の詳細な指示が書かれていると、関係のない作業中も余計なトークンを消費します。

**公式推奨：CLAUDE.md は約500行以内**

特定タスクの指示は [Skills（カスタムスラッシュコマンド）](/posts/claude-code-skills-custom-slash-commands-guide) に移動することで、必要なときだけ読み込まれるようになります。

```
# 悪い例（CLAUDE.md に全部書く）
## PR レビュー手順
1. まず...
2. 次に...
（詳細な20ステップの手順）

# 良い例（Skills に移動する）
# CLAUDE.md には /review-pr というスキルがあることだけ記載
```

---

## 9. サブエージェントに重い処理を委任する

テスト実行、ドキュメント取得、ログ解析など、出力が膨大になる処理は [サブエージェント](/posts/claude-code-subagents-agent-teams-guide) に委任しましょう。

メインの会話履歴に大量の出力が残らないため、以降のリクエストのコンテキストサイズを小さく保てます。サブエージェントの詳細な出力はそのコンテキスト内に留まり、メインには要約だけが返ってきます。

---

## 10. コスト使用量を可視化する

### `/cost` コマンド（API ユーザー向け）

```
/cost
```

現在のセッションのトークン使用量と費用が表示されます。

```
Total cost:            $0.55
Total duration (API):  6m 19.7s
Total duration (wall): 6h 33m 10.2s
Total code changes:    0 lines added, 0 lines removed
```

> ※ Claude Max・Pro サブスクリプション利用者にはサブスクリプション内での使用量が含まれるため、コスト情報は課金目的には使えません。サブスクライバーは `/stats` で使用パターンを確認してください。

### ccusage（サードパーティツール）

Claude Code がローカルに保存する JSONL ファイルを解析し、トークン使用量と費用を集計するツールです。

```bash
npx ccusage         # 概要
npx ccusage daily   # 日別使用量
npx ccusage monthly # 月別使用量
npx ccusage blocks  # 5時間ウィンドウ別（レート制限との関係確認に便利）
```

---

## チームで使う場合の追加ポイント

### スペンドリミットの設定

Claude Console の管理画面から、ワークスペース単位でスペンド上限を設定できます。予算オーバーを防ぐための最初の設定として推奨されます。

### エージェントチームはコストが大きい

[Agent Teams](/posts/claude-code-subagents-agent-teams-guide) は各メンバーが独立したコンテキストウィンドウを持つため、通常セッションの**約7倍**のトークンを消費することがあります。チームを使う場合：

- メンバーには Sonnet を使う（Opus は避ける）
- チームサイズを最小限に保つ
- 作業完了後はすぐにチームを解散する（アイドル中も課金される）

### チームサイズ別のレート制限目安（公式推奨）

| チーム規模 | ユーザーあたり TPM | ユーザーあたり RPM |
|-----------|------------------|------------------|
| 1〜5人 | 200k〜300k | 5〜7 |
| 5〜20人 | 100k〜150k | 2.5〜3.5 |
| 20〜50人 | 50k〜75k | 1.25〜1.75 |
| 50〜100人 | 25k〜35k | 0.62〜0.87 |
| 100〜500人 | 15k〜20k | 0.37〜0.47 |
| 500人以上 | 10k〜15k | 0.25〜0.35 |

---

## まとめ：コスト削減の優先順位

| 優先度 | 手法 | 期待される削減効果 |
|--------|------|-----------------|
| ★★★ | Prompt Caching（自動） | 最大90%削減 |
| ★★★ | `/clear` でタスク間リセット | 50〜70%削減 |
| ★★★ | 具体的なプロンプトを書く | 無駄な探索を防止 |
| ★★☆ | `.claudeignore` の設定 | 数千トークン単位の削減 |
| ★★☆ | CLAUDE.md を500行以内に収める | 毎リクエストの削減 |
| ★★☆ | モデルの使い分け | タスクに応じて最適化 |
| ★☆☆ | Extended Thinking の調整 | 複雑タスク以外で削減 |
| ★☆☆ | MCP サーバーの整理 | 定義分のオーバーヘッド削減 |

これらを組み合わせることで、**40〜70%のコスト削減**が現実的に達成できます。特に「Prompt Caching の最大活用」と「タスク切り替え時の `/clear`」は設定コストが低く、効果が大きいため、まず最初に取り組むことをおすすめします。

---

**出典**
- [Manage costs effectively - Claude Code Docs](https://code.claude.com/docs/en/costs)
- [Prompt caching - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Pricing - Claude API Docs](https://platform.claude.com/docs/en/about-claude/pricing)
- [Claude Codeのトークン消費を節約して使い倒す設定術【2026年版】 - Zenn](https://zenn.dev/shintaroamaike/articles/d53921404e4c09)
- [Claude CodeのToken Costを抑えるための実践Tips集 - Qiita](https://qiita.com/ogison/items/d0645cf1a7a3c86395a3)
