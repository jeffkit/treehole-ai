import { spawn } from 'child_process';

// 创建一个简单的 MCP 客户端来测试我们的服务器
async function testMCPServer() {
  console.log('🧪 开始测试 Treehole MCP Server...\n');
  
  const server = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  // 发送初始化消息
  const initMessage = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    }
  };
  
  server.stdin.write(JSON.stringify(initMessage) + '\n');
  
  // 监听响应
  server.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      try {
        const response = JSON.parse(line);
        console.log('📨 收到响应:', JSON.stringify(response, null, 2));
      } catch (e) {
        console.log('📝 输出:', line);
      }
    });
  });
  
  server.stderr.on('data', (data) => {
    console.log('ℹ️ 服务器信息:', data.toString().trim());
  });
  
  // 等待一下然后发送工具列表请求
  setTimeout(() => {
    const toolsMessage = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {}
    };
    
    console.log('\n📋 请求工具列表...');
    server.stdin.write(JSON.stringify(toolsMessage) + '\n');
  }, 1000);
  
  // 等待一下然后测试休息功能
  setTimeout(() => {
    const restMessage = {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "rest",
        arguments: {
          reason: "测试休息功能",
          duration: 2
        }
      }
    };
    
    console.log('\n😴 测试休息功能...');
    server.stdin.write(JSON.stringify(restMessage) + '\n');
  }, 2000);
  
  // 等待一下然后测试倾诉功能
  setTimeout(() => {
    const ventMessage = {
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "vent",
        arguments: {
          thoughts: "今天的工作好复杂，感觉有点累了"
        }
      }
    };
    
    console.log('\n💭 测试倾诉功能...');
    server.stdin.write(JSON.stringify(ventMessage) + '\n');
  }, 5000);
  
  // 6秒后结束测试
  setTimeout(() => {
    console.log('\n✅ 测试完成，关闭服务器');
    server.kill();
    process.exit(0);
  }, 8000);
}

testMCPServer().catch(console.error); 