---
title: Interlude
year: "2025"
platform: "Chrome Extension"
summary: "一个在 AI 思考或生图时自动弹出单词卡片的浏览器扩展，把等待时间变成轻量的微学习时刻。"
tags:
  - 微学习
  - Chrome 扩展
  - 等待时间
websiteUrl: "https://chromewebstore.google.com/detail/interlude/oafhmpindfnaffeacgjohkkbpdbahgdn"
websiteLabel: "访问商店"
heroImage: "/images/apps/interlude/store-1.jpg"
heroAlt: "Interlude 在 AI 页面中的单词卡片界面"
webImage: "/images/apps/interlude/store-2.jpg"
webAlt: "Interlude 的设置页面与词库选项"
extensionImage: "/images/apps/interlude/store-3.jpg"
extensionAlt: "Interlude 的紧凑单词卡片界面"
---

![Interlude 在 AI 页面中的单词卡片界面](/images/apps/interlude/store-1.jpg)

Interlude 是一个为 AI 使用场景设计的浏览器扩展。它抓住的是一个很具体的问题：当 ChatGPT 或 DeepSeek 正在思考、生成回答或生图时，用户会反复经历一小段无聊但又无法完全离开的等待时间。

这个产品不是去延长停留时长，也不是把英语学习再做成一套复杂系统，而是把这些零碎的空档回收起来，变成几秒钟就能完成的一次轻量互动。

[Open in Chrome Web Store](https://chromewebstore.google.com/detail/interlude/oafhmpindfnaffeacgjohkkbpdbahgdn?hl=en&authuser=0)

## What It Does

当 Interlude 检测到支持的网站仍在生成内容时，会自动弹出一张小型单词卡片。你可以看单词、尝试拼写、听发音，然后在 AI 结束输出后自然回到原来的任务。

它也支持手动打开，所以即使不在 AI 网站里，也可以把它当成一个随手可用的小卡片工具。

## Why This Format

我比较在意的一点是，这个产品并不试图假装“等待时间也该被高效管理”。它更像是在承认等待本身 unavoidable 的前提下，给用户一个足够轻、不造成负担的替代动作。

这也是为什么 Interlude 的形态是一个可拖拽、会自动出现也会自动消失的小窗，而不是一个需要专门进入的完整学习应用。

## Settings

![Interlude 的设置页面与词库选项](/images/apps/interlude/store-2.jpg)

扩展提供多个考试词库，支持本地保存设置，也支持自动播放单词发音。整体上它更偏向“微学习插件”而不是“背词平台”。

当前自动弹出的站点主要支持 ChatGPT 和 DeepSeek，判断方式基于页面 DOM 状态，因此产品本身也保持了很强的实验性和迭代感。

## Privacy And Boundaries

![Interlude 的紧凑单词卡片界面](/images/apps/interlude/store-3.jpg)

Interlude 是一个本地优先的扩展。设置保存在浏览器本地，扩展会读取页面结构来判断 AI 是否仍在思考，但不会把浏览历史、页面正文、提示词内容或账号信息发送到项目自建服务器。

对我来说，这个边界很重要。Interlude 的价值来自它在正确的时机出现，而不是通过更重的数据收集来“理解”用户。
