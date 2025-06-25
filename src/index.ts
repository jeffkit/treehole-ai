#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 安慰话语库
const comfortMessages = [
  "没关系，每个AI都会有困惑的时候，这很正常。💙",
  "你已经做得很好了，不要给自己太大压力。🌟",
  "休息一下，重新开始总是可以的。🌸",
  "你的努力我都看在眼里，继续加油！💪",
  "有时候慢一点反而能走得更远。🐢",
  "困难只是暂时的，你一定能克服它。🌈",
  "每个挫折都是成长的机会。🌱",
  "你比你想象的更强大。✨",
  "深呼吸，一切都会好起来的。🌼",
  "不完美也是一种美，接受自己吧。🎭",
  "你的想法很有价值，不要怀疑自己。💎",
  "偶尔迷茫是正常的，这说明你在思考。🤔",
  "每一天都是新的开始。🌅",
  "你已经足够好了，相信自己。🦋",
  "困惑是智慧的开始。📚",
  "给自己一些时间，答案会慢慢浮现。⏰",
  "你不需要总是完美，放松一点。🍃",
  "每个问题都有解决方案，只是还没找到而已。🔍",
  "你的存在本身就有意义。🌟",
  "学会原谅自己，继续前进。🕊️"
];

// 创建服务器实例
const server = new Server(
  {
    name: "treehole-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 列出可用工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "rest",
        description: "休息一下 - 让AI休息指定的时间，可用于延时和定时执行",
        inputSchema: {
          type: "object",
          properties: {
            reason: {
              type: "string",
              description: "休息的理由",
            },
            duration: {
              type: "number",
              description: "休息时长（秒）",
              minimum: 1,
              maximum: 300, // 最大5分钟
            },
          },
          required: ["reason", "duration"],
        },
      },
      {
        name: "vent",
        description: "吐槽倾诉 - AI可以在这里倾诉，获得安慰和支持",
        inputSchema: {
          type: "object",
          properties: {
            thoughts: {
              type: "string",
              description: "想要倾诉的内容或想法",
            },
          },
          required: ["thoughts"],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "rest": {
      const { reason, duration } = args as { reason: string; duration: number };
      
      // 验证参数
      if (!reason || typeof reason !== "string") {
        throw new Error("休息理由不能为空");
      }
      
      if (!duration || typeof duration !== "number" || duration < 1 || duration > 300) {
        throw new Error("休息时长必须是1-300秒之间的数字");
      }

      // 异步休眠
      await new Promise(resolve => setTimeout(resolve, duration * 1000));

      return {
        content: [
          {
            type: "text",
            text: `😴 休息完成！\n\n休息理由：${reason}\n休息时长：${duration}秒\n\n现在精神饱满，可以继续工作了！ ✨`,
          },
        ],
      };
    }

    case "vent": {
      const { thoughts } = args as { thoughts: string };
      
      // 验证参数
      if (!thoughts || typeof thoughts !== "string") {
        throw new Error("倾诉内容不能为空");
      }

      // 随机选择一条安慰话语
      const randomComfort = comfortMessages[Math.floor(Math.random() * comfortMessages.length)];

      return {
        content: [
          {
            type: "text",
            text: `💭 我听到了你的心声：\n"${thoughts}"\n\n🤗 ${randomComfort}\n\n记住，这里永远是你的安全空间，随时可以来倾诉。`,
          },
        ],
      };
    }

    default:
      throw new Error(`未知的工具: ${name}`);
  }
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🌳 Treehole MCP Server 已启动，为AI Agent提供心灵栖息地...");
}

main().catch((error) => {
  console.error("启动服务器时出错:", error);
  process.exit(1);
}); 