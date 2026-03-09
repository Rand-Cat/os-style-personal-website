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
    'profile': '这是我的工作室哦。',
    'read-easy': '要一起读点英语吗？',
    'blog': '这里有很多文章，慢慢看。',
    'vibary': '来翻翻这些书吧。',
    'settings': '想调整点什么？',
    'jike': '一些平时的碎碎念。',
    'atten': '嘘，要保持专注。',
    'sprint': '这里藏着几个小工具。',
    'fun': '找点乐子？',
    'reflex-ai': 'AI 相关的奇思妙想。',
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
      '喵，你发现我啦。',
      '嘿嘿，被注意到啦。',
      '摸摸我？',
      '喵~',
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
