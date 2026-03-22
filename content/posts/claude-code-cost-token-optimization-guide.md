---
title: "Claude Code のトークン代を40〜70%削減する10のコツ【2026年版】"
date: "2026-03-22T10:00:00"
category: "ITエンジニア"
excerpt: "Claude Codeの平均コストは開発者1人あたり月100〜200ドル。公式ドキュメントに基づき、Prompt Caching・/compact・.claudeignore・モデル使い分けなど、今日から使えるトークン節約テクニックを10個まとめました。"
coverImage: "/fotis-fotopoulos-6sAl6aQ4OWI-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/costs"
  - "https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
  - "https://platform.claude.com/docs/en/about-claude/pricing"
  - "https://zenn.dev/shintaroamaike/articles/d53921404e4c09"
  - "https://qiita.com/ogison/items/d0645cf1a7a3c86395a3"
---

# Claude Code のトークン代を40〜70%削減する10のコツ【2026年版】

Anthropic の公式ドキュメントによると、Claude Code の平均コストは **開発者1人あたり1日6ドル**、チームで API 利用すると **月100〜200ドル/人** が目安です。自動化やエージェントをフル活用するとさらに増えます。

> The average cost is $6 per developer per day, with daily costs remaining below $12 for 90% of users.
> —— [Manage costs effectively - Claude Code Docs](https://code.claude.com/docs/en/costs)

コストが膨らむ根本原因はひとつ。**コンテキストが大きくなるほど、毎リクエストのトークン数が増える**ことです。この記事では、今日から使える節約テクニックを10個まとめました。

---

## コツ1：Prompt Caching を最大活用する（最大90%削減）

Claude Code は **Prompt Caching をデフォルトで自動有効化**しています。設定不要で、CLAUDE.md・ツール定義・過去の会話などの繰り返し送信されるコンテキストがキャッシュされます。

| 種別 | 料金（通常入力比） |
|------|-----------------|
| キャッシュ書き込み（5分） | 1.25倍 |
| キャッシュ書き込み（1時間） | 2倍 |
| **キャッシュ読み込み** | **0.1倍（90%オフ）** |

キャッシュヒット時は通常の10%しか課金されません。5分間キャッシュなら1回ヒットするだけで元が取れます。

**効果を最大化するには：**
- 同じセッション内で作業を続ける（セッションをまたぐとキャッシュが消える）
- CLAUDE.md を充実させる（毎セッションキャッシュされるため効果が積み重なる）

---

## コツ2：タスクの切り替えは `/clear` でリセットする

関係のない別タスクを始めるとき、そのままセッションを続けると**古い会話履歴が毎リクエストのトークン数を押し上げます**。

```
/rename  # 後で戻れるよう名前をつける
/clear   # 会話履歴をリセット
```

セッションを完全に捨てたくない場合は `/rename` で保存してから `/clear` し、後で `/resume` で戻れます。

---

## コツ3：`/compact` でコンテキストを圧縮する

セッションを続けながらトークンを減らしたいときは `/compact` が便利です。会話履歴を要約してコンテキストスペースを解放します。

```
/compact Focus on code samples and API usage
```

引数で「何を残すか」を指定できます。CLAUDE.md に以下を書いておくと、毎回自動で適用されます。

```markdown
# Compact instructions

When you are using compact, please focus on test output and code changes
```

コンテキストが **70%** に達したら手動で `/compact`、タスク完了時に `/clear` が基本の運用リズムです。

---

## コツ4：`.claudeignore` で不要ファイルを除外する

プロジェクトルートに `.claudeignore` を作るだけで、Claude が読み込むファイルを制限できます。`.gitignore` と同じ書式です。

```
# ロックファイル（巨大でトークンを浪費）
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

# ログ
*.log
logs/
```

これだけで初期読み込みを**数千トークン単位**で削減できます。手間のわりに効果が大きいので、新規プロジェクトでは最初に設定しておくのがおすすめです。

---

## コツ5：タスクに応じてモデルを使い分ける

Claude Code のデフォルトは Sonnet ですが、タスクの重さに応じて切り替えるとコストが変わります。

| モデル | 向いているタスク |
|--------|----------------|
| **Haiku 4.5** | 単純なフォーマット・補完・軽い検索 |
| **Sonnet 4.6** | 通常のコーディング・バグ修正（デフォルト） |
| **Opus 4.6** | 複雑な設計・マルチステップの推論 |

セッション中に切り替えるには `/model` コマンドを使います。

```
/model claude-haiku-4-5-20251001   # 軽量タスク
/model claude-sonnet-4-6           # 通常（デフォルト）
/model claude-opus-4-6             # 複雑な推論
```

---

## コツ6：Extended Thinking を調整する

Extended Thinking（拡張思考）はデフォルトで有効です。複雑なタスクには効果的ですが、**思考トークンは出力トークンとして課金**されます。単純なタスクでは抑制するとコストが下がります。

```
/effort low   # 思考量を下げる（シンプルなタスク向け）
```

環境変数でも上限を設定できます。

```bash
MAX_THINKING_TOKENS=8000  # デフォルトより低い値に設定
```

---

## コツ7：使っていない MCP サーバーを無効化する

MCP サーバーはツール定義をコンテキストに**常駐**させます。使っていないサーバーがあるだけで、毎リクエストそのぶんのトークンが消費されます。

```
/mcp  # 設定済みサーバーの一覧を確認
```

不要なサーバーは無効化しましょう。また、`gh`・`aws`・`gcloud` などの **CLI ツールは MCP より context-efficient** です。ツール定義をコンテキストに追加しないため、可能な場面では CLI を優先するのが公式推奨です。

---

## コツ8：CLAUDE.md は500行以内に収める

CLAUDE.md はセッション開始時に**毎回全文**がコンテキストに読み込まれます。PR レビュー手順や DB マイグレーション手順など、特定タスクの詳細な指示が書かれていると、無関係な作業中も余計なトークンを消費します。

**公式推奨：CLAUDE.md は約500行以内**

特定タスクの指示は **Skills（カスタムスラッシュコマンド）** に移動するのがベストです。Skills は呼び出されたときだけ読み込まれるので、普段はトークンを消費しません。

```
# CLAUDE.md に書くべきこと → プロジェクト全体に常に必要な情報のみ
# Skills に移動すべきこと → 特定ワークフローの詳細な手順
```

---

## コツ9：重い処理はサブエージェントに任せる

テスト実行・ドキュメント取得・ログ解析など、出力が膨大になる処理をメインの会話でやると、以降のすべてのリクエストにその出力が引きずられます。

サブエージェントに委任すると、詳細な出力はそのコンテキスト内に留まり、メインには**要約だけ**が返ってきます。会話履歴が汚れないので、長い作業でも効率よく進められます。

---

## コツ10：Hooks で出力を前処理する

Claude に大量データを渡す前に、Hooks でフィルタリングするとトークンを劇的に減らせます。

**例：テスト出力を失敗分だけに絞る**

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

10,000行のログを処理させる代わりに、エラー行だけ（数百トークン）を渡せます。

---

## コスト削減 優先度まとめ

| 優先度 | コツ | 期待効果 |
|--------|------|---------|
| ★★★ | Prompt Caching（自動） | 最大90%削減 |
| ★★★ | `/clear` でタスク間リセット | 50〜70%削減 |
| ★★★ | 具体的なプロンプトを書く | 無駄な探索を防止 |
| ★★☆ | `.claudeignore` の設定 | 数千トークン単位 |
| ★★☆ | CLAUDE.md を500行以内に | 毎リクエスト削減 |
| ★★☆ | モデルの使い分け | タスクに応じて最適化 |
| ★☆☆ | Extended Thinking の調整 | 複雑でないタスクで削減 |
| ★☆☆ | MCP サーバーの整理 | 定義分のオーバーヘッド削減 |

まず「Prompt Caching の活用（同一セッション維持）」と「タスク切り替え時の `/clear`」から始めると、設定コストが低く効果も大きいのでおすすめです。

---

**参考・出典**
- [Manage costs effectively - Claude Code Docs](https://code.claude.com/docs/en/costs)
- [Prompt caching - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Pricing - Claude API Docs](https://platform.claude.com/docs/en/about-claude/pricing)
- [Claude Codeのトークン消費を節約して使い倒す設定術【2026年版】 - Zenn](https://zenn.dev/shintaroamaike/articles/d53921404e4c09)
- [Claude CodeのToken Costを抑えるための実践Tips集 - Qiita](https://qiita.com/ogison/items/d0645cf1a7a3c86395a3)
