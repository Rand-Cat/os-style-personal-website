---
title: Atten
year: "2023"
platform: "Web"
summary: "结合 GUI 和 LUI，用 AI 写作、学语言、编程"
heroImage: "/images/apps/atten/chat-ui.webp"
heroAlt: "Atten Chat UI"
webImage: "/images/apps/atten/noten.webp"
webAlt: "Atten Noten writing workflow"
extensionImage: "/images/apps/atten/coden.webp"
extensionAlt: "Atten Coden HTML prototyping"
---

Atten 是我之前做过的一个 AI workspace。它不是只解决单一点需求，而是想把“和 AI 一起思考”拆成几个更具体的场景，然后在同一个产品里把这些场景串起来。

从仓库里的官网文案和首页结构来看，Atten 当时的核心定位很明确: 它想成为一个由 AI 驱动的 all-in-one place，让用户用新的方式去思考、学习、写作和编程。

## 我比较在意的点

- 它不是只有一个聊天框，而是试图把不同任务拆成不同工作区。
- 写作、记录、发散想法和实际运行代码，可以在同一个产品里连续发生。
- 产品价值不只来自模型本身，也来自更贴合任务的交互设计，比如拖拽写作、浏览器内运行代码、围绕上下文持续推进对话。

## 首页概览

<div class="atten-gallery">
  <img src="/images/apps/atten/chat-ui.webp" alt="Atten Chat UI" />
  <img src="/images/apps/atten/noten.webp" alt="Atten Noten writing workflow" />
  <img src="/images/apps/atten/coden.webp" alt="Atten Coden HTML prototyping" />
</div>

## 主要模块

### Chat UI

Atten 的聊天部分强调的是更完整的 AI 使用体验，而不只是“发一条消息，收一条回复”。官网里主打了对话历史、多模型、编辑消息、重新生成、Markdown 渲染和 multiverse 这些能力，目标是让 AI 对话变成一个能持续推进项目的工作界面。

官网里这一块写得很明确: 它希望用户不是一次性问答，而是把历史对话、上下文修改和多分支探索都留在同一个系统里。这样 AI 才更像一个持续协作的界面，而不只是一个回复框。

<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/chat-ui.webp" alt="Atten Chat UI 首页截图" />
  <img src="/images/apps/atten/chat-edit.webp" alt="Atten 编辑消息功能截图" />
  <img src="/images/apps/atten/chat-regenerate.webp" alt="Atten 重新生成回复功能截图" />
  <img src="/images/apps/atten/chat-multiverse.webp" alt="Atten multiverse 多分支对话截图" />
</div>

这一部分当时的功能重点大致可以归纳成：

- `Chat History`：保留对话历史，方便回到旧项目继续推进。
- `GPT-4 / 多模型`：让高质量回答成为工作流的一部分。
- `Edit messages`：不是重新开新对话，而是在同一上下文里修正提问。
- `Regenerate`：为同一个问题快速试不同答案和不同模型。
- `Markdown Render`：让长文本、代码和结构化内容更易读。
- `Multiverse`：把一个对话拆成多条思路分支，适合发散想法和推进复杂问题。

### Noten

Noten 是面向写作和记录的部分。相比传统文档，它更强调一边写、一边问 AI、一边拖拽内容来组织想法，让写作、润色和发散思路发生在一个连续流里。

从官网描述看，Noten 不是单纯的 AI 写作补全，而是试图重新组织“写作时怎么和 AI 协作”这件事。它把拖拽、选中文本提问、Markdown 专注模式这些能力放在一起，让文档和 AI 不再是两个分开的界面。

<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/noten.webp" alt="Atten Noten 拖拽写作界面" />
  <img src="/images/apps/atten/noten-ask-ai.webp" alt="Atten Ask AI Anything 功能截图" />
  <img src="/images/apps/atten/noten-focus.webp" alt="Atten Noten Markdown 专注模式截图" />
</div>

官网里比较突出的功能点包括：

- `Drag and Drop`：把笔记、问题或者 prompt 直接拖给 AI，而不是反复复制粘贴。
- `Ask AI Anything`：针对某一行或某几行文字继续追问、润色、检查逻辑或发散思路。
- `Markdown / Focus`：用更轻量的写作界面保持专注，把格式感降到更低。
- `AI Reading Assistance`：把需要精读的内容贴进来，配合 AI 一段段理解。

### Coden

Coden 负责把“描述需求”直接延伸到“生成并运行代码”。官网里的方向是支持 Python、HTML 和 Mermaid，让用户可以在浏览器里直接做脚本、页面原型、小游戏或者图表。

它有意思的地方在于，它不是只停留在“AI 给你一段代码”，而是把代码编辑、运行、文件系统和包管理都包进浏览器里，让生成、修改、运行形成闭环。

<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/coden.webp" alt="Atten Coden HTML 原型截图" />
  <img src="/images/apps/atten/coden-python.webp" alt="Atten Coden Python 数据抓取截图" />
  <img src="/images/apps/atten/coden-mermaid.webp" alt="Atten Coden Mermaid 思维导图截图" />
</div>

官网对 Coden 的介绍基本围绕这些点展开：

- `AI Code Generation`：用自然语言描述需求，直接生成代码。
- `Run in browser`：不用本地安装环境，直接在浏览器运行。
- `Local File System`：文件留在本地浏览器，避免上传云端。
- `Package Management`：根据代码自动安装 Python 包，也支持手动查找。
- `Python / HTML / Mermaid`：脚本、网页原型、小游戏和图表都能覆盖。

### Auto Translate / Proofread

除了三个主模块，官网里还单独提到过 `Auto Translate` 和 `Auto Proofread`。这部分更像是把 AI 的语言能力做成一个可随时调用的小工具，不只为翻译服务，也为语言学习和日常表达服务。

<div class="atten-gallery atten-gallery--single">
  <img src="/images/apps/atten/auto-translate.webp" alt="Atten Auto Translate 功能截图" />
</div>

按官网原本的说法，这一块既能自动识别语言做翻译，也能直接对输入内容做语法和拼写纠正。它想表达的不是“多一个按钮”，而是让 AI 语言处理直接进入用户的日常工作流。

## 官网

[Visit atten.ai](https://atten.ai)
