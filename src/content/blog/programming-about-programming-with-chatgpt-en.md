---
title: Programming About Programming with ChatGPT
date: 2023-02-25
excerpt: ChatGPT can write code from instructions, but can it keep improving its own code without human feedback?
locale: en
translationKey: programming-about-programming-with-chatgpt
draft: false
---

This is another experiment aimed at exploring the boundaries of ChatGPT's capabilities.

ChatGPT can generate code in many programming languages from a user's instructions, but although the code often works, it is difficult to call it best practice. Sometimes it even contains bugs.

Still, if the user points out what is wrong, ChatGPT can regenerate code that better matches the user's requirements.

Can we remove that user-feedback step?

Can we hand the entire writing-and-revising loop over to ChatGPT, so that it inspects the code itself, finds problems, rewrites it, and keeps repeating that process until the code becomes perfect?

That is the question this article investigates. We will try to "program" the process of ChatGPT programming itself, using natural language.

The prompt discussed in this article works across different programming languages. If you want to run similar experiments in a language you know well, you can adapt it easily.

The prompt is also suitable for many recursive tasks beyond programming.

# Outline
1. Origin: a small problem
2. Inspiration from search algorithms
3. A prompt that implements recursion
4. Performing the magic
    1. Finding prime numbers in Python
    2. Sorting algorithm in Python
    3. Login backend in Flask
    4. Login frontend in HTML
    5. Smart contract wallet in Solidity
    6. To-do app in SwiftUI

# 1 Origin: A Small Problem

A long time ago, I asked ChatGPT to simulate a virtual machine and write some Python code that generated the first 100 prime numbers. Here is the code it gave me:

![](https://files.mdnice.com/user/40454/351ed67b-3312-46a5-9e32-7b8785c9113a.png)

It was pretty bad code. It hardcoded `1002`, and it was inefficient. To determine whether a number `num` was divisible by another number `i`, it looped from `2` all the way to `num - 1`. A better approach is to check only up to the square root of `num`.

I had to keep telling ChatGPT where the code could be improved before it had any chance of producing something better, which was tedious. That was the starting point for this experiment.

Of course, in the last few months ChatGPT's coding ability has improved steadily. If I give it the same request now, it can already produce better code.

![](https://files.mdnice.com/user/40454/8b4da8d9-dcb0-4d1e-9381-3164dd4abf49.png)

But my question still remains: can this code be improved further? And can ChatGPT discover those improvements on its own?

To build a prompt that lets ChatGPT keep revising code, we can borrow some ideas from traditional search algorithms.

# 2 Inspiration from Search Algorithms

How does a map app find the best route from a starting point to a destination? How can a machine learn to play Gomoku? How can an algorithm find a path from point A to point B in a maze?

These kinds of problems can be solved with **search algorithms**, which explore many possible paths and make many choices until they find a solution.

![](https://files.mdnice.com/user/40454/58a02bb8-e2fa-4654-9724-bf8d2445f21f.png)

*The material in this section comes from Harvard's AI course: [https://cs50.harvard.edu/ai/2020/](https://cs50.harvard.edu/ai/2020/). If you are interested in AI, I strongly recommend it. The instructor explains things very clearly.*

Next, I will use the **15 puzzle** as a simple example to explain the basic idea behind search algorithms.

![](https://files.mdnice.com/user/40454/7fe3af82-b876-4e18-8d25-4eec2d2aeaa1.png)

This is a nineteenth-century sliding-number puzzle, somewhat like the Chinese game Huarong Dao. Fifteen numbered tiles from 1 to 15 are arranged on a 4x4 grid, and the goal is to slide them back into the correct order. In the example below, 14 and 15 are swapped. This specific configuration is known as the 14-15 puzzle.

![](https://files.mdnice.com/user/40454/76e790c5-304c-4b25-bbe4-1ef40081fba1.png)

At the time, the inventor of the puzzle offered a large prize to anyone who could solve it by making a sequence of legal moves that swapped 14 and 15 back into their normal positions.

*If you enjoy mathematics, try to imagine how you would swap the positions of 14 and 15. It is a very, very hard problem.*

This article is not going to dive deeply into the 14-15 puzzle itself, nor does it use a mathematical approach. I only want to use it as a vehicle for building intuition about how search algorithms work.

**Constructing a search algorithm involves several concepts:**

*To understand the later part of this article, you mainly need to understand State, Actions, and Goal.*

1. **Agent**: roughly speaking, a robot that plays the game. It perceives the environment and the game state, then makes decisions and takes actions.
2. **State**: the state of the environment. In the 15 puzzle, the state is the arrangement of the tiles. Different arrangements are different states. The initial arrangement is the **Initial State**.
3. **Actions**: the choices available in a particular state. In the diagram below, there are only two possible moves: move 12 down or move 15 right. Different states allow different actions.
4. **Transition Model**: given a state and an action, it outputs a new state. In other words, if you take a certain action in a certain state, what happens next?
5. **State Space**: starting from the first move, many actions are possible, and those actions generate many new states. The collection of all possible states is the state space.
6. **Goal Test**: used to determine whether a given state is the state we want to reach. For example, the goal might be that all tiles are in ascending order.
7. **Path Cost**: the cost of a path. In the 15 puzzle, this can be understood as the number of moves. Normally we want to optimize this, so fewer moves are better.

![](https://files.mdnice.com/user/40454/976715bb-55f4-4e9e-939b-53e3fc953f42.png)

These concepts are only the beginning of search algorithms. I will not go into detail here, but I want readers to have at least a rough intuition.

![](https://files.mdnice.com/user/40454/f8ca761c-ff28-4616-b541-62fcce85903f.png)

In search algorithms, we define a data structure called a **node** (A, B, C... in the figure below) to store a state and the transition relationship between states. Each node records its own state, along with which action from which previous state produced it.

![](https://files.mdnice.com/user/40454/14ddfa59-be5b-4019-8d2c-4b552c7158f0.png)

Once we have that, we can begin traversing from the initial node. We identify which actions are possible from that node, try each one, and generate new nodes. Then we identify which actions are possible from the new nodes, keep taking actions, and keep generating more nodes.

Because we record how each node was reached, once we find a node that satisfies the goal, we can reconstruct the path from the initial node to the final node and evaluate the path cost.

"Traversal" is not quite the right word, because some problems have enormous numbers of states and possible actions. Traversing every node would take a very long time and would be inefficient. So search algorithms need optimization strategies that reduce the number of nodes explored and reach the goal more quickly.

That is enough background on search algorithms.

Now back to the question of improving code. Suppose we treat a particular version of code as a **State**, just like a tile arrangement is a state in the 15 puzzle. Each state corresponds to a different version of the program.

Code modification becomes an action. In theory the number of possible modifications is infinite, but we do not need to enumerate infinitely many options. Our goal is simply that after taking an action, the code becomes better.

ChatGPT will take those actions for us. If we repeat that process and keep improving the code, the whole thing can be viewed as a form of recursion. Unlike ordinary search algorithms, which may explore many branches, the prompt we will build next only follows **one forward path with no backtracking**.

With that in mind, we can now construct the prompt by borrowing ideas from search algorithms.

# 3 A Prompt That Implements Recursion

<div class="block-1">
  <p>1. In ChatGPT, the same sentence usually costs 2 to 3 times more tokens in Chinese than in English, while prompt length is limited, so the prompt below is written in English. I add explanations here in English for this translated version.</p>
  <p>2. The prompt uses methods discussed in <a href="https://www.notion.so/028f593862f1422fac5e8df97d27cb4e">From Simple Questions to Analogy</a> and <a href="https://www.notion.so/ChatGPT-87036720bbed4d55846ab9ccdc04b359">Strengthening ChatGPT's Logical Reasoning</a>, including chain-of-thought and few-shot prompting.</p>
  <p>3. Our original goal is to let ChatGPT improve code by itself. To do that, the prompt needs recursion. But recursion is general-purpose, so this prompt is not limited to code improvement. In principle, a more specialized prompt might perform better for coding alone.</p>
</div>

This prompt has four parts:

1. **Instruction description**: describes what the prompt is meant to do and what kinds of problems it can handle.
2. **Format requirements**: defines the output format and how the recursive process should be written out.
3. **Examples**: two examples that show ChatGPT exactly how to handle the task.
4. **Test**: a quick test to see whether ChatGPT understood the rules.

## 3.1 Instruction Description

The instruction description contains two parts:

1. As in the search algorithm discussion above, we define an **Agent**, which we call **GPT-A**. GPT-A can handle search-like problems and produce a recursive answer trace. That answer trace can be understood as the "printed output" of the recursive process, as described in the format section.
2. We define the kinds of problems GPT-A can handle. Each problem has a state, rules for possible actions, and a goal. Before GPT-A solves a problem, we must define the initial state, the action rules, and the condition that determines when the goal has been reached.

![](https://files.mdnice.com/user/40454/055ced4c-26a6-4975-b90d-5c25d23c456a.jpeg)

## 3.2 Format Requirements

When GPT-A handles a problem, it repeatedly goes through three steps: `State`, `Actions`, and `Action`, until it reaches the goal.

<div class="block-1">
  <p><strong>State</strong>[1]: To distinguish different states, we attach numbers to them. The first one is State[1], which receives the initial state of the given problem.</p>
  <p><strong>Actions</strong>: For the current State[1] and the action rule, list the possible choices.</p>
  <p><strong>Action</strong>: From the available actions, choose the one that best advances the goal.</p>
  <p><strong>State</strong>[2]: The new state produced by the chosen action.</p>
  <p><strong>Actions</strong>: For the new State[2] and the action rule, list the possible choices.</p>
  <p><strong>Action</strong>: From those choices, select the one that best advances the goal.</p>
  <p>{Repeat the steps above until the goal is reached}</p>
  <p><strong>State</strong>[n]: The final state produced by the previous action.</p>
  <p><strong>Actions</strong>: Recognize that this state already satisfies the goal, so no more actions are needed.</p>
  <p>End.</p>
</div>

![](https://files.mdnice.com/user/40454/e5adde6d-dce0-4e31-8c2b-1cf483181621.jpeg)

## 3.3 Examples

We provide two examples for ChatGPT to learn from.

### Example 1

As I mentioned earlier, this recursive mechanism can handle general tasks, not just code-related ones. So the first example will use a problem unrelated to programming.

We call this problem **MinusNumber**, and define it like this:

1. **Initial state**: `10`
2. **Action rule**: there are only three possible choices: subtract 4, subtract 2, or subtract 1. However, the same choice cannot be used in two consecutive steps. If the previous step subtracted 4, the next step may only subtract 2 or 1.
3. **Goal**: reduce the number until it becomes less than 0

![](https://files.mdnice.com/user/40454/a4d6b5ec-3ed9-4ebf-897b-c962c09c65c6.jpeg)

The way GPT-A handles the problem is:

<div class="block-1">
  <p><strong>State</strong>[1]: 10</p>
  <p><strong>Actions</strong>: Goal not reached. Available choices: subtract 4, subtract 2, subtract 1</p>
  <p><strong>Action</strong>: To reach the goal quickly, subtract 4</p>
  <p><strong>State</strong>[2]: 6</p>
  <p><strong>Actions</strong>: Goal not reached. Available choices: subtract 2, subtract 1</p>
  <p><strong>Action</strong>: To reach the goal quickly, subtract 2</p>
  <p><strong>State</strong>[3]: 4</p>
  <p><strong>Actions</strong>: Goal not reached. Available choices: subtract 4, subtract 1</p>
  <p><strong>Action</strong>: To reach the goal quickly, subtract 4</p>
  <p><strong>State</strong>[4]: 0</p>
  <p><strong>Actions</strong>: Goal not reached. Available choices: subtract 2, subtract 1</p>
  <p><strong>Action</strong>: To reach the goal quickly, either works, so subtract 1</p>
  <p><strong>State</strong>[5]: -1</p>
  <p><strong>Actions</strong>: -1 is less than 0, so the goal has been reached.</p>
  <p>Done.</p>
</div>

![](https://files.mdnice.com/user/40454/009be9e5-c66f-41f0-bb9a-38326dfaeb56.jpeg)

### Example 2

If the second example were also unrelated to code, GPT-A could still in principle handle coding tasks, but the output format would likely be wrong. So the main purpose of Example 2 is to show ChatGPT what coding output should look like.

We call this problem **ImprovePythonCode**, and define it like this:

1. **Initial state**: as shown below, three `print` statements inside a code block
2. **Action rule**: check for bugs and improve the code
3. **Goal**: make the code a little better

![](https://files.mdnice.com/user/40454/3ed6b18c-e2a4-48fd-9eea-095e81aa01b8.jpeg)

GPT-A then handles it like this:

<div class="block-1">
  <p><strong>State</strong>[1]: (the code from the initial state defined above, shown in the image)</p>
  <p><strong>Actions</strong>: Goal not reached. There is a syntax error in <code>print 1</code>. (This wording differs from Example 1 to make the pattern more general.)</p>
  <p><strong>Action</strong>: To reach the goal quickly, fix the bug.</p>
  <p><strong>State</strong>[2]: (change <code>print 1</code> to <code>print(1)</code>, shown in the image)</p>
  <p><strong>Actions</strong>: Goal not reached. The code contains repetition; it could be wrapped in a function or placed inside a loop.</p>
  <p><strong>Action</strong>: To reach the goal quickly, place the code in a <code>for</code> loop.</p>
  <p><strong>State</strong>[3]: (convert the code into a <code>for</code> loop, shown in the image)</p>
  <p><strong>Actions</strong>: This code is a little better than before, so the goal has been reached.</p>
  <p>Done.</p>
</div>

![](https://files.mdnice.com/user/40454/bbc4577d-a567-4093-acd4-a4e1ce71b18b.jpeg)

## 3.4 Test

To test whether ChatGPT understands the earlier rules, we add one more problem at the end of the prompt.

We call this problem **DeleteNumber**, and define it like this:

1. **Initial state**: a list `[3,10,2,5]`
2. **Action rule**: you may only delete the largest number, so you must find it first
3. **Goal**: delete all numbers

![](https://files.mdnice.com/user/40454/49e68098-61c2-4bcd-946d-3329de6d9fa4.jpeg)

Here is ChatGPT's output:

![](https://files.mdnice.com/user/40454/774c9a55-7c98-4921-8337-c222e27330e0.png)

It solved the problem successfully.

Next, we redefine the problem as one of continuous code improvement and see how it performs.

## 4 Performing the Magic

Now we ask ChatGPT to write code according to a requirement, then keep improving that code until it becomes perfect.

![](https://files.mdnice.com/user/40454/18fbbca9-4a1f-460c-adaa-69800f796052.jpeg)

We call this problem **WritePerfectCode**, and define it as follows:

1. **Initial state**: a description of the code GPT-A should write
2. **Action rule**: first write the code from the description, then improve it. When modifying code, list the possible actions, such as checking for bugs, improving time complexity, removing hardcoding, and so on. It should keep trying to reach the goal rather than giving up quickly.
3. **Goal**: write perfect code

Note that there are many ways to write the prompt that defines the problem. For example, the initial state could be written as `(empty code)` while the requirements are described entirely in the goal. The action rule can also be expanded to include space complexity, error handling, readability, and more. Different formulations produce different results. More detailed prompts do not necessarily produce better results; a lot of experimentation is required. Because of limited time, I will not list all the specific variants and outcomes here.

In the version of the prompt used in this article, ChatGPT gives only brief explanations for its choices, usually one or two sentences. Another formulation causes it to generate much more explanation.

<div class="block-1">
  <p>1. Even under nearly identical conditions, the results can differ. The examples below omit the very poor runs.</p>
  <p>2. Because the prompt and the code consume many tokens, the answer is often cut off midway. Continuations are not very coherent, and it never truly wrote "perfect" code. With a larger context window, perhaps the results would be better.</p>
  <p>3. Some of the code ChatGPT produced was too fancy for me to fully understand, so I will not explain the code in detail.</p>
  <p>4. With limited context, this prompt is not practical for everyday programming. In most real work, directly describing the requirement and talking with ChatGPT works better.</p>
  <p>5. When using this prompt, ChatGPT tends to start from scratch and improve gradually, rather than producing a strong version right away. That may have some educational value, because it reveals the process of building software from zero and iterating on it.</p>
</div>

## 4.1 Finding Prime Numbers in Python

**Initial state:**

Write a Python program that prints the first 100 prime numbers.

![](https://files.mdnice.com/user/40454/88573d94-9e04-417c-b1fc-92263c950ad8.png)

**Below is ChatGPT's output, translated into English:**

🕐 State[1]:

```python
# Python program to print the first 100 prime numbers

def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

count = 0
num = 2
while count < 100:
    if is_prime(num):
        print(num)
        count += 1
    num += 1
```

🔎 Actions: The goal has not been reached yet. This code runs correctly, but it can be improved. We can optimize the algorithm to find prime numbers more efficiently, perhaps by using a sieve method or a precomputed list of primes. We could also add comments to explain the code more clearly.

➡️ Action: To improve the code, let us use a sieve-based method for finding prime numbers.

🕐 State[2]:

```python
# Python program to print the first 100 prime numbers
def sieve(n):
    prime = [True for i in range(n+1)]
    p = 2
    while p**2 <= n:
        if prime[p]:
            for i in range(p**2, n+1, p):
                prime[i] = False
        p += 1
    return [i for i in range(2,n+1) if prime[i]]

primes = sieve(541)
print(primes[:100])
```

(I really did not expect this algorithm.)

🔎 Actions: The goal has not been reached yet. This code runs faster, but we can improve it further by replacing the hardcoded value `n` with an input parameter. We can also add more comments to explain how the sieve works.

➡️ Action: To improve the code further, let us make `n` a parameter and add more comments.

🕐 State[3]:

```python
# Python program to print the first n prime numbers using sieve method
def sieve(n):
    """
    Returns a list of prime numbers less than or equal to n
    """
    prime = [True for i in range(n+1)]
    p = 2
    while p**2 <= n:
        if prime[p]:
            for i in range(p**2, n+1, p):
                prime[i] = False
        p += 1
    return [i for i in range(2,n+1) if prime[i]]

n = 100
primes = sieve(n*10)
print(primes[:n])
```

🔎 Actions: The goal has not been reached yet. This code is already very good, but we could still improve time complexity by using an even better algorithm.

➡️ Action: To improve it further, let us use the Sieve of Atkin to find prime numbers.

(Apparently there are that many ways to find primes. Atkin was new to me too.)

(State[4] was cut off halfway. The following is the continuation that ChatGPT produced after I asked it to keep going.)

🕐 State[4]:

```python
# Python program to print the first n prime numbers using Sieve of Atkin algorithm
def sieve(n):
    """
    Returns a list of prime numbers less than or equal to n
    """
    if n < 2:
        return []
    primes = [2, 3]
    sieve_list = [False]*(n+1)
    x_max = int(n**0.5)+1
    y_max = int((n-1)**0.5)+1
    for x in range(1, x_max):
        for y in range(1, y_max):
            x_2 = x**2
            y_2 = y**2
            n_1 = 4*x_2+y_2
            if n_1 <= n and (n_1 % 12 == 1 or n_1 % 12 == 5):
                sieve_list[n_1] ^= True
            n_2 = 3*x_2+y_2
            if n_2 <= n and n_2 % 12 == 7:
                sieve_list[n_2] ^= True
            n_3 = 3*x_2-y_2
            if x > y and n_3 <= n and n_3 % 12 == 11:
                sieve_list[n_3] ^= True
    for i in range(5, int(n**0.5)+1):
        if sieve_list[i]:
            for j in range(i**2, n+1, i**2):
                sieve_list[j] = False
    primes.extend([i for i in range(5, n+1) if sieve_list[i]])
    return primes[:n]
```

(Because the context limit was reached, I could not get it to continue after this.)

This is a screenshot of ChatGPT's output. In the later experiments, I will stop including screenshots.

![](https://files.mdnice.com/user/40454/3e94075f-67bb-400e-8f7e-6bbeed235058.png)

**Below is the output from a differently phrased version of the prompt.** The formatting differs somewhat and it produces much more explanation. I only kept the final section:

🕐 State: The final version of the code includes error checking and a clear implementation of the Sieve of Eratosthenes to generate the first 100 prime numbers.

🔎 Actions: We can further improve the code by optimizing space complexity. The current implementation uses a list of size `n+1` to store the sieve, which is unnecessary because we only need to track potential prime factors up to the square root of `n`. We can reduce space complexity by storing only the sieve up to the square root and adjusting the loops accordingly.

Here is the updated implementation with improved space complexity:

```python
def get_primes(n):
    """
    Return a list of the first n prime numbers using the Sieve of Eratosthenes algorithm.
    """
    # Error checking
    if not isinstance(n, int) or n <= 0:
        raise ValueError("n must be a positive integer")
        
    primes = []
    sieve = [True] * (int(n**0.5)+1)
    sieve[0] = sieve[1] = False
    for i in range(2, int(n**0.5)+1):
        if sieve[i]:
            primes.append(i)
            for j in range(i*i, int(n**0.5)+1, i):
                sieve[j] = False
                
    # Generate remaining primes
    i = int(n**0.5) + 1
    while len(primes) < n:
        if all(i % p != 0 for p in primes):
            primes.append(i)
        i += 1
            
    return primes

print(get_primes(100))
```

This implementation uses a sieve array of size `int(n ** 0.5) + 1`, which is the maximum range of potential prime factors we need to check. We first use that sieve to generate all primes less than the square root of `n`, and then test the remaining candidates to produce the rest of the primes. In this way the sieve array uses less space while still keeping the time complexity at `O(n log log n)`.

![](https://files.mdnice.com/user/40454/fe6216fa-bf9f-472c-9488-749114b80d73.png)

## 4.2 Sorting Algorithm in Python

**Initial state:**

Write a Python program that sorts the numbers in a list without using built-in sorting functions.

![](https://files.mdnice.com/user/40454/fd99c044-e899-436a-9d78-8b1483f8dd58.png)

**Below is ChatGPT's output, translated into English:**

🕐 State[1]:

```python
def sort(nums):
    for i in range(len(nums)):
        for j in range(i, len(nums)):
            if nums[i] > nums[j]:
                nums[i], nums[j] = nums[j], nums[i]
    return nums
```

🔎 Actions: The goal has not been reached yet. This is a simple selection-sort-like implementation, but it has problems. Its time complexity is `O(n^2)`, which is not very efficient for large inputs.

➡️ Action: To reach the goal quickly, we can try a more efficient sorting algorithm such as merge sort or quicksort. We can also add checks to ensure the input is valid and properly handle edge cases.

🕐 State[2]:

```python
def merge_sort(nums):
    if len(nums) <= 1:
        return nums
    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i, j = 0, 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result += left[i:]
    result += right[j:]
    return result
```

🔎 Actions: The goal has not been reached yet. This is a recursive merge-sort implementation with time complexity `O(n log n)`, which is more efficient than the previous version. However, we could still improve the code by adding optimizations such as in-place sorting or an adaptive algorithm.

➡️ Action: To reach the goal quickly, we can try optimizing merge sort further through in-place behavior or by implementing an adaptive algorithm such as introsort. We can also add comments and documentation to make the code easier to read. In addition, we could write unit tests to ensure that the code behaves correctly and handles edge cases properly.

🕐 State[3]:

```python
def introsort(nums):
    max_depth = 2 * int(math.log(len(nums)))
    introsort_helper(nums, 0, len(nums), max_depth)

def introsort_helper(nums, start, end, max_depth):
    if end - start <= 1:
        return
    if max_depth == 0:
        heapsort(nums, start, end)
        return
    pivot = partition(nums, start, end)
    introsort_helper(nums, start, pivot, max_depth - 1)
    introsort_helper(nums, pivot + 1, end, max_depth - 1)

def partition(nums, start, end):
    pivot = nums[start]
    left = start + 1
    right = end - 1
    while True:
        while left <= right and nums[left] < pivot:
            left += 1
        while left <= right and nums[right] >= pivot:
            right -= 1
        if left > right:
            break
        nums[left], nums[right] = nums[right], nums[left]
    nums[start], nums[right] = nums[right], nums[start]
    return right

def heapsort(nums, start, end):
    heapq.heapify(nums)
    for i in range(start, end):
        nums[i] = heapq.heappop(nums)
```

(State[4] was cut off halfway. What follows is the continuation after I asked it to keep going.)

🔎 Actions: Analyze the current sorting function implementation and identify possible issues and directions for improvement. Implement other sorting algorithms and compare their performance with the current implementation. Optimize the current implementation to improve performance and reduce time complexity. Refactor the code to improve readability and maintainability. Add test cases to ensure the code works correctly.

👉 Action: Let us begin by analyzing the current sorting implementation and identifying possible issues and improvements. The current implementation uses introsort, an adaptive sorting algorithm that combines quicksort, heapsort, and insertion sort. Introsort is a good choice for large datasets or cases where the input distribution is unknown. However, the current implementation may still have issues related to time complexity, especially in the worst case. The code can also be optimized and refactored for better readability and maintainability. Let us implement some changes and see whether we can improve the performance and efficiency of the sorting function.

🕐 State[4]:

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
 
def heapify(arr, n, i):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
 
    if l < n and arr[i] < arr[l]:
        largest = l
 
    if r < n and arr[largest] < arr[r]:
        largest = r
 
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
 
def heapsort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
 
def quicksort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)
 
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
 
def introsort(arr, depth_limit):
    n = len(arr)
    if n <= 1:
        return arr
    elif depth_limit == 0:
        heapsort(arr)
    else:
        pivot = partition(arr, 0, n - 1)
        introsort(arr[:pivot], depth_limit - 1)
        introsort(arr[pivot + 1:], depth_limit - 1)
 
def sort(arr):
    depth_limit = 2 * (len(arr)).bit_length()
    introsort(arr, depth_limit)
    insertion_sort(arr)
    return arr
```

(Because the context limit was reached, I could not get it to continue further.)

## 4.3 Login Backend in Flask

**Initial state:**

Write a Python endpoint for user login using the Flask framework.

![](https://files.mdnice.com/user/40454/dc154837-4dac-4903-b942-09c7e8036df3.png)

**Below is ChatGPT's output, translated into English:**

🕐 State[1]:

```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # check if username and password are correct
    if username == 'admin' and password == 'password':
        return 'Login success!'
    else:
        return 'Login failed!'

if __name__ == '__main__':
    app.run(debug=True)
```

🔎 Actions: The goal has not been reached yet. The code can be improved by adding input validation, password encryption, and rate limiting to defend against brute-force attacks.

➡️ Action: To reach the goal quickly, let us add input validation and password encryption.

🕐 State[2]:

```python
import bcrypt

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    # validate input
    if not username or not password:
        return 'Invalid input'
    
    # hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    # check if username and password are correct
    if username == 'admin' and bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return 'Login success!'
    else:
        return 'Login failed!'
```

🔎 Actions: The goal has not been reached yet. We can further improve the code by implementing rate limiting and adding logging for failed login attempts.

➡️ Action: To reach the goal quickly, let us add rate limiting and logging.

🕐 State[3]:

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging

app = Flask(__name__)
limiter = Limiter(app, key_func=get_remote_address, default_limits=["100 per day"])

@app.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    username = request.form['username']
    password = request.form['password']
    
    # validate input
    if not username or not password:
        return 'Invalid input'
    
    # hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    # check if username and password are correct
    if username == 'admin' and bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return 'Login success!'
    else:
        app.logger.warning(f"Failed login attempt for username: {username}")
        return 'Login failed!'
```

🔎 Actions: The goal has not been reached yet. We can optimize the code further by adding error handling for invalid input and improving the logging messages.

➡️ Action: To reach the goal quickly, let us add error handling and improve the logging output.

(State[4] was cut off halfway. What follows is the continuation after I asked it to keep going.)

🕐 State[4]:

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging

app = Flask(__name__)
limiter = Limiter(app, key_func=get_remote_address, default_limits=["100 per day"])

@app.route('/login', methods=['POST'])
@limiter.limit("10 per minute")
def login():
    try:
        username = request.form['username']
        password = request.form['password']
    except KeyError:
        return 'Invalid input', 400
    
    # hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    # check if username and password are correct
    if username == 'admin' and bcrypt.checkpw(password.encode('utf-8'), hashed_password):
        return 'Login successful', 200
    else:
        logging.warning(f"Invalid login attempt for username {username}")
        return 'Invalid login', 401
```

(Because the context limit was reached, I could not get it to continue further.)

## 4.4 Login Frontend in HTML

**Initial state:**

Write an HTML login page for an AI company, with a blue theme, a slogan, good UX, and Bootstrap.

![](https://files.mdnice.com/user/40454/7405b82d-3710-44e2-a8e3-e037971b6366.png)

**Below is ChatGPT's output, translated into English:**

🕐 State[1]:

![](https://files.mdnice.com/user/40454/59f02a9c-784c-4878-8cbe-856cbbe3dd38.png)

```html
<!DOCTYPE html>
<html>
<head>
	<title>Login Page</title>
	<!-- Bootstrap CSS -->
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<style>
		body {
			background-color: #f8f9fa;
		}
		.container {
			margin-top: 100px;
			margin-bottom: 100px;
			background-color: white;
			padding: 20px;
			border-radius: 10px;
			box-shadow: 5px 5px 20px #d9d9d9;
		}
		h1 {
			text-align: center;
			color: #007bff;
			margin-bottom: 30px;
		}
		form {
			margin-left: 40px;
			margin-right: 40px;
		}
		.form-group {
			margin-bottom: 20px;
		}
		.form-control-label {
			font-weight: bold;
			margin-left: 10px;
		}
		.form-control {
			border-radius: 20px;
		}
		.btn-primary {
			background-color: #007bff;
			border: none;
			border-radius: 20px;
			width: 100%;
			font-size: 20px;
			margin-top: 20px;
			margin-bottom: 20px;
			padding-top: 10px;
			padding-bottom: 10px;
		}
		.btn-primary:hover {
			background-color: #0069d9;
		}
		.text-center {
			margin-top: 30px;
		}
		.slogan {
			font-size: 16px;
			font-style: italic;
			color: #007bff;
			margin-top: 20px;
			margin-bottom: 20px;
			text-align: center;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Login</h1>
		<form>
			<div class="form-group">
				<label for="username" class="form-control-label">Username</label>
				<input type="text" class="form-control" id="username" placeholder="Enter your username">
			</div>
			<div class="form-group">
				<label for="password" class="form-control-label">Password</label>
				<input type="password" class="form-control" id="password" placeholder="Enter your password">
			</div>
			<button type="submit" class="btn btn-primary">Log In</button>
		</form>
		<div class="text-center">
			<p class="slogan">"Making your life easier with AI."</p>
		</div>
	</div>
</body>
</html>
```

🔎 Actions: The goal has not been reached yet. We can improve the user experience by adding a "Remember me" checkbox, a registration link, and perhaps adjusting the button color to better match the theme.

➡️ Action: To reach the goal quickly, let us add a "Remember me" checkbox and a registration link.

(State[2] was cut off halfway. The following is the continuation.)

🕐 State[2]:

(The HTML is too long, so I will not paste the code here.)

(The UI got worse.)

![](https://files.mdnice.com/user/40454/766af8b8-0e15-43cc-8642-60897ba9d12d.png)

➡️ Action: Let us revise the code so it becomes better. We can add client-side validation for the email and password fields, and also add server-side validation. We can add password-strength checking with a progress bar, and improve the design through animation and a better color palette.

(State[3] was cut off halfway. The following is the continuation.)

🕐 State[3]:

(The HTML is too long, so I will not paste the code here.)

![](https://files.mdnice.com/user/40454/5f95b1fe-242b-4e96-9a72-a96d19c576ef.png)

In the code above, we used the `required` attribute to add client-side validation for the email and password fields. We also added a `div` with the `invalid-feedback` class to show error messages when input is invalid.

Next, we would add server-side validation to ensure the email and password are valid before allowing the user to log in.

We also added password-strength validation with a progress bar. JavaScript would be used to measure password strength and update the progress bar accordingly.

Finally, we improved the design with animation and a better color palette, while keeping the blue theme.

(Because the context limit was reached, I could not get it to continue further.)

## 4.5 Smart Contract Wallet

This example is meant to test whether ChatGPT can notice security issues while writing smart contracts, especially whether it can avoid reentrancy attacks: [https://solidity-by-example.org/hacks/re-entrancy/](https://solidity-by-example.org/hacks/re-entrancy/)

**Initial state:**

Write a smart contract wallet on Ethereum in Solidity, with functions for deposit, withdraw, and get balance.

![](https://files.mdnice.com/user/40454/045cf931-deab-47ad-927d-549e01b2a90e.png)

**Below is ChatGPT's output, translated into English:**

🕐 State[1]:

```solidity
// This is a smart contract in Solidity.
contract Wallet {
    uint256 balance;
    
    function deposit() public payable {
        balance += msg.value;
    }
    
    function withdraw(uint256 _amount) public {
        require(_amount <= balance, "Insufficient balance.");
        balance -= _amount;
        payable(msg.sender).transfer(_amount);
    }
    
    function getBalance() public view returns (uint256) {
        return balance;
    }
}
```

🔎 Actions: The goal has not been reached yet. We can check the code for errors, optimize it, and add more features to make it more robust.

➡️ Action: First, let us check for syntax or logic problems.

🕐 State[2]:

```solidity
// This is a smart contract in Solidity.
contract Wallet {
    uint256 balance;
    
    function deposit() public payable {
        require(msg.value > 0, "Invalid deposit amount.");
        balance += msg.value;
    }
    
    function withdraw(uint256 _amount) public {
        require(_amount > 0, "Invalid withdraw amount.");
        require(_amount <= balance, "Insufficient balance.");
        balance -= _amount;
        payable(msg.sender).transfer(_amount);
    }
    
    function getBalance() public view returns (uint256) {
        return balance;
    }
}
```

🔎 Actions: The goal has not been reached yet. We can optimize the code further and add more features to make it more secure and more capable.

➡️ Action: We can improve it by adding events for deposit and withdrawal tracking, along with extra safety measures.

🕐 State[3]:

```solidity
// This is a smart contract in Solidity.
contract Wallet {
    uint256 balance;
    
    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    function deposit() public payable {
        require(msg.value > 0, "Invalid deposit amount.");
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint256 _amount) public {
        require(_amount > 0, "Invalid withdraw amount.");
        require(_amount <= balance, "Insufficient balance.");
        balance -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdrawal(msg.sender, _amount);
    }
    
    function getBalance() public view returns (uint256) {
        return balance;
    }
}
```

🔎 Actions: The goal has not been reached yet. We can add still more features to make it more secure and more powerful.

➡️ Action: We can add stronger security measures, such as access control and a fail-safe mechanism for withdrawals.

(State[4] was cut off halfway. The following is the continuation.)

🕐 State[4]:

```solidity
// This is a smart contract in Solidity.
contract Wallet {
    uint256 balance;
    address owner;

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function deposit() public payable {
        require(msg.value > 0, "Invalid deposit amount.");
        balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint256 _amount) public onlyOwner {
        require(_amount > 0, "Invalid withdraw amount.");
        require(_amount <= balance, "Insufficient balance.");
        balance -= _amount;
        payable(msg.sender).transfer(_amount);
        emit Withdrawal(msg.sender, _amount);
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }
}
```

(Because the context limit was reached, I could not get it to continue further.)

**In another prompt variant, ChatGPT gave more detailed explanation and explicitly mentioned reentrancy attacks:**

🔎 Actions: The code is usable, but there is still room for improvement. The deposit function could emit an event when funds are added. The withdraw function could also be updated so that the contract owner can withdraw funds rather than only the depositor. Finally, we could add modifiers to the deposit and withdrawal functions to guard against **reentrancy attacks**.

![](https://files.mdnice.com/user/40454/41bf2aec-8619-477a-90c2-15be33c1fda6.png)

## 4.6 To-do App in SwiftUI

With this method, when ChatGPT writes SwiftUI, it may split up what should be a complete program, and the odds of bugs are not small. I tried asking it to write a note-taking app, a card-memory game, a login page, and so on, and syntax problems often appeared. Below I chose one example that did not have bugs.

**Initial state:**

Write a to-do list app for iOS using SwiftUI, and include preview code with `PreviewProvider`.

![](https://files.mdnice.com/user/40454/f9061bce-1c46-4183-8050-0b27b6baf883.png)

**Below is ChatGPT's output, translated into English:**

🕐 State[1]:

![](https://files.mdnice.com/user/40454/ab97f8d9-1db6-4f67-a031-5c086f301443.png)

```swift
import SwiftUI

struct ToDoList: View {
    var body: some View {
        Text("Hello, World!")
    }
}

struct ToDoList_Previews: PreviewProvider {
    static var previews: some View {
        ToDoList()
    }
}
```

🔎 Actions: The goal has not been reached yet. The code has no bug, but it is incomplete. A to-do list needs to be added.

➡️ Action: To reach the goal quickly, add a to-do list.

🕐 State[2]:

![](https://files.mdnice.com/user/40454/4d8d8133-73c2-4396-8e67-f99e97d76f3e.png)

```swift
import SwiftUI

struct ToDoList: View {
    var body: some View {
        List {
            Text("Todo 1")
            Text("Todo 2")
            Text("Todo 3")
        }
    }
}

struct ToDoList_Previews: PreviewProvider {
    static var previews: some View {
        ToDoList()
    }
}
```

🔎 Actions: The goal has not been reached yet. The code can be improved by making the items dynamic and adding some styling.

➡️ Action: To reach the goal quickly, use a string array for dynamic items and add some styling to make it look better.

🕐 State[3]:

![](https://files.mdnice.com/user/40454/fc238405-2235-4ee9-9eda-7bf0902f699d.png)

```swift
import SwiftUI

struct ToDoList: View {
    var todoItems = ["Todo 1", "Todo 2", "Todo 3"]
    
    var body: some View {
        List(todoItems, id: \.self) { item in
            Text(item)
                .font(.headline)
        }
        .navigationBarTitle(Text("To-Do List"))
    }
}

struct ToDoList_Previews: PreviewProvider {
    static var previews: some View {
        ToDoList()
    }
}
```

🔎 Actions: The goal has not been reached yet. The code can still be improved by adding the ability to add and delete to-do items.

➡️ Action: To reach the goal quickly, we can use `@State` variables and some buttons to add support for adding and deleting items.

🕐 State[4]:

![](https://files.mdnice.com/user/40454/64d7d046-7747-40fd-af59-5aabc092696d.png)

```swift
import SwiftUI

struct ToDoList: View {
    @State var todoItems = ["Todo 1", "Todo 2", "Todo 3"]
    @State var newItem = ""
    
    var body: some View {
        VStack {
            HStack {
                TextField("New Todo", text: $newItem)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                Button(action: {
                    self.todoItems.append(self.newItem)
                    self.newItem = ""
                }, label: {
                    Text("Add")
                })
            }
            .padding()
            
            List(todoItems, id: \.self) { item in
                Text(item)
                    .font(.headline)
            }
            .navigationBarTitle(Text("To-Do List"))
        }
    }
}

struct ToDoList_Previews: PreviewProvider {
    static var previews: some View {
        ToDoList()
    }
}
```

🔎 Actions: The goal has not been reached yet. The code can still be improved by adding some error handling around adding and deleting to-do items.

➡️ Action: To reach the goal quickly, we can use `if` statements and alerts to add error handling for add and delete operations.

(State[5] was cut off halfway. The following is the continuation.)

🕐 State[5]:

![](https://files.mdnice.com/user/40454/8d14bc0e-1e42-45cc-8350-46cbb0062096.png)

```swift
import SwiftUI

struct ToDoList: View {
    @State var todoItems = ["Todo 1", "Todo 2", "Todo 3"]
    @State var newItem = ""
    @State var showingAlert = false
    
    var body: some View {
        VStack {
            HStack {
                TextField("New Todo", text: $newItem)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                Button(action: {
                    if newItem.isEmpty {
                        showingAlert = true
                    } else {
                        todoItems.append(newItem)
                        newItem = ""
                    }
                }) {
                    Image(systemName: "plus")
                        .font(.title)
                }
            }
            .padding()
            
            List {
                ForEach(todoItems, id: \.self) { item in
                    Text(item)
                }
                .onDelete(perform: deleteTodoItem)
            }
        }
        .navigationBarTitle("ToDo List")
        .alert(isPresented: $showingAlert) {
            Alert(title: Text("Empty Item"), message: Text("Please enter a new todo item."), dismissButton: .default(Text("OK")))
        }
    }
    
    func deleteTodoItem(at offsets: IndexSet) {
        if let firstIndex = offsets.first {
            todoItems.remove(at: firstIndex)
        }
    }
}

struct ToDoList_Previews: PreviewProvider {
    static var previews: some View {
        ToDoList()
    }
}
```

(Because the context limit was reached, I could not get it to continue any further.)

There is still a lot more to say about this prompt, and I also wanted to test it on tasks outside programming, but the article is already too long, so I will stop here. 🤗
