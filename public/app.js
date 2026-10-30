/**
 * ZMRA Furigana Reading Companion - Core Runtime
 * Local-First Japanese Kanji to Furigana (振仮名) Ruby Converter.
 * © 2026 ZMRA (https://zmra.com)
 */

// --- 1. Japanese Morphological & Lexical Database ---
const JA_WORDS = {
  // Common Nouns & Pronouns
  '私': 'わたし', '私たち': 'わたしたち', '僕': 'ぼく', '俺': 'おれ', '彼': 'かれ', '彼女': 'かのじょ',
  '日': 'ひ', '本': 'ほん', '語': 'ご', '日本語': 'にほんご', '英語': 'えいご', '中国語': 'ちゅうごくご',
  '学生': 'がくせい', '先生': 'せんせい', '学校': 'がっこう', '大学': 'だいがく', '教室': 'きょうしつ',
  '友達': 'ともだち', '家族': 'かぞく', '両親': 'りょうしん', '父': 'ちち', '母': 'はは', '子供': 'こども',
  '会社': 'かいしゃ', '仕事': 'しごと', '病院': 'びょういん', '医者': 'いしゃ', '警察': 'けいさつ',
  '今日': 'きょう', '昨日': 'きのう', '明日': 'あした', '毎日': 'まいにち', '今年': 'ことし', '去年': 'きょねん',
  '今': 'いま', '時間': 'じかん', '時計': 'とけい', '朝': 'あさ', '昼': 'ひる', '夜': 'よる', '晩': 'ばん',
  '春': 'はる', '夏': 'なつ', '秋': 'あき', '冬': 'ふゆ', '天気': 'てんき', '雨': 'あめ', '雪': 'ゆき',
  '桜': 'さくら', '花': 'はな', '猫': 'ねこ', '犬': 'いぬ', '鳥': 'とり', '魚': 'さかな',
  '本': 'ほん', '辞書': 'じしょ', '雑誌': 'ざっし', '新聞': 'しんぶん', '手紙': 'てがみ', '写真': 'しゃしん',
  '机': 'つくえ', '椅子': 'いす', '部屋': 'へや', '電話': 'でんわ', '携帯': 'けいたい', '電車': 'でんしゃ',
  '車': 'くるま', '自転車': 'じてんしゃ', '駅': 'えき', '飛行機': 'ひこうき', '旅行': 'りょこう',
  '映画': 'えいが', '音楽': 'おんがく', '料理': 'りょうり', '水': 'みず', 'お茶': 'おちゃ', '肉': 'にく',
  '野菜': 'やさい', '果物': 'くだもの', '質問': 'しつもん', '問題': 'もんだい', '宿題': 'しゅくだい',
  '試験': 'しけん', '勉強': 'べんきょう', '練習': 'れんしゅう', '研究': 'けんきゅう',
  '東京': 'とうきょう', '京都': 'きょうと', '大阪': 'おおさか',
  '科学': 'かがく', '科学館': 'かがくかん', '博物館': 'はくぶつかん', '図書館': 'としょかん',
  '空間': 'くうかん', '展示': 'てんじ', '全息': 'ぜんそく', '解構': 'かいこう', '模型': 'もけい',
  '振仮名': 'ふりがな', '振假名': 'ふりがな', '助読': 'じょどく', '伴侶': 'はんりょ', '発音': 'はつおん'
};

// Kanji Stem with Okurigana Patterns
const JA_STEM_VERBS = [
  { stem: '食', reading: 'た', suffix: ['べる', 'べます', 'べた', 'べて', 'べない', 'べれば'] },
  { stem: '飲', reading: 'の', suffix: ['む', 'みます', 'んだ', 'んで', 'まない', 'めば'] },
  { stem: '読', reading: 'よ', suffix: ['む', 'みます', 'んだ', 'んで', 'まない', 'めば'] },
  { stem: '書', reading: 'か', suffix: ['く', 'きます', 'いた', 'いて', 'かない', 'けば'] },
  { stem: '行', reading: 'い', suffix: ['く', 'きます', 'った', 'って', 'かない', 'けば'] },
  { stem: '来', reading: 'く', suffix: ['る', 'ます', 'た', 'て', 'ない', 'れば'] },
  { stem: '話', reading: 'はな', suffix: ['す', 'します', 'した', 'して', 'さない', 'せば'] },
  { stem: '見', reading: 'み', suffix: ['る', 'ます', 'た', 'て', 'ない', 'れば'] },
  { stem: '聞', reading: 'き', suffix: ['く', 'きます', 'いた', 'いて', 'かない', 'けば'] },
  { stem: '走', reading: 'はし', suffix: ['る', 'ります', 'った', 'って', 'らない', 'れば'] },
  { stem: '泳', reading: 'およ', suffix: ['ぐ', 'ぎます', 'いだ', 'いで', 'がない', 'げば'] },
  { stem: '買', reading: 'か', suffix: ['う', 'います', 'った', 'って', 'わない', 'えば'] },
  { stem: '作', reading: 'つく', suffix: ['る', 'ります', 'った', 'って', 'らない', 'れば'] },
  { stem: '使', reading: 'つか', suffix: ['う', 'います', 'った', 'って', 'わない', 'えば'] },
  { stem: '待', reading: 'ま', suffix: ['つ', 'ちます', 'った', 'って', 'たない', 'てば'] },
  { stem: '美', reading: 'うつく', suffix: ['しい', 'しく', 'しかった', 'しくない'] },
  { stem: '面白', reading: 'おもしろ', suffix: ['い', 'く', 'かった', 'くない'] },
  { stem: '楽', reading: 'たの', suffix: ['しい', 'しく', 'しかった', 'しくない'] },
  { stem: '新', reading: 'あたら', suffix: ['しい', 'しく', 'しかった', 'しくない'] },
  { stem: '古', reading: 'ふる', suffix: ['い', 'く', 'かった', 'くない'] },
  { stem: '高', reading: 'たか', suffix: ['い', 'く', 'かった', 'くない'] },
  { stem: '安', reading: 'やす', suffix: ['い', 'く', 'かった', 'くない'] },
  { stem: '早', reading: 'はや', suffix: ['い', 'く', 'かった', 'くない'] },
  { stem: '遅', reading: 'おそ', suffix: ['い', 'く', 'かった', 'くない'] },
  { stem: '大', reading: 'おお', suffix: ['きい', 'きく', 'きかった'] },
  { stem: '小', reading: 'ちい', suffix: ['さい', 'さく', 'さかった'] }
];

// Single Kanji fallback
const JA_SINGLE_KANJI = {
  '人': 'ひと', '男': 'おとこ', '女': 'おんな', '子': 'こ', '目': 'め', '手': 'て', '足': 'あし',
  '口': 'くち', '耳': 'みみ', '心': 'こころ', '力': 'ちから', '山': 'やま', '川': 'かわ', '海': 'うみ',
  '空': 'そら', '木': 'き', '森': 'もり', '林': 'はやし', '田': 'た', '道': 'みち', '町': 'まち',
  '村': 'むら', '国': 'くに', '家': 'いえ', '門': 'もん', '店': 'みせ', '車': 'くるま', '船': 'ふね',
  '天': 'てん', '気': 'き', '雨': 'あめ', '風': 'かぜ', '音': 'おと', '光': 'ひかり', '色': 'いろ',
  '白': 'しろ', '黒': 'くろ', '赤': 'あか', '青': 'あお', '一': 'いち', '二': 'に', '三': 'さん',
  '四': 'よん', '五': 'ご', '六': 'ろく', '七': 'なな', '八': 'はち', '九': 'きゅう', '十': 'じゅう',
  '百': 'ひゃく', '千': 'せん', '万': 'まん', '円': 'えん', '年': 'ねん', '月': 'つき', '日': 'ひ'
};

// Hiragana to Romaji Table
const HIRA_TO_ROMAJI = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo'
};

function hiraganaToRomaji(kana) {
  let romaji = '';
  let i = 0;
  while (i < kana.length) {
    const two = kana.slice(i, i + 2);
    if (HIRA_TO_ROMAJI[two]) {
      romaji += HIRA_TO_ROMAJI[two];
      i += 2;
      continue;
    }
    const one = kana[i];
    if (one === 'っ') {
      const next = kana[i + 1];
      const nextRomaji = HIRA_TO_ROMAJI[next] || '';
      if (nextRomaji) romaji += nextRomaji[0];
      i++;
      continue;
    }
    romaji += HIRA_TO_ROMAJI[one] || one;
    i++;
  }
  return romaji;
}

// --- 2. Chinese Pinyin Lexical Database ---
const ZH_PINYIN_MAP = {
  // Frequently used characters with Pinyin and Tone
  '你': { py: 'nǐ', tone: 3 }, '好': { py: 'hǎo', tone: 3 }, '我': { py: 'wǒ', tone: 3 }, '们': { py: 'men', tone: 0 },
  '是': { py: 'shì', tone: 4 }, '的': { py: 'de', tone: 0 }, '在': { py: 'zài', tone: 4 }, '有': { py: 'yǒu', tone: 3 },
  '和': { py: 'hé', tone: 2 }, '人': { py: 'rén', tone: 2 }, '这': { py: 'zhè', tone: 4 }, '中': { py: 'zhōng', tone: 1 },
  '大': { py: 'dà', tone: 4 }, '为': { py: 'wèi', tone: 4 }, '上': { py: 'shàng', tone: 4 }, '个': { py: 'gè', tone: 4 },
  '国': { py: 'guó', tone: 2 }, '道': { py: 'dào', tone: 4 }, '地': { py: 'dì', tone: 4 }, '一': { py: 'yī', tone: 1 },
  '空': { py: 'kōng', tone: 1 }, '间': { py: 'jiān', tone: 1 }, '科': { py: 'kē', tone: 1 }, '学': { py: 'xué', tone: 2 },
  '馆': { py: 'guǎn', tone: 3 }, '智': { py: 'zhì', tone: 4 }, '能': { py: 'néng', tone: 2 }, '架': { py: 'jià', tone: 4 },
  '构': { py: 'gòu', tone: 4 }, '语': { py: 'yǔ', tone: 3 }, '言': { py: 'yán', tone: 2 }, '学': { py: 'xué', tone: 2 },
  '习': { py: 'xí', tone: 2 }, '矩': { py: 'jǔ', tone: 3 }, '阵': { py: 'zhèn', tone: 4 }, '软': { py: 'ruǎn', tone: 3 },
  '件': { py: 'jiàn', tone: 4 }, '播': { py: 'bō', tone: 1 }, '室': { py: 'shì', tone: 4 }, '演': { py: 'yǎn', tone: 3 },
  '全': { py: 'quán', tone: 2 }, '息': { py: 'xī', tone: 1 }, '解': { py: 'jiě', tone: 3 }, '构': { py: 'gòu', tone: 4 },
  '主': { py: 'zhǔ', tone: 3 }, '站': { py: 'zhàn', tone: 4 }, '品': { py: 'pǐn', tone: 3 }, '牌': { py: 'pái', tone: 2 },
  '微': { py: 'wēi', tone: 1 }, '内': { py: 'nèi', tone: 4 }, '核': { py: 'hé', tone: 2 }, '生': { py: 'shēng', tone: 1 },
  '态': { py: 'tài', tone: 4 }, '跨': { py: 'kuà', tone: 4 }, '平': { py: 'píng', tone: 2 }, '台': { py: 'tái', tone: 2 },
  '高': { py: 'gāo', tone: 1 }, '效': { py: 'xiào', tone: 4 }, '伴': { py: 'bàn', tone: 4 }, '侣': { py: 'lǚ', tone: 3 },
  '助': { py: 'zhù', tone: 4 }, '读': { py: 'dú', tone: 2 }, '注': { py: 'zhù', tone: 4 }, '音': { py: 'yīn', tone: 1 },
  '日': { py: 'rì', tone: 4 }, '本': { py: 'běn', tone: 3 }, '英': { py: 'yīng', tone: 1 }, '文': { py: 'wén', tone: 2 },
  '汉': { py: 'hàn', tone: 4 }, '字': { py: 'zì', tone: 4 }, '词': { py: 'cí', tone: 2 }, '典': { py: 'diǎn', tone: 3 },
  '发': { py: 'fā', tone: 1 }, '音': { py: 'yīn', tone: 1 }, '标': { py: 'biāo', tone: 1 }, '准': { py: 'zhǔn', tone: 3 },
  '边': { py: 'biān', tone: 1 }, '缘': { py: 'yuán', tone: 2 }, '计': { py: 'jì', tone: 4 }, '算': { py: 'suàn', tone: 4 }
};

// --- 3. English Phonetic & IPA Database ---
const EN_IPA_DICT = {
  'language': 'ˈlæŋɡwɪdʒ',
  'companion': 'kəmˈpænjən',
  'spatial': 'ˈspeɪʃl',
  'matrix': 'ˈmeɪtrɪks',
  'architecture': 'ˈɑːrkɪtektʃər',
  'player': 'ˈpleɪər',
  'museum': 'mjuˈziːəm',
  'interactive': 'ˌɪntərˈæktɪv',
  'science': 'ˈsaɪəns',
  'suite': 'swiːt',
  'runner': 'ˈrʌnər',
  'intelligence': 'ɪnˈtelɪdʒəns',
  'offline': 'ˌɔːfˈlaɪn',
  'official': 'əˈfɪʃl',
  'hardware': 'ˈhɑːrdwer',
  'learning': 'ˈlɜːrnɪŋ',
  'reading': 'ˈriːdɪŋ',
  'assistant': 'əˈsɪstənt',
  'knowledge': 'ˈnɑːlɪdʒ',
  'model': 'ˈmɑːdl',
  'factory': 'ˈfæktri',
  'explore': 'ɪkˈsplɔːr'
};

const SAMPLES = {
  ja: '私たちは空間科学館で日本語と振仮名の勉強をします。美味しい料理を食べて、面白い映画を見に行きましょう。',
  zh: '欢迎使用多语言助读伴侣，全息演播室与空间微科学馆带给您身临其境的交互式体验。',
  en: 'ZMRA creates high-precision spatial software and offline cognitive tools with craftsmanship.'
};

// --- State Management ---
let isHoverMode = false;
let isRomajiMode = false;
let lastRubyHtml = '';

// --- DOM References ---
const langSelect = document.getElementById('lang-select');
const inputText = document.getElementById('input-text');
const charCount = document.getElementById('char-count');
const outputPreview = document.getElementById('output-preview');
const statusHint = document.getElementById('status-hint');
const btnConvert = document.getElementById('btn-convert');
const btnSample = document.getElementById('btn-sample');
const btnClear = document.getElementById('btn-clear');
const btnSpeak = document.getElementById('btn-speak');
const btnCopyHtml = document.getElementById('btn-copy-html');
const btnCopyText = document.getElementById('btn-copy-text');
const btnCopyAnki = document.getElementById('btn-copy-anki');
const btnToggleHover = document.getElementById('btn-toggle-hover');
const btnToggleSub = document.getElementById('btn-toggle-sub');

// --- Conversion Engine Implementation ---

function annotateJapaneseWord(word) {
  // 1. Direct word match
  if (JA_WORDS[word]) {
    const reading = isRomajiMode ? hiraganaToRomaji(JA_WORDS[word]) : JA_WORDS[word];
    return `<ruby><rb>${word}</rb><rt>${reading}</rt></ruby>`;
  }

  // 2. Verb / Adjective Stem + Okurigana match
  for (const item of JA_STEM_VERBS) {
    if (word.startsWith(item.stem)) {
      const rest = word.slice(item.stem.length);
      if (item.suffix.includes(rest)) {
        const reading = isRomajiMode ? hiraganaToRomaji(item.reading) : item.reading;
        return `<ruby><rb>${item.stem}</rb><rt>${reading}</rt></ruby>${rest}`;
      }
    }
  }

  // 3. Fallback character-by-character for compound/single Kanji
  let result = '';
  for (const char of word) {
    if (JA_WORDS[char]) {
      const r = isRomajiMode ? hiraganaToRomaji(JA_WORDS[char]) : JA_WORDS[char];
      result += `<ruby><rb>${char}</rb><rt>${r}</rt></ruby>`;
    } else if (JA_SINGLE_KANJI[char]) {
      const r = isRomajiMode ? hiraganaToRomaji(JA_SINGLE_KANJI[char]) : JA_SINGLE_KANJI[char];
      result += `<ruby><rb>${char}</rb><rt>${r}</rt></ruby>`;
    } else {
      result += char;
    }
  }
  return result;
}

function processJapanese(text) {
  // If Intl.Segmenter is available (Modern Chrome/Firefox/Electron)
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('ja-JP', { granularity: 'word' });
    let output = '';
    for (const { segment } of segmenter.segment(text)) {
      output += annotateJapaneseWord(segment);
    }
    return output;
  }

  // Fallback scanner
  let output = '';
  let i = 0;
  while (i < text.length) {
    const three = text.slice(i, i + 3);
    if (JA_WORDS[three]) {
      const r = isRomajiMode ? hiraganaToRomaji(JA_WORDS[three]) : JA_WORDS[three];
      output += `<ruby><rb>${three}</rb><rt>${r}</rt></ruby>`;
      i += 3;
      continue;
    }
    const two = text.slice(i, i + 2);
    if (JA_WORDS[two]) {
      const r = isRomajiMode ? hiraganaToRomaji(JA_WORDS[two]) : JA_WORDS[two];
      output += `<ruby><rb>${two}</rb><rt>${r}</rt></ruby>`;
      i += 2;
      continue;
    }
    const one = text[i];
    output += annotateJapaneseWord(one);
    i++;
  }
  return output;
}

function processChinese(text) {
  let output = '';
  for (const char of text) {
    const entry = ZH_PINYIN_MAP[char];
    if (entry) {
      const toneClass = `tone-${entry.tone}`;
      output += `<ruby><rb>${char}</rb><rt class="${toneClass}">${entry.py}</rt></ruby>`;
    } else {
      output += char;
    }
  }
  return output;
}

function processEnglish(text) {
  return text.replace(/\b([a-zA-Z]+)\b/g, (match) => {
    const lower = match.toLowerCase();
    const ipa = EN_IPA_DICT[lower];
    if (ipa) {
      return `<ruby><rb>${match}</rb><rt>/${ipa}/</rt></ruby>`;
    }
    return match;
  });
}

function convert() {
  const text = inputText.value.trim();
  if (!text) {
    outputPreview.innerHTML = '<p class="placeholder-text">请输入文本后点击生成...</p>';
    lastRubyHtml = '';
    return;
  }

  const lang = langSelect.value;
  let rubyHtml = '';

  if (lang === 'ja') {
    rubyHtml = processJapanese(text);
  } else if (lang === 'zh') {
    rubyHtml = processChinese(text);
  } else {
    rubyHtml = processEnglish(text);
  }

  lastRubyHtml = rubyHtml;
  outputPreview.innerHTML = rubyHtml;
  showToast('注音生成完毕！');
}

// --- Clipboard & Export Tools ---

async function copyToClipboard(content, message) {
  if (!content) {
    showToast('无可用内容复制', true);
    return;
  }
  try {
    await navigator.clipboard.writeText(content);
    showToast(message || '已成功复制到剪贴板！');
  } catch (err) {
    const area = document.createElement('textarea');
    area.value = content;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    showToast(message || '已成功复制到剪贴板！');
  }
}

function showToast(msg, isError = false) {
  statusHint.textContent = msg;
  statusHint.style.color = isError ? '#ef4444' : '#10b981';
  setTimeout(() => {
    statusHint.textContent = '支持标准 HTML5 <ruby> <rt> 语法';
    statusHint.style.color = '';
  }, 3000);
}

// --- Text To Speech (TTS) ---

function speak() {
  const text = inputText.value.trim();
  if (!text) return;
  if (!('speechSynthesis' in window)) {
    showToast('当前环境不支持语音合成', true);
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const lang = langSelect.value;
  if (lang === 'ja') utterance.lang = 'ja-JP';
  else if (lang === 'zh') utterance.lang = 'zh-CN';
  else utterance.lang = 'en-US';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
  showToast('正在朗读...');
}

// --- Event Handlers ---

btnToggleHover.addEventListener('click', () => {
  isHoverMode = !isHoverMode;
  if (isHoverMode) {
    outputPreview.classList.add('hover-mode');
    btnToggleHover.textContent = '👁️ 悬停显音: 开';
    btnToggleHover.style.background = 'rgba(99, 102, 241, 0.35)';
  } else {
    outputPreview.classList.remove('hover-mode');
    btnToggleHover.textContent = '👁️ 悬停显音: 关';
    btnToggleHover.style.background = '';
  }
});

btnToggleSub.addEventListener('click', () => {
  isRomajiMode = !isRomajiMode;
  btnToggleSub.textContent = isRomajiMode ? '🔤 罗马音: 开' : '🔤 罗马音: 关';
  btnToggleSub.style.background = isRomajiMode ? 'rgba(99, 102, 241, 0.35)' : '';
  if (inputText.value.trim()) convert();
});

inputText.addEventListener('input', () => {
  charCount.textContent = `${inputText.value.length} 字符`;
});

btnConvert.addEventListener('click', convert);

btnSample.addEventListener('click', () => {
  const lang = langSelect.value;
  inputText.value = SAMPLES[lang] || SAMPLES.ja;
  charCount.textContent = `${inputText.value.length} 字符`;
  convert();
});

btnClear.addEventListener('click', () => {
  inputText.value = '';
  charCount.textContent = '0 字符';
  outputPreview.innerHTML = '<p class="placeholder-text">注音结果将在此渲染展示...</p>';
  lastRubyHtml = '';
});

langSelect.addEventListener('change', () => {
  btnToggleSub.style.display = langSelect.value === 'ja' ? 'inline-block' : 'none';
  if (inputText.value.trim()) convert();
});

btnSpeak.addEventListener('click', speak);

btnCopyHtml.addEventListener('click', () => {
  if (!lastRubyHtml) convert();
  copyToClipboard(lastRubyHtml, '已复制 HTML <ruby> 代码！');
});

btnCopyText.addEventListener('click', () => {
  const plainText = outputPreview.innerText;
  copyToClipboard(plainText, '已复制纯文本！');
});

btnCopyAnki.addEventListener('click', () => {
  const source = inputText.value.trim();
  if (!source) return;
  if (!lastRubyHtml) convert();
  const ankiLine = `${source}\t${lastRubyHtml}`;
  copyToClipboard(ankiLine, '已导出 Anki 卡片格式 (Front\\tBack)！');
});

// Auto-run sample on first load
if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', () => {
    if (btnSample) btnSample.click();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    processJapanese,
    processChinese,
    processEnglish,
    hiraganaToRomaji,
    annotateJapaneseWord
  };
}
