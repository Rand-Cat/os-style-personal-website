---
title: From Simple Questions to Analogy
date: 2023-02-11
excerpt: Understanding ChatGPT through linguistics and cognitive science, from direct prompting to analogy-based prompting.
locale: en
translationKey: from-simple-questions-to-analogy
draft: false
---

<div class="block-1">
  <p>Warning: ChatGPT often fabricates answers and can sound convincing while being wrong. This matters especially when facts, logic, or complex concepts are involved.</p>
  <p>At the moment, it is better suited to tasks that are easy to verify, repetitive, open-ended, or tolerant of lower accuracy.</p>
</div>

*In this article, "ChatGPT" and the underlying model "GPT-3" are used somewhat interchangeably. "Question," "prompt," and "instruction" are also used loosely.*

# Outline
1. Understanding GPT-3
2. Asking directly
3. Using analogy and categories
    1. Assigning roles
    2. Using analogy

# 1 Understanding GPT-3

GPT-3 was trained on internet text and acquired the ability to predict what text should come next based on what came before. It is a bit like a smartphone keyboard. If you type "today I", the keyboard may suggest "am", "will", or "feel". GPT-3 is far more general and powerful, and it can handle many different tasks. It even seems to exhibit surprising abilities such as pattern recognition. But **at its core, it is still a text predictor**.

Language is a central part of human thought. People turn their ideas into language and publish them on the internet. Behind language sit knowledge, culture, and different ways of thinking across time and place. Through language, GPT-3 appears to have learned something like human thinking and human language. Even if that learning is only a shallow imitation rather than genuine understanding, we can still **borrow ideas from linguistics and cognitive science to understand and use GPT-3**.

> Successful prompting methods need to draw from linguistics, communication theory, computer science, or machine learning, because **language models are the sum of all human language output**.
> 
> Laria Reynolds

**ChatGPT often resembles humans in striking ways**

ChatGPT lacks common sense sometimes, and so do humans. ChatGPT is bad at arithmetic, and so are humans (`733 * 818 = ?`). ChatGPT is weak at reasoning, and so are humans when they rely on fast intuition. ChatGPT invents answers, and humans do that too through myths or unsupported claims. ChatGPT is slow at deliberate thinking, and so are humans. ChatGPT has a limited context window, and humans have limited working memory. Some people say humans know how to choose different tools for different problems, but technically ChatGPT can also be connected to tools.

**Prompting ChatGPT should feel closer to talking to a person**

> If a human would not understand your intent, why would GPT-3 understand it? This is not telepathy. A few words in a prompt can belong to countless styles of human text. A useful thought experiment is this: if someone suddenly sent you that prompt with no context, how would you interpret it? As a joke, trolling, spam, or something else? Prompts should follow Gricean principles: statements should be truthful, informative, and relevant. People should not throw in irrelevant details or illogical claims, because in human writing, even in fiction, that often implies those details matter. When a prompt fails and GPT-3 keeps drifting into the wrong completion mode, it may mean the prompt has not constrained the target output strongly enough. Sometimes you need to go further and write the first few words or sentences of the output you want.
> 
> Gwern

# 2 Asking Directly

A prompt can simply be **a question**. This is the most common and simplest way to use ChatGPT.

![](https://files.mdnice.com/user/40454/d2b83a24-5fb9-451d-9cee-daf3c896998d.png)

A prompt can also be an **instructional task**, including:

1. **General tasks**, such as "translate" or "summarize"
2. **Specific tasks**, where you describe exactly what kind of task you want, for example:
    1. specifying the output **format**, such as a table, code block, or list;
    2. specifying the **parts** of the output, such as background, main body, and conclusion;
    3. specifying **content constraints**, such as length limits or avoiding negative information;

*The ability to perform a task without retraining the model is often described as in-context learning or zero-shot prompting.*

![General tasks](https://files.mdnice.com/user/40454/fee31bc2-e720-4632-88f6-4385a92abad6.png)

![Specific tasks](https://files.mdnice.com/user/40454/1d65c29c-d171-478c-bd06-e40969f989c5.png)

Still, some tasks do not work well because ChatGPT cannot fully infer the user's intent.

Other tasks are simply **hard to describe** in plain language, or would require too much explanation.

That is where analogy and categories become useful.

# 3 Using Analogy and Categories

ChatGPT has some degree of **pattern recognition** ability, limited as it still is. It can deal with complex concepts, understand the characteristics of a **category**, notice structural **regularities** in prompts, and produce many forms of **analogy**.

![There are two layers of analogy here: first, the analogy between each sentence about the solar system and the atom; second, the way examples 1 and 2 imply how to complete 3, 4, and 5](https://files.mdnice.com/user/40454/93efa348-04b9-44ff-8d95-a4f8d97a2267.png)

This ability is quite close to the way humans think.

**Categories and analogy are deeply related**

> It is precisely because we can categorize through analogy that we are able to notice similarities and use them to deal with new or strange situations. When we connect a new situation to earlier experiences stored in memory, those earlier experiences can guide our present behavior. Analogy is a foundational feature of the mind. It lets us draw on the wisdom of past experience, whether the concepts involved are labeled ones such as dog, cat, joy, resignation, or contradiction, or unlabeled ones such as that time I forgot my keys and stood in the cold for hours. These concepts, concrete or abstract, become selectively activated one after another as the mind searches for analogies. Without this ceaseless process, we could not form mental representations of our situation, experience complex emotions, or produce ordinary or profound thoughts. Without past experience there can be no present thought. More precisely, thought only becomes possible when analogy links experience across time.
> 
> *Surfaces and Essences*, Douglas Hofstadter

# 3.1 Assigning Roles

Having ChatGPT **play a role** is a common use of categories.

For example, you can ask ChatGPT to **play a specific person**, such as Gandhi or Ayn Rand, instead of trying to spell out the exact moral framework you want through direct instructions or examples. You can also discuss philosophy with Socrates, or model a **professional role**, such as teacher and student. Here are [more examples](https://github.com/f/awesome-chatgpt-prompts).

*Sometimes ChatGPT breaks character and slips back into being a generic assistant. In that case, you can remind it of the role again.*

![](https://files.mdnice.com/user/40454/7c84cde1-763c-49f7-97b7-3f8475393d01.png)

This method can introduce complex viewpoints and useful assumptions about the background of a problem, which might otherwise require a lot of explanation.

Asking ChatGPT to write in the style of a particular author also belongs to this category.

You can even ask ChatGPT to play **non-human things**, such as a [virtual machine](https://www.engraved.blog/building-a-virtual-machine-inside/).

![](https://files.mdnice.com/user/40454/c96c9751-706e-4d41-a65e-1659c816ff0c.png)

Besides asking ChatGPT to take on a role, **the user can take on a role too**, such as asking ChatGPT to explain something to a five-year-old.

*The results can differ between Chinese and English.*

![](https://files.mdnice.com/user/40454/26dd1f8b-30fc-4654-86ef-e0eeab6eb64c.png)

This method works best for categories that people already recognize clearly. There are also categories that are harder to name directly and do not have a standard verbal description. Those are often better expressed through analogy.

# 3.2 Using Analogy

You can show ChatGPT some **examples** of what you want it to do. ChatGPT can detect the **pattern** in those examples and **infer by analogy** what kind of answer to produce.

Examples are an effective way to communicate certain tasks. When the task requires a specific format, examples may be simpler and more revealing than an abstract description of the task itself.

*This is often called few-shot prompting, or n-shot prompting when n examples are provided.*

![Let ChatGPT discover the pattern by itself](https://files.mdnice.com/user/40454/577c94d5-5138-41a2-bb5b-aea2e213d04d.png)

For **complex patterns**, giving only a few examples without explanation may not be enough. In those cases, you can add more descriptive guidance.

A prompt can often be thought of as having these parts:

1. **Instruction**: describe the task to be performed, possibly in detail
2. **Format**: specify the format of the answer
3. **Examples**: provide a few examples
4. **Input**: provide the data to be processed

*It is often helpful to separate these parts with `---` or fenced code blocks.*

![](https://files.mdnice.com/user/40454/662f8172-b234-4e66-99c3-71821764ed61.png)

For complex patterns, examples should:

1. include **more examples** so ChatGPT has enough signal to learn from;
2. be **diverse** and cover different cases evenly. For instance, if the allowed outputs are only "yes" or "no", examples should not heavily favor one side, or the model may become biased toward that answer.

That said, more examples are not always better. There is still a lot of trial and error involved.

Because ChatGPT supports conversation, when it fails to detect the pattern correctly, you can also provide follow-up feedback.

On the other hand, for instructions ChatGPT already understands well, such as straightforward translation, direct instructions are usually better. Adding examples can actually make the result worse.

**A real example: using analogy to build a game**

AI Dungeon, a text-based dungeon game, used analogy to generate countless fictional world settings. See [World Creation by Analogy](https://aidungeon.medium.com/world-creation-by-analogy-f26e3791d35f).

This is the prompt it used to generate game worlds:

> Your task is to generate a rich and detailed world that excites players to explore it.
> 
> Genre: floating-world fantasy
> 
> Name: the world of Anarop
> 
> World: Anarop is one of many worlds, a land of green fields and small villages with shining cities floating in the night sky above them. When a child turns sixteen, they must choose whether to remain on the pastoral land, growing food and living a simple and pleasant life, or stay in the sky to defend Anarop from unknown dangers, living among the clouds in a dangerous, brief, and thrilling way.
> 
> Genre: dark fantasy
> 
> Name: the world of Calamea
> 
> World: Calamea is a dual world inhabited by humans and demons. It has towering mountains and lush valleys between them, where a few human kingdoms have built protected cities surrounded by walls against demonic invasions. Human kingdoms struggle to survive and develop, always living under the fear of hellish demons and their twisted spawn. Faced with a terrifying surge unlike anything seen for generations, the people of Calamea finally begin to unite.
> 
> Genre: fantasy
> 
> Name:
> 
> World:

**In practice, these methods can be freely combined.**

Just as human thinking needs not only analogical reasoning but also logical reasoning, answering complex questions well requires **strengthening ChatGPT's logical structure**. In the next article, I will explain how to make ChatGPT reason more reliably.
