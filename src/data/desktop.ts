export interface DesktopApp {
  id: string;
  name: string;
  glyph: string;
  iconSrc?: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export const desktopApps: DesktopApp[] = [
  {
    id: "profile",
    name: "Profile",
    glyph: "PR",
    width: 360,
    height: 360,
    x: 188,
    y: 64
  },
  {
    id: "notes",
    name: "Notes",
    glyph: "NT",
    width: 480,
    height: 430,
    x: 308,
    y: 156
  },
  {
    id: "read-easy",
    name: "Read Easy",
    glyph: "RE",
    iconSrc: "/icons/read-easy.png",
    width: 520,
    height: 560,
    x: 196,
    y: 286
  },
  {
    id: "blog",
    name: "Blog",
    glyph: "BL",
    width: 860,
    height: 620,
    x: 390,
    y: 72
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
