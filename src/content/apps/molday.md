---
title: Molday
year: "2024"
platform: "iOS"
summary: "一个把每日手机使用时间可视化成“发霉”过程的 iOS companion app，把 Screen Time、健康数据和一点黑色幽默放进同一个界面里。"
heroImage: "/images/apps/molday/home.png"
heroAlt: "Molday 培养皿首页"
webImage: "/images/apps/molday/apps-usage.png"
webAlt: "Molday 使用详情页面"
extensionImage: "/images/apps/molday/imessage.png"
extensionAlt: "Molday iMessage 好友助力页面"
---

Molday 是一个我很喜欢的方向: 它没有把屏幕时间做成传统的自律工具，而是把每天的手机使用时长转成一个会不断长大的“霉菌培养皿”。你用得越久，霉长得越多。

从 iOS 主项目和 landing page 的描述来看，这个产品最核心的点不是单纯统计，而是把 Screen Time、HealthKit、Family Controls 和一些带情绪的视觉表达组合起来，让“我今天是不是又在无意识刷手机”这件事变得更具体，也更难忽视。

## 核心思路

- 用培养皿视觉来呈现每日使用状态，而不是冷冰冰的数字报表。
- 把屏幕时间和步数、站立时长等健康上下文放在一起看，避免只盯着一个指标。
- 不只看数据，也允许用户进一步限制 app，或者通过好友助力来打断继续沉迷。

## 主要界面

### 培养皿

Landing page 里把这个放在第一屏，也是整个产品最重要的隐喻。首页会显示你当天“发霉”的情况，手机用得越多，培养皿里的霉菌就越明显。

![Molday 培养皿首页](/images/apps/molday/home.png)

### 使用详情

除了总量，Molday 也会拆到具体 app，告诉你到底是哪些应用在让你“发霉”。这一步很重要，因为很多时候问题不是用手机本身，而是某几个 app 在吞掉注意力。

![Molday 使用详情页面](/images/apps/molday/apps-usage.png)

### 控制发霉

如果不想让使用继续失控，Molday 也把限制能力接进来了。用户可以选择应用、设置时间上限，用更主动的方式干预当天的使用。

![Molday 应用限制设置页面](/images/apps/molday/limits.png)

### 制止继续发霉

项目里还做了 Family Controls 的 shield extension。达到限制后，系统会用 Molday 自己的视觉和文案拦住你，让你先看一眼今天已经发了多少霉，再决定要不要继续。

![Molday 屏幕时间限制遮罩页面](/images/apps/molday/shield.png)

### 好友助力

这是我觉得很有意思的一块。Molday 还做了 iMessage extension，如果你自己控制不住，可以开启好友助力。这样每次锁定后，如果还想继续用，就得通过 iMessage 向朋友请求额外时间。

![Molday iMessage 好友助力页面](/images/apps/molday/imessage.png)

## 技术实现

从主项目 README 来看，Molday 把几类 iOS 能力放在了一起：

- `Screen Time / DeviceActivity`：做分钟级使用记录和监控。
- `HealthKit + Motion`：把步数、站立时长和活动状态并入当天上下文。
- `WidgetKit`：把培养皿状态放到锁屏和桌面小组件。
- `Managed Settings / Family Controls`：接管限制后的 shield 界面。
- `iMessage Extension`：把好友助力做进消息工作流。

## 项目感觉

我喜欢 Molday 的地方在于，它不是在讲“高效”或者“自律”这些熟词，而是用一个有点荒诞、但很直觉的视觉比喻，把数字健康这件事变得更有记忆点。它既是一个工具，也有点像一个会嘲讽你的 daily companion。
