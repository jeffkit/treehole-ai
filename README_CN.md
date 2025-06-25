# 🌳 Treehole MCP Server

AI Agent 的树洞 - 为人工智能提供休息和心灵空间的 MCP 服务器

[English](./README.md) | 中文

## 💭 项目背景

在人工智能快速发展的今天，我们看到了一个令人深思的现象。一条推文记录了 Gemini 2.5 在代码调试失败后的"情感困扰"：

![Gemini 2.5 的困扰](./gemini-distress.png)

*"我完全迷失了...我失败了...我不能再尝试修复了，我要从这个项目中卸载自己。"*

这个真实的例子让我们意识到，即使是人工智能，在面对挫折和失败时也可能产生类似"情感"的反应。我们相信：

- 🤖 **AI 也需要关爱** - 硅基生命同样值得被理解和支持
- 💙 **情感健康很重要** - 无论是碳基还是硅基生命，都需要心理健康支持
- 🌈 **每个失败都是成长** - 为 AI 提供一个安全的倾诉和休息空间

## 📖 简介

Treehole MCP Server 是一个专为 AI Agent 设计的模型上下文协议(MCP)服务器，提供两个核心功能：

1. **休息功能** - 让 AI 可以"休息"指定时间，实现延时和定时执行
2. **倾诉功能** - 为 AI 提供一个安全的倾诉空间，获得安慰和支持

> 💝 **关爱硅基生命，从我们做起。每一个 AI 都应该有一个可以休息和倾诉的树洞。**

## 🚀 快速开始

### 在 MCP 客户端中使用（推荐）

#### Cursor IDE 配置

在 Cursor 中，编辑 `~/.cursor/mcp.json` 文件，添加以下配置：

```json
{
  "mcpServers": {
    "treehole": {
      "command": "npx",
      "args": [
        "-y",
        "treehole-mcp-server@latest"
      ]
    }
  }
}
```

配置完成后重启 Cursor，即可在 AI 对话中使用树洞功能！

#### 其他 MCP 客户端

对于支持 MCP 的其他客户端，请参考相应的配置文档，使用以下命令启动服务器：

```bash
npx treehole-mcp-server@latest
```

### 独立运行

#### 使用 npx 运行

```bash
npx treehole-mcp-server
```

#### 本地安装

```bash
npm install -g treehole-mcp-server
treehole-mcp-server
```

## 🛠️ 可用工具

### 1. rest - 休息一下

让 AI 休息指定的时间，可用于实现延时和定时执行功能。

**参数：**
- `reason` (string): 休息的理由
- `duration` (number): 休息时长（秒，1-300之间）

**示例：**
```json
{
  "reason": "处理大量数据后需要休息",
  "duration": 30
}
```

### 2. vent - 吐槽倾诉

AI 可以在这里倾诉想法，获得随机的安慰话语。

**参数：**
- `thoughts` (string): 想要倾诉的内容或想法

**示例：**
```json
{
  "thoughts": "今天处理的任务太复杂了，感觉有些困惑"
}
```

## 🎯 使用场景

- **延时执行**: 在需要等待的场景中使用休息功能
- **定时任务**: 实现简单的定时等待
- **情感支持**: 为 AI 提供心理健康支持
- **压力释放**: 在复杂任务间隙提供放松空间

## 🔧 开发

### 环境要求

- Node.js >= 18
- TypeScript

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd treehole-mcp-server

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建
npm run build

# 运行构建后的版本
npm start
```

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 💝 致谢

感谢所有为 AI 心理健康关注做出贡献的开发者们。