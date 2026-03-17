export type DesktopLocale = "zh" | "en";

export interface DesktopLocalizedName {
  zh: string;
  en: string;
}

export interface DesktopApp {
  id: string;
  name: string;
  localizedName?: DesktopLocalizedName;
  glyph: string;
  iconSrc?: string;
  dockPinned?: boolean;
  showOnDesktop?: boolean;
  showInDock?: boolean;
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
    name: "About Me",
    localizedName: {
      zh: "关于我",
      en: "About Me"
    },
    glyph: "ZG",
    iconSrc: "/icons/pfp.png",
    dockPinned: true,
    width: 920,
    height: 640,
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
    width: 980,
    height: 720,
    x: 846,
    y: 292,
    iconX: 68,
    iconY: 246
  },
  {
    id: "blog",
    name: "Blog",
    localizedName: {
      zh: "博客",
      en: "Blog"
    },
    glyph: "B",
    iconSrc: "/icons/blog-pencil.svg",
    width: 1080,
    height: 700,
    x: 500,
    y: 160,
    iconX: 68,
    iconY: 374
  },
  {
    id: "vibary",
    name: "Vibary",
    glyph: "VB",
    iconSrc: "/icons/vibary.png",
    dockPinned: true,
    width: 860,
    height: 620,
    x: 774,
    y: 214,
    iconX: 180,
    iconY: 118
  },
  {
    id: "jike",
    name: "动态",
    localizedName: {
      zh: "动态",
      en: "Posts"
    },
    glyph: "JK",
    iconSrc: "/icons/updates.svg",
    dockPinned: true,
    width: 860,
    height: 620,
    x: 620,
    y: 170,
    iconX: 404,
    iconY: 118
  },
  {
    id: "atten",
    name: "Atten",
    glyph: "AT",
    iconSrc: "/icons/atten.png",
    width: 920,
    height: 640,
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
    showOnDesktop: false,
    width: 860,
    height: 620,
    x: 742,
    y: 196,
    iconX: 180,
    iconY: 246
  },
  {
    id: "molday",
    name: "Molday.",
    glyph: "MO",
    iconSrc: "/icons/molday.png",
    dockPinned: true,
    width: 900,
    height: 640,
    x: 776,
    y: 226,
    iconX: 180,
    iconY: 246
  },
  {
    id: "onesnap",
    name: "OneSnap!",
    localizedName: {
      zh: "一拍相机!",
      en: "OneSnap!"
    },
    glyph: "OS",
    iconSrc: "/icons/onesnap.png",
    showOnDesktop: false,
    width: 860,
    height: 620,
    x: 810,
    y: 256,
    iconX: 292,
    iconY: 118
  },
  {
    id: "tubenitro",
    name: "TubeNitro",
    glyph: "TN",
    iconSrc: "/icons/TubeNitro.png",
    showOnDesktop: false,
    width: 860,
    height: 620,
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
    showOnDesktop: false,
    width: 860,
    height: 620,
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
    showOnDesktop: false,
    width: 860,
    height: 620,
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
    showOnDesktop: false,
    width: 860,
    height: 620,
    x: 946,
    y: 376,
    iconX: 516,
    iconY: 118
  },
  {
    id: "existence",
    name: "Existence",
    glyph: "EX",
    iconSrc: "/icons/existence.png",
    showOnDesktop: false,
    width: 860,
    height: 620,
    x: 980,
    y: 406,
    iconX: 292,
    iconY: 374
  },
  {
    id: "sekai",
    name: "sekai",
    glyph: "SK",
    iconSrc: "/icons/sekai.png",
    showOnDesktop: false,
    width: 860,
    height: 620,
    x: 1014,
    y: 436,
    iconX: 404,
    iconY: 374
  },
  {
    id: "sprint",
    name: "Sprint",
    glyph: "SPR",
    groupMembers: [
      { id: "interlude", glyph: "IN", name: "Interlude", iconSrc: "/icons/interlude.png" },
      { id: "onesnap", glyph: "OS", name: "OneSnap!", iconSrc: "/icons/onesnap.png" },
      { id: "tubenitro", glyph: "TN", name: "TubeNitro", iconSrc: "/icons/TubeNitro.png" },
      { id: "new-portal", glyph: "NP", name: "New Portal", iconSrc: "/icons/New Portal.png" }
    ],
    width: 760,
    height: 360,
    x: 860,
    y: 280,
    iconX: 292,
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
    iconX: 404,
    iconY: 246
  },
  {
    id: "reflex-ai",
    name: "Reflex AI",
    glyph: "RAI",
    groupMembers: [
      { id: "existence", glyph: "EX", name: "Existence", iconSrc: "/icons/existence.png" },
      { id: "sekai", glyph: "SK", name: "sekai", iconSrc: "/icons/sekai.png" }
    ],
    width: 760,
    height: 360,
    x: 940,
    y: 300,
    iconX: 180,
    iconY: 374
  },
  {
    id: "settings",
    name: "Language",
    localizedName: {
      zh: "语言",
      en: "Language"
    },
    glyph: "ST",
    iconSrc: "/icons/language-settings.svg",
    showInDock: false,
    width: 420,
    height: 240,
    x: 930,
    y: 170,
    iconX: 292,
    iconY: 374
  }
];

export const desktopAppsById = new Map(desktopApps.map((app) => [app.id, app]));

export function getDesktopAppName(app: DesktopApp, locale: DesktopLocale) {
  return app.localizedName?.[locale] ?? app.name;
}

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
    iconSrc: "/icons/okjk.jpg",
    href: "https://okjk.co/irLg6A",
    note: "即刻主页"
  },
  {
    id: "xiaohongshu",
    name: "小红书",
    glyph: "XHS",
    iconSrc: "/icons/xiaohongshu.jpg",
    href: "https://xhslink.com/m/43QGtkbYvOE",
    note: "小红书主页"
  },
  {
    id: "x",
    name: "Twitter / X",
    glyph: "X",
    iconSrc: "/icons/x.jpg",
    href: "https://x.com/rand_cat",
    note: "X 主页"
  },
  {
    id: "github",
    name: "GitHub",
    glyph: "GH",
    iconSrc: "/icons/github.jpg",
    href: "https://github.com/Rand-Cat",
    note: "GitHub 主页"
  }
];
