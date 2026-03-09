---
title: Read Easy
year: "2025"
platform: "Web / Chrome Extension"
summary: "一个围绕英语阅读设计的产品：既有网页版信息源阅读器，也有浏览器插件阅读模式，还在内部用一套自定义 DSL 把 AI 标注转成可读、可交互的阅读界面。"
heroImage: "/images/apps/read-easy/home.png"
heroAlt: "Read Easy 官网首页截图"
webImage: "/images/apps/read-easy/home.png"
webAlt: "Read Easy 官网首页截图"
extensionImage: "/images/apps/read-easy/open-extension.png"
extensionAlt: "Read Easy 浏览器插件打开阅读模式的引导截图"
---

![Read Easy 官网首页截图](/images/apps/read-easy/home.png)

Read Easy 是我围绕“让阅读英语变简单”这件事，持续往前推出来的一套产品。它不是单一形态，而是分成了两层：

- 一个网页产品，用来直接阅读精选英语信息源
- 一个浏览器插件，用来在任意英文网页上进入专门的阅读模式

[Website](https://www.read-easy.io/)

[Chrome Extension](https://chromewebstore.google.com/detail/read-easy/imnkejdlaonpmdddpfbbbedmfonoehdm)

## Why It Exists

我一直在想一个问题：如果 AI 翻译已经这么强了，为什么还要自己读英语原文？

对我来说，答案不是“为了考试”或者“为了更高效获取信息”，而是语言本身有一些东西是不能完全被替换掉的。你当然可以看翻译，但很多语气、节奏、表达方式，只有在原文里才成立。

所以 Read Easy 的目标不是把英语抹掉，而是降低阅读英语时最难跨过去的那道坎。

## Web

网页版后来变成了一个更轻的英语信息入口。你可以直接在上面阅读精选信息源，而不是自己先想“我该去哪里找值得读的英文内容”。

这部分产品更像一个专门为英语阅读设计的简易浏览器：不是强调管理，不是强调收藏堆积，而是让你可以随手打开、随手阅读、随手离开。

## Chrome Extension

![Read Easy 浏览器插件打开阅读模式的引导截图](/images/apps/read-easy/open-extension.png)

插件则是另一条路线。它会在原始网页之上进入阅读模式，自动提取正文，移除干扰元素，再叠加一套专门为英语阅读设计的辅助能力。

这里面比较核心的功能包括：

- 英语标记：自动翻译难词、重点词，标出人名、品牌、媒体名，并对长难句做拆分
- 中英混合 / 双语阅读：在保留原文的同时，提供更低门槛的理解方式
- 即划即译：选中单词或短语，就立刻给出结合语境的解释
- AI 问答：哪里不懂就直接问哪里
- 边听边读：用听觉辅助把阅读继续推进下去

插件和网页不是重复关系。网页解决“读什么”，插件解决“怎么读”。

## The DSL Layer

Read Easy 里有一层我自己定义的 DSL，用来把 AI 生成的阅读标注变成结构化界面，而不是一大段散乱的解释文本。

对用户来说，他们看到的是更容易进入的阅读界面；对我来说，这层 DSL 更像一个中间层，让模型输出先变成稳定的结构，再由前端去决定它最后长成什么样子。

这也是为什么我后来想把它单独拿出来讲。因为它不是一个孤立的小技巧，而是整个阅读体验能成立的基础设施之一。
