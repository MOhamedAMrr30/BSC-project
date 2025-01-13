import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`py-6 ${message.role === 'assistant' ? 'bg-gray-50' : ''}`}
    >
      <div className="max-w-4xl mx-auto px-4 flex gap-6">
        <div className="flex-shrink-0">
          {message.role === 'assistant' ? (
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-500 text-sm">You</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-gray-800">{message.content}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-blue-500 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(true)}
                className={`${
                  liked === true ? 'text-green-500' : 'text-gray-400'
                } hover:text-green-500 transition-colors`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLiked(false)}
                className={`${
                  liked === false ? 'text-red-500' : 'text-gray-400'
                } hover:text-red-500 transition-colors`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}