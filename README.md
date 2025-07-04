# SakuraEditorAutoSave

サクラエディタ用のマクロとカラーテーマ設定をまとめたリポジトリです。  
主に以下の2つの機能を提供します：

1. **日付＋連番でUTF-8保存する自動保存マクロ**
2. **ダークモード風のカラースキーム (`darkmode.col`)**

---

## 📁 構成ファイル

| ファイル名              | 説明 |
|------------------------|------|
| `saveByDate.js` | 新規ファイルを自動で日付＋連番で保存するマクロ |
| `darkmode.col`         | サクラエディタ用のダークモード風カラーテーマ |

---

## 🔧 saveByDate.js について

### 機能

- 無名ファイルを保存するとき、以下の形式で保存：
  YYYYMMDD_1.txt, YYYYMMDD_2.txt, ...

- 既存ファイルと重複しないよう、自動で番号をインクリメント
- 保存先フォルダが存在しない場合は自動作成
- UTF-8（BOM付き）＋ CRLF で保存

### 設定方法

1. `saveByDate.js` を任意の場所に保存
2. サクラエディタ → [設定] → [共通設定] → [マクロ] タブでマクロとして登録
3. 「ツールバー」や「ショートカットキー」に割り当てると便利です

---

## 🎨 darkmode.col について

### 特徴

- 背景色を黒にした、ダークテーマ風カラースキーム
- 目に優しい配色を採用
- `darkmode.col` を読み込むことで適用可能

### 適用方法

1. サクラエディタ → [設定] → [色設定] を開く  
2. 「設定の読み込み」から `darkmode.col` を読み込む  
3. OK を押して適用

---

## 💡 カスタマイズ例

### ファイル名に時間を含めたい場合

filename_template: "{{YYYY}}{{MM}}{{DD}}_{{hh}}{{mm}}{{ss}}.txt"
を使うと、秒単位のファイル名にできます。
