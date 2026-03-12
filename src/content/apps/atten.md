---
title: Atten
year: "2023"
summary: "结合 GUI 和 LUI，用 AI 写作、学语言、编程"
tags:
  - AI
  - Web
heroImage: "/images/apps/atten/chat-ui.webp"
heroAlt: "Atten Chat UI"
webImage: "/images/apps/atten/noten.webp"
webAlt: "Atten Noten writing workflow"
extensionImage: "/images/apps/atten/coden.webp"
extensionAlt: "Atten Coden HTML prototyping"
---

Atten 尝试将 GUI 与 LUI 结合，以此做为一种范式，去做一个 App Store，开发者可以在平台上创建应用，并给消费者使用。

但是在当时，我不确定  GUI 与 LUI 的结合可以产生什么样的结果，以及如果这个产品没有流量，是没有开发者愿意来开发应用的。

于是，就想着在做铲子之前，自己先用铲子挖几下，看看有没有金子。

Atten 围绕 AI 辅助写作、学语言、AI 编程 几个场景，做了一些应用。并且其提供强大 AI 聊天功能。

其中 AI 编程的功能，具体指可以在浏览器上直接编辑和预览 AI 生成的代码，也就是后面出现的 Claude Artifact 以及 ChatGPT 的 Canvas。

## AI 编程

Atten的功能 Coden 的定位，让人们可以使用自然语言完成一些简单的编程任务，不论你是编程经验丰富，想要借助AI更高效完成代码的人，或是编程小白，想要学习和使用编程语言，Coden都可以满足你的需求。

你可以向AI描述需求，AI将完成代码的编写，编写完成后将自动运行，你可以直接看到运行的结果。

Coden支持在浏览器上直接运行Python，HTML，Mermaid让你可以无需下载安装其它软件，就能使用。

而且代码的运行和文件都停留在本地浏览器中，可以保证你的数据安全。

为了让更多人可以使用，我们还做了许多优化，例如可以根据代码或报错信息自动安装所需的库或包。

和ChatGPT的代码解释器对比，Coden支持更丰富的库、语言、代码能力，还支持编辑代码，以及实时显示可互动的HTML页面等。


- `AI Code Generation`：用自然语言描述需求，直接生成代码。
- `Run in browser`：不用本地安装环境，直接在浏览器运行。
- `Local File System`：文件留在本地浏览器，避免上传云端。
- `Package Management`：根据代码自动安装 Python 包，也支持手动查找。
- `Python / HTML / Mermaid`：脚本、网页原型、小游戏和图表都能覆盖。


<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/coden.webp" alt="Atten Coden HTML 原型截图" />
  <img src="/images/apps/atten/coden-python.webp" alt="Atten Coden Python 数据抓取截图" />
  <img src="/images/apps/atten/coden-mermaid.webp" alt="Atten Coden Mermaid 思维导图截图" />
</div>

## AI 辅助写作


Atten 的另一个功能 Noten， Noten 在思考的问题是如何与 AI 协作创作文章。

Notion 也在做类似的事情，但在当时，Notion 并不强调对话，而是直接生成一个结果，导致 AI 给的常常不是自己想要的。而 Noten 则强调 AI 对话，你可以在创作的过程中在一个对话里面持续和 AI 沟通，让 AI 对本次创作有更深的理解，从而有更好的输出。

在界面上，左边是和 AI 的对话区域，而右边则是一个富文本编辑器，两边的数据如何进行流通呢？

在今天 LLM 的工具调用已经很成熟了，LLM 可以通过工具直接编辑文档的内容，但在当时 LLM 工具调用还不成熟，让 LLM 直接编辑文档不是一个靠谱的方案。

Noten 使用拖拽交互来解决这个问题。你有一篇文章，但是你现在想要处理某个段落，你可以把这个段落直接拖拽到对话区域，然后松开鼠标，就可以把这个段落发送给 AI 了。如果 AI 给了一长串的回复，而你只想要其中的某一部分呢，没问题，你只需要把想要的部分拖拽到文章中想要的位置就行了。通过拖拽的方式，你可以很方便且自然地与 AI 进行协作。 

除了拖拽之外，在 Noten 中，也可以用鼠标选择一段文本，然后选择或输入指令，这个也会自动发送到对话区域。两种交互方式区别在与，拖拽用于一些高频的文本处理，而选取文本则适用于更自定义更临时的场景。


<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/noten.webp" alt="Atten Noten 拖拽写作界面" />
  <img src="/images/apps/atten/noten-ask-ai.webp" alt="Atten Ask AI Anything 功能截图" />
  <img src="/images/apps/atten/noten-focus.webp" alt="Atten Noten Markdown 专注模式截图" />
</div>



## AI 学语言

Atten 提供的功能 Auto X，可以让你在和 AI 的聊天过程中学习语言。

Auto X 里面的 X 意味着，这个功能并不是固定的，而是可以通过 Prompt 自定义。具体而言，在学语言这个场景下，你可以使用 Auto Translate 和 Auto Proofread。

每次你或者AI发送一条消息之后，会有一个独立于对话上下文的 LLM，会去分析发送的消息。对于 Auto Proofread，可以校对你发送的文本，检查当中是否有拼写或语法错误。而 Auto Translate 则可以翻译 AI 的回复，让 AI 回复变成双语版本。

由于 X 是自定义的，因此它也可以用于学语言之外的场景。


<div class="atten-gallery atten-gallery--single">
  <img src="/images/apps/atten/auto-translate.webp" alt="Atten Auto Translate 功能截图" />
</div>



### Chat UI

Atten 基础的聊天功能也十分强大。 


- `Chat History`：保留对话历史，方便回到旧项目继续推进。
- `GPT-4 / 多模型`：让高质量回答成为工作流的一部分。
- `Edit messages`：不是重新开新对话，而是在同一上下文里修正提问。
- `Regenerate`：为同一个问题快速试不同答案和不同模型。
- `Markdown Render`：让长文本、代码和结构化内容更易读。
- `Multiverse`：把一个对话拆成多条思路分支，适合发散想法和推进复杂问题。

<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/chat-ui.webp" alt="Atten Chat UI 首页截图" />
  <img src="/images/apps/atten/chat-edit.webp" alt="Atten 编辑消息功能截图" />
  <img src="/images/apps/atten/chat-regenerate.webp" alt="Atten 重新生成回复功能截图" />
  <img src="/images/apps/atten/chat-multiverse.webp" alt="Atten multiverse 多分支对话截图" />
</div>
