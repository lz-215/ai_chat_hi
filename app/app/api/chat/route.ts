import { NextResponse } from 'next/server';

// 定义消息接口
interface Message {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  name?: string;
}

// 定义DeepSeek API响应接口
interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userInput = body.message;
    const chatHistory = body.history || [];

    // 获取环境变量中的API密钥
    const apiKey = process.env.DEEPSEEK_API_KEY;
    const apiBaseUrl = process.env.DEEPSEEK_API_BASE_URL || 'https://api.deepseek.com';

    if (!apiKey) {
      console.error('DEEPSEEK_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    console.log('Sending request to DeepSeek API with key:', apiKey.substring(0, 5) + '...');

    // 构建消息数组，包含历史消息
    const messages: Message[] = [];

    // 添加系统消息（可选）
    messages.push({
      role: 'system',
      content: '你是一个有帮助的AI助手，提供友好、准确的回答。'
    });

    // 添加历史消息
    if (chatHistory && chatHistory.length > 0) {
      for (const msg of chatHistory) {
        if (msg.sender === 'user') {
          messages.push({ role: 'user', content: msg.text });
        } else if (msg.sender === 'ai') {
          messages.push({ role: 'assistant', content: msg.text });
        }
      }
    }

    // 添加当前用户消息
    messages.push({
      role: 'user',
      content: userInput
    });

    // 构建请求体
    const requestBody = {
      model: 'deepseek-chat',
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    // 调用DeepSeek API
    console.log(`Calling DeepSeek API at: ${apiBaseUrl}/v1/chat/completions`);

    try {
      const response = await fetch(`${apiBaseUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);

      // 处理API响应
      if (!response.ok) {
        const errorText = await response.text();
        console.error('DeepSeek API error:', response.status, errorText);

        return NextResponse.json(
          { error: `AI service error: ${response.status}` },
          { status: response.status }
        );
      }

      // 解析API响应
      const data: DeepSeekResponse = await response.json();
      console.log('DeepSeek API response:', JSON.stringify(data, null, 2));

      const aiResponse = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

      return NextResponse.json({ reply: aiResponse });
    } catch (error) {
      console.error('Fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to connect to AI service' },
        { status: 500 }
      );
    }


  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
