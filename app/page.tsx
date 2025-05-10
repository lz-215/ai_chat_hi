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

  // Animation is now handled directly by Tailwind classes

  // Quick action buttons and models array removed

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Models Bar Removed */}

      {/* Main content area - adjusted padding for re-added slogan */}
      <div className="flex-grow flex flex-col items-center w-full px-4 pt-8 sm:pt-10 pb-4">

        {/* Logo and Slogan with Animations */}
        <div className="flex flex-row items-center mb-6 gap-4 animate-bounce-in">
          <img
            src="/Qwen-3.png"
            alt="Qwen-3 Logo"
            width={70}
            height={70}
            className="object-contain animate-float"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-shimmer bg-[length:200%_100%]">
            Единый доступ к моделям Qwen-3 AI
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

          {/* Chat Input Area with Animations */}
          <div className="bg-slate-800 bg-opacity-50 p-3 sm:p-4 rounded-b-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                placeholder="Введите ваше сообщение... (Shift+Enter для новой строки)"
                className="flex-grow w-full p-3 pr-20 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none min-h-[60px] max-h-[150px] text-sm sm:text-base transition-all duration-300 focus:shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                rows={2} // Initial rows, can expand
              />
              <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                <button className="p-1.5 text-slate-400 hover:text-purple-400 transition-colors hover:animate-wiggle">
                  <SettingsIcon />
                </button>
                {isLoading ? (
                  <button
                    onClick={handleStopGeneration}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-md active:bg-red-700 hover:animate-shake"
                    title="Stop Generation"
                  >
                    <StopIcon />
                  </button>
                ) : (
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all shadow-md active:bg-pink-700 disabled:opacity-50 hover:animate-pulse"
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

      {/* Enhanced Footer Section with Rich Animations */}
      <div className="w-full bg-slate-800 bg-opacity-70 mt-12 py-10">
        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 mb-12" id="features-section">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-shimmer bg-[length:200%_100%]">
            Мощные возможности Qwen-3 AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-700 bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform hover:scale-105 duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-purple-400 text-3xl mb-4 animate-float">🧠</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Продвинутая интеллектуальность</h3>
              <p className="text-gray-300">
                Благодаря передовым языковым моделям Qwen-3 обеспечивает ответы, близкие к человеческим, с глубоким пониманием контекста.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-700 bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform hover:scale-105 duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-purple-400 text-3xl mb-4 animate-shake">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Молниеносная скорость</h3>
              <p className="text-gray-300">
                Получайте мгновенные ответы на ваши запросы благодаря нашей оптимизированной и быстрой инфраструктуре.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-700 bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform hover:scale-105 duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-purple-400 text-3xl mb-4 animate-wiggle">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Безопасность и конфиденциальность</h3>
              <p className="text-gray-300">
                Ваши разговоры конфиденциальны. Мы уделяем приоритетное внимание безопасности данных и приватности пользователей.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto px-4 mb-12" id="use-cases-section">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-shimmer bg-[length:200%_100%]">
            Что вы можете делать с Qwen-3?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Use Case 1 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
              <div className="bg-pink-500 bg-opacity-20 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">📝</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Создание контента</h3>
                <p className="text-gray-300">
                  Генерируйте статьи, посты в блогах, маркетинговые тексты и креативные материалы с легкостью. Идеально для создателей контента и маркетологов.
                </p>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="bg-pink-500 bg-opacity-20 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Ассистент для исследований</h3>
                <p className="text-gray-300">
                  Получайте помощь в исследованиях, краткие обзоры сложных тем и быстрые точные ответы на ваши вопросы.
                </p>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
              <div className="bg-pink-500 bg-opacity-20 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">🔍</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Решение проблем</h3>
                <p className="text-gray-300">
                  Решайте сложные задачи с помощью ИИ. Получайте пошаговые решения и объяснения для различных задач.
                </p>
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="bg-pink-500 bg-opacity-20 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">🌐</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">Перевод языков</h3>
                <p className="text-gray-300">
                  Преодолевайте языковые барьеры с точными переводами и пониманием культурного контекста на разных языках.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Qwen-3 Section */}
        <div className="max-w-4xl mx-auto px-4 mb-12 text-center" id="about-section">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-shimmer bg-[length:200%_100%]">
            О Qwen-3
          </h2>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Qwen-3 — это передовая языковая модель ИИ, разработанная для обеспечения интеллектуальных, полезных и безопасных бесед. С миллиардами параметров и обширной подготовкой на разнообразных данных Qwen-3 представляет следующее поколение ИИ-ассистентов, способных точно понимать и отвечать на запросы пользователей.
          </p>
          <div className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            <a href="https://qwen.ai" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Подробнее о Qwen-3 <span className="ml-2 animate-float">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links with Animations */}
      <footer className="py-8 px-4 bg-slate-900 text-center text-sm text-slate-400 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/privacy-policy" className="hover:underline hover:text-purple-400 transition-colors hover:animate-pulse">Политика конфиденциальности</Link>
            <a href="#" className="hover:underline hover:text-purple-400 transition-colors hover:animate-pulse">渝ICP备2023003198号-89</a>
          </div>
          <div className="border-t border-slate-700 pt-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="mb-2">© {new Date().getFullYear()} AI Chat. Все права защищены.</p>
            <p>Связаться с нами: ytsgabcde19#2925.com, замените # на @ для получения email.</p>
          </div>
        </div>
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
