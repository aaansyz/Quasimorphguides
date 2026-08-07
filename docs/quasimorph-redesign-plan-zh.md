# QuasimorphWiki.com 第二版：Codex 完整改版任务书

> 目标站点：[quasimorphwiki.com](https://quasimorphwiki.com/)  
> 执行范围：内容研究、内容撰写、信息架构、交互、SEO、代码、测试与上线前验证  
> 对标站点：[quasimorph.wiki](https://quasimorph.wiki/) · [quasimorph.online](https://quasimorph.online/) · [Official Quasimorph Wiki](https://quasimorph.wiki.gg/)

## 1. 总体任务

直接完成第二版网站，不要只搭页面骨架。开发过程中同步完成公开资料研究、选题筛选、事实核验、英文内容整合、页面实现和 SEO 配置。公开来源不足的内容应从可索引范围移除，而不是用占位文案填充。

不要推翻现有视觉风格。保留并组件化首页的深色“战术终端”视觉、首屏层级和品牌辨识度。真正需要重做的是内容产品：把一个“看起来像完整 Wiki、实际多数页面只有占位说明”的站点，改成一个围绕玩家任务组织、可搜索、可筛选、可持续维护的 Quasimorph 1.0 指南与数据站。

核心策略只有四条：

1. 先清理薄页和假工具，避免继续向搜索引擎提交低价值 URL。
2. 先赢下具体长尾问题，不直接与官方 Wiki 争夺所有名词页。
3. 用真实数据表、任务清单、进度追踪器和站内搜索建立竞品难以复制的产品价值。
4. 把版本、来源、更新时间和编辑责任做成内容系统，而不是每页重复的装饰性文案。

实现目标是提高完整可索引页面比例、长尾搜索意图覆盖、站内任务完成率、内容可信度与后续维护效率。禁止用关键词堆砌、批量薄页或虚构数据替代真实内容。

## 2. 当前站点审计

### 2.1 内容规模

对线上 sitemap 的 33 个 URL 做了同口径抽查。词数包含公共导航与页脚，因此只能用于站内和竞品之间的相对比较。

| 指标 | quasimorphwiki.com | quasimorph.wiki | quasimorph.online |
|---|---:|---:|---:|
| Sitemap URL | 33 | 58（约 55 个非语言首页 URL） | 18 |
| 渲染文本中位数 | 约 249 英文词 | 约 2,397 英文词 | 约 2,149 英文词 |
| 少于 350 词页面 | 22 / 33 | 0 | 0 |
| 当前明显强页 | 新手指南、Guides Hub、选任务、成就表 | 大量 1.0 专题与 FAQ | 少量但很厚的支柱页 |

这不表示页面必须达到某个机械字数。问题是当前 22 个页面的正文通常只有一个观点、一个三项列表和一组重复来源区块，无法完成用户任务。竞争站覆盖了控制、Steam Deck、难度、飞船、职业、植入物、地图编辑器、热修、路线与武器等真实搜索意图。

### 2.2 当前优势

- 首页视觉差异化强，官方游戏截图与品牌色使用合理。
- 全站服务端渲染，标题、描述、canonical、单一 H1、面包屑和 sitemap 已经存在。
- `/guides/getting-started/`、`/guides/`、`/guides/choosing-contracts/`、`/achievements/` 已经具备继续扩充的基础。
- 版本、来源与“待验证”意识正确，适合发展为站点信任机制。
- Mission Prep 的方向正确：玩家确实需要部署前清单，而不只是阅读文章。

### 2.3 当前主要问题

#### 内容问题

- `/classes/`、`/items/`、`/world/`、`/walkthrough/` 等核心分类页实际正文非常少，却承担高搜索意图。
- `/tools/damage-resistance/` 只有 5 条泛化记录，称为 database 会放大用户失望。
- `/tools/story-decisions/` 展示九个“Classified / Verification pending”空槽，交互发生了，但没有交付信息。
- `/updates/hotfixes/` 的核心内容是“暂不总结”，不应作为可索引目标页。
- `/mods/` 目前主要把用户送去 Steam Workshop，独特价值不足。
- 大量页面使用同一种“一个直接答案 + 一段列表 + 来源”的模板，页面之间缺少信息结构差异。

#### 信息架构与交互问题

- 桌面顶部同时放 9 个一级入口，优先级不清；移动端只是把同样的 9 项塞进菜单。
- 缺少全站搜索。Wiki 用户最常见的行为是直接查职业、武器、状态、派系或任务名。
- 页面没有目录、页内定位、上一篇/下一篇、按任务推荐，也没有站内搜索的无结果引导。
- 表格只支持横向滚动；移动端没有卡片化记录或重点字段切换。
- 工具状态无法通过 URL 分享，也没有复制、打印、保存或重置等闭环动作。
- 每页重复且突出的 `ARCHIVE RECORD`、Meta Bar、`DIRECT ANSWER`、来源说明，把内部编辑状态放在了用户主要内容之前。
- 空广告位 `ADVERTISEMENT // RESERVED` 会打断阅读，却没有任何收益。

#### SEO 与工程问题

- sitemap 为手工 XML，所有页面共用同一天的 `lastmod`，后续很容易失真。
- 多数描述过短；新手指南 description 又达到约 216 字符，搜索结果大概率截断。
- 文章结构化数据只有 WebPage、Breadcrumb 与 FAQ，缺少真实的作者/编辑、首次发布和修改时间；FAQ 也不应为了富结果而铺满所有页面。
- 页面正文和路由集中在一个 `site-data.ts`，继续扩到数十或数百条记录会难以校验、审阅和更新。
- Google Analytics 已上线，但 Privacy 页面仍写着“如果以后添加 analytics 才会更新政策”，两者不一致。统一隐私说明与实际行为；非必要 cookies 默认在获得适当 consent 前不启用。
- 当前 `tsc --noEmit` 因 `vite.config.ts` 的字面量类型报错；构建可成功，lint 有 1 条 GA 脚本警告。
- `tests/rendered-html.test.mjs` 仍在测试已经删除的 starter loading skeleton，现有 2 个测试全部失败，无法保护 SEO 与路由回归。
- `globals.css` 存在多轮追加样式和不再使用的旧组件规则，后续改版前应收敛为 tokens、layout、components、pages 四层。

## 3. 目标用户与搜索意图

按“玩家下一步要做什么”组织页面，不按后台数据分类平铺内容。

| 用户阶段 | 典型问题 | 应交付内容 |
|---|---|---|
| 准备购买 | Quasimorph 是什么、适合谁、Steam Deck 表现如何 | 游戏简介、平台、难度、版本状态；只有具备真实体验时才写 Review |
| 0–10 小时 | 教程后做什么、难度怎么调、怎么撤离、怎么选任务 | 新手路线、设置、控制、撤离、合同选择、补给清单 |
| 10–30 小时 | 职业/干员怎么搭、武器与防护怎么选、飞船先升什么 | 可筛选职业/干员/装备数据、构筑卡、Magnum 升级路线 |
| 系统学习 | Quasimorphosis、伤口、派系、声望、交易、任务类型 | 机制解释、流程图、对照表、常见失败原因 |
| 剧情与全成就 | Secret Data 给谁、路线是否锁定、九结局怎么走 | Spoiler 分级、路线图、可勾选进度、明确的版本与证据 |
| 回流玩家 | 1.0 改了什么、最新热修影响哪些构筑和路线 | 更新日志、受影响页面、重新验证队列 |

## 4. 第二版信息架构

### 4.1 顶部导航

将 9 个一级入口压缩为 6 个，并增加搜索：

1. **Start Here**：新手指南、教程后、难度、控制、撤离。
2. **Guides**：战斗、生存、合同、经济、飞船、任务类型。
3. **Database**：职业、干员、武器、护甲、消耗品、植入物、Pacts、成就。
4. **Story**：派系、剧情路线、Secret Data、结局；统一 spoiler 控制。
5. **Tools**：任务准备、构筑比较、路线追踪、成就追踪、站内搜索。
6. **Updates**：1.0、热修、roadmap、内容重新验证记录。

桌面端使用分组下拉或小型 mega menu；移动端使用可展开分组。搜索按钮必须在桌面和移动首屏都可见，支持 `/` 或 `⌘K/Ctrl+K` 呼出。

### 4.2 首页结构

保留现有首屏视觉，但把首页从品牌展示改为任务入口：

1. 首屏：一句清晰价值主张 + 全站搜索 + `Start beginner route` 主按钮；Mission Prep 为次按钮。
2. “I need help with…”：Survive first contracts / Choose a build / Find an item / Plan a story route 四个任务入口。
3. 版本快照：当前游戏版本、最近热修、本站最近验证日期，链接到具体更新页。
4. 热门查找：职业、武器、伤口、Quasimorphosis、Magnum、Secret Data、结局。
5. 工具预览：只展示已经能完成任务的工具，不展示 pending database。
6. 最近更新：展示真实变更和修改日期，不写静态 “latest”。
7. 编辑标准：缩成一条可展开信任说明，详细方法移到 About。
8. 删除空广告位；真正接入广告后再设计不破坏阅读的固定位置。

## 5. 现有 URL 的处理决定

原则：有外链或已上线的 URL 不直接删除。优先扩写；需要合并时做永久重定向；内容暂时不够但未来会完成时，从主导航和 sitemap 移除并 `noindex`，不能继续以占位页争取排名。

### 5.1 保留并重点升级

| URL | 决定 | 第二版要求 |
|---|---|---|
| `/` | 重组 | 加全站搜索、按任务入口、最近更新，移除空广告与过度编辑术语 |
| `/guides/` | 保留 | 作为 Start Here / Guides 的任务型 Hub，不重复整篇新手指南 |
| `/guides/getting-started/` | 保留，P0 | 拆成可扫描章节、首 10 小时路线、设置、合同、补给、升级、FAQ；保留来源 |
| `/guides/after-tutorial/` | 保留，P0 | 扩成独立长尾答案：教程奖励、前三个合同、三个备用套装、Mars/Earth 决策 |
| `/guides/choosing-contracts/` | 保留，P0 | 增加合同评分卡、任务类型、敌对方、楼层、设施、政治影响和示例 |
| `/guides/combat-stances/` | 保留，P0 | 加 Sneak/Walk/Sprint 对照、AP 示例、门口/视线案例、错误示范 |
| `/guides/quasimorphosis/` | 保留，P0 | 做成完整机制页；清楚区分 1.0 已验证和旧版本信息 |
| `/guides/wounds-medicine/` | 保留，P0 | 增加“症状 → 先做什么 → 用什么类别 → 何时撤离”的决策表 |
| `/guides/secret-data/` | 保留，P1 | 真正验证路线和后果后发布；默认 spoiler-light |
| `/achievements/` | 保留，P0 | 增加搜索、分类、隐藏/剧情/可能错过、个人完成勾选与本地保存 |
| `/updates/patch-1-0/` | 保留，P0 | 完整官方摘要、发布日期、重点系统、受影响站内页面 |
| `/tools/mission-prep/` | 保留，P0 | 扩成交付完整清单的核心工具，见第 10 节 |
| `/about/` | 保留 | 增加作者/维护者、编辑流程、纠错方式、版本与来源方法 |
| `/privacy/` `/terms/` `/disclaimer/` | 保留 | 与实际 analytics、cookies、托管日志保持一致；不放主导航 |

### 5.2 必须“完成后才索引”的页面

| URL | 当前处理 | 达到以下条件后重新进入 sitemap |
|---|---|---|
| `/classes/` | 重做 Hub | 至少有 14 个职业的基本记录、筛选、方法说明和 3 条构筑入口 |
| `/classes/builds/` | 暂时 noindex；若不做工具则 301 到 `/classes/` | 至少 6 个有来源、版本和适用场景的构筑卡，可按阶段/武器/角色筛选 |
| `/items/` | 重做 Hub | 展示真实分类、记录数、最近验证与搜索，不再写“结构已准备好” |
| `/items/weapons/` | 暂时 noindex 或快速补齐 | 有足够的 1.0 武器记录、字段解释、过滤/排序和具体选型建议 |
| `/items/armor-resistances/` | 暂时 noindex | 有实际护甲/抗性记录以及威胁对照，不能只给通用三条原则 |
| `/world/` | 重做 Hub | 可进入派系、太阳系、Magnum、Quasimorphosis、Pacts 等真实页面 |
| `/world/factions/` | 暂时 noindex | 至少包含派系列表、Power/Tech/声望含义、合同影响与路线关联 |
| `/world/pacts/` | 暂时 noindex | 至少完成系统说明、获得方式、代价、分类与版本状态；不必一开始填满 142 条 |
| `/walkthrough/` | 重做 Hub | 五条路线有状态卡、spoiler 分级和已验证的下一步 |
| `/walkthrough/campaign/` | 暂时 noindex | 有完整且可导航的 campaign map，而不是只有五个名称 |
| `/walkthrough/endings/` | 暂时 noindex | 有真实结局/分支信息或明确可用的完成追踪，不展示九个空槽 |
| `/updates/hotfixes/` | 暂时 noindex | 建成按日期和 build 编号排列的真实热修时间线，并链接受影响内容 |
| `/tools/damage-resistance/` | 从首页移除并 noindex | 至少 30 条有明确来源的记录、字段筛选、空状态和更新时间；长期应扩成 Database |
| `/tools/story-decisions/` | 从首页移除并 noindex | 有可验证分支、选择影响、保存进度与 spoiler 控制；禁止用 pending 填充结果 |

### 5.3 `/mods/` 的选择

推荐将 `/mods/` 改成真正的 **Mods & Map Editor Hub**：1.0 兼容检查、Workshop 安装、依赖与顺序、保存备份、冲突排查、地图编辑器入口。若一期无法完成，则从主导航与 sitemap 移除，并将其 301 到新建的 `/tools/map-editor/` 或最接近的完整页面。不要保留一个只链接 Steam Workshop 的薄页。

## 6. 新增内容路线图

### P0：第一批获取长尾流量的 12 个页面

这些页面应与现有强页一起先发布，优先解决新玩家和 1.0 回流玩家问题。

1. `/guides/difficulty-settings/` — 难度预设、模块化设置、推荐人群、哪些设置影响学习。
2. `/controls/` — Controls Hub。
3. `/controls/keyboard/` — 键鼠、物品移动、切换姿态、常被忽略的快捷操作。
4. `/controls/steam-deck/` — 仅在可验证 Steam Deck 信息后发布。
5. `/guides/extraction/` — 撤离规则、楼层推进、何时停止搜刮、任务物品。
6. `/guides/loot-priority/` — 芯片、升级材料、箱子、消耗品、交易品的条件优先级。
7. `/guides/room-clearing/` — 门、视线、AP、撤退格、近远程威胁案例。
8. `/guides/bartering-magnum/` — faction credit、声望、交易、仓库整理与补给循环。
9. `/world/magnum-ship/` — 部门、升级优先级和相互依赖。
10. `/classes/operators/` — 干员/clone 目录及与职业的搭配逻辑。
11. `/items/augmentations/` — 槽位、风险、失去条件、适用构筑。
12. `/updates/roadmap/` — 官方 2026 Q3/Q4 与 2027 计划，注明来源与日期。

### P1：建立专题权威性的页面

- `/classes/tier-list/`：可以主观，但必须公开版本、评价维度、作者和变更记录。
- `/classes/beginner-classes/`：把“最强”改为“最容易稳定执行”。
- `/guides/midgame-combat/`、`/guides/how-to-beat-baron/`、`/guides/trade-shuttle/`。
- `/items/consumables/`、`/items/ammo/`、`/items/armor/`。
- `/world/solar-system/`、`/world/factions/[slug]/`、`/walkthrough/mission-types/`。
- 五条剧情路线页：Civil Resistance、Tezctlan、Xiomara、AnCom、RealWare；仅在可验证后逐条上线。
- `/tools/map-editor/`、`/tools/mod-manager/`。

### P2：真正形成护城河的数据层

- 武器、护甲、弹药、消耗品、职业、干员、植入物、Pacts 的结构化数据文件。
- 记录详情页，例如 `/items/weapons/[slug]/`；只有当每条记录能提供独特解释和相关链接时才生成，禁止批量制造只有表格一行的 programmatic SEO 薄页。
- 构筑比较器：选择干员、职业、主武器、备用武器、任务类型，输出冲突、补给缺口和来源。
- Patch impact：一次热修标记受影响的数据记录与文章，自动展示“此页需重新验证”。

## 7. 内容发现、来源与整合任务

Codex 必须把内容研究作为本次开发的一部分，不得只创建标题、卡片和空数据结构。研究成果既要用于当前页面正文，也要沉淀为以后可重复使用的来源目录、选题库和事实记录。

### 7.1 来源分级

| 等级 | 来源 | 用途 | 发布规则 |
|---|---|---|---|
| A：当前官方来源 | Steam 官方新闻与 patch notes、Steam 商店、Steam 成就、Steam Workshop、开发者公开公告 | 版本、发布日期、功能、数值变化、支持计划 | 可作为事实主来源，记录发布日期、访问日期和对应版本 |
| A：当前参考资料 | Official Quasimorph Wiki / wiki.gg、能够确认属于当前 1.0 的页面 | 职业、物品、派系、系统、飞船升级和字段定义 | 核对页面更新时间与版本；不能默认所有 wiki 条目都已更新到 1.0 |
| B：可验证的一手界面 | 公开的 1.0 游戏截图、视频画面、patch 中的界面说明 | 控制、菜单、字段、流程和视觉例证 | 只记录画面能直接证明的内容，不从单帧推断隐藏机制 |
| C：社区经验 | Steam Guides、Steam Discussions、Reddit、近期 YouTube 视频/字幕、公开 Discord 信息 | 发现高频问题、策略、构筑思路、失败案例 | 只能标为 Community Tip；数值和剧情后果需官方或第二个独立来源验证 |
| D：竞品页面 | quasimorph.wiki、quasimorph.online 及其他攻略站 | 发现选题、关键词、信息缺口和页面类型 | 不作为事实来源，不复制标题组合、段落、表格、图片或页面结构 |

旧 Steam Guide、旧 Reddit 帖和旧视频主要用于发现问题，不得直接当作 1.0 事实。任何 0.8、0.9.9 或未标版本的攻略都必须先经过当前来源复核。

### 7.2 Codex 必须执行的资料发现流程

1. 抓取本站、两个竞品和官方 Wiki 的公开 sitemap/目录，形成 URL、title、主题、更新时间和页面类型清单。
2. 检索官方 Steam 新闻，建立 1.0 release、后续 hotfix、roadmap 与重大系统变更时间线。
3. 扫描 Steam Guides 的 Gameplay Basics、Walkthroughs、Classes、Loot、Weapons、Trading、Modding 等分类，提取被反复讨论的任务，不复制正文。
4. 扫描近 12 个月 Reddit 与 Steam Discussions，优先记录至少重复出现两次的问题；近期 1.0 问题权重高于旧版本高赞内容。
5. 检索近期 YouTube 指南及可访问字幕，提取操作流程、争议点和需要验证的具体主张；视频观点必须保留作者和日期。
6. 将同义问题合并，例如 `what to do after tutorial`、`stuck after tutorial`、`first ten hours` 归到同一个 topic cluster。
7. 将候选主题映射到 Beginner Survival、Builds & Gear、World Systems、Story & Updates 四个集群，避免多个页面争夺同一搜索意图。
8. 对候选主题评分，生成 P0/P1/P2 backlog，再为本任务要求的页面建立 source packet。
9. 先完成 source packet，再写正文和组件。资料不足时保留研究记录，但页面设为 `indexable: false`，不要发布占位内容。

### 7.3 有价值内容的判断方法

每个候选主题按 100 分评分：

| 维度 | 分值 | 判断方式 |
|---|---:|---|
| 搜索/讨论需求 | 20 | 搜索结果、Steam/Reddit 重复问题、竞品覆盖、站内搜索词；没有 GSC 也可用公开信号 |
| 决策成本与痛点 | 20 | 是否会导致死亡、丢失装备、浪费资源、锁路线或让新手卡住 |
| 内容缺口 | 15 | 现有结果是否过时、零散、互相矛盾或缺少 1.0 版本 |
| 新鲜度 | 15 | 是否受 1.0、近期 hotfix、roadmap 或新系统影响 |
| 可验证性 | 15 | 是否有当前官方来源、可核对界面或多个独立来源 |
| 独特交付 | 10 | 能否制作决策表、检查器、数据筛选、路线图或进度追踪 |
| 集群价值 | 5 | 是否能支持多个相关页面并获得自然内链 |

另外应用扣分：关键结论无法验证 `-30`；主体资料明显过时 `-20`；与现有页面意图高度重复 `-20`；只能写成泛化常识 `-15`。总分 ≥ 70 为 P0，55–69 为 P1，其余进入 backlog 或放弃。

近期公开讨论已经明确显示以下高价值问题：1.0 后新手仍在问教程后做什么、Secret Data 给谁、声望是否集中、主线如何触发、低骷髅任务为何突然变难、1.0 是否需要新存档、战利品优先级和飞船升级顺序。这些主题应优先于泛化的“游戏介绍”。

### 7.4 研究交付物

在仓库中创建并维护以下文件，格式可根据现有技术栈调整，但信息不得缺失：

```text
research/
  source-catalog.json        # 来源 URL、类型、作者/发布者、日期、版本、许可/使用备注
  topic-inventory.json       # 候选主题、同义词、信号、得分、优先级、目标 URL
  page-briefs/*.md           # 每个目标页面的内容简报和来源包
data/
  sources.json               # 页面可引用的规范化来源
  claim-ledger.json          # 可复用事实、来源、版本、置信度、受影响页面
```

`claim-ledger` 的每条事实至少包含：`claimId`、`statement`、`sourceIds`、`sourceType`、`publishedAt`、`gameVersion`、`confidence`、`status`、`affectedPages`。正文引用 claim，而不是在多个页面复制无法追踪的数值。

### 7.5 Source packet 规格

每个可索引页面必须先有一份 source packet，包含：

- 目标查询、用户阶段、要完成的任务和不覆盖的相邻意图。
- 5–10 个必须回答的真实问题。
- 官方确认事实及对应 URL、发布日期、版本。
- 社区共识、争议观点和至少两个独立例子；明确标记为建议而非事实。
- 旧版本冲突和禁止沿用的结论。
- 可制作的独特资产：表格、流程、评分卡、检查器、路线图或筛选数据。
- 页面内链入口、应链接出去的来源和下一步页面。
- 无法确认的内容清单；这些内容不得出现在已验证结论中。

### 7.6 冲突解决与内容合成

来源冲突时按以下顺序处理：当前游戏内可直接验证信息 > 当前官方 patch/公告 > 当前官方 Wiki 页面 > 多个近期社区来源 > 单一社区来源 > 旧版本资料。不能确定时写成明确的版本差异或省略结论。

正文必须原创合成：先给可执行答案，再解释原因和边界，最后给来源。不要按来源逐篇摘要，也不要把多个社区段落拼接成文章。引用以短句和链接为主，避免大段转载。策略内容需要说明适用阶段、任务条件、替代方案和失败条件。

## 8. 首批页面内容简报

以下要求是正文交付标准，不只是页面组件要求。Codex 应在实现时研究并写入英文内容。

### 8.1 现有核心页面

| 页面 | 必须回答的内容 | 主要来源包 | 独特交付 |
|---|---|---|---|
| `/guides/getting-started/` | 设置、教程、前三个合同、Mars 路线、三个备用套装、合同阅读、补给、船升级、10/20 小时里程碑 | 1.0 官方公告、当前 Wiki、近期新手讨论、版本明确的社区指南 | 0–20 小时路线、首次部署清单、撤退规则 |
| `/guides/after-tutorial/` | 教程奖励如何处理、第一批目标、哪些任务先避开、怎么从一次失败恢复 | 近期 `stuck/new player` 讨论、当前任务和飞船资料 | 前三次部署计划与失败恢复流程 |
| `/guides/choosing-contracts/` | beneficiary/victim、难度、Power/Tech、楼层、设施、路程、任务类型、政治后果 | 当前任务资料、派系资料、近期低骷髅难度讨论 | 可打印的 Go/No-Go 评分卡和三个示例 |
| `/guides/combat-stances/` | Sneak/Walk/Sprint、AP、命中影响、门口、视线、结束回合风险 | 1.0 游戏帮助/界面、当前 Wiki、近期战斗讨论 | 姿态对照表、四个战术回合案例 |
| `/guides/quasimorphosis/` | meter、触发、地点差异、升级风险、Baron/eccolapse、控制与撤离 | 当前 Wiki、1.0 patch、当前视频/讨论 | 风险阶段流程和“继续/撤离”决策图 |
| `/guides/wounds-medicine/` | 伤口、出血、感染、疼痛、治疗顺序、失败率、何时撤离 | 当前 Wiki/游戏界面、1.0 medicine 说明、近期新手失败案例 | 症状 → 处理 → 复查 → 撤离决策表 |
| `/achievements/` | 82 项名称、公开描述、隐藏状态、全局率日期、剧情/可能错过分类 | Steam Global Achievements、官方 1.0 公告 | 搜索筛选与本地完成追踪 |
| `/updates/patch-1-0/` | 发布日期、存档兼容、五路线九结局、142 Pacts、成就、地图编辑器、系统重做、后续计划 | Steam 官方公告和 patch notes | 改动分类表与受影响站内页面 |
| `/tools/mission-prep/` | 如何把任务条件转成装备、补给、风险和撤退阈值 | 上述指南的 claim ledger，而不是独立编造规则 | 可保存、复制、打印、分享的部署简报 |

### 8.2 新增 P0 页面

| 页面 | 必须回答的内容 | 主要来源包 | 独特交付 |
|---|---|---|---|
| `/guides/difficulty-settings/` | Easy/Normal/Unfair 与模块化设置差异、适合谁、哪些设置改变学习与经济 | 1.0 官方平衡说明、当前设置界面、近期难度讨论 | 设置对照表和三种玩家预设 |
| `/controls/` | 控制分类、键鼠/Steam Deck 入口、常用但被忽略的操作 | 游戏帮助、官方/当前 Wiki、Steam Deck 官方状态 | 可搜索 Controls Hub |
| `/controls/keyboard/` | 移动、姿态、等待、检查敌人、治疗、物品移动、投掷、装填与重绑定 | 1.0 界面、当前键位资料 | 按场景分组的键位表与打印版 |
| `/controls/steam-deck/` | Verified 状态、布局、UI scale、性能/输入注意事项 | Steam 商店、当前实机/官方信息、近期 Deck 讨论 | Deck 首次启动清单；资料不足则不索引 |
| `/guides/extraction/` | 何时能撤、楼层推进、任务完成与战利品保存、死亡损失、撤离阈值 | 当前任务/撤离资料、近期新手讨论 | “继续搜刮还是撤离”决策树 |
| `/guides/loot-priority/` | 芯片、goods、飞船材料、武器、护甲、植入物、消耗品的阶段性优先级 | 当前物品/飞船资料、近期 loot 讨论 | Early/Mid/Late 三阶段优先级矩阵 |
| `/guides/room-clearing/` | 开门、视线、最后一个 AP、诱敌、退路、范围伤害、环境物体 | 当前战斗资料、近期战术讨论/视频 | 四种房型的步骤化案例 |
| `/guides/bartering-magnum/` | faction credit、声望、商店、奖励、仓库标签、采购与补给循环 | 当前 barter/faction/ship 资料、近期交易讨论 | 交易检查表和仓库布局建议 |
| `/world/magnum-ship/` | 部门、前置关系、主要升级、早中晚优先级、哪些升级改变流程 | Official Wiki Ship Upgrades、1.0 department 公告 | 可筛选升级树与三条路线 |
| `/classes/operators/` | 每个 operator 的基础特征、适用工作、与职业/武器的协同 | 当前 Wiki operator/class 数据、1.0 界面 | operator 比较表和搭配过滤 |
| `/items/augmentations/` | 槽位、安装条件、类型、收益、代价、死亡风险、构筑场景 | Official Wiki augmentations、1.0 界面/公告 | 槽位示意、筛选表和风险标签 |
| `/updates/roadmap/` | Q3 hotfix、Q4 Bestiary/QoL、2027 update/DLC、已完成与未承诺内容 | Steam 官方 roadmap/公告 | 时间线和“confirmed / planned / unknown”状态 |

每个页面必须根据 source packet 决定最终篇幅。若某个 P0 页面缺少当前证据，完成研究文件和非索引草稿，但不要发布虚构正文。

## 9. 页面模板规格

### 9.1 指南页

推荐结构：

1. H1 + 一句话回答 + 适用版本 + 修改日期。
2. “In this guide” 页内目录。
3. 30 秒快速答案/清单。
4. 按任务步骤展开的主体，不按泛化概念堆段落。
5. 至少一个有意义的对照表、决策表、流程或案例；没有信息价值时不要为了视觉强加。
6. 常见失败与撤退条件。
7. 相关工具或下一篇指南。
8. 来源、社区建议标记、更新记录。

正文不设硬性字数。典型完整指南可在 800–1,800 英文词；复杂支柱页可更长。验收标准是“用户能完成任务”，不是达到字数。

### 9.2 Hub 页

- 一段简短定义，不把整个指南复制到 Hub。
- 按玩家阶段/任务分组，而不是平铺所有卡片。
- 展示子分类数量、最近更新和热门入口。
- 提供搜索/过滤；无结果时建议同义词和相邻分类。
- 使用 `ItemList` 结构化数据仅描述页面上真实可见的列表。

### 9.3 数据库/表格页

- 说明字段含义、数据版本、覆盖范围与未知项。
- 支持全文搜索、多个筛选、排序、清除、结果计数。
- 筛选状态写入 query string，复制 URL 可还原。
- 桌面为表格；移动端默认卡片，允许展开全部字段。
- 空结果不能是空白：显示当前条件、清除按钮、相似建议。
- 每个记录的来源应能追溯；“编辑建议”不能伪装成官方数值。

### 9.4 剧情页

- 全站统一 `spoiler-light / full spoilers` 状态，并在本机保存。
- 标题和搜索摘要不泄露关键结局；页面内按章节揭示。
- 每个选择显示：触发前提、立即影响、长期影响、锁定内容、证据状态。
- 证据不足时隐藏整个结论模块，不用“Classified”占位吸引点击。

## 10. 核心交互改造

### 10.1 全站搜索（P0）

输入：标题、别名、页面摘要、职业/武器/派系/状态字段。  
行为：键盘快捷键、即时结果、按 Guides/Database/Story 分类、拼写和同义词处理。  
输出：标题、类型、短摘要、版本/状态；最多 8 条即时结果并可进入完整搜索页。  
无结果：显示建议关键词，并提供 Guides、Database、Official Wiki 外部入口。  
SEO：真正存在搜索后才添加 WebSite `SearchAction`；站内搜索结果页默认 `noindex,follow`。

### 10.2 Mission Prep Planner 2.0（P0）

在现有 8 个选择上增加：任务类型说明、已知敌对方、楼层/距离、装备重量风险、伤口/补给覆盖、撤退阈值。

输出必须包含：

- 风险摘要与导致该判断的因素，而不是只给 High/Moderate。
- 主武器/备用方案的检查规则，不在无数据时推荐具体“最佳武器”。
- 医疗、食物、弹药、维修、任务物品空间清单。
- 三个明确撤退触发器。
- 可勾选清单、重置、复制文本、打印、保存到 localStorage。
- URL 可分享非敏感选择；结果在刷新后可恢复。

### 10.3 Achievements Tracker（P0）

- 搜索、完成/未完成、隐藏、剧情、可能错过分类。
- 本机保存完成状态，显示 `x / 82` 与百分比。
- 一键清空前确认；导出/导入 JSON 可放到 P1。
- Steam 全局解锁率标明抓取日期，不能假装实时。

### 10.4 Damage / Resistance Database（P1）

- 数据不足时不发布。
- 筛选：damage type、weapon category、faction/enemy、resistance signal、version/status。
- 每条记录显示来源、验证日期和上下文；不要把编辑安全建议放进“Resistance”字段。
- 能回答“这个任务为什么需要第二种伤害答案”，而不是只返回泛化文字。

### 10.5 Story Route Tracker（P1）

- 按五条路线展示已完成节点、关键选择和可能锁定。
- 先选择 spoiler 模式，再显示内容。
- 只有真实数据节点；九个结局未验证时不创建九个空卡片。
- 本机保存进度，可复制不含剧透的进度摘要。

## 11. 视觉与易用性调整

- 保留 cyan/black 工业终端方向、官方截图、几何品牌标记；不要改成通用白色博客。
- 正文字体不使用过小的 mono。Mono 只用于标签、数据、短状态；正文保持 16–18px 和舒适行高。
- 将每页占据首屏的 `ARCHIVE RECORD` 与 Meta Bar 合并成一行：`Updated · Game version · Evidence status`。
- `DIRECT ANSWER` 保留其信息功能，但不强制每页使用同一大块样式。
- 长文增加 sticky TOC（桌面）与折叠目录（移动），标题锚点可复制。
- 导航、按钮、details、筛选器和表格全部满足键盘操作、可见焦点与合理触控尺寸。
- 为 `prefers-reduced-motion` 保持无动画版本；不增加无意义扫描线或大面积视差。
- 所有图片写真实尺寸，首屏图优先，其余延迟加载；保留来源和替代文本。
- 清理重复和未使用 CSS，建立 design tokens 与可复用 `PageHeader`、`UpdateMeta`、`TOC`、`SourceList`、`DataTable`、`EmptyState`、`SpoilerGate`。

## 12. 技术 SEO 规格

### 12.1 抓取与收录

- 从内容注册表自动生成 sitemap，不再维护静态 `public/sitemap.xml`。
- sitemap 只包含 200、canonical、自索引且内容完成的 URL；noindex、重定向、搜索结果页不能出现。
- `lastmod` 使用该页面真实内容修改日期，不能每次部署批量刷新。
- robots.txt 继续允许公开内容并指向 sitemap；不使用 robots 阻止需要读取 noindex 的页面。
- 所有合并页面建立单跳 301，避免重定向链。
- 保持统一 trailing slash 与绝对 canonical。

### 12.2 Metadata

- 每页唯一 title，建议主要查询靠前，通常控制在搜索结果可读范围内，不机械塞满关键词。
- description 写成该页能解决的问题和独特信息，通常约 120–160 个英文字符；不作为排名保证，而是提高摘要可读性与点击意愿。
- 为高价值页面提供匹配内容的 OG 图；不必为每个薄页批量生成相同图片。
- 文章记录 `datePublished`、`dateModified`、真实 author/maintainer；不得虚构“编辑团队”或游戏经验。

### 12.3 结构化数据

- 全站：WebSite、Organization/Person（按真实维护主体选择）。
- 页面：WebPage + BreadcrumbList。
- 指南：Article；只有确实按步骤完成一个任务时才用 HowTo。
- Hub：ItemList。
- 数据记录：根据真实内容选择 Dataset 或普通 WebPage，不套不匹配 schema。
- FAQ 可以保留给用户，但不要把每页模板问题都标成 FAQPage；结构化数据必须与可见内容一致，并通过 Rich Results Test。

### 12.4 内链

- 每个重要页面至少获得一个 Hub 链接和两个上下文相关链接。
- 锚文本描述目的，如 `compare Quasimorph classes`，避免所有链接都写 `Read more`。
- 每篇指南结尾提供“下一步”而不是随机相关文章。
- 形成四个主题集群：Beginner Survival、Builds & Gear、World Systems、Story & Updates。

### 12.5 性能与稳定性

- 发布前用 Lighthouse 做实验室诊断；上线后以 CrUX/Search Console 的真实用户数据为准。
- 目标“Good”阈值：LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1（第 75 百分位）。
- 首页首屏大图使用合适格式与 responsive sizes，避免下载远大于显示尺寸的图片。
- 搜索索引和数据表在构建时生成，避免首屏加载整个大型数据库。
- 交互组件尽量局部 client-side，正文继续服务端输出，确保无 JavaScript 时仍可阅读核心信息。

## 13. 内容与数据架构

不要继续把所有内容塞在 `app/site-data.ts`。建议拆成：

```text
content/
  guides/*.mdx
  world/*.mdx
  walkthrough/*.mdx
data/
  classes.json
  operators.json
  weapons.json
  armor.json
  achievements.json
  patches.json
lib/
  content-registry.ts
  search-index.ts
  seo.ts
  validation.ts
app/
  ...route templates
```

每个内容页至少有以下字段：

```ts
type ContentMeta = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  searchTerms: string[];
  gameVersion: string;
  publishedAt: string;
  modifiedAt: string;
  author: string;
  reviewer?: string;
  status: "verified" | "partial" | "pending";
  indexable: boolean;
  sources: SourceRef[];
  related: string[];
};
```

构建时校验：slug/title/canonical 唯一、日期合法、indexable 页面有正文和来源、内部链接存在、sitemap 不含 noindex、所有数据枚举有效。数据记录还应包含 `sourceId`、`verifiedAt` 与 `gameVersion`。

## 14. 内容生产与发布规则

1. 官方 Steam 新闻、游戏内 1.0 界面和官方 Wiki 为事实优先来源。
2. 社区经验可以用于策略，但必须标记为 Community Tip，并保留来源日期与适用版本。
3. 不复制两个竞品的段落、结构化描述或批量页面；它们只能用于发现搜索意图。
4. 不为填页面而编造数值、结局、奖励、tier、hotfix 或兼容性。
5. 官方 wiki.gg 内容存在授权条款时，任何实际改编都要保留所需署名并核对许可；最稳妥方式仍是独立验证、原创总结和直接链接来源。
6. 每次 patch 更新：先更新 patches 数据，再标记受影响页面为 `pending review`，核实后修改 `verifiedAt`。
7. 本次不创建 Review / Worth it 页面，避免用 AI 冒充一手体验。
8. 每个可索引攻略页至少使用一个当前官方/参考来源，并在需要策略判断时加入两个独立社区信号；来源数量不能替代来源质量。
9. 页面不能只是已有资料的摘要。必须加入任务顺序、条件判断、失败模式、版本边界、对照表或交互资产中的至少两项。
10. 同一事实通过 claim ledger 复用；发现冲突时更新事实记录和全部受影响页面，不能只改一个页面。
11. 外部链接使用来源的具体页面，不链接搜索结果页；来源失效时标记并寻找替代来源。
12. 研究阶段无法确认的结论进入 page brief 的 unknowns，不得出现在 metadata、FAQ、表格或工具输出里。
13. 完成公开资料研究后直接实施可验证部分；私有数据缺失不应阻塞公开内容与代码工作。

## 15. 分析、更新与运营基础设施

只实现站内基础设施，不自动向外部社区发帖、提交第三方表单或请求私有账户权限。

### 15.1 Analytics 事件

保留现有 GA 时修复脚本集成方式，并使 Privacy 内容与实际采集一致。实现以下事件：

- `site_search`、`search_result_click`、`search_no_result`
- `tool_started`、`tool_completed`、`tool_copied`、`tool_saved`
- `achievement_toggled`
- `spoiler_mode_changed`
- `toc_click`、`related_content_click`
- 事件不得记录用户自由文本或可识别信息。

### 15.2 可持续更新

- RSS 从更新注册表自动生成，只包含真实发布或重要内容更新。
- Patch 数据更新时自动标记 `affectedPages` 为待复核；未复核内容显示明确状态并可从 sitemap 暂时移除。
- 生成站内变更日志页面或组件，展示真实修改日期和修改摘要。
- 为后续 Search Console 优化预留 page/query 分析字段，本次任务不依赖私有 GSC 数据。
- 英文核心内容稳定前不生成批量翻译或只有首页的语言版本。

## 16. 实施阶段

### Phase 0 — 研究、止损与工程修复

- 完成第 7 节的来源目录、topic inventory、评分和首批 source packets。
- 修复 TypeScript、过期测试和 Privacy/Analytics 不一致。
- 为薄页建立 indexability 清单；从 sitemap 和首页移除未完成工具。
- 删除空广告占位，生成真实 301/noindex 规则。

### Phase 1 — 内容系统与导航

- 拆分内容注册表与数据文件。
- 自动 sitemap、RSS、metadata、结构化数据和构建校验。
- 新导航、移动分组、全站搜索、TOC、统一 UpdateMeta/SourceList。
- 清理 CSS 与旧组件。

### Phase 2 — P0 内容与现有强页

- 先升级现有新手、合同、战斗、伤口、成就和 1.0 页面。
- 按第 8 节内容简报完成英文 source packet、原创正文、独特资产和页面组件。
- 完成第 6 节的 12 个新增 P0 页面；证据不足的页面保持非索引草稿，不发布占位内容。
- 首页只链接已完成页面。

### Phase 3 — 工具与数据库

- Mission Prep 2.0、Achievements Tracker、搜索完整页。
- 建立职业/干员/武器数据 schema 和第一批真实数据。
- 达到门槛后再恢复 Damage Database 与 Story Tracker 的索引。

### Phase 4 — 全站验证与交付

- 检查研究文件、页面事实和来源链接的一致性。
- 检查所有完成页的内容任务是否真正被回答，不以字数或卡片数量代替内容验收。
- 完成 SEO、可访问性、响应式、性能、构建与自动化测试验证。
- 输出已发布、非索引草稿、被合并和仍在 backlog 的 URL 清单。

## 17. Codex 实施验收清单

每个阶段完成后必须验证：

- 构建、TypeScript、lint、自动化测试全部通过；测试不再引用 starter skeleton。
- 每个可索引 URL 返回 200，canonical 自指，只有一个 H1，title/description 唯一。
- sitemap 与内容注册表一致，不含 noindex、404、重定向与搜索结果页。
- 旧 URL 的 301 只有一跳；404 页面返回真实 404。
- 页面主体在服务端 HTML 中存在，不依赖客户端加载后才出现。
- 搜索、筛选、表格、菜单、spoiler、checkbox 可用键盘完成，并有可见 focus。
- 移动端 360px 宽无页面级横向滚动；大型数据表使用卡片或局部横向滚动。
- 所有工具具有 loading（如需要）、empty、error、reset、share/save 的明确状态。
- 结构化数据通过验证且与可见内容一致。
- Lighthouse 用于回归诊断；上线后记录 Search Console/CrUX 真实指标。
- Codex 不自行补写未经来源验证的游戏数值、剧情后果、排行或热修内容。

## 18. 明确不做的事情

- 不保证“改版后一定排名第一”或固定流量。
- 不靠关键词堆砌、隐藏文字、批量 AI 薄页或过度 FAQ schema 获取排名。
- 不一次生成数百个只有几行数据的物品详情页。
- 不复制竞品内容或把旧版本社区数据当 1.0 事实。
- 不保留没有真实输出的工具，只为了让网站“看起来可交互”。
- 不在 English 核心内容尚未稳定时批量做多语言。

## 19. 参考资料

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google：Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google：Structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [web.dev：Core Web Vitals tools and workflow](https://web.dev/articles/vitals-tools)
- [Official Quasimorph Wiki](https://quasimorph.wiki.gg/)
- [Official Wiki：Ship Upgrades](https://quasimorph.wiki.gg/wiki/Ship_Upgrades)
- [Official Wiki：Weapons](https://quasimorph.wiki.gg/wiki/Weapons)
- [Official Wiki：Augmentations and implants](https://quasimorph.wiki.gg/wiki/Augmentations_and_implants)
- [Quasimorph official Steam announcements](https://steamcommunity.com/app/2059170/allnews/?l=english)
- [Quasimorph Steam store](https://store.steampowered.com/app/2059170/Quasimorph/)
- [Quasimorph Steam Community Guides](https://steamcommunity.com/app/2059170/guides/)
- [Quasimorph Steam Community Discussions](https://steamcommunity.com/app/2059170/discussions/)
- [Quasimorph subreddit](https://www.reddit.com/r/Quasimorph/)
