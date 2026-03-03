export interface DesktopApp {
  id: string;
  name: string;
  glyph: string;
  iconSrc?: string;
  width: number;
  height: number;
  x: number;
  y: number;
  iconX: number;
  iconY: number;
}

export const desktopApps: DesktopApp[] = [
  {
    id: "profile",
    name: "Studio",
    glyph: "ZG",
    width: 420,
    height: 320,
    x: 1080,
    y: 148,
    iconX: 68,
    iconY: 118
  },
  {
    id: "notes",
    name: "Journal",
    glyph: "TXT",
    width: 760,
    height: 560,
    x: 252,
    y: 86,
    iconX: 68,
    iconY: 246
  },
  {
    id: "read-easy",
    name: "Read Easy",
    glyph: "RE",
    iconSrc: "/icons/read-easy.png",
    width: 620,
    height: 560,
    x: 846,
    y: 292,
    iconX: 68,
    iconY: 374
  },
  {
    id: "blog",
    name: "Library",
    glyph: "BL",
    width: 920,
    height: 660,
    x: 590,
    y: 180,
    iconX: 68,
    iconY: 502
  },
  {
    id: "player",
    name: "Player",
    glyph: "SND",
    width: 360,
    height: 190,
    x: 94,
    y: 594,
    iconX: 180,
    iconY: 118
  }
];

export const readEasyLinks = {
  home: "https://www.read-easy.io/",
  download: "https://chromewebstore.google.com/detail/read-easy/imnkejdlaonpmdddpfbbbedmfonoehdm",
  pricing: "https://www.read-easy.io/pricing"
};

export const readEasyHighlights = [
  {
    title: "英语标记",
    note: "自动标出词汇与释义，降低直接读英语文章时的阻力。"
  },
  {
    title: "中英混合 / 双语阅读",
    note: "在保留原文语感的同时，快速理解段落含义。"
  },
  {
    title: "AI 问答",
    note: "对句子、词组和语言点即时发问，哪里卡住就在哪里问。"
  },
  {
    title: "边听边读",
    note: "把听觉辅助和阅读过程叠在一起，更容易持续读下去。"
  },
  {
    title: "即划即译",
    note: "划词后直接看到翻译，不需要离开当前上下文。"
  },
  {
    title: "阅读模式",
    note: "移除广告和干扰元素，把注意力重新拉回正文。"
  }
];
