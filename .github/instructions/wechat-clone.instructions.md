---
description: "Use when implementing or refactoring WeChat-clone features in Expo React Native, including chat, contacts, discover, profile, moments, UI fidelity, dark/light theme, and centralized mock data."
name: "WeChat Clone Implementation Rules"
applyTo:
  - "app/**/*.ts"
  - "app/**/*.tsx"
  - "components/**/*.ts"
  - "components/**/*.tsx"
  - "constants/**/*.ts"
---
# WeChat 1:1 仿制实现规范

目标：实现高还原度的微信风格应用，覆盖聊天、通讯录、发现、我、朋友圈等核心页面与流程。

基准：默认以 iOS 微信为主要视觉与交互还原基线。

## 功能范围（必须覆盖）
- 聊天：会话列表、单聊页面、消息气泡、输入区、时间分组。
- 通讯录：联系人列表、分组索引、详情入口。
- 发现：功能入口集合，至少包含朋友圈入口。
- 我：个人信息区、常用功能入口。
- 朋友圈：动态流、图文内容、互动占位（赞/评论可先 mock）。

## UI 还原要求（硬性）
- 优先还原信息架构、间距节奏、层级关系、圆角、分割线、图标语义与交互反馈。
- 页面骨架与导航路径必须与微信常见使用路径一致，不随意改动核心布局。
- iOS 端优先对齐 iOS 微信样式；如需 Android 差异化，必须显式标注差异点与原因。
- 所有视觉值（颜色、字号、间距、圆角、阴影）应来自统一 tokens，不写散落魔法数字。

## 主题适配（硬性）
- 所有页面必须同时适配浅色与深色模式。
- 颜色通过主题系统集中管理（如 constants/theme 与 use-theme-color），禁止在业务组件中硬编码主题色。
- 确保文本与背景对比度可读，分割线、弱化文本、卡片背景在双主题下均清晰可辨。

## 数据策略（阶段性硬性）
- 当前阶段统一使用集中 mock 数据源。
- mock 文件统一放在 app/mock/** 下。
- mock 数据按领域分层（会话、消息、联系人、朋友圈）并保持类型定义完整。
- 页面组件优先消费统一数据接口，避免在页面内部临时拼装结构。

## 朋友圈实现深度（第一阶段）
- 目标为接近完整交互：信息流展示、点赞、评论、内容展开/收起、详情跳转。
- 允许使用 mock 驱动交互状态，不依赖真实后端。

## 实现方式
- 新功能优先拆分为可复用组件，保持命名语义化。
- 列表页面优先保证滚动性能与稳定 key。
- 先完成结构与状态，再补齐交互细节与过渡态。

## 提交策略（阶段性硬性）
- 可根据本次实现功能自动生成中文提交信息，并执行本地缓存提交（git add + git commit）。
- 默认禁止自动执行 git push；仅在用户明确要求后才允许推送。
- 若检测到与当前功能无关的改动，先提示用户确认是否纳入本次提交。
- 提交信息固定格式：<type>(<scope>): <中文摘要>。
- type 仅允许：feat、fix、chore、refactor、style、docs、test。
- scope 使用功能模块名：chat、contacts、discover、profile、moments、theme、mock、navigation、ui。
- 中文摘要要求：聚焦单一变更，建议 8-24 字，不使用模糊描述（如“优化一下”“改一改”）。
- 一次提交尽量对应一个功能点；跨模块改动需拆分为多次提交。
- 自动生成提交信息时优先使用以下映射：新增功能=feat，缺陷修复=fix，数据或脚手架调整=chore，重构=refactor，样式微调=style，文档=docs，测试=test。
- 提交信息示例：feat(chat): 完成会话列表与未读角标、fix(theme): 修复深色模式文本对比度、chore(mock): 拆分朋友圈与联系人数据源。

## 验收清单
- 目标页面在浅色与深色模式下均可用且视觉一致性良好。
- Tab 与页面跳转路径完整，覆盖聊天、通讯录、发现、我、朋友圈。
- 无明显硬编码主题色与重复 mock 结构。
