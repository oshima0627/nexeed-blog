---
title: "Claude Code 機能解説 #6：Voice Mode（音声入力）―― スペースキーを押しながら話すだけでコーディング指示"
date: "2026-03-21T11:53:25"
category: "ITエンジニア"
excerpt: "Claude Code の Voice Mode は /voice コマンドで有効化し、スペースキーを押し続けて話すだけでプロンプトを音声入力できる機能です。2026年3月ロールアウト開始。日本語対応・キーバインド変更・自動有効化の設定まで公式ドキュメントをもとに解説します。"
coverImage: "/mohammad-rahmani-8qEB0fTe9Vw-unsplash.jpg"
verified: true
sources:
  - "https://code.claude.com/docs/en/voice-dictation"
  - "https://support.claude.com/en/articles/11101966-using-voice-mode"
  - "https://zenn.dev/jboydev/articles/1c89e04d403b2c"
  - "https://zenn.dev/aki1990/articles/6e3008c2a1c180"
  - "https://techcrunch.com/2026/03/03/claude-code-rolls-out-a-voice-mode-capability/"
---

# Claude Code 機能解説 #6：Voice Mode（音声入力）

> この記事は「Claude Code 機能を1つずつ深掘りするシリーズ」の第6回です。
> 第1回：[Plan Mode](/posts/claude-code-plan-mode-guide) ／ 第2回：[CLAUDE.md と Memory](/posts/claude-code-claude-md-memory-guide) ／ 第3回：[MCP](/posts/claude-code-mcp-integration-guide) ／ 第4回：[Hooks](/posts/claude-code-hooks-automation-guide) ／ 第5回：[Sub-agents と Agent Teams](/posts/claude-code-subagents-agent-teams-guide)

---

## Voice Mode とは

**Voice Mode（音声入力）** は、Claude Code のプロンプトをキーボード入力の代わりに**音声で入力できる機能**です。

2026年3月3日、Anthropic エンジニアの Thariq Shihipar 氏が X（旧Twitter）で公式発表し、段階的なロールアウトが始まりました。発表から数時間で70万回以上閲覧されるほど開発者コミュニティから注目を集めた機能です（TechCrunch 報道より）。

### 基本的な使い方

操作は**プッシュ・トゥ・トーク**方式です。トランシーバーと同じ操作感で、難しい設定は不要です。

1. `/voice` と入力して有効化
2. **スペースキーを押し続けながら**話す
3. キーを離すと音声が確定してプロンプトに挿入される
4. そのまま Enter で送信

音声はリアルタイムに文字起こしされ、カーソル位置に挿入されます。音声入力と手入力を同じメッセージ内で**自由に組み合わせられる**のが特徴です。

```
> auth ミドルウェアを▮
  # スペースキーを押しながら「新しいトークン検証ヘルパーを使うよう修正して」と話す
> auth ミドルウェアを新しいトークン検証ヘルパーを使うよう修正して▮
```

---

## 利用条件

| 条件 | 内容 |
|---|---|
| Claude Code バージョン | **v2.1.69 以上**（`claude --version` で確認） |
| 認証方法 | **Claude.ai アカウント必須**（APIキー・Bedrock・Vertex AI では不可） |
| 対応プラン | Pro / Max / Team / Enterprise（無料プランは対象外） |
| 動作環境 | ローカル環境のみ（SSH・Claude Code on the Web では不可） |

### OS 別の音声録音

| OS | 録音モジュール |
|---|---|
| macOS | 組み込みのネイティブモジュール |
| Linux | ネイティブモジュール → `arecord`（ALSA）→ `rec`（SoX）の順でフォールバック |
| Windows | 組み込みのネイティブモジュール（WSL2 は WSLg が必要） |

Linux で「No audio recording tool found」と表示された場合は、エラーメッセージに表示されるコマンド（例：`sudo apt-get install sox`）でインストールしてください。

---

## 有効化の手順

### 1. /voice コマンドで切り替え

Claude Code のプロンプト画面で `/voice` と入力します。

```
/voice
Voice mode enabled. Hold Space to record. Dictation language: en (/config to change).
```

再度 `/voice` を実行するとオフになります。

**初回有効化時**は Claude Code がマイクチェックを実行します。macOS ではシステムの「マイクへのアクセス許可」ダイアログが表示されます。許可してください。

### 2. settings.json でセッション開始時から自動有効化

毎回 `/voice` を入力するのが面倒な場合は、`~/.claude/settings.json` に追記します。

```json
{
  "voiceEnabled": true
}
```

> **注意**：2026年3月時点で、`voiceEnabled: true` を設定しても起動直後にスペースキーで録音が始まらないバグが報告されています。回避策として `/voice` を2回実行（オフ→オン）してください（GitHub Issue #34464 より）。

---

## 日本語音声入力の設定

デフォルトでは英語認識になっています。日本語で話しても正しく認識されない場合は、言語設定を変更してください。

### /config から変更（推奨）

1. `/config` を入力
2. 「Language」にカーソルを合わせて Enter
3. `Japanese` または `ja` を選択

### settings.json から変更

```json
{
  "language": "japanese"
}
```

BCP 47 コード（`ja`）でも、言語名（`japanese`）でも指定できます。

### 対応言語一覧

公式ドキュメントに記載されている対応言語（2026年3月時点）：

| 言語 | コード |
|---|---|
| 日本語 | `ja` |
| 英語 | `en` |
| 韓国語 | `ko` |
| 中国語（簡体字） | （非対応） |
| フランス語 | `fr` |
| ドイツ語 | `de` |
| スペイン語 | `es` |
| ポルトガル語 | `pt` |
| ロシア語 | `ru` |
| ヒンディー語 | `hi` |

設定した言語がサポートリストにない場合、`/voice` 有効化時に警告が表示され、音声認識は英語にフォールバックします（Claude のテキスト応答言語は影響を受けません）。

---

## プッシュ・トゥ・トークの仕組み

スペースキーを長押しすると、Claude Code はターミナルから**キーリピートイベント**を検知して録音を開始します。

```
[スペースキー長押し開始]
  → フッターに「keep holding…」表示（ウォームアップ中）
  → ウォームアップが終わると録音開始（波形表示）
  → 音声がリアルタイムに文字起こしされる（薄いテキストで表示）
[スペースキー離す]
  → 文字起こし確定、カーソル位置に挿入
```

> **ポイント**：ウォームアップ中に入力された数文字のスペースは、録音開始時に自動削除されます。単純なスペース1回タップでは録音が始まらないため、通常の文章入力を邪魔しません。

---

## プッシュ・トゥ・トークキーのカスタマイズ

デフォルトのスペースキーは「ウォームアップ時間」があります。**修飾キーとの組み合わせ**（`meta+k` など）に変更すると、**最初のキー押下からすぐ録音が始まります**。

`~/.claude/keybindings.json` に記述します（v2.1.71 以降）。

```json
{
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "meta+k": "voice:pushToTalk",
        "space": null
      }
    }
  ]
}
```

| 設定 | 意味 |
|---|---|
| `"meta+k": "voice:pushToTalk"` | `meta`（macOS では `Option`）+`k` でプッシュ・トゥ・トーク |
| `"space": null` | スペースキーのデフォルト割り当てを解除 |

`"space": null` を省略すると、スペースキーと新しいキーの両方が使えます。

> **注意**：`"v"` など単純なアルファベットキーへの割り当ては、ウォームアップ中にプロンプトに文字が入力されるため非推奨です。

---

## 音声認識の精度について

Voice Mode の音声認識はコーディング語彙に最適化されています。

- `regex`、`OAuth`、`JSON`、`localhost` などの開発用語を正確に認識
- 現在のプロジェクト名・git ブランチ名が**認識ヒントとして自動追加**される

複雑なファイルパスや変数名など、精度が必要な部分はキー入力で補完するハイブリッド運用が現実的です。

---

## トラブルシューティング

| 症状 | 原因と対処法 |
|---|---|
| 「Voice mode requires a Claude.ai account」 | APIキー認証で動作中。`/login` でClaude.aiアカウントでサインイン |
| 「Microphone access is denied」 | ターミナルのマイク権限を許可（macOS: システム設定 → プライバシーとセキュリティ → マイク） |
| 「No audio recording tool found」（Linux） | `sudo apt-get install sox` などでインストール |
| スペースキーを押すとスペースが入力され続ける | Voice Mode がオフ。`/voice` で有効化 |
| 1〜2文字のスペース後に何も起きない | キーリピートが無効。OS設定でキーリピートを有効にする |
| 文字起こしが崩れる・英語認識になる | 言語設定が未設定。`/config` で Japanese に変更 |
| No speech detected | 日本語に設定されていない場合に発生しやすい。`/config` で言語変更 |

---

## 活用のコツ

### タイピングと音声の使い分け

| 向いている操作 | 方法 |
|---|---|
| 複雑な要件の説明・コンテキスト共有 | **音声入力**（長い文を素早く入力） |
| ファイルパス・変数名・コードスニペット | **キーボード入力**（精度が必要） |
| 同じメッセージに両方含む場合 | **混在可能**（カーソル位置を移動して録音） |

### 完全ハンズフリーを目指す場合

Talon Voice などの音声制御ツールと組み合わせることで、`Ctrl+C` による中断やタブ切り替えを含む**完全ハンズフリー開発環境**の構築も技術的には可能です。

---

## まとめ

| 操作 | コマンド・設定 |
|---|---|
| 有効化/無効化 | `/voice` |
| 自動有効化 | `settings.json` に `"voiceEnabled": true` |
| 日本語設定 | `/config` → Language → Japanese |
| キーバインド変更 | `~/.claude/keybindings.json` で `voice:pushToTalk` を変更 |
| バージョン確認 | `claude --version`（v2.1.69 以上必要） |

Voice Mode は「Claude が音声で応答する」機能ではなく、あくまで**プロンプトの入力を音声で行う**機能です。Claude の返答は引き続きテキストです。音声でコーディング指示を出して、長いプロンプト入力の手間を削減する用途に最適です。

---

## 出典

- [Voice dictation（公式ドキュメント）](https://code.claude.com/docs/en/voice-dictation)
- [Using voice mode（Claude ヘルプセンター）](https://support.claude.com/en/articles/11101966-using-voice-mode)
- [Claude Code `/voice` コマンドについて（Zenn）](https://zenn.dev/jboydev/articles/1c89e04d403b2c)
- [Claude Code の /voice って何？（Zenn）](https://zenn.dev/aki1990/articles/6e3008c2a1c180)
- [Claude Code rolls out a voice mode capability（TechCrunch）](https://techcrunch.com/2026/03/03/claude-code-rolls-out-a-voice-mode-capability/)
