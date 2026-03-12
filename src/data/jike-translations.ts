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
    title: "Updates",
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
  }
};
