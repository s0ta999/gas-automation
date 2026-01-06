# gas-ai-automation
001 朝5時から6時の間に自動でニュースのタイトル、リンク、AIの要約をgmailに送る仕組み
# GAS × AI Automation

Google Apps Script を使った情報収集・要約・通知の自動化システムです。

## 機能一覧

- 📰 NewsAPI から最新ニュース取得
- 🤖 Hugging Face API によるAI要約
- 📧 Gmail 自動送信（毎朝配信）
- 📺 YouTube RSS から新着動画検知
- ⭐ 重要度判定 → 要約して通知

## 使用技術

- Google Apps Script (JavaScript)
- NewsAPI
- Hugging Face Inference API
- Gmail API
- YouTube RSS

## 代表的な自動化

- 毎朝ニュースを自動要約してメール送信
- 重要なYouTube動画のみ通知
- 深夜時間帯をスキップするトリガー制御

## セットアップ

1. NewsAPIのAPIキー取得
2. Hugging FaceのAPIキー取得
3. GASにコード貼り付け
4. トリガー設定（時間主導）

## 作成者

ZON
