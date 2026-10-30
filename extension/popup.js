// Extension Popup Logic
const DICT = {
  '私': 'わたし', '日': 'ひ', '本': 'ほん', '語': 'ご', '日本語': 'にほんご',
  '学': 'がく', '校': 'こう', '学校': 'がっこう', '生': 'せい', '学生': 'がくせい',
  '猫': 'ねこ', '桜': 'さくら', '空': 'くう', '間': 'かん', '空間': 'くうかん',
  '科': 'か', '科学': 'かがく', '館': 'かん', '科学館': 'かがくかん',
  '走': 'はし', '食': 'た', '飲': 'の', '行': 'い', '来': 'く', '話': 'はな'
};

document.getElementById('pop-convert').addEventListener('click', () => {
  const text = document.getElementById('pop-input').value.trim();
  if (!text) return;
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const two = text.slice(i, i + 2);
    if (DICT[two]) {
      res += `<ruby><rb>${two}</rb><rt>${DICT[two]}</rt></ruby>`;
      i++;
      continue;
    }
    const one = text[i];
    if (DICT[one]) {
      res += `<ruby><rb>${one}</rb><rt>${DICT[one]}</rt></ruby>`;
    } else {
      res += one;
    }
  }
  document.getElementById('pop-result').innerHTML = res;
});

document.getElementById('pop-annotate').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    chrome.tabs.sendMessage(tab.id, { action: 'ANNOTATE_PAGE' });
  }
});
