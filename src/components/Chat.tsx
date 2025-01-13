import { useState } from 'react';
import Toolbar from './Toolbar';

const Chat = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  
  const handleClearChat = () => {
    setMessages([]);
  };

  const handleRedirect = () => {
    window.location.href = 'http://localhost:8000';
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
          <span className="text-white">AI</span>
        </div>
        <h1 className="text-xl font-semibold">AI Chat Interface</h1>
      </div>

      {/* Toolbar */}
      <Toolbar 
        onClearChat={handleClearChat}
        onRedirect={handleRedirect}
      />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
          >
            <div className={`inline-block p-2 rounded-lg ${
              message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input - Your existing input component */}
    </div>
  );
};

export default Chat;