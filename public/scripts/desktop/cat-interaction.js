export function initCatInteraction() {
  if (window.matchMedia('(max-width: 980px)').matches) return;

  const icons = document.querySelectorAll('[data-open-window], [data-dock-window]');
  const catHover = document.querySelector('[data-cat-hover]');
  const speechBubble = document.querySelector('[data-cat-speech]');
  const speechText = document.querySelector('[data-cat-text]');

  if (!speechBubble || !speechText) return;

  const setSpeech = (text) => {
    speechText.textContent = text;
  };

  const clearSpeech = () => {
    speechText.textContent = '';
  };

  const appPhrases = {
    'profile': '这是人类的介绍',
    'read-easy': 'AI 如何让阅读英语变简单？',
    'blog': '长文章，不过目前只有几篇内容',
    'vibary': 'AI 的前端水平超乎想象',
    'molday':"都发霉了，还玩手机？",
    'settings': '想调整点什么？',
    'jike': '在即刻App上发布过一些想法',
    'atten': '23 年想做 App Store',
    'sprint': '1-5天快速做的东西',
    'fun': '有趣而无用？',
    'reflex-ai': '在 Reflex AI 和团队一起做的产品',
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

  let hideTimeout;

  icons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      const appId = icon.getAttribute('data-open-window') || icon.getAttribute('data-dock-window');
      if (!appId) return;
      
      const phrase = appPhrases[appId] || '喵~';
      const mood = appMoods[appId] || 'speaking';
      
      setSpeech(phrase);
      speechBubble.classList.add('is-visible');
      
      const catArt = document.querySelector('.zen-cat-art');
      if (catArt) catArt.setAttribute('data-mood', mood);
      
      clearTimeout(hideTimeout);
    });

    icon.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        speechBubble.classList.remove('is-visible');
        clearSpeech();
        
        const catArt = document.querySelector('.zen-cat-art');
        if (catArt) catArt.removeAttribute('data-mood');
      }, 200);
    });
  });

  if (catHover) {
    const catPhrases = [
      '能看出来我是一只猫吧？',
      '我是 Vibe Coding 出来的',
      '有什么事吗？',
      '我想吃猫条了',
      '不要乱摸我',
      '去看其它东西吧',
      '你好，再见',

    ];
    let lastPhraseIndex = -1;

    catHover.addEventListener('mouseenter', () => {
      let idx = Math.floor(Math.random() * catPhrases.length);
      if (catPhrases.length > 1 && idx === lastPhraseIndex) {
        idx = (idx + 1) % catPhrases.length;
      }
      lastPhraseIndex = idx;

      setSpeech(catPhrases[idx]);
      speechBubble.classList.add('is-visible');

      const catArt = document.querySelector('.zen-cat-art');
      if (catArt) catArt.setAttribute('data-mood', 'greeting');

      clearTimeout(hideTimeout);
    });

    catHover.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        speechBubble.classList.remove('is-visible');
        clearSpeech();

        const catArt = document.querySelector('.zen-cat-art');
        if (catArt) catArt.removeAttribute('data-mood');
      }, 200);
    });
  }
}
