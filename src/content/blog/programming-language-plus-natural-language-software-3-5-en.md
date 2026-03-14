---
title: Programming Language + Natural Language = Software 3.5?
date: 2023-03-12
excerpt: Software 1.0 requires programmers who can code. Software 2.0 requires companies with data and compute. Software 3.0 only requires ordinary people who can type. So what is Software 3.5?
locale: en
translationKey: programming-language-plus-natural-language-software-3-5
draft: false
---

# Outline
1. From Software 1.0 to Software 3.0
    1. Software 1.0
    2. Software 2.0
    3. Software 3.0
2. Software 3.5
    1. Developer tools
    2. Low-code
    3. No-code
3. ChatGPT as a simulator
    1. Simulating a Python interpreter (Software 1.0)
    2. Simulating a `gpt()` API (Software 3.0)
4. Simulating Software 3.5
    1. A new way to implement recursion
    2. Simulating LangChain
    3. Chain-of-Thought inside `gpt()`
    4. Dolls within dolls within dolls
    5. A joke about AI and humans

Length: about 6,000 Chinese characters in the original

# 1 From Software 1.0 to Software 3.0

The way people write software has kept changing, from the earliest days of computing to the recent arrival of ChatGPT.

**From an evolutionary perspective**

1. Software 1.0 (programming languages) wrote the algorithmic logic behind Software 2.0.
2. Software 2.0 (machine learning) produced Software 3.0 through its understanding of natural language.
3. Software 3.0 (prompts) can in turn be used to write Software 1.0 code.
4. The combination of Software 1.0 and Software 3.0 produces Software 3.5 (programming language + prompt).
5. Software 3.5 may eventually be able to write Software 3.5.

**From the perspective of difficulty**

1. Software 1.0 requires programmers who can write code.
2. Software 2.0 requires companies with both data and compute.
3. Software 3.0 only requires ordinary people who can type.
4. Because Software 3.0 can write Software 1.0, ordinary people may also be able to write Software 1.0 indirectly, and even write Software 3.5.

## 1.1 Software 1.0

Software 1.0 made it possible for people to use programming languages such as Python and JavaScript to build all kinds of software. Nearly every product we use on our phones or computers today is a product of Software 1.0.

At this stage, programmers have to use precise, rigorous, logical languages to implement software logic or UI. If the code does not follow the rules exactly, even one extra comma may stop the whole program from running.

Here is a very simple example. You can skip it.

```python
number = input("请输入一个整数：")

if number % 2 == 0:
    print(number, "是偶数")
else:
    print(number, "是奇数")
```

Real software is far more complicated. It often has to deal with large amounts of data and many edge cases. To handle those efficiently, programs rely on lots of conditional branches and loops so that different code runs in different situations.

But that is still not enough. Programs also need abstraction: frequently recurring problems are turned into functions or objects, so that when the same problem appears again, we can reuse what has already been written instead of reinventing the wheel.

All of that complexity creates a barrier to entry. To build a complete piece of software or a webpage, one must learn a lot and practice a lot, which is why ordinary people have a hard time using programming to solve their own problems.

Software 1.0 is highly general-purpose, but it cannot solve every kind of problem. For example, it struggles with natural language and image recognition, because those tasks involve too many possible scenarios to encode one by one in explicit logic. That is why Software 2.0 emerged.

## 1.2 Software 2.0

Unlike Software 1.0, where the logic must be written down explicitly and directly, Software 2.0 does not spell out the logic in full. Instead, it lets the machine learn how to handle many different scenarios by itself. The logic becomes implicit, much like how a person can speak their native language fluently without explicitly knowing its grammar.

To teach machines these abilities, we still need Software 1.0 programming languages. Machine learning requires methods, and the logic of those methods is still explicit. For example, neural network algorithms inspired by the human brain are themselves written in Software 1.0.

Here is a sample of GPT code. You can skip it.

```python
class GPTLanguageModel(nn.Module):

    def __init__(self):
        super().__init__()
        # each token directly reads off the logits for the next token from a lookup table
        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)
        self.position_embedding_table = nn.Embedding(block_size, n_embd)
				...

    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            torch.nn.init.normal_(module.weight, mean=0.0, std=0.02)
        ...

    def forward(self, idx, targets=None):
        B, T = idx.shape
				...
    ...
...
```

*Code source: [https://github.com/karpathy/ng-video-lecture](https://github.com/karpathy/ng-video-lecture)*

Algorithms alone are not enough. Software 2.0 also requires large amounts of data, because the machine learns from massive datasets. And beyond data, training those models requires a great deal of compute.

That makes the barrier to Software 2.0 even higher than Software 1.0. Usually only companies that have both data and money can seriously do it. Just being a programmer is not enough, and ordinary people are even further from it.

But once the machine is trained, what it can do is astonishing. AI image generation and ChatGPT are examples. From that point on, people could ask a machine to generate impressive images from text alone or handle many language tasks. That is what gave rise to so-called Software 3.0.

## 1.3 Software 3.0

The arrival of ChatGPT showed people that a machine's "understanding" of language could reach a surprisingly high level. Of course, the machine only appears to understand language; underneath, it is still doing text prediction. But it often feels like it can understand almost anything you say, and at times it even seems more capable than humans.

With that ability, machines can now help humans complete many tasks that were previously hard to realize with Software 1.0 alone.

The instructions or questions we give the machine are called **prompts**. Some prompts are better than others. A good prompt can produce exactly the result we want, or even something better than expected.

In AI art, sometimes adding just one "magic word" changes the output dramatically. A good prompt can even produce something close to art.

Using prompts to guide AI toward an intended result can be seen as **programming in natural language**, and online this is often referred to as Software 3.0, as in the diagram below.

![](https://files.mdnice.com/user/40454/8044ed17-fa31-4df8-9aa6-91a54f2a6e38.jpg)

Software 3.0 drastically lowers the difficulty of "programming." If you can type, you can program. That is radically different from Software 1.0 and 2.0, and it means technology can reach far more people.

Compared with AI image generation, which is often extremely sensitive to prompts, ChatGPT behaves much better on simple tasks. For instance, if you ask it to translate something, you can say "translate this sentence," or "translate to Chinese," or simply "翻译", and the result will not vary that much.

But for complex tasks, different prompt phrasings can produce noticeably different results. Because ChatGPT is not a deterministic system, we cannot derive a clean theoretical framework that lets us predict exactly what kind of prompt will work best. Much of the time, we still have to rely on experience and repeated experimentation.

That said, it is not purely luck. Some recurring problems are already known: lack of logical reasoning, or outputs that miss the user's real intent. For such problems, people have discovered better ways to communicate with ChatGPT, such as giving it examples so it can generalize from them, or teaching it to reason step by step instead of answering too quickly.

For more on that, see [From Simple Questions to Analogy](https://www.notion.so/028f593862f1422fac5e8df97d27cb4e) and [Strengthening ChatGPT's Logical Reasoning](https://www.notion.so/ChatGPT-87036720bbed4d55846ab9ccdc04b359). To write good prompts, understanding those two articles is enough. To go further with ChatGPT, the most important thing is still personal experimentation and the skills outside prompting itself. The old phrase "the real craft lies beyond the poem" applies here too.

If you use ChatGPT only for simple tasks such as translation, summarizing articles, generating stories, or even writing Software 1.0 code, calling that "programming" may sound a bit odd. But there is actually some truth to it, because in all of these cases you are still writing **instructions** so that the machine helps complete a specific task. Natural language instructions may look simple, but because natural language itself is extremely general-purpose, it can be used to write surprisingly complex prompts and solve very personalized needs.

Here is an example to show what programming in natural language might look like.

### 1.3.1 Assisted English Reading

Suppose we are reading an English article. How could we use ChatGPT to help?

First, we might ask ChatGPT to translate the paragraph. But sometimes, either because we want to practice reading English or because we think full translation changes the original meaning, we do not want the whole paragraph translated into Chinese. Instead, we only want translations for difficult words or technical terms. In that case, we can write a prompt that defines **Rule A**, where Rule A only translates selected words, as shown below.

![](https://files.mdnice.com/user/40454/65830691-47d5-48a9-a652-f635153faf2f.png)

Sometimes we want to improve the readability of a paragraph by highlighting technical terms. For instance, we may want to mark the phrase "foundation models" so that it stands out more clearly. Then we can define a new **Rule B**: Rule B places an emoji `🤖️` in front of the phrase "foundation models," as shown below.

![](https://files.mdnice.com/user/40454/678cf231-26df-4a2c-946d-429eff305026.png)

Beyond those two rules, we could define many more according to our reading habits and use cases. Rule C might summarize a paragraph, Rule D might automatically re-wrap long sentences, Rule E might replace or remove certain words, and so on.

We can also compose rules together. In the prompt below, I tell ChatGPT that different rules can be combined, which means we can apply Rule A and Rule B at the same time: translate selected words while also adding `🤖️` to technical terms. In the same way, we could have Rule A + C, or Rule A + B + D, and so on.

![](https://files.mdnice.com/user/40454/0b702641-5518-45e5-a412-5b995776fd62.png)

Right now ChatGPT's memory is limited. If you define too many rules, it quickly forgets them. And each time you still have to remind it which rules to apply and paste in the paragraph, so the method is not yet very practical. But if ChatGPT's memory improves in the future, this could become much more useful.

In fact, better interaction design could improve the idea even further. Imagine opening an English webpage and having your browser automatically transform every paragraph according to your predefined rules, giving you a reading experience adapted to your needs.

I will stop that example there. For more on how ChatGPT can help with learning English, see [Learning English Happily with ChatGPT](https://www.notion.so/ChatGPT-e33f901c938c496983fd06afa539afe7). For more complex cases, see [Can ChatGPT Break Down Complex Problems?](https://www.notion.so/ChatGPT-10db8b2eeddc49fdb583da0fab327c4b) and [Programming About Programming with ChatGPT](https://www.notion.so/fa19ea2606f54a47a2be928390d82ae4).

Software 1.0 and Software 3.0 are very different. One uses precise programming languages; the other uses fuzzy natural language. Each has its own strengths and weaknesses. But what if we combine them? What does Software 1.0 + Software 3.0 become? For convenience, let us call it **Software 3.5**.

# 2 Software 3.5

Many tools already exist that combine Software 1.0 and Software 3.0. Some are developer-facing tools such as LangChain, while others are simpler no-code or low-code tools.

## 2.1 Developer Tools

One example is LangChain: [https://langchain.readthedocs.io/en/latest/getting_started/getting_started.html](https://langchain.readthedocs.io/en/latest/getting_started/getting_started.html). It is an open-source project that helps developers make better use of language models.

For example:

1. GPT can generate code but cannot run it, so a library like this can execute the generated code.
2. To improve the accuracy of GPT's answers, you can first search the web for information before asking GPT to respond.
3. If you want to summarize a very long article that does not fit into GPT at once, you can split it into smaller chunks, have GPT summarize each chunk, then combine those summaries and ask GPT for a final summary.

The diagram below shows one such example: before answering a question, the system first uses tools to search for information and obtain new data. If that is still not enough, it searches again. Eventually the task involves calculation, so it calls a calculator. By using external tools, the system can produce a more accurate answer.

![](https://files.mdnice.com/user/40454/ced0b410-6e61-451d-8945-fb3fe891761b.png)

However, as mentioned earlier, the biggest benefit of Software 3.0 is that everyone can use it. If creating the next generation of applications requires LangChain and therefore real programming, then people must study Software 1.0 again, which raises the cost.

It would be better if this could be made even easier.

ChatGPT can already generate code, but it does not yet know about tools like LangChain in a practical way, so it cannot really take advantage of them. In the near future, once it learns more about such tools, people may simply ask ChatGPT to use LangChain for them. Ordinary users will not need to understand the underlying Software 1.0 code; ChatGPT will handle it.

There are also already some no-code and low-code tools on the market that help people use GPT to build simple programs, such as Dust, Agent, and Brancher. Similar ideas can even be used in iOS Shortcuts.

*No-code tools are still Software 1.0 under the hood, but they are more user-friendly, though usually more limited in capability.*

## 2.2 Low-Code

Agent is a low-code tool, shown below: [https://gptagent.notion.site/Agent-Docs-f72c91ab92db46efb4949af4893da778](https://www.notion.so/Agent-Docs-f72c91ab92db46efb4949af4893da778). It lets GPT work together with other tools to complete tasks, such as scraping webpages, making HTTP requests, or connecting to social media. That makes it possible to assemble workflows or simple applications relatively easily.

![](https://files.mdnice.com/user/40454/afef3c82-e55f-4d39-8342-4c0fab2a5e4c.png)

Still, the product is somewhat rough at the moment. It cannot do all that much, and some parts still require a little code, so there is still some barrier to use.

## 2.3 No-Code

Brancher is an even simpler tool, shown below: [https://app.brancher.ai](https://app.brancher.ai/). With only a bit of configuration, it can generate a form page.

For example, suppose I want to build a page that generates images: the user enters a theme and a style into input fields, clicks a button, and an image is produced.

![](https://files.mdnice.com/user/40454/0193646d-1fbe-4b7a-9f86-559c74ec2270.png)

To implement that, you still need some underlying logic. Brancher provides a very simple interaction model that can call GPT-3 or DALL-E and chain them together.

In the logic shown below, the topic entered into the form, such as "cat and space," and the style, such as "surreal," are first sent to GPT-3. GPT-3 adds more detail and turns them into a DALL-E prompt, which is then sent to DALL-E to generate the final image.

![](https://files.mdnice.com/user/40454/b641b16a-32b8-4142-b8f2-334ca0e7ca9e.png)

There are many tools like this, but they are still immature, so I will stop the overview here.

Now let us return to ChatGPT itself. Is it possible to use Software 3.5 **inside ChatGPT**, without relying on external tools at all?

# 3 ChatGPT as a Simulator

People have proposed different categories of AI, as shown in the diagram below: [https://www.lesswrong.com/posts/vJFdjigzmcXMhNTsx/simulators](https://www.lesswrong.com/posts/vJFdjigzmcXMhNTsx/simulators)

![](https://files.mdnice.com/user/40454/6cc1b462-31b0-462a-9189-bf3a7ea8d819.png)

Some AIs are imagined as **Oracles**, systems that answer user questions accurately. Others are **Agents**, systems that keep optimizing toward a goal, like AlphaGo.

The author of that article treats ChatGPT as a **simulator**. It can simulate many things: people, animals, webpages, robots, program executors, and even other kinds of AI, including itself.

For example, the author used GPT to simulate a Wikipedia page. After the user enters a keyword, GPT generates an encyclopedia-style page explaining that keyword. GPT can do this because its training data contains huge amounts of internet content and websites. But the generated page contains many false details, because it is only a simulation.

![](https://files.mdnice.com/user/40454/266470ad-3e08-4f85-8ec6-0705c7891713.png)

Below, we will simulate the programming style of Software 3.5 inside ChatGPT itself by combining natural language and programming languages.

## 3.1 Simulating a Python Interpreter (Software 1.0)

First, let us ask ChatGPT to simulate a Python interpreter so that it can simulate running code.

**prompt-1**

```markdown
I want you to act like a Python interpreter.
I will give you Python code, and you will execute it.
Do not provide any explanations.
Do not respond with anything except the output of the code. 
The output should inside the code block.

The first code is: "print('hello world!')"
```

**output-1**

```python
hello world!
```

![](https://files.mdnice.com/user/40454/79163aa5-626c-40df-9353-ec5eed2d207f.png)

Note that ChatGPT is only simulating. It cannot truly run code. If your program becomes complicated, the result it gives will often be wrong. A simple way to test that is to ask it to do arithmetic. As shown below, ChatGPT gets the answer wrong. Simulating another thing does not magically grant it capabilities it did not already have.

![](https://files.mdnice.com/user/40454/607558eb-33d2-48a5-ab7e-db5d1ef9d7c7.png)

## 3.2 Simulating the `gpt()` API (Software 3.0)

Next, in the same conversation, we ask it to simulate GPT itself, meaning to imitate its own behavior.

**prompt-2**

In this prompt, we define an API called `gpt()`. It takes a prompt as input and returns a completion. Both the prompt and the completion are strings.

The prompt gives two example calls to `gpt()`, so ChatGPT can learn how this API is supposed to behave.

At the end of the prompt, we write a simple Python loop that calls `gpt()` three times, asking it to generate a random English word each time.

```markdown
There is a LLM API called gpt(), it take a prompt as input, and output the completion, prompt and completion are both string type.

Here are some examples when calling gpt():

completion = gpt("what is one plus one?") 
the completion will be: "2"

completion = gpt("translate to chinese: cat and dog are cute") 
the completion will be: "猫和狗很可爱"

the gpt() api works just like ChatGPT, so you can predict the output of this API.

Now, you are act like  Python interpreter. the second code is:

for i in range(3):
    completion = gpt("generate a random English word")
    print(completion)
```

**output-2**

```python
calibrate
biochemical
remembers
```

![](https://files.mdnice.com/user/40454/adfd862d-7288-40a5-9c36-64b6fa39f6de.png)

At this point, we have in fact already asked ChatGPT to simulate Software 3.5.

Then, in the same conversation, I entered another short prompt to further test ChatGPT's abilities and provide it with more examples to learn from.

**prompt-3**

In this prompt, `gpt()` is first called to generate a joke. Then `gpt()` is called again to explain why the joke is funny. Finally `gpt()` is called a third time to translate that explanation into Chinese.

```markdown
joke = gpt("give me a joke")
print(joke)

explain = gpt(f"explain why this joke {joke} is funny?")
print(explain)

translation = gpt(f"translate to chinese: {explain}")
print(translation)
```

**output-3**

```python
Why was the computer cold?
Because it left its Windows open.

The joke is funny because the phrase "left its windows open" is usually used when talking about leaving windows open in a physical sense, but in this case it is referring to the computer operating system "Windows."

这个笑话为什么好笑？ 
因为“left its windows open”这个短语通常用于指物理意义上的窗户没有关好，但在这个笑话中它指的是电脑操作系统Windows。
```

One thing to note: here and in the examples below, every prompt is written so that each intermediate step is printed out. The reason is to help ChatGPT remember the process. If you only print at the very end, ChatGPT makes mistakes much more easily. That is one way in which this differs from real programming.

# 4 Simulating Software 3.5

Although the examples below simulate Software 3.5, this prompting style could probably be used elsewhere too. But because the method is so unusual, it still needs more testing before we can really understand how best to use it.

## 4.1 A New Way to Implement Recursion

In [Programming About Programming with ChatGPT](https://www.notion.so/fa19ea2606f54a47a2be928390d82ae4), I designed a prompt that taught ChatGPT how to recurse. But that prompt required many prompting tricks and was fairly cumbersome. Now that we can simulate Software 3.5, we can implement recursion with code instead.

For example, in the prompt below I write a function called `ask()` that keeps asking questions. Given one question, it calls `gpt()` to return a sub-question, and then recursively calls itself inside `ask()` so that it can continue asking sub-sub-questions based on the sub-question.

![](https://files.mdnice.com/user/40454/c8eb6f94-1fb9-44b2-8741-69836d2bc963.png)

With that approach, we can recreate the prompt from [Programming About Programming with ChatGPT](https://www.notion.so/fa19ea2606f54a47a2be928390d82ae4) that keeps improving code, as shown below.

![](https://files.mdnice.com/user/40454/e3298239-119e-458e-98ae-7aaf2e920f76.png)

In that prompt I define two functions:

1. `writecode()`, which writes the first version of the code from a requirement by calling `gpt()`;
2. `improve()`, which updates the existing code by calling `gpt()` to produce a second version, then recurses by calling itself inside `improve()` so that the code can keep being improved.

Inside the `improve()` code, I added a comment telling ChatGPT that this code would not recurse forever. Without that comment, ChatGPT refused to "run" the program. This is another example of how simulating Software 3.5 inside ChatGPT is quite different from actually building Software 3.5.

Below is the output of that prompt. The code-improvement effect was not very good. In fact, it sometimes produced even worse code.

![](https://files.mdnice.com/user/40454/99e0e752-1859-4f5e-87d5-17d779276f5e.png)

That may be because my prompt was too simple. If, before improving the code, I had first asked ChatGPT to analyze the problems in the current code and suggest improvements, the result might have been better. But it is also possible that making the prompt more complex would have made the result even worse. For the sake of a simple example, I did not explore that further here.

I also tried some more complex scenarios, such as writing many functions plus recursion, and the results were not very good. Right now ChatGPT still cannot simulate the execution of complex code well. But for some simple recursion, it can.

Writing code with ChatGPT is very different from writing actual code. Here it is best to tell ChatGPT what each line is supposed to do, and to print every step. The logic between steps also has to be very explicit. Otherwise ChatGPT fails to understand the program, and the output becomes full of errors and omissions.

## 4.2 Simulating LangChain

LangChain, mentioned earlier, provides many useful features. One of them is **prompt templates**. Some prompts are common enough that instead of rewriting them every time, it makes sense to save them as templates and just replace the keywords when needed.

In the example below, I wrote a reusable template inside the prompt I gave ChatGPT. The template is a prompt for generating product names, but the product keyword is left blank and needs to be filled in before use. Then I used that template to write a function that generates five product names. Inside the function, `gpt()` is first called to replace the placeholder inside the template, turning the template into an actual prompt, and then that new prompt is sent to `gpt()` again to generate the final product names.

![](https://files.mdnice.com/user/40454/565969df-dfbc-4cb7-ad10-580d00556c08.png)

Below is ChatGPT's output. You can see that the placeholder keyword has been replaced with "cat food," and five product names are generated.

![](https://files.mdnice.com/user/40454/2af9d9be-458f-4f14-9ec1-c69ef79c112f.png)

This is only a simulation of one small LangChain feature. I will not go through other features here, but interested readers can experiment on their own.

## 4.3 Chain-of-Thought Inside `gpt()`

For an explanation of Chain-of-Thought, see [Strengthening ChatGPT's Logical Reasoning](https://www.notion.so/ChatGPT-87036720bbed4d55846ab9ccdc04b359).

The effect of Chain-of-Thought inside `gpt()` is different from using it directly with ChatGPT. The `gpt()` version performs worse.

For example, if we use `gpt()` to count the odd and even numbers in a list and add "Let's think step by step" to the prompt, the output still does not include the intermediate reasoning steps.

![](https://files.mdnice.com/user/40454/4e8e0afa-0a06-4d82-8b9b-f38065c23c69.png)

Few-shot prompting also behaves differently there.

Perhaps a completely new prompt design is needed to recover the original effect when using this approach.

## 4.4 Dolls Within Dolls Within Dolls

Earlier, we asked ChatGPT to simulate a Python interpreter, and then inside Python we called `gpt()`. What if we also ask `gpt()` to simulate a Python interpreter?

![](https://files.mdnice.com/user/40454/3f1c4e67-cfb6-456f-9390-f7e6de5e4480.png)

But continuing to nest things like that is not actually very useful.

## 4.5 A Joke About AI and Humans

Finally, let us end this article with a joke. The prompt below loops and prints three jokes.

![](https://files.mdnice.com/user/40454/25ba985c-0b5b-4f4f-b80d-dba1c311b94f.png)
