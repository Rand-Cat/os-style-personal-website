---
title: Strengthening ChatGPT's Logical Reasoning
date: 2023-02-12
excerpt: Why ChatGPT often struggles with multi-step reasoning, and how techniques like Chain of Thought, Self-Ask, and multiple-solution comparison can help.
locale: en
translationKey: enhancing-chatgpt-logical-reasoning
draft: false
---

<div class="block-1">
  <p>This article is better suited to readers with more complex needs, or to people who want a deeper understanding of prompting.</p>
  <p>Simple questions rarely require the methods described here, and for highly complex problems ChatGPT is still not always the best tool.</p>
</div>

> System 1 operates automatically and quickly, with little or no effort and no sense of voluntary control. In familiar situations, the intuitions it produces are often accurate. But System 1 is also biased, and in many circumstances it makes systematic errors. It often simplifies difficult questions into easier ones, and when it comes to logic and statistics, it knows almost nothing.
> 
> *Thinking, Fast and Slow*

# Outline
1. Why there is not enough logic
2. Methods for improving logical reasoning
    1. Chain of Thought
    2. Asking sub-questions (Self-Ask)
    3. Generating multiple solutions
3. Challenging human intuition
    1. Solving mathematical problems
    2. Machine intuition

# 1 Why there is not enough logic

As everyone knows, **ChatGPT is not very good at logical reasoning**.

![The correct answer is: 7 even numbers and 3 odd numbers. ChatGPT even copied the digits incorrectly](https://files.mdnice.com/user/40454/864b6be9-0dc1-44d6-9538-f238ac77fc96.png)

But humans are often like this too. When we rely only on intuition, or when our thinking jumps too quickly without working through a problem step by step, we easily make mistakes and end up with the wrong answer. When people encounter a problem like `257 * 37`, we know not to rush out an answer. Instead, we calculate internally, keeping temporary results in working memory. For harder problems, we make rough notes or use tools, and that is how we eventually arrive at the correct result.

*Note: working memory is a limited-capacity cognitive system used to temporarily hold information. It plays an important role in reasoning, decision-making, and behavior.*

**When we ask ChatGPT a question, we are not really giving it room to think.** It cannot use working memory the way humans do, and it cannot rely on scratch paper. It has to respond directly, possibly because its training data often contains conclusions rather than explicit reasoning steps. But if we can get it to **break multi-step reasoning into smaller sub-problems**, more like a human would, we can help improve its logic. This has been shown to work.

We can do this by rewriting the prompt. Below are several methods for improving reasoning quality.

<div class="block-1">
  <p>There are many variants, but you do not need to memorize them one by one. Their core idea is the same: **guide ChatGPT to produce intermediate reasoning steps instead of jumping straight to the answer**.</p>
  <p>As ChatGPT itself improves, some questions can already be answered well without these extra methods.</p>
  <p>These methods were originally developed around GPT-3, which had no conversational interface. ChatGPT can revise its answer through dialogue, so in some cases these prompting tricks become less necessary.</p>
</div>

# 2 Methods for improving logical reasoning

## 2.1 Chain of Thought

**Chain of Thought (CoT) is arguably the most important method**, to the point that many related techniques are casually grouped under the same label. It takes advantage of the fact that GPT-3 is fundamentally a **text predictor**, so it tries to maintain coherence across the prompt and the answer.

CoT mainly comes in two forms:

1. **Zero-shot CoT**: append "Let's think step by step" to the prompt
2. **Chain of Thought with examples**: show a worked example of a similar problem and let ChatGPT imitate that process (recommended)

*The difference is that the first gives no reasoning example, while the second gives at least one.*

Let us test both methods on the earlier odd/even counting problem.

### Zero-shot CoT

Add "Let's think step by step" at the end of the question.

![](https://files.mdnice.com/user/40454/c3607600-230a-42b4-a866-fa34c9cae3d7.png)

Well, it listed out a process, but somehow still failed on the last step.

Of course, failing on this example does not mean it will never work. GPT-3 is not a fully deterministic system, so in some cases it may still produce the right answer. But the method is unstable.

Perhaps the biggest use of Zero-shot CoT is that it can generate examples for the second method.

### Chain of Thought

Take the result of the previous method, rewrite it, and add a running total at each step. Then give that to ChatGPT as an example of how to solve this type of problem.

Now we get the correct answer.

![](https://files.mdnice.com/user/40454/b411601a-b430-4fe7-be2b-e5e1664c8d2e.png)

Still, even when it gets this problem right, changing the numbers or switching to another problem may cause it to fail again.

ChatGPT is usually careless. **The reasoning process often needs to be broken down into very fine-grained steps**, or else it makes easy mistakes. Sometimes the mistake is nothing more than copying a number incorrectly, but one small error can derail the entire chain.

This is still a very simple problem, yet it already requires a surprisingly elaborate prompt, and even then the answer is not guaranteed to be right. That suggests that **for problems like this, we should often look for another approach** unless the goal is something like the Feynman technique, where explaining knowledge aloud helps deepen understanding.

For this specific problem, "build a function that counts odd and even numbers," writing a prompt may be easier than writing code for many people. But even then, ChatGPT is inefficient. Code can finish the computation in milliseconds, whereas ChatGPT generates text token by token and may take more than ten seconds. So until ChatGPT becomes both smarter and more efficient at these tasks, traditional computational problems are still often better handled in traditional ways.

That does not mean ChatGPT or Chain of Thought are useless. **Their real strength appears when the problem requires understanding language itself**, which is where traditional programming is harder to apply directly. Since a huge portion of human knowledge is recorded in language, the space for applications remains enormous.

The next two methods can be seen as variants of CoT.

## 2.2 Asking sub-questions (Self-Ask)

Sometimes the intermediate reasoning process is more complex and the problem needs to be decomposed into sub-questions.

Self-Ask is a method that lets GPT-3 decide whether a question should be broken down, generate the sub-questions automatically, solve them, and then produce the final answer.

![](https://files.mdnice.com/user/40454/1bdcb037-9c54-4be4-88ea-84e62d0c4a2e.png)

*We can often use very simple examples, such as elementary arithmetic, and then ask ChatGPT to handle more difficult questions.*

![](https://files.mdnice.com/user/40454/c1f92ec5-c569-4074-b617-7f716f59fb11.png)

## 2.3 Generating multiple solutions (Self-Consistency)

Ask GPT-3 to produce multiple possible solutions to the same problem, then compare them and derive a final answer from the set.

![](https://files.mdnice.com/user/40454/4af292d4-b39b-4d4c-bccc-2cb92f767ed3.png)

For search-like computational problems, traditional programming often talks about two broad approaches: depth-first search and breadth-first search. If we compare ChatGPT's reasoning to traditional computation, Self-Consistency resembles part of breadth-first search, while Self-Ask resembles part of depth-first search.

![](https://files.mdnice.com/user/40454/d4fb66eb-b6fb-4e1d-99d1-a288145eb83f.png)

This method has been shown to improve performance on arithmetic, commonsense, and symbolic reasoning tasks. Even when ordinary CoT does not work, Self-Consistency can still improve results.

Beyond these methods, GPT-3 can also work with external tools, such as converting a problem into code or retrieving outside information, to improve answer accuracy. I will not go into detail on that here.

# 3 Challenging human intuition

## 3.1 Solving mathematical problems

Google used the methods above to improve the performance of large language models on mathematical and logical tasks: [https://ai.googleblog.com/2022/06/minerva-solving-quantitative-reasoning.html](https://ai.googleblog.com/2022/06/minerva-solving-quantitative-reasoning.html)

> Minerva also uses recent prompting and evaluation techniques to better solve math problems. These include Chain of Thought or scratchpads (before tackling new problems, Minerva solves existing ones step by step in a few different ways), as well as majority voting (Self-Consistency).
> 
> *Note: a scratchpad records intermediate results, similar to the odd/even-counting example above, and can also be regarded as a form of CoT.*

![Minerva's performance on mathematical tasks](https://files.mdnice.com/user/40454/106201a6-0b8c-458a-b746-86a01996bc2a.png)

Of course, as discussed earlier, GPT-3 is still inefficient at multi-step reasoning when it cannot rely on external tools. So for mathematical problems, a better path may be to combine it with **Wolfram**: let GPT-3 do what it is good at, namely understanding language, and let a symbolic engine handle strict logic.

## 3.2 Machine intuition

Finally, let us compare human intuition with ChatGPT's "intuition."

> Here is a relatively simple question. Do not analyze it too hard. Just answer by intuition:
> 
> **A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much does the ball cost?**
> 
> *~~You will probably think of a number immediately, and that number is likely 10 cents. This classic problem is special because it triggers an answer that feels intuitive and appealing but is actually wrong. If the ball cost 10 cents, the total would be $1.20: 10 cents for the ball and $1.10 for the bat. The correct answer is 5 cents.~~*
> 
> *Thinking, Fast and Slow*

![](https://files.mdnice.com/user/40454/6f05d78e-5ae6-40e1-a7cc-dc1028c8317e.png)

*Well, this is no longer "intuition." ChatGPT has started using System 2.*
