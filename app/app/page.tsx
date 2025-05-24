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
const GoogleIcon = () => <span className="text-xl">🔍</span>; // Google иконка

// 获取主域名函数
const getMainDomain = () => {
  // 确保代码在浏览器环境中执行
  if (typeof window === 'undefined') return '';
  
  const hostname = window.location.hostname;
  // 处理localhost和IP地址情况
  if (hostname === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return hostname;
  }
  
  // 分割主机名
  const parts = hostname.split('.');
  // 如果只有两部分或更少，如example.com，直接返回
  if (parts.length <= 2) return hostname;
  
  // 返回最后两部分，即主域名
  return parts.slice(-2).join('.');
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [messageCount, setMessageCount] = useState(0); // 跟踪用户消息数量
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // 显示登录提示
  const abortControllerRef = useRef<AbortController | null>(null);

  // 处理谷歌登录
  const handleGoogleLogin = () => {
    const domain = getMainDomain();
    const callback = encodeURIComponent(window.location.href);
    window.location.href = `https://aa.jstang.cn/google_login.php?url=${domain};&redirect_uri=${callback}`;
  };

  // 检查登录状态和处理谷歌登录回调
  useEffect(() => {
    // 先检查localstorage中是否已有登录信息
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const picture = localStorage.getItem('picture');
    
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
      if (picture) setUserImage(picture);
    }
    
    // 检查并恢复消息数量
    const savedCount = localStorage.getItem('messageCount');
    if (savedCount) {
      setMessageCount(parseInt(savedCount, 10));
    }
    
    // 处理谷歌登录回调
    const url = window.location.href;
    if (url.includes('google_id=')) {
      try {
        // 解析URL参数
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        
        // 提取用户信息
        const googleId = params.get('google_id');
        const name = params.get('name');
        const email = params.get('email');
        const picture = params.get('picture');
        
        // 保存到localStorage
        if (googleId) localStorage.setItem('google_id', googleId);
        if (name) localStorage.setItem('name', name);
        if (email) localStorage.setItem('email', email);
        if (picture) localStorage.setItem('picture', picture);
        
        // 生成并保存token
        const token = btoa(JSON.stringify({ googleId, name, email, picture }));
        localStorage.setItem('token', token);
        
        // 更新状态
        setIsLoggedIn(true);
        if (name) setUserName(name);
        if (picture) setUserImage(picture);
        
        // 登录成功后重置消息数量
        setMessageCount(0);
        localStorage.setItem('messageCount', '0');
        setShowLoginPrompt(false);
        
        // 清除URL参数
        const cleanUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      } catch (error) {
        console.error('Ошибка при обработке данных Google Login:', error);
      }
    }
  }, []);

  // 处理登出
  const handleLogout = () => {
    localStorage.removeItem('google_id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('picture');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    setUserImage('');
  };

  const handleSendMessage = async () => {
    // 首先检查是否未登录且已经发送了15条或以上消息
    if (!isLoggedIn && messageCount >= 15) {
      setShowLoginPrompt(true);
      return;
    }
    
    if (inputValue.trim() === '') return;

    const userMessage = inputValue.trim();
    setInputValue(''); // 立即清空输入框，提高响应速度

    // 如果用户未登录，增加消息计数
    if (!isLoggedIn) {
      const newCount = messageCount + 1;
      setMessageCount(newCount);
      localStorage.setItem('messageCount', newCount.toString());
      
      // 检查是否达到14次消息，如果是，显示警告（下一次将被阻止）
      if (newCount === 14) {
        const warningMessage: Message = {
          id: 'warning-' + Date.now().toString(),
          text: "⚠️ Вы использовали 14 из 15 бесплатных сообщений. Для продолжения использования сервиса, пожалуйста, войдите через Google.",
          sender: 'ai',
        };
        setMessages(prevMessages => [...prevMessages, warningMessage]);
      }
    }

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
        text: data.reply || "Извините, я не смог получить ответ.",
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      // 检查是否是用户取消的请求
      if ((error as Error).name === 'AbortError') {
        console.log('Request was cancelled');
        const cancelMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Запрос отменен.",
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, cancelMessage]);
      } else {
        console.error("Failed to send message:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Ошибка: Не удалось подключиться к ИИ. Пожалуйста, повторите попытку позже.",
          sender: 'ai',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      
      // 检查是否到达15条消息，并且用户未登录
      if (!isLoggedIn && messageCount >= 15) {
        setShowLoginPrompt(true);
      }
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-slate-200 text-gray-800 font-[family-name:var(--font-geist-sans)]">
      {/* Google Login Button */}
      <div className="absolute top-4 right-4 z-10">
        {isLoggedIn ? (
          <div className="flex items-center space-x-3 bg-white bg-opacity-90 p-2 px-4 rounded-full shadow-md">
            {userImage && (
              <img 
                src={userImage} 
                alt={userName} 
                className="w-8 h-8 rounded-full" 
              />
            )}
            <span className="text-sm text-purple-700">{userName}</span>
            <button 
              onClick={handleLogout}
              className="text-xs text-gray-600 hover:text-purple-700"
            >
              लॉगआउट
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {messageCount > 0 && (
              <span className="text-xs text-gray-700 mr-4">
                {messageCount}/15 संदेश
              </span>
            )}
            <button 
              onClick={handleGoogleLogin} 
              className="flex items-center space-x-2 bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-purple-100 transition-all duration-300 shadow-md transform hover:scale-105 hover:shadow-lg animate-bounce-in"
            >
              <GoogleIcon />
              <span>Google से लॉगिन करें</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Models Bar Removed */}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full animate-bounce-in">
            <h2 className="text-xl font-bold text-purple-600 mb-4">लॉगिन आवश्यक है</h2>
            <p className="text-gray-700 mb-6">
              आपने 15 मुफ्त संदेशों की सीमा पूरी कर ली है। सेवा जारी रखने के लिए कृपया Google से लॉगिन करें।
            </p>
            <div className="flex justify-between">
              <button 
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
              >
                रद्द करें
              </button>
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                <GoogleIcon />
                <span>Google से लॉगिन करें</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-shimmer bg-[length:200%_100%]">
            Qwen-3 AI मॉडल्स तक एकीकृत पहुँच
          </h1>
        </div>

        {/* Chat messages and Input area container */}
        <div className="w-full max-w-2xl flex flex-col flex-grow">
          {/* Chat Messages */}
          <main className="flex-grow overflow-y-auto space-y-4 p-1 sm:p-3 rounded-t-lg bg-white bg-opacity-90 shadow-inner h-64 min-h-[200px] sm:min-h-[300px] md:min-h-[400px]">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </main>

          {/* Chat Input Area with Animations */}
          <div className="bg-white bg-opacity-90 p-3 sm:p-4 rounded-b-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                placeholder={!isLoggedIn && messageCount >= 15 
                  ? "जारी रखने के लिए लॉगिन आवश्यक है" 
                  : "अपना संदेश लिखें... (नई पंक्ति के लिए Shift+Enter दबाएँ)"}
                className={`flex-grow w-full p-3 pr-20 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500 resize-none min-h-[60px] max-h-[150px] text-sm sm:text-base transition-all duration-300 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] ${!isLoggedIn && messageCount >= 15 ? 'opacity-50' : ''}`}
                rows={2}
                disabled={!isLoggedIn && messageCount >= 15}
              />
              <div className="absolute right-3 bottom-2.5 flex items-center space-x-2">
                <button className="p-1.5 text-gray-500 hover:text-purple-600 transition-colors hover:animate-wiggle">
                  <SettingsIcon />
                </button>
                {isLoading ? (
                  <button
                    onClick={handleStopGeneration}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-md active:bg-red-700 hover:animate-shake"
                    title="जनरेशन रोकें"
                  >
                    <StopIcon />
                  </button>
                ) : (
                  <button
                    onClick={handleSendMessage}
                    className={`p-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all shadow-md active:bg-purple-700 disabled:opacity-50 hover:animate-pulse ${(!isLoggedIn && messageCount >= 15) || inputValue.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={(!isLoggedIn && messageCount >= 15) || inputValue.trim() === ''}
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
      <div className="w-full bg-white bg-opacity-90 mt-12 py-10">
        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 mb-12" id="features-section">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-shimmer bg-[length:200%_100%]">
            Qwen-3 AI की शक्तिशाली क्षमताएँ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform hover:scale-105 duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-purple-600 text-3xl mb-4 animate-float">🧠</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-800">एडवांस्ड इंटेलिजेंस</h3>
              <p className="text-gray-700">
                Qwen-3 की उन्नत भाषा मॉडल्स मानव-समान उत्तर और गहरे संदर्भ की समझ प्रदान करती हैं।
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform hover:scale-105 duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-purple-600 text-3xl mb-4 animate-shake">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-800">बिजली जैसी गति</h3>
              <p className="text-gray-700">
                हमारी अनुकूलित और तेज़ इंफ्रास्ट्रक्चर के कारण अपने प्रश्नों के तुरंत उत्तर पाएं।
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 transform hover:scale-105 duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-purple-600 text-3xl mb-4 animate-wiggle">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-800">सुरक्षा और गोपनीयता</h3>
              <p className="text-gray-700">
                आपकी बातचीत गोपनीय है। हम डेटा सुरक्षा और उपयोगकर्ता की प्राइवेसी को सर्वोच्च प्राथमिकता देते हैं।
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto px-4 mb-12" id="use-cases-section">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-shimmer bg-[length:200%_100%]">
            Qwen-3 से आप क्या कर सकते हैं?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Use Case 1 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
              <div className="bg-pink-100 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">📝</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">सामग्री निर्माण</h3>
                <p className="text-gray-700">
                  आसानी से लेख, ब्लॉग पोस्ट, मार्केटिंग टेक्स्ट और रचनात्मक सामग्री जनरेट करें। कंटेंट क्रिएटर्स और मार्केटर्स के लिए आदर्श।
                </p>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
              <div className="bg-pink-100 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">💡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">शोध सहायक</h3>
                <p className="text-gray-700">
                  शोध में सहायता, जटिल विषयों का संक्षिप्त अवलोकन और आपके सवालों के तेज़, सटीक उत्तर पाएं।
                </p>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
              <div className="bg-pink-100 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">🔍</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">समस्या समाधान</h3>
                <p className="text-gray-700">
                  AI की मदद से जटिल समस्याओं का समाधान करें। विभिन्न कार्यों के लिए चरण-दर-चरण समाधान और स्पष्टीकरण प्राप्त करें।
                </p>
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="flex items-start space-x-4 hover:transform hover:scale-105 transition-all duration-300 animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="bg-pink-100 p-3 rounded-full animate-morph">
                <span className="text-2xl animate-scale">🌐</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">भाषा अनुवाद</h3>
                <p className="text-gray-700">
                  विभिन्न भाषाओं में सटीक अनुवाद और सांस्कृतिक संदर्भ की समझ के साथ भाषा बाधाओं को पार करें।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Qwen-3 Section */}
        <div className="max-w-4xl mx-auto px-4 mb-12 text-center" id="about-section">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-shimmer bg-[length:200%_100%]">
            Qwen-3 के बारे में
          </h2>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Qwen-3 एक उन्नत AI भाषा मॉडल है, जिसे बुद्धिमान, उपयोगी और सुरक्षित संवाद प्रदान करने के लिए डिज़ाइन किया गया है। अरबों पैरामीटर और विविध डेटा पर व्यापक प्रशिक्षण के साथ, Qwen-3 अगली पीढ़ी के AI सहायक का प्रतिनिधित्व करता है, जो उपयोगकर्ता के अनुरोधों को सटीक रूप से समझने और उत्तर देने में सक्षम है।
          </p>
          <div className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            <a href="https://qwen.ai" target="_blank" rel="noopener noreferrer" className="flex items-center">
              Qwen-3 के बारे में और जानें <span className="ml-2 animate-float">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links with Animations */}
      <footer className="py-8 px-4 bg-purple-50 text-center text-sm text-gray-600 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/privacy-policy" className="hover:underline hover:text-purple-600 transition-colors hover:animate-pulse">गोपनीयता नीति</Link>
            <a href="#" className="hover:underline hover:text-purple-600 transition-colors hover:animate-pulse">渝ICP备2025051720号-60</a>
          </div>
          <div className="border-t border-purple-100 pt-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <p className="mb-2">© {new Date().getFullYear()} AI Chat. सर्वाधिकार सुरक्षित।</p>
            <p>संपर्क करें: ytsgabcde23@2925.com</p>
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
