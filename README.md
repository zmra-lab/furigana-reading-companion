# ZMRA Furigana Companion (振仮名ルビ助読伴侶)

<p align="center">
  <a href="#-english">English</a> | <a href="#-中文说明">简体中文</a> | <a href="#-日本語">日本語</a> | <a href="https://zmra.com">Official Portal 官网</a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" /></a>
  <a href="extension/"><img src="https://img.shields.io/badge/WebExtension-Manifest%20V3-indigo.svg" alt="Manifest V3" /></a>
  <a href="https://zmra.com"><img src="https://img.shields.io/badge/Crafted%20by-ZMRA-white.svg" alt="Brand" /></a>
</p>

---

## 🌐 English

A high-performance, privacy-first Japanese reading assistant and browser extension. Automatically converts Japanese Kanji into standard HTML `<ruby>` tags with Furigana (振仮名) readings, okurigana stem matching, and Romaji toggling.

Crafted by the **[ZMRA Lab Team](https://zmra.com)**.

### 🌟 Key Features
* **High-Precision Japanese Morphological Tokenization**:
  * Accurate Kanji $\to$ Hiragana / Katakana Furigana (振仮名) generation.
  * Okurigana separation and verbal/adjectival stem matching.
  * Dynamic toggle between Hiragana and Romaji (ローマ字) phonetics.
* **Active Recall Study Controls**:
  * **👁️ Hover-to-Reveal**: Hides Furigana by default, revealing readings only when hovering over Kanji for testing memory recall.
  * **🔊 Native Web Speech Synthesis (TTS)**: Built-in natural Japanese speech pronunciation.
* **One-Click Multi-Format Export**:
  * Standard HTML5 `<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>` code.
  * Markdown Furigana format for note-taking applications.
  * Flashcard TSV format ready for spaced-repetition study tools.
* **Local-First & Air-Gapped Ready**:
  * All tokenization executes directly inside your browser. No text data is ever transmitted over the network.
* **Dual Deliverables**:
  * **Interactive Web App**: Standalone single-page web app using local CJK system font stacks.
  * **Browser Extension (Manifest V3)**: Installable in Chrome, Edge, and Chromium browsers for in-page reading assistance.

### 🚀 Quick Start
```bash
# Web Application
git clone https://github.com/zmra-lab/furigana-reading-companion.git
cd furigana-reading-companion
npx serve -l 3000 .
```

---

## 🇨🇳 中文说明

高性能、注重隐私保护的日语汉字振假名（Furigana）助读平台与浏览器插件。自动将日语汉字转换为标准 HTML `<ruby>` 注音标签，支持送假名词干分离、罗马字切换与主动回忆测验。

由 **[ZMRA Lab Team](https://zmra.com)** 研发打造。

### 🌟 核心特性
* **高精度日语形态分词与注音**:
  * 汉字精准对应平假名 / 片假名振假名 (Furigana)。
  * 智能分离送假名（Okurigana）与动词/形容词词干。
  * 支持平假名与罗马字（Romaji）注音一键切换。
* **主动记忆学习模式**:
  * **👁️ 悬停显音 (Hover-to-Reveal)**: 默认隐藏注音，鼠标悬停汉字时才呈现假名，强化主动记忆。
  * **🔊 原生 Web 语音朗读 (TTS)**: 无需云端 API，调用系统内置纯正日语真人语音发音。
* **一键多格式导出**:
  * 标准 HTML5 `<ruby>` 网页代码。
  * Markdown 格式注音文本。
  * Anki 记忆卡片 TSV 格式。
* **本地优先运行与隐私保护设计**:
  * 所有文本处理均在用户本地浏览器完成，绝不上传任何学习文本或个人浏览数据。
* **双形态成果交付**:
  * **交互式 Web 应用**: 即开即用的单页离线工具。
  * **Chrome 扩展插件 (Manifest V3)**: 支持在 Chrome、Edge 等现代浏览器中划词及全文阅读标注。

### 🚀 快速启动
```bash
git clone https://github.com/zmra-lab/furigana-reading-companion.git
cd furigana-reading-companion
npx serve -l 3000 .
```

---

## 🇯🇵 日本語

高いプライバシー保護性能を備えた・高性能な日本語漢字ふりがな（ルビ）助読ツールおよびブラウザ拡張機能（Manifest V3）。入力された日本語テキストを、標準HTML5の `<ruby>` タグ形式で正確にふりがな変換し、送り仮名分離やローマ字表示切替に対応します。

開発: **[ZMRA Lab Team](https://zmra.com)**

### 🌟 主な機能
* **高精度な日本語形態素解析・ルビ生成**:
  * 漢字から平仮名／片仮名ふりがなへの正確なマッピング。
  * 動詞・形容詞の活用語尾（送り仮名）の自動分離。
  * ひらがな表記とローマ字表記のワンクリック切り替え。
* **アクティブリコール（想起記憶）学習モード**:
  * **👁️ ホバー表示モード**: 通常時はふりがなを非表示にし、漢字にマウスを重ねた時のみルビを表示して記憶定着を促進。
  * **🔊 ブラウザ標準音声合成 (TTS)**: 外部ネットワーク通信なしで、ネイティブな日本語音声読み上げを実行。
* **多彩なワンクリック出力形式**:
  * 標準HTML5 `<ruby><rb>漢字</rb><rt>かんじ</rt></ruby>` コード。
  * ノートアプリ向けMarkdownルビ記法。
  * 暗記カードアプリ（Anki）連携用 TSV 形式。
* **ローカルファースト設計・外部送信ゼロ**:
  * すべての処理はお手元のブラウザ内で完結。閲覧中のテキストや入力データが外部サーバへ送信されることは一切ありません。
* **2つの利用形態**:
  * **スタンドアロンWebアプリケーション**: CJKシステムフォント対応の高速Webツール。
  * **ブラウザ拡張機能 (Manifest V3)**: Chrome / Edge 等でWebサイト上の記事を直接ルビ付きで閲覧可能。

### 🚀 クイックスタート
```bash
git clone https://github.com/zmra-lab/furigana-reading-companion.git
cd furigana-reading-companion
npx serve -l 3000 .
```

---

---

## 🔬 Project Status, Evaluation Disclaimer & Feedback / 项目状态、免责声明与反馈

### 🌐 English
> ⚠️ **Evaluation Prototype Notice (Not Intended for Critical or Production Control)**:  
> This open-source repository is an experimental educational and simulation preview under active development. It is provided strictly **"AS IS"** for educational inspection, kinematics/mechanics study, and technical evaluation. It is **not certified for physical safety-critical machinery, high-voltage industrial automation, or direct production deployment**. We make no commercial promises or operational warranties. We warmly welcome community feedback, pull requests, and suggestions to help us refine and improve!  
> 📬 *Community Contact & Feedback*: [`contact@zmra.com`](mailto:contact@zmra.com)

### 🇨🇳 简体中文
> ⚠️ **评估原型免责声明（仅用于技术验证与教育交流，不建议直接用于生产工控）**:  
> 本开源项目属于处于持续迭代完善中的实验性技术演示与评估原型，按“现状（AS IS）”提供。**仅供机构原理教学、算法仿真验证与离线学习参考，未经工业安全与关键任务控制认证，不建议也不承诺直接应用于物理实体机电设备或工业生产控制**。本团队不作任何商业承诺或可用性担保。热忱欢迎广大开发者、机器人与语言学爱好者提出宝贵的改进建议与 Issue 反馈！  
> 📬 *交流与反馈渠道*: [`contact@zmra.com`](mailto:contact@zmra.com)

### 🇯🇵 日本語
> ⚠️ **評価用プロトタイプに関する免責事項（教育・研究評価用・重要制御への投入非推奨）**:  
> 本オープンソースプロジェクトは、現在も継続的な改良を行っている実験的な教育・シミュレーション用プレビューです。機構原理の学習、アルゴリズムの動作検証、概念実証を目的として現状有姿（AS IS）で公開されており、**物理的な実機機械の保安制御や産業生産現場への直接投入は推奨しておらず、一切の商用保証を行いません**。機能向上や品質改善に向けたコミュニティからのご意見・改善提案・Issue報告を心より歓迎いたします！  
> 📬 *フィードバック窓口*: [`contact@zmra.com`](mailto:contact@zmra.com)

## 📄 License
Released under the [MIT License](LICENSE).
