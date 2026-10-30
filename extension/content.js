// ZMRA Language Companion - Content Script (Manifest V3)
// In-page live Furigana and Pinyin annotation engine

const JA_WORDS = {
  '私': 'わたし', '私たち': 'わたしたち', '僕': 'ぼく', '彼': 'かれ', '彼女': 'かのじょ',
  '日': 'ひ', '本': 'ほん', '語': 'ご', '日本語': 'にほんご', '英語': 'えいご', '中国語': 'ちゅうごくご',
  '学生': 'がくせい', '先生': 'せんせい', '学校': 'がっこう', '大学': 'だいがく', '教室': 'きょうしつ',
  '友達': 'ともだち', '家族': 'かぞく', '会社': 'かいしゃ', '仕事': 'しごと', '病院': 'びょういん',
  '今日': 'きょう', '昨日': 'きのう', '明日': 'あした', '時間': 'じかん', '天気': 'てんき',
  '雨': 'あめ', '桜': 'さくら', '花': 'はな', '猫': 'ねこ', '犬': 'いぬ', '本': 'ほん',
  '辞書': 'じしょ', '写真': 'しゃしん', '部屋': 'へや', '電車': 'でんしゃ', '車': 'くるま',
  '映画': 'えいが', '音楽': 'おんがく', '料理': 'りょうり', '質問': 'しつもん', '勉強': 'べんきょう',
  '東京': 'とうきょう', '科学': 'かがく', '科学館': 'かがくかん', '図書館': 'としょかん', '空間': 'くうかん'
};

const ZH_WORDS = {
  '空间': 'kōngjiān', '科学': 'kēxué', '智能': 'zhìnéng', '语言': 'yǔyán',
  '学习': 'xuéxí', '矩阵': 'jǔzhèn', '生态': 'shēngtài', '架构': 'jiàgòu'
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'ANNOTATE_PAGE') {
    annotateVisibleNodes();
    sendResponse({ status: 'done' });
  } else if (request.action === 'ANNOTATE_SELECTION') {
    annotateSelection(request.text);
    sendResponse({ status: 'done' });
  }
});

function annotateVisibleNodes() {
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parentTag = node.parentElement?.tagName?.toLowerCase();
        if (['script', 'style', 'textarea', 'input', 'ruby', 'rt', 'code', 'pre'].includes(parentTag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  while (treeWalker.nextNode()) {
    textNodes.push(treeWalker.currentNode);
  }

  for (const node of textNodes) {
    const text = node.nodeValue;
    let modified = text;
    let changed = false;

    // Multi-char Japanese match first
    for (const [kanji, reading] of Object.entries(JA_WORDS)) {
      if (modified.includes(kanji)) {
        changed = true;
        const ruby = `<ruby class="zmra-ruby"><rb>${kanji}</rb><rt>${reading}</rt></ruby>`;
        modified = modified.split(kanji).join(ruby);
      }
    }

    if (changed) {
      const span = document.createElement('span');
      span.innerHTML = modified;
      node.parentNode.replaceChild(span, node);
    }
  }
}

function annotateSelection(selectedText) {
  if (!selectedText) return;
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;
  const range = selection.getRangeAt(0);

  let modified = selectedText;
  for (const [kanji, reading] of Object.entries(JA_WORDS)) {
    if (modified.includes(kanji)) {
      const ruby = `<ruby class="zmra-ruby"><rb>${kanji}</rb><rt>${reading}</rt></ruby>`;
      modified = modified.split(kanji).join(ruby);
    }
  }

  const span = document.createElement('span');
  span.innerHTML = modified;
  range.deleteContents();
  range.insertNode(span);
}
