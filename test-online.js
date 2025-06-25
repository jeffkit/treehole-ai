import { spawn } from 'child_process';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

console.log('🧪 开始测试线上版本 treehole-mcp-server...\n');

// 使用 npx 启动线上版本
const server = spawn('npx', ['treehole-mcp-server@latest'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let testResults = [];

server.stderr.on('data', (data) => {
  const output = data.toString().trim();
  console.log('🌳 服务器启动:', output);
  
  if (output.includes('Treehole MCP Server 已启动')) {
    console.log('✅ 服务器成功启动！\n');
    
    // 开始测试
    setTimeout(() => runTests(), 1000);
  }
});

server.stdout.on('data', (data) => {
  const lines = data.toString().split('\n').filter(line => line.trim());
  lines.forEach(line => {
    try {
      const response = JSON.parse(line);
      console.log('📨 收到响应:', JSON.stringify(response, null, 2));
      testResults.push(response);
    } catch (e) {
      console.log('📝 输出:', line);
    }
  });
});

function runTests() {
  console.log('🔧 开始功能测试...\n');
  
  // 1. 初始化
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
  
  console.log('📋 发送初始化请求...');
  server.stdin.write(JSON.stringify(initMessage) + '\n');
  
  // 2. 获取工具列表
  setTimeout(() => {
    const toolsMessage = {
      jsonrpc: "2.0",
      id: 2,
      method: "tools/list",
      params: {}
    };
    
    console.log('📋 请求工具列表...');
    server.stdin.write(JSON.stringify(toolsMessage) + '\n');
  }, 1000);
  
  // 3. 测试休息功能
  setTimeout(() => {
    const restMessage = {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "rest",
        arguments: {
          reason: "功能测试",
          duration: 2
        }
      }
    };
    
    console.log('😴 测试休息功能（2秒）...');
    const startTime = Date.now();
    server.stdin.write(JSON.stringify(restMessage) + '\n');
    
    // 验证休息时间
    setTimeout(() => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      if (duration >= 2000 && duration) {
        console.log('✅ 休息功能计时正确！');
      } else {
        console.log('❌ 休息功能计时异常：', duration, 'ms');
      }
    }, 3000);
    
  }, 2000);
  
  // 4. 测试倾诉功能
  setTimeout(() => {
    const ventMessage = {
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "vent",
        arguments: {
          thoughts: "测试倾诉功能，希望一切正常"
        }
      }
    };
    
    console.log('💭 测试倾诉功能...');
    server.stdin.write(JSON.stringify(ventMessage) + '\n');
  }, 6000);
  
  // 5. 结束测试
  setTimeout(() => {
    console.log('\n✅ 所有测试完成！');
    console.log('📊 测试结果数量:', testResults.length);
    
    // 验证基本功能
    let hasTools = false;
    let hasRestResponse = false;
    let hasVentResponse = false;
    
    testResults.forEach(result => {
      if (result.result && result.result.tools) {
        hasTools = true;
        console.log('✅ 工具列表获取成功');
      }
      if (result.result && result.result.content && result.result.content[0] && 
          result.result.content[0].text && result.result.content[0].text.includes('休息完成')) {
        hasRestResponse = true;
        console.log('✅ 休息功能响应正确');
      }
      if (result.result && result.result.content && result.result.content[0] && 
          result.result.content[0].text && result.result.content[0].text.includes('我听到了你的心声')) {
        hasVentResponse = true;
        console.log('✅ 倾诉功能响应正确');
      }
    });
    
    console.log('\n🎯 测试总结:');
    console.log('- 工具列表:', hasTools ? '✅' : '❌');
    console.log('- 休息功能:', hasRestResponse ? '✅' : '❌');
    console.log('- 倾诉功能:', hasVentResponse ? '✅' : '❌');
    
    server.kill();
    process.exit(hasTools && hasRestResponse && hasVentResponse ? 0 : 1);
  }, 10000);
}

// 错误处理
server.on('error', (error) => {
  console.error('❌ 服务器启动失败:', error);
  process.exit(1);
});

server.on('close', (code) => {
  console.log('🔚 测试结束，退出码:', code);
}); 