
let selectedCount = 3;
let pickedCards = [];

// DOM Elements
const stepSetup = document.getElementById('step-setup');
const stepManual = document.getElementById('step-manual');
const stepResult = document.getElementById('step-result');

const questionInput = document.getElementById('question');
const displayQuestion = document.querySelector('#display-question span');

const btnOptions = document.querySelectorAll('.btn-option');
const btnManual = document.getElementById('btn-manual');
const btnRandom = document.getElementById('btn-random');

const deckContainer = document.getElementById('deck-container');
const pickedSlots = document.getElementById('picked-slots');
const cardsToPickSpan = document.getElementById('cards-to-pick');
const btnRevealManual = document.getElementById('btn-reveal-manual');
const btnBack = document.getElementById('btn-back');

const resultCardsContainer = document.getElementById('result-cards');
const btnRestart = document.getElementById('btn-restart');

// 牌位含義（根據塔羅常用牌陣）
const POSITION_LABELS = {
  3: ['過去', '現在', '未來'],
  5: ['過去', '現在', '未來', '內在', '結果']
};

let tarotCards = [
  { "id": 0,  "name": "愚者",       "nameEn": "The Fool",            "image": "../images/card_0.jpg",  "keywords": "新的開始 · 自由 · 純真" },
  { "id": 1,  "name": "魔術師",     "nameEn": "The Magician",        "image": "../images/card_1.jpg",  "keywords": "意志力 · 創造 · 行動" },
  { "id": 2,  "name": "女祭司",     "nameEn": "The High Priestess",  "image": "../images/card_2.jpg",  "keywords": "直覺 · 神秘 · 潛意識" },
  { "id": 3,  "name": "皇后",       "nameEn": "The Empress",         "image": "../images/card_3.jpg",  "keywords": "豐盛 · 母性 · 滋養" },
  { "id": 4,  "name": "皇帝",       "nameEn": "The Emperor",         "image": "../images/card_4.jpg",  "keywords": "權威 · 穩定 · 結構" },
  { "id": 5,  "name": "教皇",       "nameEn": "The Hierophant",      "image": "../images/card_5.jpg",  "keywords": "傳統 · 信念 · 教導" },
  { "id": 6,  "name": "戀人",       "nameEn": "The Lovers",          "image": "../images/card_6.jpg",  "keywords": "愛 · 選擇 · 結合" },
  { "id": 7,  "name": "戰車",       "nameEn": "The Chariot",         "image": "../images/card_7.jpg",  "keywords": "勝利 · 意志 · 前進" },
  { "id": 8,  "name": "力量",       "nameEn": "Strength",            "image": "../images/card_8.jpg",  "keywords": "勇氣 · 內在力量 · 溫柔" },
  { "id": 9,  "name": "隱者",       "nameEn": "The Hermit",          "image": "../images/card_9.jpg",  "keywords": "獨處 · 內省 · 智慧" },
  { "id": 10, "name": "命運之輪",   "nameEn": "Wheel of Fortune",    "image": "../images/card_10.jpg", "keywords": "轉變 · 命運 · 循環" },
  { "id": 11, "name": "正義",       "nameEn": "Justice",             "image": "../images/card_11.jpg", "keywords": "公正 · 真相 · 平衡" },
  { "id": 12, "name": "倒吊人",     "nameEn": "The Hanged Man",      "image": "../images/card_12.jpg", "keywords": "犧牲 · 等待 · 換位思考" },
  { "id": 13, "name": "死神",       "nameEn": "Death",               "image": "../images/card_13.jpg", "keywords": "結束 · 蛻變 · 重生" },
  { "id": 14, "name": "節制",       "nameEn": "Temperance",          "image": "../images/card_14.jpg", "keywords": "平衡 · 融合 · 節制" },
  { "id": 15, "name": "惡魔",       "nameEn": "The Devil",           "image": "../images/card_15.jpg", "keywords": "誘惑 · 束縛 · 慾望" },
  { "id": 16, "name": "高塔",       "nameEn": "The Tower",           "image": "../images/card_16.jpg", "keywords": "突變 · 崩塌 · 啟示" },
  { "id": 17, "name": "星星",       "nameEn": "The Star",            "image": "../images/card_17.jpg", "keywords": "希望 · 療癒 · 指引" },
  { "id": 18, "name": "月亮",       "nameEn": "The Moon",            "image": "../images/card_18.jpg", "keywords": "幻象 · 直覺 · 不安" },
  { "id": 19, "name": "太陽",       "nameEn": "The Sun",             "image": "../images/card_19.jpg", "keywords": "喜悅 · 成功 · 活力" },
  { "id": 20, "name": "審判",       "nameEn": "Judgement",           "image": "../images/card_20.jpg", "keywords": "覺醒 · 重生 · 召喚" },
  { "id": 21, "name": "世界",       "nameEn": "The World",           "image": "../images/card_21.jpg", "keywords": "圓滿 · 完成 · 成就" },
  { "id": 22, "name": "權杖王牌",   "nameEn": "Ace of Wands",        "image": "../images/card_22.jpg", "keywords": "靈感 · 新機會 · 熱情" },
  { "id": 23, "name": "權杖二",     "nameEn": "Two of Wands",        "image": "../images/card_23.jpg", "keywords": "規劃 · 抉擇 · 視野" },
  { "id": 24, "name": "權杖三",     "nameEn": "Three of Wands",      "image": "../images/card_24.jpg", "keywords": "拓展 · 等待 · 遠見" },
  { "id": 25, "name": "權杖四",     "nameEn": "Four of Wands",       "image": "../images/card_25.jpg", "keywords": "慶祝 · 安定 · 歸屬" },
  { "id": 26, "name": "權杖五",     "nameEn": "Five of Wands",       "image": "../images/card_26.jpg", "keywords": "競爭 · 衝突 · 磨合" },
  { "id": 27, "name": "權杖六",     "nameEn": "Six of Wands",        "image": "../images/card_27.jpg", "keywords": "勝利 · 公開肯定 · 凱旋" },
  { "id": 28, "name": "權杖七",     "nameEn": "Seven of Wands",      "image": "../images/card_28.jpg", "keywords": "防衛 · 堅守 · 挑戰" },
  { "id": 29, "name": "權杖八",     "nameEn": "Eight of Wands",      "image": "../images/card_29.jpg", "keywords": "迅速 · 進展 · 訊息" },
  { "id": 30, "name": "權杖九",     "nameEn": "Nine of Wands",       "image": "../images/card_30.jpg", "keywords": "韌性 · 戒備 · 持守" },
  { "id": 31, "name": "權杖十",     "nameEn": "Ten of Wands",        "image": "../images/card_31.jpg", "keywords": "重擔 · 責任 · 過勞" },
  { "id": 32, "name": "權杖侍者",   "nameEn": "Page of Wands",       "image": "../images/card_32.jpg", "keywords": "好奇 · 啟發 · 探索" },
  { "id": 33, "name": "權杖騎士",   "nameEn": "Knight of Wands",     "image": "../images/card_33.jpg", "keywords": "熱情 · 衝勁 · 冒險" },
  { "id": 34, "name": "權杖王后",   "nameEn": "Queen of Wands",      "image": "../images/card_34.jpg", "keywords": "自信 · 魅力 · 獨立" },
  { "id": 35, "name": "權杖國王",   "nameEn": "King of Wands",       "image": "../images/card_35.jpg", "keywords": "領導 · 願景 · 行動力" },
  { "id": 36, "name": "聖杯王牌",   "nameEn": "Ace of Cups",         "image": "../images/card_36.jpg", "keywords": "新感情 · 愛 · 滿溢" },
  { "id": 37, "name": "聖杯二",     "nameEn": "Two of Cups",         "image": "../images/card_37.jpg", "keywords": "結合 · 互愛 · 心靈共鳴" },
  { "id": 38, "name": "聖杯三",     "nameEn": "Three of Cups",       "image": "../images/card_38.jpg", "keywords": "慶祝 · 友情 · 喜悅" },
  { "id": 39, "name": "聖杯四",     "nameEn": "Four of Cups",        "image": "../images/card_39.jpg", "keywords": "倦怠 · 沈思 · 錯失" },
  { "id": 40, "name": "聖杯五",     "nameEn": "Five of Cups",        "image": "../images/card_40.jpg", "keywords": "失落 · 遺憾 · 哀悼" },
  { "id": 41, "name": "聖杯六",     "nameEn": "Six of Cups",         "image": "../images/card_41.jpg", "keywords": "回憶 · 純真 · 童年" },
  { "id": 42, "name": "聖杯七",     "nameEn": "Seven of Cups",       "image": "../images/card_42.jpg", "keywords": "幻想 · 選擇 · 迷惘" },
  { "id": 43, "name": "聖杯八",     "nameEn": "Eight of Cups",       "image": "../images/card_43.jpg", "keywords": "離開 · 追尋 · 放下" },
  { "id": 44, "name": "聖杯九",     "nameEn": "Nine of Cups",        "image": "../images/card_44.jpg", "keywords": "如願 · 滿足 · 享受" },
  { "id": 45, "name": "聖杯十",     "nameEn": "Ten of Cups",         "image": "../images/card_45.jpg", "keywords": "美滿 · 家庭 · 圓滿" },
  { "id": 46, "name": "聖杯侍者",   "nameEn": "Page of Cups",        "image": "../images/card_46.jpg", "keywords": "悸動 · 訊息 · 浪漫" },
  { "id": 47, "name": "聖杯騎士",   "nameEn": "Knight of Cups",      "image": "../images/card_47.jpg", "keywords": "追求 · 浪漫 · 邀請" },
  { "id": 48, "name": "聖杯王后",   "nameEn": "Queen of Cups",       "image": "../images/card_48.jpg", "keywords": "同理 · 溫柔 · 直覺" },
  { "id": 49, "name": "聖杯國王",   "nameEn": "King of Cups",        "image": "../images/card_49.jpg", "keywords": "情緒成熟 · 包容 · 智慧" },
  { "id": 50, "name": "寶劍王牌",   "nameEn": "Ace of Swords",       "image": "../images/card_50.jpg", "keywords": "突破 · 真相 · 清晰" },
  { "id": 51, "name": "寶劍二",     "nameEn": "Two of Swords",       "image": "../images/card_51.jpg", "keywords": "猶豫 · 僵局 · 逃避" },
  { "id": 52, "name": "寶劍三",     "nameEn": "Three of Swords",     "image": "../images/card_52.jpg", "keywords": "心碎 · 悲傷 · 真話" },
  { "id": 53, "name": "寶劍四",     "nameEn": "Four of Swords",      "image": "../images/card_53.jpg", "keywords": "休息 · 沉澱 · 復原" },
  { "id": 54, "name": "寶劍五",     "nameEn": "Five of Swords",      "image": "../images/card_54.jpg", "keywords": "衝突 · 失利 · 不擇手段" },
  { "id": 55, "name": "寶劍六",     "nameEn": "Six of Swords",       "image": "../images/card_55.jpg", "keywords": "過渡 · 啟程 · 漸入佳境" },
  { "id": 56, "name": "寶劍七",     "nameEn": "Seven of Swords",     "image": "../images/card_56.jpg", "keywords": "策略 · 隱瞞 · 機智" },
  { "id": 57, "name": "寶劍八",     "nameEn": "Eight of Swords",     "image": "../images/card_57.jpg", "keywords": "受困 · 自我設限 · 無助" },
  { "id": 58, "name": "寶劍九",     "nameEn": "Nine of Swords",      "image": "../images/card_58.jpg", "keywords": "焦慮 · 失眠 · 恐懼" },
  { "id": 59, "name": "寶劍十",     "nameEn": "Ten of Swords",       "image": "../images/card_59.jpg", "keywords": "結束 · 谷底 · 重新開始" },
  { "id": 60, "name": "寶劍侍者",   "nameEn": "Page of Swords",      "image": "../images/card_60.jpg", "keywords": "好奇 · 觀察 · 訊息" },
  { "id": 61, "name": "寶劍騎士",   "nameEn": "Knight of Swords",    "image": "../images/card_61.jpg", "keywords": "果斷 · 衝鋒 · 直接" },
  { "id": 62, "name": "寶劍王后",   "nameEn": "Queen of Swords",     "image": "../images/card_62.jpg", "keywords": "理性 · 獨立 · 洞察" },
  { "id": 63, "name": "寶劍國王",   "nameEn": "King of Swords",      "image": "../images/card_63.jpg", "keywords": "權威 · 邏輯 · 決斷" },
  { "id": 64, "name": "錢幣王牌",   "nameEn": "Ace of Pentacles",    "image": "../images/card_64.jpg", "keywords": "新機會 · 物質 · 顯化" },
  { "id": 65, "name": "錢幣二",     "nameEn": "Two of Pentacles",    "image": "../images/card_65.jpg", "keywords": "平衡 · 變動 · 調適" },
  { "id": 66, "name": "錢幣三",     "nameEn": "Three of Pentacles",  "image": "../images/card_66.jpg", "keywords": "合作 · 技藝 · 認可" },
  { "id": 67, "name": "錢幣四",     "nameEn": "Four of Pentacles",   "image": "../images/card_67.jpg", "keywords": "穩固 · 守財 · 保守" },
  { "id": 68, "name": "錢幣五",     "nameEn": "Five of Pentacles",   "image": "../images/card_68.jpg", "keywords": "匱乏 · 困境 · 信念" },
  { "id": 69, "name": "錢幣六",     "nameEn": "Six of Pentacles",    "image": "../images/card_69.jpg", "keywords": "給予 · 分享 · 平等" },
  { "id": 70, "name": "錢幣七",     "nameEn": "Seven of Pentacles",  "image": "../images/card_70.jpg", "keywords": "等待 · 評估 · 耕耘" },
  { "id": 71, "name": "錢幣八",     "nameEn": "Eight of Pentacles",  "image": "../images/card_71.jpg", "keywords": "專注 · 學習 · 用心" },
  { "id": 72, "name": "錢幣九",     "nameEn": "Nine of Pentacles",   "image": "../images/card_72.jpg", "keywords": "獨立 · 享受 · 自給自足" },
  { "id": 73, "name": "錢幣十",     "nameEn": "Ten of Pentacles",    "image": "../images/card_73.jpg", "keywords": "豐盛 · 家族 · 傳承" },
  { "id": 74, "name": "錢幣侍者",   "nameEn": "Page of Pentacles",   "image": "../images/card_74.jpg", "keywords": "學習 · 機會 · 踏實" },
  { "id": 75, "name": "錢幣騎士",   "nameEn": "Knight of Pentacles", "image": "../images/card_75.jpg", "keywords": "務實 · 穩健 · 耐心" },
  { "id": 76, "name": "錢幣王后",   "nameEn": "Queen of Pentacles",  "image": "../images/card_76.jpg", "keywords": "豐盛 · 照顧 · 務實" },
  { "id": 77, "name": "錢幣國王",   "nameEn": "King of Pentacles",   "image": "../images/card_77.jpg", "keywords": "成功 · 富足 · 穩重" }
];

// Utility: Shuffle Array
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// UI: Switch Panels
function showPanel(panel) {
  [stepSetup, stepManual, stepResult].forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });

  setTimeout(() => {
    panel.classList.remove('hidden');
    panel.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50);
}

// 產生粒子背景
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 600 ? 25 : 50;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (5 + Math.random() * 8) + 's';
    p.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
    container.appendChild(p);
  }
}

// Setup Event Listeners
btnOptions.forEach(btn => {
  btn.addEventListener('click', (e) => {
    btnOptions.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    selectedCount = parseInt(e.target.dataset.count);
    cardsToPickSpan.textContent = selectedCount;
  });
});

btnRandom.addEventListener('click', () => {
  const q = questionInput.value.trim() || "未輸入問題";
  displayQuestion.textContent = q;

  const shuffled = shuffleArray(tarotCards);
  pickedCards = shuffled.slice(0, selectedCount);

  renderResultCards();
  showPanel(stepResult);
  triggerFlipAnimation();
});

btnManual.addEventListener('click', () => {
  pickedCards = [];

  // Setup slots
  pickedSlots.innerHTML = '';
  for (let i = 0; i < selectedCount; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.innerHTML = `<span class="slot-num">${i + 1}</span>`;
    pickedSlots.appendChild(slot);
  }

  // Setup deck
  deckContainer.innerHTML = '';
  const tableCards = shuffleArray(tarotCards);

  tableCards.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card-back-mini';
    cardEl.dataset.id = card.id;
    cardEl.style.animationDelay = (idx * 8) + 'ms';
    cardEl.addEventListener('click', () => handleManualPick(card, cardEl));
    deckContainer.appendChild(cardEl);
  });

  btnRevealManual.classList.add('hidden');
  cardsToPickSpan.textContent = selectedCount;
  showPanel(stepManual);
});

function handleManualPick(card, el) {
  if (pickedCards.length >= selectedCount) return;
  if (el.classList.contains('selected')) return;

  el.classList.add('selected');
  pickedCards.push(card);

  const slots = pickedSlots.querySelectorAll('.slot');
  const slot = slots[pickedCards.length - 1];
  slot.classList.add('filled');

  if (pickedCards.length === selectedCount) {
    btnRevealManual.classList.remove('hidden');
  }
}

btnRevealManual.addEventListener('click', () => {
  const q = questionInput.value.trim() || "未輸入問題";
  displayQuestion.textContent = q;

  renderResultCards();
  showPanel(stepResult);
  triggerFlipAnimation();
});

btnBack.addEventListener('click', () => {
  showPanel(stepSetup);
});

btnRestart.addEventListener('click', () => {
  questionInput.value = '';
  pickedCards = [];
  showPanel(stepSetup);
});

// 取得牌位標籤（過去 / 現在 / 未來 等）
function getPositionLabel(index, total) {
  const labels = POSITION_LABELS[total];
  if (labels && labels[index]) return labels[index];
  return `第 ${index + 1} 張`;
}

// Render Result Screen
function renderResultCards() {
  resultCardsContainer.innerHTML = '';
  pickedCards.forEach((card, index) => {
    const positionLabel = getPositionLabel(index, pickedCards.length);

    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';
    wrapper.innerHTML = `
      <div class="card-position">${positionLabel}</div>
      <div class="card-inner">
        <div class="card-face card-front"></div>
        <div class="card-face card-back" style="background-image: url('${card.image}')"></div>
      </div>
      <div class="card-label">
        <div class="card-name-zh">${card.name}</div>
        <div class="card-name-en">${card.nameEn}</div>
        <div class="card-keywords">${card.keywords}</div>
      </div>
    `;
    resultCardsContainer.appendChild(wrapper);
  });
}

function triggerFlipAnimation() {
  const cards = resultCardsContainer.querySelectorAll('.card-wrapper');
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 500 + (i * 400));
  });

  if (typeof window.scheduleAd === 'function') {
    window.scheduleAd();
  }
}

// 初始化粒子
createParticles();


/* Ad System Logic - Mode B: Single Banner (Standard) */
(function () {
  const AD_CONFIG = {
    utmSource: 'tarot',
    utmCampaign: 'mega_traffic_2026',
    initDelay: 2000,
    cooldown: 20000,
    ads: [{
      url: 'https://www.gametower.com.tw/Action/partygo/mixytalk0416/index.html',
      img: '../images/ad_starparty.png'
    }]
  };

  window.getAdUrl = function (utmContent) {
    const ad = AD_CONFIG.ads[0];
    const sep = ad.url.indexOf('?') === -1 ? '?' : '&';
    return ad.url + sep + 'utm_source=' + AD_CONFIG.utmSource +
      '&utm_medium=display&utm_campaign=' + AD_CONFIG.utmCampaign +
      '&utm_content=' + (utmContent || '1st_banner');
  };

  window.scheduleAd = function () {
    const now = Date.now();
    const last = parseInt(sessionStorage.getItem('last_ad_time') || '0');
    if (now - last < AD_CONFIG.cooldown) return;
    if (document.getElementById('ad-overlay')) return;
    setTimeout(showAd, AD_CONFIG.initDelay);
  };

  function showAd() {
    sessionStorage.setItem('last_ad_time', Date.now().toString());
    const ad = AD_CONFIG.ads[0];
    const overlay = document.createElement('div');
    overlay.id = 'ad-overlay';
    overlay.innerHTML = `
      <div class="ad-container">
        <div class="ad-header"><span>🎁 玩星派對</span><button id="ad-close" aria-label="關閉廣告">×</button></div>
        <div class="ad-content-wrap">
          <div class="ad-slide active">
            <a href="${window.getAdUrl('popup_banner')}" target="_blank" rel="noopener noreferrer">
              <img src="${ad.img}" alt="玩星派對 - iPhone免費抽">
              <div class="ad-desc">iPhone買不到？完成電話驗證 等你免費抽回家</div>
            </a>
          </div>
        </div>
        <div class="ad-footer">點擊右上角 × 關閉</div>
      </div>`;
    document.body.appendChild(overlay);
    const close = () => { if (overlay.parentNode) overlay.remove(); };
    document.getElementById('ad-close').onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };
  }
})();
