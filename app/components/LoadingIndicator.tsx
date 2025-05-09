// LoadingIndicator.tsx
export default function LoadingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-xl shadow-md bg-slate-700 text-gray-100 rounded-bl-none">
        <div className="flex items-center space-x-2">
          <div className="text-gray-300">Qwen-3 is thinking</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
