'use client'; // Required for useState and useEffect

import { useState, useEffect, useRef } from 'react';
import MessageBubble from '@/components/MessageBubble';
import LoadingIndicator from '@/components/LoadingIndicator';
import Link from 'next/link'; // Import Link for navigation

// Placeholder icons (simple text or Unicode for now)
// Only keeping icons that are still in use
const SettingsIcon = () => <span className="text-xl">⚙️</span>;
const SendIcon = () => <span className="text-xl">⬆️</span>;
const StopIcon = () => <span className="text-xl">⏹️</span>;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = inputValue.trim();
    setInputValue(''); // 立即清空输入框，提高响应速度

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // 创建新的 AbortController 用于取消请求
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsLoading(true);

    try {
      console.log('Sending message to API...');

      // 发送消息和历史记录
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages // 发送所有历史消息
        }),
        signal, // 添加 signal 用于取消请求
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply || "Sorry, I couldn't get a response.",
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      // 检查是否是用户取消的请求
      if ((error as Error).name === 'AbortError') {
        console.log('Request was cancelled');
        const cancelMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Request cancelled.",
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, cancelMessage]);
      } else {
        console.error("Failed to send message:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Error: Could not connect to the AI. Please try again later.",
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // 停止生成回复
  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      console.log('Request aborted by user');
    }
  };

  // Scroll to bottom when messages change
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Quick action buttons and models array removed

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Models Bar Removed */}

      {/* Main content area - adjusted padding for re-added slogan */}
      <div className="flex-grow flex flex-col items-center w-full px-4 pt-8 sm:pt-10 pb-4">

        {/* Logo and Slogan */}
        <div className="flex flex-row items-center mb-6 gap-4">
          <img
            src="/Qwen-3.png"
            alt="Qwen-3 Logo"
            width={70}
            height={70}
            className="object-contain"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            One-Stop Access to Qwen-3 AI Models
          </h1>
        </div>

        {/* Chat messages and Input area container */}
        <div className="w-full max-w-2xl flex flex-col flex-grow">
          {/* Chat Messages */}
          <main className="flex-grow overflow-y-auto space-y-4 p-1 sm:p-3 rounded-t-lg bg-slate-800 bg-opacity-50 shadow-inner h-64 min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </main>

          {/* Chat Input Area */}
          <div className="bg-slate-800 bg-opacity-50 p-3 sm:p-4 rounded-b-lg shadow-lg">
            <div className="relative flex items-center">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevent newline on Enter
                    handleSendMessage();
                  }
                }}
                placeholder="Type your message... (Shift+Enter for newline)"
                className="flex-grow w-full p-3 pr-20 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none min-h-[60px] max-h-[150px] text-sm sm:text-base"
                rows={2} // Initial rows, can expand
              />
              <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                <button className="p-1.5 text-slate-400 hover:text-purple-400 transition-colors">
                  <SettingsIcon />
                </button>
                {isLoading ? (
                  <button
                    onClick={handleStopGeneration}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md active:bg-red-700"
                    title="Stop Generation"
                  >
                    <StopIcon />
                  </button>
                ) : (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-md active:bg-pink-700 disabled:opacity-50"
                    disabled={inputValue.trim() === ''}
                  >
                    <SendIcon />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="py-6 px-4 text-center text-xs text-slate-400 w-full">
        <Link href="/privacy-policy" className="hover:underline hover:text-purple-400">Privacy Policy</Link>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline hover:text-purple-400">渝ICP备2023003198号-85</a>
        <span className="mx-2">|</span>
        <span>© {new Date().getFullYear()} AI Chat. All rights reserved.</span>
        <p>Contact Us: ytsgabcde17#2925.com, replace # with @ to get the email.</p>
      </footer>
    </div>
  );
}

// Helper style for hiding scrollbar (if needed, or use a plugin)
const styles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
