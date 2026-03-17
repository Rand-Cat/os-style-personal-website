import {
  getPreferredBlogLocale,
  setBlogLocalePreference
} from "../locale-preference.js";

export function initCatInteraction() {
  if (window.matchMedia('(max-width: 980px)').matches) return;

  const icons = document.querySelectorAll('[data-open-window], [data-dock-window]');
  const catHover = document.querySelector('[data-cat-hover]');
  const speechBubble = document.querySelector('[data-cat-speech]');
  const speechText = document.querySelector('[data-cat-text]');
  const localeButtons = Array.from(document.querySelectorAll('[data-blog-locale-switch]'));

  if (!speechBubble || !speechText) return;

  let activeLocale = getPreferredBlogLocale();
  let activeBubble = null;

  const setSpeech = (text) => {
    speechText.textContent = text;
  };

  const clearSpeech = () => {
    speechText.textContent = '';
  };

  const appPhrases = {
    zh: {
      'profile': '这是人类的介绍',
      'read-easy': 'AI 如何让阅读英语变简单？',
      'blog': '长文章，不过目前只有几篇内容',
      'vibary': 'AI 的前端水平超乎想象',
      'molday': '都发霉了，还玩手机？',
      'settings': '在这里切换网站语言',
      'jike': '在即刻App上发布过一些想法',
      'atten': '23 年想做 App Store',
      'sprint': '1-5天快速做的东西',
      'fun': '有趣而无用？',
      'reflex-ai': '在 Reflex AI 和团队一起做的产品',
      'default': '喵~'
    },
    en: {
      'profile': 'This human wrote the site',
      'read-easy': 'How can AI make English easier to read?',
      'blog': 'Long posts, though there are only a few so far',
      'vibary': 'AI is unexpectedly good at frontend work',
      'molday': 'You are already moldy and still scrolling?',
      'settings': 'Switch the site language here',
      'jike': 'Some ideas I posted on Jike',
      'atten': 'In 2023, I wanted to build for the App Store',
      'sprint': 'Things made fast in 1 to 5 days',
      'fun': 'Interesting but useless?',
      'reflex-ai': 'Products I worked on with the Reflex AI team',
      'default': 'Meow~'
    }
  };

  const appMoods = {
    'profile': 'speaking',
    'read-easy': 'curious',
    'blog': 'curious',
    'vibary': 'curious',
    'settings': 'speaking',
    'jike': 'happy',
    'atten': 'focused',
    'sprint': 'focused',
    'fun': 'happy',
    'reflex-ai': 'focused',
  };

  const catPhrases = {
    zh: [
      '能看出来我是一只猫吧？',
      '我是 Vibe Coding 出来的',
      '有什么事吗？',
      '我想吃猫条了',
      '不要乱摸我',
      '去看其它东西吧',
      '你好，再见',
    ],
    en: [
      'You can tell I am a cat, right?',
      'I was vibe-coded into existence',
      'What do you need?',
      'I want a cat treat',
      "Don't pet me too much",
      'Go look at something else',
      'Hello, goodbye',
    ]
  };

  let hideTimeout;
  let lastPhraseIndex = -1;

  const getAppPhrase = (appId) => {
    const phrases = appPhrases[activeLocale] ?? appPhrases.zh;
    return phrases[appId] ?? phrases.default;
  };

  const getCatPhraseList = () => catPhrases[activeLocale] ?? catPhrases.zh;

  const refreshVisibleSpeech = () => {
    if (!activeBubble || !speechBubble.classList.contains('is-visible')) return;

    if (activeBubble.type === 'app') {
      setSpeech(getAppPhrase(activeBubble.appId));
      return;
    }

    if (activeBubble.type === 'cat') {
      const phrases = getCatPhraseList();
      if (!phrases.length) return;
      const idx = Math.min(activeBubble.index, phrases.length - 1);
      activeBubble.index = idx;
      setSpeech(phrases[idx]);
    }
  };

  icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      const appId = icon.getAttribute('data-open-window') || icon.getAttribute('data-dock-window');
      if (!appId) return;
      
      const phrase = getAppPhrase(appId);
      const mood = appMoods[appId] || 'speaking';
      
      setSpeech(phrase);
      speechBubble.classList.add('is-visible');
      activeBubble = { type: 'app', appId };
      
      const catArt = document.querySelector('.zen-cat-art');
      if (catArt) catArt.setAttribute('data-mood', mood);
      
      clearTimeout(hideTimeout);
    });

    icon.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        speechBubble.classList.remove('is-visible');
        clearSpeech();
        activeBubble = null;
        
        const catArt = document.querySelector('.zen-cat-art');
        if (catArt) catArt.removeAttribute('data-mood');
      }, 200);
    });
  });

  if (catHover) {
    catHover.addEventListener('mouseenter', () => {
      const phrases = getCatPhraseList();
      if (!phrases.length) return;

      let idx = Math.floor(Math.random() * phrases.length);
      if (phrases.length > 1 && idx === lastPhraseIndex) {
        idx = (idx + 1) % phrases.length;
      }
      lastPhraseIndex = idx;

      setSpeech(phrases[idx]);
      speechBubble.classList.add('is-visible');
      activeBubble = { type: 'cat', index: idx };

      const catArt = document.querySelector('.zen-cat-art');
      if (catArt) catArt.setAttribute('data-mood', 'greeting');

      clearTimeout(hideTimeout);
    });

    catHover.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        speechBubble.classList.remove('is-visible');
        clearSpeech();
        activeBubble = null;

        const catArt = document.querySelector('.zen-cat-art');
        if (catArt) catArt.removeAttribute('data-mood');
      }, 200);
    });
  }

  localeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeLocale = setBlogLocalePreference(button.getAttribute('data-blog-locale-switch'));
      refreshVisibleSpeech();
    });
  });
}
