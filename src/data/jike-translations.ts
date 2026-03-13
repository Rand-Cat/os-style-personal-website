export type JikeLocale = "zh" | "en";

export interface JikeTranslation {
  content?: string;
  excerpt?: string;
  topic?: string;
  repost?: {
    author?: string;
    content?: string;
  };
}

export const jikeTopicTranslations: Record<string, string> = {
  "AI探索站": "AI Explorations",
  "浴室沉思": "Shower Thoughts",
  "有一点哲学在里面": "A Bit of Philosophy",
  "读书会": "Book Club",
  "设计师的日常": "Designer's Daily",
  "Chrome插件分享站": "Chrome Extensions",
  "产品经理的日常": "Product Manager's Daily",
  "广告人的日常": "Advertiser's Daily",
  "无用但有趣的冷知识": "Useless but Fun Trivia",
  "一起学英语": "Learn English Together",
  "未分类": "Uncategorized"
};

export const jikeUiCopy = {
  zh: {
    eyebrow: "Jike Archive",
    title: "动态",
    description: "展示在即刻上发布的内容，非实时更新",
    repostFlag: "转发",
    expand: "展开全文",
    repostBy: "转发自",
    jikeUser: "即刻用户",
    origin: "原帖",
    closePreview: "关闭",
    imageAltLabel: "即刻配图"
  },
  en: {
    eyebrow: "Jike Archive",
    title: "Posts",
    description: "A selection of posts published on Jike. Not updated in real time.",
    repostFlag: "Repost",
    expand: "Read more",
    repostBy: "Reposted from",
    jikeUser: "Jike user",
    origin: "Original",
    closePreview: "Close",
    imageAltLabel: "Jike image"
  }
} satisfies Record<JikeLocale, {
  eyebrow: string;
  title: string;
  description: string;
  repostFlag: string;
  expand: string;
  repostBy: string;
  jikeUser: string;
  origin: string;
  closePreview: string;
  imageAltLabel: string;
}>;

export const jikePostTranslations: Record<string, JikeTranslation> = {
  "6937836c9c33f01a98054074": {
    content: `Humans are only the third smartest species on Earth.`,
    excerpt: `Humans are only the third smartest species on Earth.`
  },
  "693632b2f9f2475875c4473f": {
    content: `What if every book had its own website?`,
    excerpt: `What if every book had its own website?`
  },
  "693158549aafa14b71928fd1": {
    content: `I made a website for *The Three-Body Problem* with Gemini 3.

All I can say is that Gemini 3 is absurdly strong at frontend work.`,
    excerpt: `I made a website for *The Three-Body Problem* with Gemini 3.`
  },
  "6921634762623cfa89335358": {
    content: `I made a Chrome extension for watching YouTube at variable speed: TubeNitro.

What makes it different from other extensions is that the interaction feels more natural. Just press and hold on the video, then move up or down to adjust the playback speed.

You can crank it up to 10x and turn a one-hour video into six minutes, quickly deciding whether it is worth watching closely. You can also skip through the boring parts and slow down again when it gets interesting.

Compared with AI summaries, which may leave out visuals you personally care about, changing the speed lets you keep the important parts of the video in view.

https://chromewebstore.google.com/detail/tubenitro/dijolhechakpkdmkooadbimhmmljkbmf?authuser=0&hl=en`,
    excerpt: `I made a Chrome extension for watching YouTube at variable speed: TubeNitro.`
  },
  "69212694d9abb9785d9ca2e5": {
    content: `You can hold a correct idea and still receive reality's denial.
You can hold a wrong idea and still receive reality's confirmation.

The first case, for example:
Correct idea: an object not acted on by an external force will continue in uniform straight-line motion.
Reality's denial: a ball rolls on a wooden board for a while and then stops.

The second case, for example:
Wrong idea: an external force is needed to keep an object moving at constant speed.
Reality's confirmation: a ball rolls on a wooden board for a while and then stops.

But in fact, the first bit of reality does not refute the idea, and the second bit of reality does not confirm it. Both ignore other variables in reality, such as friction from the wooden board.

Starting from an idea and finding it incompatible with reality may mean that what needs to change is not the idea, but "reality."

Starting from reality and trying to infer an idea will naturally line up with reality, but only with "part of reality."

If you trust the second idea and want to build a spaceship, good luck.`,
    excerpt: `You can hold a correct idea and still receive reality's denial. You can hold a wrong idea and still receive reality's confirmation.`
  },
  "691fdc021ed9b53c781df506": {
    content: `Back when I was learning the driving test's reverse parking maneuver, I was confused about why the steering wheel had to be turned that way, so I looked into the math behind how cars move and turn. I sketched some crooked diagrams, did some calculations, and eventually figured it out.

Later, whenever a new AI model came out, I would occasionally use this as a test case. None of the previous models produced anything convincing. They often could not even draw the relative sizes and positions of the car and the parking space correctly.

A day or two ago, while everyone was praising Gemini 3, I still had not seen anything especially striking, so today I tried this example.

The result was not exactly what I wanted in a strict sense, but it was still a pleasant surprise. Gemini 3 built an interactive page where I could adjust the steering wheel and see the car's projected path. After playing with it a few times, I could roughly understand the underlying idea.

🔗 https://parking-math-master-717109000466.us-west1.run.app/`,
    excerpt: `While learning reverse parking, I once dug into the math behind how cars move and turn, and now I sometimes use that problem to test new AI models.`
  },
  "6916a94fd9abb9785db8f933": {
    content: `Each biological mutation is so tiny on its own, yet accumulated across billions of years it can turn the earliest single-celled organisms into all kinds of astonishing life. Eyes and brains are products of evolution too, but their intricacy is taken by some people as proof that a creator must exist, that "there must be a designer behind it."

Products and organisms, iteration and mutation, markets and nature: there are so many parallels between them that I started wondering:

Could we begin with an extremely simple product, iterate on it hundreds or thousands of times, and eventually arrive at a great product?

Since this is only an analogy, we may as well push it a little further.

Each biological mutation is always based on at least one living individual, and those individuals belong to species that have already secured some ecological niche, either now or in the past. Their existence has already been "validated" by nature.

A completely different, unvalidated organism does not just appear out of nowhere and wait for nature to validate it. Even a major mutation that makes an organism leap far away from its parents is often fatal.

Before life steps onto the next stair, it always has a stair beneath its feet. If a product is a continuation of something already validated, it has a stair to stand on too. The stair may be small, and it may still get squeezed off it. But a product aiming for breakthrough innovation may find that, after it jumps, there is no stair at all beneath it and it falls into the valley. In the rare cases, though, it may open up an entirely new path.

Also, not every organism validated by nature has the same degree of complexity or the same state of survival. Some lineages keep evolving and still never produce a brain comparable to that of mammals. Even some organisms favored by nature for hundreds of millions of years can only meet us today as fossils.

If we look at only one single evolutionary path, starting from a single-celled organism does not guarantee something beautiful, or even something with a good niche. Starting from an extremely simple product does not guarantee something great, or even something that survives.

But if we look at the sprawling whole tree of evolution, perhaps some branches do bear sweet fruit.

(Enough to feed a monkey well.)`,
    excerpt: `Products and organisms, iteration and mutation, markets and nature: there are so many parallels between them that I started wondering whether a great product could emerge from countless tiny iterations.`
  },
  "691152608b22275ef8ae8a9b": {
    content: `If a product is a pile of crap, how do you sell it?

Artist: First let me tape it to a wall.

Serious person: Vegetables grown with this organic fertilizer sell really well.

Elevator ad: Nitrogen-rich poop. Feed your plants. Nutrients high high high high high high high high high high high high high high high high high high.

Ordinary person: I would not sell it.

Mediocre person: Just look at the sheen, the color, the moisture, the feel. Now take a sniff. Purely natural, handmade, no industrial additives.

Goofball: Give one to your dog.

Someone with unusual taste: It is a melted chocolate.

Scammer: It is a melted chocolate.`,
    excerpt: `If a product is a pile of crap, how do you sell it?`
  },
  "691011f13ea7571a781f9b9b": {
    content: `What happens when you point a camera at its own screen?

Is it a Russian doll, or self-reference, an infinite corridor, or a spiral galaxy?`,
    excerpt: `What happens when you point a camera at its own screen?`
  },
  "690eb2ecd9abb9785d0be56e": {
    content: `Did OpenAI just release a new app?`,
    excerpt: `Did OpenAI just release a new app?`
  },
  "698b46d35a3e1a5df31f1329": {
    content: `Lately I have been seeing more and more discussion and products around "interactive content." I find the direction quite interesting, but so far I still have not seen a product in this space that people can really get hooked on and keep scrolling through.

## At first glance, it seems like a very interesting direction:

1. Could software distribution itself change? We already use recommendation engines to distribute content. Could websites be distributed the same way?

2. What happens when a long-form medium turns into a short-form medium? Blogs became microblogs. Long videos became short videos. Consumption and creation both became easier. So what if a "long website" became a "short website"?

3. Programmable social media. On existing social platforms, the forms of interaction between users are defined by the platform. Interaction is still relatively limited. What if users could define and program those interactions themselves?

What would happen if everyone in the world could program, and could write 1,000 lines of code in one second?

4. Alan Kay said that software is a metamedium. Software can contain other media, and anything other media can express, software can express too. McLuhan said the medium is the message. Short video is a hot medium, while software is a cool medium.

There are many other ways to look at this, but I will not expand on them here.

## But there are still questions that need answers:

1. Medium competition. Why would someone scroll interactive content instead of short video or Xiaohongshu? In some cases, the same interactive content might even work better as video.

2. What is interaction actually for?

Interaction can be harmful. In *Magic Ink*, Bret Victor divides software into manipulative software and informative software. Informative software should reduce interaction and rely more on visualization, because the eyes are faster than the hands.

Interaction definitely has value, but the cognitive cost introduced by interaction needs to be repaid several times over. Duolingo is a good example of this.

## Some attempts and experiments

Even before this current wave of AI, there were already many attempts to treat software itself as content.

1. Click a button and jump to a random webpage:
https://clicktheredbutton.com/

2. Explorable explanations, a concept proposed by Bret Victor. These examples treat interaction as part of the content, though they are long-form rather than short-form:
https://explorabl.es/
https://neal.fun/
https://ncase.me/
https://pudding.cool/

3. Every card is a game:
[Make and post games, all on your phone.](https://castle.xyz/)

After AI arrived, another wave of products appeared:

4. Short-content apps: Gizmo (the best one I have seen so far, though still hard to make truly addictive), Aippy

5. Lingguang: it adds some visual and interactive elements into AI replies, but the effect is fairly average

6. vibary.art, a project I made not long ago, uses webpages to present the content of books. That is also long-form content

If you try the products above, you will find that some of the content is genuinely pretty good, but it is still hard to make people keep coming back and scrolling.

In their current forms, some users will try them out for a while, but it is hard for them to grow much further unless there is another real innovation in product form.`,
    excerpt: `Lately I have been seeing more and more discussion and products around "interactive content." I find the direction quite interesting, but so far I still have not seen a product in this space that people can really get hooked on and keep scrolling through.`
  },
  "695a46f355437242ae2b6b20": {
    content: `What if every IM message could be programmed?

The idea started today when I wanted to send an image to a friend on WeChat, but I worried they might be at work, and if they opened it in public it could become a social disaster.

That led me to think: what if, when sending an image in an IM app, you could customize how the image is displayed? For example, the receiver might first see a blurred version and have to slide a finger to reveal the original.

Then another thought hit me: why stop at images? Why stop at just that one effect? What if users could choose how every single message should be displayed, and what kind of effect it should have?

When sending a message, the user could either let AI recommend an effect or type one in directly. Then AI could write the code from the text description. Ideally, the code would travel with the message itself and render right on screen.

After thinking of this, I asked Gemini in AI Studio to build a quick demo, and the video shows roughly what it looks like.`,
    excerpt: `What if every IM message could be programmed? The idea started when I wanted to send an image to a friend on WeChat, but worried they might open it in public while at work.`
  },
  "6950d42be48f1bd7abeccffc": {
    content: `A question that nobody can answer does not necessarily mean it has no answer.

Winning or losing a debate is not the same thing as a viewpoint being correct or incorrect.`,
    excerpt: `A question that nobody can answer does not necessarily mean it has no answer. Winning or losing a debate is not the same thing as a viewpoint being correct or incorrect.`
  },
  "69440dbe996bd665df314259": {
    content: `"Language is the world" and "Whereof one cannot speak, thereof one must remain silent" both come from Wittgenstein's *Tractatus Logico-Philosophicus*, which belongs to his early philosophy.

After language models appeared, people became fond of quoting these two lines, often without realizing that Wittgenstein later argued against his own early philosophy in *Philosophical Investigations*.

------

In his early philosophy, Wittgenstein believed that language and the world shared a structure, and that a certain layer of language corresponded to a certain layer of the world (see Figure 1).

Morality and aesthetics cannot be matched to concrete entities in the world, so they are unsayable. Yet he also thought these unsayable things were more important than the sayable ones.

People who quote "language is the world" may believe morality and aesthetics are also contained within language. But if they accept Wittgenstein's early philosophy, they should also accept that morality and aesthetics are unsayable.

But some of the starting points of his early philosophy were mistaken, which means its conclusions may also be questionable.

------

In his later philosophy, especially in *Philosophical Investigations*, Wittgenstein proposed ideas such as language games and family resemblance.

Language games means that meaning lies in use. Language is not defined by the object it corresponds to, but by how it is used.

Family resemblance means that linguistic phenomena often do not share one common essence. What is the essence of "knowledge" or "game"? Whenever you try to define them, there are usually things outside your definition that are still clearly called "knowledge" or "game."

------

Very few people bother to refute Wittgenstein's early philosophy, because Wittgenstein already did it himself.`,
    excerpt: `"Language is the world" and "Whereof one cannot speak, thereof one must remain silent" both come from Wittgenstein's *Tractatus Logico-Philosophicus*, but many people quote them without realizing that Wittgenstein later argued against his own early philosophy.`
  },
  "6941014288a0ed5aa10647c0": {
    content: `High-end models often need nothing more than the simplest prompts.`,
    excerpt: `High-end models often need nothing more than the simplest prompts.`
  },
  "693a54fd188dea3283c5162a": {
    content: `Over the past two weeks, I used Gemini 3 to turn 42 books into webpages, each one trying to express the book's unique vibe through visualization.

But I suspect you have also seen many flashy webpages made with Gemini 3 recently, and may already be a little tired of them, especially when the subject is books, which can easily sound sleepy to begin with.

Still, if you want to see what is actually inside this rabbit hole, the entrance is here:

https://www.vibary.art/en

I made this project because of earlier thoughts I had about media. Different media can convey different kinds of information and feeling, and you can sense that difference while engaging with them.

If you want concreteness, watch video. If you want efficiency, scroll social media. If you want emotional impact, listen to music. If you want experience, play games. If you want depth, read books. There is no need to resist a medium for being what it is.

The existence of AI makes it possible for different media to transform into one another, and people have already made many attempts in that direction. Among all media, the webpage, this old medium, keeps drawing my attention from time to time, so I have been running different experiments to see what kinds of things a webpage can hold.

Vibary is one early attempt among those experiments. I tried to translate another, even older medium, books, into webpages, just to see what kind of effect that might create.

The project is close to 100,000 lines of code, and 99.9% of it was written by AI. For a project with only frontend and no backend, where each part of the site is relatively independent, vibe coding is completely capable of handling it.

I usually keep several editors open at once and let different AIs work in parallel on different parts. Sonnet 4.5 handles the narrative thread for how to tell the story of a book. Gemini 3 handles design and frontend. Codex takes care of the dirtier, more repetitive parts.

Because the code was written by AI, and because time was limited, the current content and experience of Vibary are still incomplete and sometimes inaccurate. So please explore carefully. But do not panic. The site is basically harmless.`,
    excerpt: `Over the past two weeks, I used Gemini 3 to turn 42 books into webpages, each one trying to express the book's unique vibe through visualization.`
  },
  "69394e8b8d2d7e45961bfa19": {
    content: `A webpage animation that cost me 10 million.

I used vibe coding to make an expanding stacked-card animation, and it ended up costing me 10 million tokens and a full day of work.

It looked simple at first, but every time AI wrote it there were all kinds of tiny bugs. I had to send it back again and again before it finally became what it is now.`,
    excerpt: `A webpage animation that cost me 10 million. I used vibe coding to make an expanding stacked-card animation, and it ended up costing me 10 million tokens and a full day of work.`
  },
  "6939306f188dea3283a936dc": {
    content: `Prompt:

Hey, I want to build an experimental project. I want every book to have its own one-of-a-kind webpage. I do not want structured, generic webpages. Each page should match the vibe of the specific book it represents.

You should make full use of what the web can do and create a webpage experience that is both beautiful and interactive:

1. The core mechanic should be the narrative itself. Do not just explain ideas with text. Let users understand them through interaction.

2. Atmosphere matters more than information. The first screen, the hero section, should not primarily exist to deliver information. Its first job is to establish a tone. Before users read a single word, they should already feel the emotion of the book through color, motion, and typography.

3. Reject generic navigation. A navigation bar should not be a tool that pulls people out of the content. It should feel like part of the world itself.

4. Structure should follow content. Different kinds of books should lead to completely different page structures.

I want users, while interacting with the webpage, not only to understand the content of a book, but also to feel some emotional impact from it.

This site is not meant to replace reading. It is meant to spark the desire to read.

Now, please help me build this project.`,
    excerpt: `Prompt: I want every book to have its own one-of-a-kind webpage. I do not want structured, generic webpages. Each page should match the vibe of the specific book it represents.`
  },
  "68673d8991c7e8c1b95127e4": {
    content: `I made a little extension so you have something to do while AI is thinking.

Waiting for AI to think is like waiting for an elevator. Sometimes it takes forever, sometimes only a moment, but it is boring either way.

Ever since I started using o3 more often, I have been waiting for that elevator many times every day.

So I made an extension called interlude to take the edge off the boredom.

After you install interlude, whenever you use ChatGPT or DeepSeek, if it detects that the AI is thinking or generating an image, a small vocabulary card pops up in the lower-right corner. You can use that little slice of time to study English words, and it disappears automatically when the AI finishes thinking.

I do not know how many words it will help you learn, but it will definitely make the waiting less boring.

https://chromewebstore.google.com/detail/interlude/oafhmpindfnaffeacgjohkkbpdbahgdn?hl=en&authuser=0

(You can also click the extension icon manually on any site to open the card.)`,
    excerpt: `I made a little extension so you have something to do while AI is thinking.`
  },
  "68556fbff0d718ce7af8b90c": {
    content: `If AI can generate UI fast enough, do you get a natural-language-driven Duolingo?`,
    excerpt: `If AI can generate UI fast enough, do you get a natural-language-driven Duolingo?`
  },
  "68552e8ad82bae994aecfb8d": {
    content: `How do we find each other in an ocean of words?`,
    excerpt: `How do we find each other in an ocean of words?`
  },
  "685205ebdecb244934cafc29": {
    content: `An article about natural language interaction.`,
    excerpt: `An article about natural language interaction.`
  },
  "685131cab7f4ddcfdfa6c328": {
    content: `A new experiment in reading English:

1. Break paragraphs and sentences into smaller pieces, then translate them line by line.

Keep the translation as close as possible to the original, so your eyes can switch between the two more quickly and compare them more easily.

2. Mark certain words or phrases in both the original text and the translation.

Could this design make it easier for you to read English?`,
    excerpt: `A new experiment in reading English: break paragraphs and sentences into smaller pieces, then translate them line by line.`
  },
  "68456681380c5253de2cf58e": {
    content: `A bit more on this:

How choices differ across different levels of abstraction.`,
    excerpt: `How choices differ across different levels of abstraction.`
  },
  "6841591dbb87512bfaa155b5": {
    content: `You can now read nearly 50 handpicked English information sources directly on the Read Easy website, and it also supports AI summaries so you can decide whether an article is worth your time.

The new feature makes it easier to access and read English information, and also to learn English by reading things you actually care about.

🔗 https://www.read-easy.io/

The earlier form of the product was a browser extension. It used AI-generated annotations to lower the difficulty of reading English, but the extension still was not quite easy enough. Many people do not have a habit of reading English articles, or do not know what is worth reading, or find that extensions do not work well with content on certain sites. That led to this new feature.

Although the new feature is powered by an old technology, RSS, I would rather think of it as a lightweight browser.

Really, opening sources in the sidebar is not so different from opening websites in Arc's sidebar. It is just a different content format for the site.

RSS tends to make people think of knowledge management: a pile of read, unread, and read-later items, which makes reading feel heavy. A website feels lighter. You can open it casually and close it casually.

Yes, RSS does provide extra utility by letting you know when a site has updated, so you are less likely to miss an article.

But I do not think there is any book you must read or any article you cannot afford to miss, especially in an age when information can be found so quickly.

I call it a lightweight browser because its capabilities are still limited for now. It does not yet support opening any site you want, and it is mainly oriented around English information sources. The rest of the product is also designed around the same goal: making English reading easier.

In short, it is like a lightweight browser for exploring the English internet.

But none of that is the important part.

What matters is not the form itself or what definition you give it. What matters is whether it is useful to you.

If you want information beyond the Chinese internet, or if you want to learn English, maybe it can be a little useful to you.`,
    excerpt: `You can now read nearly 50 handpicked English information sources directly on the Read Easy website, with AI summaries to help decide what is worth your time.`
  }
};
