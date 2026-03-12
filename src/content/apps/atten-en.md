---
title: Atten
locale: en
translationKey: atten
year: "2023"
summary: "Combining GUI and LUI for AI writing, language learning, and coding"
websiteUrl: "https://www.producthunt.com/products/atten-ai/launches/atten-ai"
websiteLabel: "Watch on Product Hunt"
tags:
  - AI
  - Web
  - Sunset
heroImage: "/images/apps/atten/chat-ui.webp"
heroAlt: "Atten Chat UI"
webImage: "/images/apps/atten/noten.webp"
webAlt: "Atten Noten writing workflow"
extensionImage: "/images/apps/atten/coden.webp"
extensionAlt: "Atten Coden HTML prototyping"
---

Atten was an attempt to combine GUI and LUI into a new interaction pattern, and use that as the basis for an App Store where developers could build apps on the platform for end users.

At the time, though, I did not know what kind of results that combination of GUI and LUI could really produce. And if the product had no traffic, no developer would want to build on it anyway.

So before trying to sell shovels, I decided to dig a little with the shovel myself and see whether there was any gold in the ground at all.

Atten explored several scenarios around AI-assisted writing, language learning, and AI programming. It also included a fairly powerful AI chat experience.

Its AI programming feature meant editing and previewing AI-generated code directly in the browser, something that later showed up in products like Claude Artifacts and ChatGPT Canvas.

The product is now offline, but you can still watch the launch video on Product Hunt.

## AI Programming

Atten's coding feature, Coden, was designed to let people complete simple programming tasks with natural language. Whether you were an experienced programmer trying to work faster with AI, or a beginner trying to learn and use programming languages, Coden was meant to be useful.

You could describe a requirement to the AI, the AI would write the code, and once the code was ready it would run automatically so that you could immediately see the result.

Coden supported running Python, HTML, and Mermaid directly in the browser, so you did not need to install extra software locally.

The code execution and files also stayed inside the local browser, which helped keep your data private.

To make the feature more accessible, we added many conveniences, such as automatically installing the required libraries or packages based on the code or error output.

Compared with ChatGPT's code interpreter, Coden supported a wider range of libraries, languages, and coding workflows. It also allowed editing code directly and previewing interactive HTML pages in real time.

- `AI Code Generation`: describe a requirement in natural language and generate code directly.
- `Run in browser`: no local setup required, everything runs in the browser.
- `Local File System`: files stay in the local browser instead of being uploaded.
- `Package Management`: automatically installs Python packages from code and errors, while still allowing manual lookup.
- `Python / HTML / Mermaid`: enough to cover scripts, web prototypes, mini-games, and diagrams.

<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/coden.webp" alt="Atten Coden HTML prototype screenshot" />
  <img src="/images/apps/atten/coden-python.webp" alt="Atten Coden Python data extraction screenshot" />
  <img src="/images/apps/atten/coden-mermaid.webp" alt="Atten Coden Mermaid mind map screenshot" />
</div>

## AI-Assisted Writing

Another Atten feature was Noten. The core question behind Noten was how people should collaborate with AI when writing.

Notion was exploring something similar, but at the time it did not emphasize dialogue. It simply generated a result directly, which often meant the AI output was not actually what the user wanted. Noten emphasized conversation instead. During the writing process, you could keep talking with the AI inside one thread, allowing the AI to build a deeper understanding of the work in progress and therefore produce better output.

In the interface, the left side was the AI conversation area, while the right side was a rich text editor. The question was: how should information flow between the two?

Today, tool use for LLMs is relatively mature, and an LLM can directly edit a document through tools. But at the time, that was not a reliable approach yet.

Noten solved the problem through drag-and-drop interaction. If you had an article and wanted to work on a specific paragraph, you could drag that paragraph directly into the conversation area and drop it, which sent it to the AI. If the AI responded with a long answer and you only wanted one part of it, that was fine too: just drag the part you wanted back into the article where it belonged. This made collaboration with AI feel both natural and lightweight.

Besides drag-and-drop, Noten also let you select text with the mouse and then choose or type an instruction, which would also be sent into the conversation area automatically. The difference between the two modes was that dragging worked well for frequent text manipulation, while text selection was better for more temporary and more customized situations.

<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/noten.webp" alt="Atten Noten drag-and-drop writing interface" />
  <img src="/images/apps/atten/noten-ask-ai.webp" alt="Atten Ask AI Anything screenshot" />
  <img src="/images/apps/atten/noten-focus.webp" alt="Atten Noten Markdown focus mode screenshot" />
</div>

## AI for Language Learning

Atten also included a feature called Auto X, which let you learn languages while chatting with AI.

The X in Auto X meant that the feature was not fixed. It could be customized through prompting. In the language-learning scenario, for example, you could use Auto Translate and Auto Proofread.

Every time you or the AI sent a message, a separate LLM outside the main conversation context would analyze that message. In Auto Proofread mode, it could correct spelling or grammar errors in what you wrote. In Auto Translate mode, it could translate the AI's reply and turn the conversation into a bilingual one.

Because X was customizable, the same mechanism could be used outside language learning as well.

<div class="atten-gallery atten-gallery--single">
  <img src="/images/apps/atten/auto-translate.webp" alt="Atten Auto Translate screenshot" />
</div>

### Chat UI

Atten's core chat interface was also quite capable.

- `Chat History`: keep past conversations so older projects can be resumed later.
- `GPT-4 / Multi-model`: make high-quality responses part of the normal workflow.
- `Edit messages`: revise a question inside the same context instead of starting a new thread.
- `Regenerate`: quickly try multiple answers and multiple models for the same question.
- `Markdown Render`: make long text, code, and structured content easier to read.
- `Multiverse`: split one conversation into multiple branches, useful for divergent thinking and complex problem solving.

<div class="atten-gallery atten-gallery--wide">
  <img src="/images/apps/atten/chat-ui.webp" alt="Atten Chat UI home screenshot" />
  <img src="/images/apps/atten/chat-edit.webp" alt="Atten edit message screenshot" />
  <img src="/images/apps/atten/chat-regenerate.webp" alt="Atten regenerate reply screenshot" />
  <img src="/images/apps/atten/chat-multiverse.webp" alt="Atten multiverse branching conversation screenshot" />
</div>
