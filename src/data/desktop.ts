export interface DesktopApp {
  id: string;
  name: string;
  glyph: string;
  iconSrc?: string;
  dockPinned?: boolean;
  hiddenFromDesktop?: boolean;
  groupMembers?: Array<{
    id: string;
    glyph: string;
    name: string;
    iconSrc?: string;
  }>;
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
    iconSrc: "/icons/pfp.png",
    width: 420,
    height: 320,
    x: 1080,
    y: 148,
    iconX: 68,
    iconY: 118
  },
  {
    id: "read-easy",
    name: "Read Easy",
    glyph: "RE",
    iconSrc: "/icons/read-easy.png",
    dockPinned: true,
    width: 620,
    height: 560,
    x: 846,
    y: 292,
    iconX: 68,
    iconY: 246
  },
  {
    id: "blog",
    name: "Library",
    glyph: "BL",
    dockPinned: true,
    width: 920,
    height: 660,
    x: 590,
    y: 180,
    iconX: 68,
    iconY: 374
  },
  {
    id: "vibary",
    name: "Vibary",
    glyph: "VB",
    iconSrc: "/icons/vibary.png",
    dockPinned: true,
    width: 700,
    height: 560,
    x: 774,
    y: 214,
    iconX: 180,
    iconY: 118
  },
  {
    id: "settings",
    name: "Settings",
    glyph: "ST",
    hiddenFromDesktop: true,
    width: 420,
    height: 360,
    x: 930,
    y: 170,
    iconX: 516,
    iconY: 118
  },
  {
    id: "jike",
    name: "即刻",
    glyph: "JK",
    width: 860,
    height: 620,
    x: 620,
    y: 170,
    iconX: 404,
    iconY: 246
  },
  {
    id: "atten",
    name: "Atten",
    glyph: "AT",
    iconSrc: "/icons/atten.png",
    width: 560,
    height: 420,
    x: 708,
    y: 166,
    iconX: 292,
    iconY: 118
  },
  {
    id: "interlude",
    name: "Interlude",
    glyph: "IN",
    iconSrc: "/icons/interlude.png",
    hiddenFromDesktop: true,
    width: 560,
    height: 420,
    x: 742,
    y: 196,
    iconX: 180,
    iconY: 246
  },
  {
    id: "molday",
    name: "Molday",
    glyph: "MO",
    iconSrc: "/icons/molday.png",
    width: 560,
    height: 420,
    x: 776,
    y: 226,
    iconX: 180,
    iconY: 374
  },
  {
    id: "onesnap",
    name: "OneSnap",
    glyph: "OS",
    iconSrc: "/icons/onesnap.png",
    hiddenFromDesktop: true,
    width: 560,
    height: 420,
    x: 810,
    y: 256,
    iconX: 292,
    iconY: 118
  },
  {
    id: "tube-nitro",
    name: "TubeNitro",
    glyph: "TN",
    iconSrc: "/icons/TubeNitro.png",
    hiddenFromDesktop: true,
    width: 560,
    height: 420,
    x: 844,
    y: 286,
    iconX: 292,
    iconY: 246
  },
  {
    id: "new-portal",
    name: "New Portal",
    glyph: "NP",
    iconSrc: "/icons/New Portal.png",
    hiddenFromDesktop: true,
    width: 560,
    height: 420,
    x: 878,
    y: 316,
    iconX: 292,
    iconY: 374
  },
  {
    id: "deepchat",
    name: "DeepChat",
    glyph: "DC",
    iconSrc: "/icons/deepchat.png",
    hiddenFromDesktop: true,
    width: 560,
    height: 420,
    x: 912,
    y: 346,
    iconX: 404,
    iconY: 374
  },
  {
    id: "dogcheck",
    name: "DogCheck",
    glyph: "DG",
    iconSrc: "/icons/DogCheck.png",
    hiddenFromDesktop: true,
    width: 560,
    height: 420,
    x: 946,
    y: 376,
    iconX: 516,
    iconY: 118
  },
  {
    id: "sprint",
    name: "Sprint",
    glyph: "SPR",
    groupMembers: [
      { id: "interlude", glyph: "IN", name: "Interlude", iconSrc: "/icons/interlude.png" },
      { id: "onesnap", glyph: "OS", name: "OneSnap", iconSrc: "/icons/onesnap.png" },
      { id: "tube-nitro", glyph: "TN", name: "TubeNitro", iconSrc: "/icons/TubeNitro.png" },
      { id: "new-portal", glyph: "NP", name: "New Portal", iconSrc: "/icons/New Portal.png" }
    ],
    width: 760,
    height: 360,
    x: 860,
    y: 280,
    iconX: 180,
    iconY: 246
  },
  {
    id: "fun",
    name: "Fun",
    glyph: "FUN",
    groupMembers: [
      { id: "deepchat", glyph: "DC", name: "DeepChat", iconSrc: "/icons/deepchat.png" },
      { id: "dogcheck", glyph: "DG", name: "DogCheck", iconSrc: "/icons/DogCheck.png" }
    ],
    width: 760,
    height: 360,
    x: 900,
    y: 310,
    iconX: 292,
    iconY: 246
  },
  {
    id: "social",
    name: "Social",
    glyph: "SOC",
    groupMembers: [
      { id: "okjk", glyph: "JK", name: "即刻" },
      { id: "xiaohongshu", glyph: "HS", name: "小红书" },
      { id: "x", glyph: "X", name: "X" },
      { id: "github", glyph: "GH", name: "GitHub" }
    ],
    width: 980,
    height: 470,
    x: 912,
    y: 344,
    iconX: 404,
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

export const vibaryLinks = {
  home: "https://www.vibary.art/",
  threeBody: "https://www.vibary.art/en/three-body/books/three-body-problem",
  systemsThinking: "https://www.vibary.art/en/thinking-fast-and-slow/part-1",
  story: "https://www.vibary.art/en/story/part-4"
};

export const vibaryHighlights = [
  {
    title: "Book as Interface",
    note: "把一本书拆成章节、人物、主题和金句入口，不是平铺的目录页。"
  },
  {
    title: "Character Files",
    note: "人物页会整理身份、经历和心理画像，阅读路径更像进入一个作品宇宙。"
  },
  {
    title: "Interactive Learning",
    note: "部分书页带有按钮、练习和可操作模块，而不是只给静态摘要。"
  },
  {
    title: "Bilingual Reading",
    note: "官网可以看到中英双语路径，切换语言时结构仍然比较完整。"
  }
];

export const socialLinks = [
  {
    id: "okjk",
    name: "即刻",
    glyph: "JK",
    href: "https://okjk.co/",
    note: "占位链接，后面替换成你的即刻主页。"
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    glyph: "XHS",
    href: "https://www.xiaohongshu.com/",
    note: "占位链接，后面替换成你的小红书主页。"
  },
  {
    id: "x",
    name: "Twitter / X",
    glyph: "X",
    href: "https://x.com/",
    note: "占位链接，后面替换成你的 X 主页。"
  },
  {
    id: "github",
    name: "GitHub",
    glyph: "GH",
    href: "https://github.com/",
    note: "占位链接，后面替换成你的 GitHub 主页。"
  }
];
