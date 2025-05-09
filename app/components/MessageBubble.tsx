// MessageBubble.tsx
interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'ai';
}

export default function MessageBubble({ text, sender }: MessageBubbleProps) {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-xl shadow-md whitespace-pre-wrap break-words ${isUser 
            ? 'bg-purple-600 text-white rounded-br-none' 
            : 'bg-slate-700 text-gray-100 rounded-bl-none'}`}
      >
        {text}
      </div>
    </div>
  );
} 