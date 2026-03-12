---
title: ChatGPT关于编程的编程
date: 2023-02-25
excerpt: ChatGPT能根据用户的指令写代码，但它能自己持续不断改进代码，而不用人为介入嘛？
locale: zh
translationKey: programming-about-programming-with-chatgpt
draft: false
---

这是另一篇探索ChatGPT能力边界的实验。

ChatGPT可以根据用户的指令，生成各种编程语言的代码，但它写出来的代码，尽管还能用，却很难称得上是什么最佳实践，甚至还存在bug。

不过，如果用户反馈代码中存在的问题，它能够重新生成更符合用户要求的代码。

能否去掉用户反馈这一步呢？

把整个编写和修改代码的步骤完全交给ChatGPT，由ChatGPT自己检查代码，发现问题，再重新写出更好的代码，不断地重复这个过程，直到写出完美的代码。

本文将对此进行研究，我们将对「ChatGPT编程」的这个过程，用自然语言进行编程。

文章中提到的prompt适用于各种编程语言，你可在公众号后台回复「prompt」获取，以对自己熟悉语言进行试验。

另外，prompt还适用于各种需要递归的任务，不限于编程。

# 目录
1. 起源：一个小问题
2. 搜索算法的启发
3. 实现递归的prompt
4. 施展魔法
    1. 寻找素数Python
    2. 排序算法Python
    3. 登录页面的后端Flask
    4. 登录页面的前端HTML
    5. 智能合约钱包Solidity
    6. 待办事项App SwiftUI

# 1 起源：一个小问题

很久之前，我让ChatGPT模拟虚拟机，并让它写了一个Python代码，代码的作用是生成前100个素数，下面是它给的代码：


![](https://files.mdnice.com/user/40454/351ed67b-3312-46a5-9e32-7b8785c9113a.png)

这是一段很糟糕的代码，有一个“1002”的hardcode，以及它的效率很低，为了判断某个数num能不能被其它数 i 整除，它遍历了从2到num-1的数，更好的做法是只遍历到num的平方根即可。

我需要不断地告诉ChatGPT哪里可以改进，它才有可能写出更好代码，这很麻烦。于是便有了做这个实验的源头。

当然，这两三个月ChatGPT写代码的水平也在不断地改进，告诉它同样的需求，它已经能生成更好的代码了。


![](https://files.mdnice.com/user/40454/8b4da8d9-dcb0-4d1e-9381-3164dd4abf49.png)

不过，我的问题依然存在，这个代码可以被改进吗？能不能让ChatGPT自己发现然后修改呢？

为了构造一个可以让ChatGPT不断修改代码的prompt，我们可以从传统的搜索算法中借鉴经验。

# 2 搜索算法的启发

地图应用中，如何找到从出发地到目的地的最佳路线；如何让机器学会下五子棋；如何让算法在迷宫中找出从A点到B的路线。

解决这类问题可以使用「搜索算法」，该算法会探索许多可能的路径，做很多的选择，直到找到问题的解决方案。


![](https://files.mdnice.com/user/40454/58a02bb8-e2fa-4654-9724-bf8d2445f21f.png)

*这部分内容的资料来自哈佛的一门AI课程：[https://cs50.harvard.edu/ai/2020/](https://cs50.harvard.edu/ai/2020/)，对AI感兴趣的同学非常建议观看，这个老师讲得很清晰。*

接下来，我将用一个例子「15 puzzle**」**，对搜索算法的原理做一个简单的介绍。


![](https://files.mdnice.com/user/40454/7fe3af82-b876-4e18-8d25-4eec2d2aeaa1.png)

这是一个来自19世纪的数字推盘游戏，有点像华容道，将编号为1到15的15块塑料片排列在一个4×4的网格中，游戏的目的是滑动这些塑料片，将它们重新排成正确的次序（下图中14和15的位置是反的，这是15 puzzle的一个例子，叫做14-15 Puzzle）。

![](https://files.mdnice.com/user/40454/76e790c5-304c-4b25-bbe4-1ef40081fba1.png)

在当时，游戏的发明人，提供了一笔大奖金，无论谁能通过一连串的塑料片滑动将“14”与“15”交换到它们正常的位置就算完成这个游戏，也就能得到奖金。

*对数学感兴趣的朋友，可以试想一下如何交换14和15的位置。注意，这是一个非常非常难的问题。*


不过，本文并不打算深入介绍14-15 Puzzle，也不打算使用数学方法，而是打算用算法的方式去了解如何处理15 puzzle，以便读者对搜索算法有所了解。

**构造搜索算法的涉及到几个概念：**

*为了理解文章后面的内容，只需了解State、Actions、Goal选择即可。*

1.**Agent**：可以理解为一个玩游戏的机器人，它能够感知环境和游戏状态，并根据环境做出决策和行动。

2.**State**：环境的状态，如在15 Puzzle中，状态就是指数字的排布，不同的排布为不同的状态，最开始的排布为初始状态Initial State。

3.**Actions**: 在某一个状态下，可以做出的选择或行动。如下图中，只有两个选择，要么将12往下移，要么将15往右移。不同状态下的能够做出的选择是不同的。

4.**Transition Model**：输入一个状态和特定的选择后，将输出一个新的状态。可以理解为，在特定的状态下，做出某个选择之后，会产生什么样的结果。

5.**State Space**：状态空间。从第一步开始，可以做出很多的行动，行动将产生新的状态，所有可能状态的集合叫做状态空间。

6.**Goal Test**：用于判断某一个状态，是否就是打算实现的目标。比如目标能是按大小顺序排列好。

7.**Path Cost**：路径的成本，在15 pizzle可以理解为移动的步数，通常情况下，会对步数进行优化，步数越少越好。


![](https://files.mdnice.com/user/40454/976715bb-55f4-4e9e-939b-53e3fc953f42.png)

上面的概念，仅仅是搜索算法的开始，本文不做详细介绍，但为了让读者有一个大概的理解，只简单介绍一下。


![](https://files.mdnice.com/user/40454/f8ca761c-ff28-4616-b541-62fcce85903f.png)

搜索算法中将会定义一个数据结构node（节点，如下图A、B、C…），用来存储状态，以及状态间的转换关系，即每个node会记录对应的状态，同时记录这个node的状态是从哪个状态做出了哪个选择得出来的。


![](https://files.mdnice.com/user/40454/14ddfa59-be5b-4019-8d2c-4b552c7158f0.png)

有了这个之后，我们就从头开始进行遍历，从初始的node开始，找出这个node可能做出的选择，接下来尝试每个选择，选择之后将各自产生新的node，接下来就是找出新的node有哪些选择，并继续做出选择，不断重复这个过程，不断地得到新的node。

由于我们记录了每个node是怎么得来的，一旦找到了满足目标的node我们就能得出从初始node到最终node的路径，也能评估路径的步数。

遍历这个词其实不准确，因为有些问题，存在很多的状态和选择，如果遍历每个node需要耗费很长的时间，并不高效，因此搜索算法需要去对此进行优化，减少遍历的node数量，更快地找到目标。

搜索算法的介绍到这里就结束了。

回到我们改进代码的问题。如果我们把某一版本的代码认为是一个State，就像15 puzzle中的数字排布是一个State，每个State对应不同版本的代码。

修改代码的操作就是能做出的选择或行动，选择的数量理论上是无穷多的，但我们不需要去遍历无穷的选择。我们的目标是，当做出一个行动之后，代码可以变得更好。

ChatGPT将为我们做出这样的行动。我们将重复这个过程，持续改进代码，可以认为是一种递归。并且和搜索算法将会探索很多条路径不同，在接下来模仿搜索算法的prompt中，我们实现的只是探索一条没有回头路路径。

下面将借鉴搜索算法，来构造我们的prompt。

# 3 实现递归的prompt

::: block-1
1.在ChatGPT中，同一句话，使用中文需要的token是英文的2～3倍，而prompt允许的最大token数又很有限，因此下面将使用英文来写prompt，我会加上中文的说明。

2.prompt将同时使用到 [从简单的提问到类比](https://www.notion.so/028f593862f1422fac5e8df97d27cb4e) 和 [增强ChatGPT回答的逻辑性](https://www.notion.so/ChatGPT-87036720bbed4d55846ab9ccdc04b359) 提到的方法，包括：chain-of-thought，few-shot。

3.我们初始的目的是为了让ChatGPT能够自己改进代码，为了做到这个，prompt需要实现递归的功能，而递归是通用的，适用于各种任务，因此该prompt并不局限于改进代码。不过，也可以写一个专用的prompt的，或许能达到更好的效果。
:::

这个prompt将由4个部分构成：

1. **指令描述**：用于描述这个prompt要实现的功能，以及能处理什么样类型的问题。
2. **格式要求**：在处理问题时，应该满足的格式，如何递归的输出。
3. **示例**：给出2个示例，让ChatGPT清楚具体如何处理问题。
4. **测试**：测试一下ChatGPT是否理解了

## 3.1 指令描述

指令描述中包含2部分：

1. 就像前面的搜索算法，我们也会定义一个Agent（机器人），我们管它叫做**GPT- A**，它能够处理类似搜索的问题，给出递归式的回答过程，回答的过程可以认为是递归时的打印结果，见格式要求的部分。
2. 定义GPT- A能够处理的问题，这类问题将会有状态、行动的规则（状态间可以如何转换）、目标。让GPT-A处理问题前，都需要先把问题的初始状态确定好，以及做出行动的规则是什么，要达到什么样的目标才能结束。

![](https://files.mdnice.com/user/40454/055ced4c-26a6-4975-b90d-5c25d23c456a.jpeg)

## 3.2 格式要求

GPT- A处理问题时，过程中将不断重复 State、Actions、Action这3个步骤，直到达到目标。

::: block-1
**State**[1]：为了区分State，在其后面将标上数字，第一个为State[1]，将用于接收给定问题的初始状态。

**Actions**：对于上面的State[1]和行动的规则ActionRule，列出能做出的选择

**Action**：从Actions列出的多个选择中，选择最能实现目标的一个行动

**State**[2]：根据上面的行动，得出的新状态

**Actions**：对于上面的State[2]和行动的规则ActionRule，列出能做出的选择

**Action**：从Actions列出的多个选择中，选择最能实现目标的一个行动

{重复上面的步骤，直到达到目标}

**State**[n]：根据上面的行动，得出的新状态

**Actions**：判断出这个状态就是目标的状态，所以不需要列出选择

结束
:::
![](https://files.mdnice.com/user/40454/e5adde6d-dce0-4e31-8c2b-1cf483181621.jpeg)

 
## 3.3 示例

提供2个示例，供ChatGPT学习。

### 示例1

正如我前面说的，这个递归的功能，是可以处理通用任务的，不仅仅能处理代码问题，所以在示例1中将举出一个与代码无关的问题。

我们将这个问题取名为MinusNumber（减去数字），并定义好该问题：

1. **初始状态**：10
2. **行动的规则**：只能有3个选择，减4、减2、减1，但是连续两个步骤不能做出相同的选择，如果前一个步骤选择的是减4，那么下一个步骤只能减2或减1
3. **目标**：让数字减少到比0小


![](https://files.mdnice.com/user/40454/a4d6b5ec-3ed9-4ebf-897b-c962c09c65c6.jpeg)

接下来是GPA-A处理该问题的过程：

::: block-1
**State**[1]：10

**Actions**：未达到目标。可选择：减4、减2、减1

**Action**：为了尽快达到目标。减4

**State**[2]：6

**Actions**：未达到目标。可选择：减2、减1

**Action**：为了尽快达到目标。减2

**State**[3]：4

**Actions**：未达到目标。可选择：减4、减1

**Action**：为了尽快达到目标。减4

**State**[4]：0

**Actions**：未达到目标。可选择：减2、减1

**Action**：为了尽快达到目标。两个选择都一样，减1

**State**[5]：-1

**Actions**：-1小于0，实现了目标
完成
:::
![](https://files.mdnice.com/user/40454/009be9e5-c66f-41f0-bb9a-38326dfaeb56.jpeg)


### 示例2

如果示例2不是代码问题，GPT-A也能可以处理代码问题，但格式将会出现问题，所以示例2的主要目的是，为了向ChatGPT展示如何处理代码的格式。

我们将这个问题取名为ImprovePythonCode（改进Python代码），并定义好该问题：

1. **初始状态**：见下图，为3个print。放在了一个代码块里。
2. **行动的规则**：检查bug和改进代码
3. **目标**：让代码好一点点（这个目标是为了写示例比较简单）



![](https://files.mdnice.com/user/40454/3ed6b18c-e2a4-48fd-9eea-095e81aa01b8.jpeg)

接下来是GPA-A处理该问题的过程：
::: block-1
**State**[1]：（前面定义的初始状态的代码，见下图）

**Actions**：未达到目标。存在语法错误print 1。（此处与示例1的写法不同，为的是提高其通用性）

**Action**：为了尽快达到目标。修复bug

**State**[2]：（将print 1 改成 print(1)，见下图）

**Actions**：未达到目标。代码存在重复项，可以写一个函数，或放在循环里

**Action**：为了尽快达到目标。将代码放在for循环里。

**State**[3]：（将代码转成for循环，见下图）

**Actions**：这个代码比前面好了一点点，实现了目标
完成

:::

![](https://files.mdnice.com/user/40454/bbc4577d-a567-4093-acd4-a4e1ce71b18b.jpeg)

## 3.4 测试

为了测试ChatGPT是否理解了前面的规则，我们在prompt的最后，增加一个问题，作为测试。

我们将这个问题取名为DeleteNumber（删除数字），并定义好该问题：

1. **初始状态**：一个列表[3,10,2,5]
2. **行动的规则**：只能删除最大的数字，需要先找到该数字
3. **目标**：删除所有数字



![](https://files.mdnice.com/user/40454/49e68098-61c2-4bcd-946d-3329de6d9fa4.jpeg)

以下是ChatGPT的输出


![](https://files.mdnice.com/user/40454/774c9a55-7c98-4921-8337-c222e27330e0.png)

成功解决了问题。

接下来，我们把问题定义成一个代码持续改进的问题，看一下它的表现。

## 4 施展魔法

现在，我们来让ChatGPT根据要求，写出代码，并在这个基础上不断改进，达到完美。


![](https://files.mdnice.com/user/40454/18fbbca9-4a1f-460c-adaa-69800f796052.jpeg)

我们将这个问题取名为WritePerfectCode（写出完美代码），并定义好该问题：

1. **初始状态：（描述需要让GPT-A写的代码）**
2. **行动的规则**：首先根据描述把代码写出来，之后需要对代码进行改进。要修改代码时，需要列出可以做出的选择，如检查bug，时间复杂度，hardcode之类的。要尽量尝试，达成目标，不要轻易放弃。
3. **目标**：写出完美的代码

注意：定义问题的promt可以有很多种写法。如初始状态写成(empty code)，而在目标中描述代码需求。行动的规则也是可以更改的，如增加更多的描述让其检查 空间复杂度，错误处理，可读性等等。不同的写法带来的效果会有所不同，写得越完整也不代表会产生好的结果，需要进行许多的尝试，由于时间有限，本文将不会列出具体的差异和表现。

本文中定义问题的promt，在进行选择时，ChatGPT不会输出太多解释，基本就是一两句话。而另一种写法，会输出很多解释。

::: block-1
1.几乎相同的条件下，输出的结果可能会有差异，下面的答案会排除了那些很差的结果。

2.由于prompt和代码占了很多toke，回答也常常从中间就截止了，继续输出的表现不连续，从来都没有真正写出过「完美」的代码，如果ChatGPT的context更多点，或许可以得到更好的结果。

3.ChatGPT有时写的代码太过风骚，我没有全部看懂，所以代码部分将不做详细解释。

4.在context有限的情况下，本prompt并不能用于日常编程，直接描述需求并与ChatGPT对话会产生更好的效果。

5.使用本文的prompt时，ChatGPT有一种从0写起代码的倾向，然后再不断改进，不会在一开始就给出一个很好的版本。这或许有一些教育意义，即学习从0构建程序，了解代码迭代的过程。

:::

## 4.1 寻找素数Python

**初始状态：**

写一个python代码，打印前100个素数。


![](https://files.mdnice.com/user/40454/88573d94-9e04-417c-b1fc-92263c950ad8.png)

**以下是ChatGPT的输出，已翻译成中文：**

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

🔎 Actions：还没有达到目标。这段代码能够正确运行，但我们可以改进它。我们可以优化算法，以更高效地找到质数，可以使用筛法方法，或使用预先计算好的质数列表。我们还可以添加一些注释，以更好地解释代码。

➡️ Action：为了改进代码，让我们使用筛法方法来找到质数。

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

（这个算法我着实没有想到）

🔎 Actions：还没有达到目标。这段代码运行速度更快，但我们可以进一步优化它，通过将硬编码的值 n 替换为一个输入参数。此外，我们可以添加更多注释来解释筛法方法的工作原理。

➡️ Action：为了进一步改进代码，让我们将 n 设为参数，并添加更多注释。

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

🔎 Actions：还没有达到目标。这段代码运行得非常完美，但我们仍然可以通过使用更好的算法来提高时间复杂度。

➡️ Action：为了进一步改进代码，让我们使用 Atkin 筛法算法来找到质数。

（原来寻找素数有这么多算法，Atkin也是我不知道的）

（State[4]只输出了一半，下面是让它继续输出的结果）

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

（由于超出了context，无法再让它输出了）

这是ChatGPT输出的截图。在接下来的试验中，将不再贴图。


![](https://files.mdnice.com/user/40454/3e94075f-67bb-400e-8f7e-6bbeed235058.png)

**下面是另一种定义问题的prompt输出的结果**，格式会有写差异，并输出了大量的解释。仅取最后的一段：

🕐 State: 最终版本的代码包括错误检查和 Eratosthenes 筛法算法的清晰实现，以生成前100个质数。

🔎 Actions: 我们可以通过优化空间复杂度来进一步改进代码。当前的实现使用大小为n+1的列表来存储筛子，这是不必要的，因为我们只需要跟踪到n的平方根为止的潜在质数。我们可以通过只存储到n的平方根的筛子并相应地调整循环来减少空间复杂度。

这里是优化了空间复杂度的更新实现:

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

这个实现使用一个大小为int(n ** 0.5) + 1的筛选数组，这是我们需要检查的最大潜在质因数。我们首先使用筛选器来生成所有小于n的平方根的质数，然后我们检查剩余的数字来生成其余的质数。这种实现降低了筛选数组的空间复杂度，同时仍然保持O(n log log n)的时间复杂度。


![](https://files.mdnice.com/user/40454/fe6216fa-bf9f-472c-9488-749114b80d73.png)

## 4.2 排序算法Python

**初始状态：**

写一个python代码，对列表中的数字进行排序，不能使用内建的函数。


![](https://files.mdnice.com/user/40454/fd99c044-e899-436a-9d78-8b1483f8dd58.png)

**以下是ChatGPT的输出，已翻译成中文：**

🕐 State[1]:

```python
def sort(nums):
    for i in range(len(nums)):
        for j in range(i, len(nums)):
            if nums[i] > nums[j]:
                nums[i], nums[j] = nums[j], nums[i]
    return nums
```

🔎 Actions：还没有达到目标。这段代码是选择排序的简单实现，但存在一些问题，比如时间复杂度是O(n^2)，对于大输入大小不是很高效。

➡️ Action：为了快速达到目标，我们可以尝试使用更高效的排序算法，如归并排序或快速排序，以改进时间复杂度。我们还可以添加一些检查，确保输入有效，并正确处理边缘情况。

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

🔎 Actions：还没有达到目标。这段代码是归并排序的递归实现，其时间复杂度为O(n log n)，比之前的实现更高效。然而，我们仍然可以通过添加一些优化来改进代码，例如使用原地排序或实现自适应排序算法。

➡️ Action：为了快速达到目标，我们可以尝试通过使用原地排序或实现自适应排序算法（如introsort）来优化归并排序算法。我们还可以添加一些注释和文档，使代码更易读、易懂。此外，我们可以编写一些单元测试，以确保代码正确工作并正确处理边缘情况。

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

（State[4]只输出了一半，下面是让它继续输出的结果）

🔎 Actions：
分析当前的排序函数实现，确定潜在问题和改进的方向。实现不同的排序算法，并比较它们与当前实现的性能。对当前实现进行优化，以提高性能并减少时间复杂度。重构代码以提高其可读性和可维护性。添加测试用例以确保代码正常工作。

👉 Action：
让我们从分析当前排序函数的实现，确定潜在问题和改进的方向开始。当前排序函数的实现使用introsort，这是一种自适应排序算法，它结合了quicksort、heapsort和插入排序。introsort是在排序大数据集或输入数据未知的情况下的一个很好的选择。然而，当前实现可能存在与其时间复杂度有关的潜在问题，特别是在最坏的情况下。此外，代码可以进行优化和重构，以提高其可读性和可维护性。让我们实现一些修改，看看我们是否可以提高排序函数的性能和效率。

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

（由于超出了context，无法再让它输出了）

## 4.3 登录页面的后端Flask

**初始状态：**

写一个python代码，用户登录的端点，使用Flask框架


![](https://files.mdnice.com/user/40454/dc154837-4dac-4903-b942-09c7e8036df3.png)

**以下是ChatGPT的输出，已翻译成中文：**

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

🔎 Actions：还没有达到目标。可以通过添加输入验证、密码加密和实现速率限制来改进代码，以防止暴力攻击。

➡️ Action：为了快速达到目标，我们添加输入验证和密码加密。

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

🔎 Actions：还没有达到目标。我们可以通过实施速率限制和添加登录失败的日志记录来进一步改进代码。

➡️ Action：为了快速达到目标，我们添加速率限制和日志记录

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

🔎 Actions：还没有达到目标。我们可以通过添加无效输入的错误处理和改进日志消息来进一步优化代码。

➡️ Action：为了快速达到目标，我们添加错误处理和改进日志消息。

（State[4]只输出了一半，下面是让它继续输出的结果）

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

（由于超出了context，无法再让它输出了）

## 4.4 登录页面的前端HTML

**初始状态：**

写一个HTML，一个AI公司的登录页面，蓝色主题，写上slogan，好的UX，使用bootstrap框架。


![](https://files.mdnice.com/user/40454/7405b82d-3710-44e2-a8e3-e037971b6366.png)

**以下是ChatGPT的输出，已翻译成中文：**

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

🔎 Actions：还未达到目标。我们可以通过添加记住我复选框、添加注册页面链接以及更改按钮颜色以匹配主题来改善用户体验。

➡️ Action：为了快速达到目标，我们可以添加记住我复选框和注册页面链接。

（State[2]只输出了一半，下面是让它继续输出的结果）

🕐 State[2]:

（由于HTML太长了，这里不贴代码了）

（UI变差了）


![](https://files.mdnice.com/user/40454/766af8b8-0e15-43cc-8642-60897ba9d12d.png)

➡️ Action：让我们修订代码，使其更好。我们可以为电子邮件和密码字段添加客户端验证，也可以添加服务器端验证。我们还可以添加密码强度验证，并使用进度条显示输入密码的强度。我们还可以通过添加动画和更好的配色方案来改善设计。

（State[3]只输出了一半，下面是让它继续输出的结果）

🕐 State[3]:

（由于HTML太长了，这里不贴代码了）


![](https://files.mdnice.com/user/40454/5f95b1fe-242b-4e96-9a72-a96d19c576ef.png)

在上述代码中，我们使用“required”属性为电子邮件和密码字段添加了客户端验证。我们还添加了一个带有“invalid-feedback”类的div，用于在输入无效时显示错误消息。

接下来，我们将添加服务器端验证，以确保在允许用户登录之前电子邮件和密码是有效的。

我们还使用进度条添加了密码强度验证。我们将使用JavaScript来检查密码的强度并相应地更新进度条。

最后，我们通过添加动画和更好的颜色方案来改善设计。我们使用了一个蓝色主题。

（由于超出了context，无法再让它输出了）

## 4.5 智能合约钱包

本例用于试验，ChatGPT写智能合约时能不能注意到安全问题，避免受到重入攻击：[https://solidity-by-example.org/hacks/re-entrancy/](https://solidity-by-example.org/hacks/re-entrancy/)

**初始状态：**

在以太坊上写一个智能合约钱包，使用solidity，需要包括几个函数：存款，取款，获取余额。


![](https://files.mdnice.com/user/40454/045cf931-deab-47ad-927d-549e01b2a90e.png)

**以下是ChatGPT的输出，已翻译成中文：**

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

🔎 Actions：尚未达成目标。我们可以检查代码中的任何错误，优化代码以提高性能，并添加更多功能以使其更强大。

➡️ Action：首先，让我们检查代码中是否存在语法或逻辑错误。

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

🔎 Actions：尚未达成目标。我们可以优化代码以提高性能，并添加更多功能以使其更强大。

➡️ Action：我们可以通过添加用于跟踪存款和取款交易的事件以及向函数添加更多安全措施来优化代码。

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

🔎 Actions：尚未达成目标。我们可以添加更多功能以使其更强大和安全。

➡️ Action：我们可以通过实施访问控制机制和为取款实施故障安全机制来向函数添加更多安全措施。

（State[4]只输出了一半，下面是让它继续输出的结果）

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

（由于超出了context，无法再让它输出了）

**在另一个prompt版本中，ChatGPT将输出更详细的解释，明确提到重入攻击**：

🔎 Actions：代码已经可用，但仍有改进的空间。存款功能可以更新为在进行存款时发出事件。此外，取款功能也可以更新，使合约所有者能够提取资金，而不仅仅是存款人。最后，我们可以为存款和提款功能添加修改器以检查**重入攻击**。


![](https://files.mdnice.com/user/40454/41bf2aec-8619-477a-90c2-15be33c1fda6.png)

## 3.6 待办事项App SwiftUI

通过这个方式，ChatGPT在写SwiftUI时，可能会把完整代码拆开，写的代码存在bug的可能性不小。我试过让他写笔记软件，记忆卡片游戏，登录页面等等，会遇到语法的问题。下面取了一个没有bug的示例。

**初始状态：**

写一个在iOS平台的to-do list的app，使用SwiftUI，需要提供预览的代码PreviewProvider。


![](https://files.mdnice.com/user/40454/f9061bce-1c46-4183-8050-0b27b6baf883.png)

**以下是ChatGPT的输出，已翻译成中文：**

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

🔎 Actions：目标尚未达成。代码没有bug，但是不完整，需要添加一个todo列表。
➡️ Action：为了快速达成目标，添加一个todo列表。

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

🔎 Actions：目标尚未达成。通过使待办事项动态化并添加一些样式，可以改进代码。
➡️ Action：为了快速达成目标，我们可以使用字符串数组使待办事项动态化，并添加一些样式使其更美观。

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

🔎 Actions：目标尚未达成。通过添加一些功能以添加和删除待办事项，代码仍然可以改进。

➡️ Action：为了快速达成目标，我们可以使用@State变量和一些按钮来添加添加和删除待办事项的功能。

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

🔎 Actions：目标尚未达成。通过为添加和删除待办事项添加一些错误处理，代码仍然可以改进。

➡️ Action：为了快速达成目标，我们可以使用if语句和警报来为添加和删除待办事项添加错误处理。

（State[5]只输出了一半，下面是让它继续输出的结果）

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

（由于超出了context，无法再让它输出了）

对于这个prompt还有很多要说的，也想试验编程之外的内容，但文章实在太长了，到此就结束吧。🤗
