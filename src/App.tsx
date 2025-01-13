import React, { useState } from 'react';
import { useChat } from './hooks/useChat';
import { useSearchParams } from './hooks/useSearchParams';
import { Send, Image, Menu, X, Plus, MessageSquare, Code, FileText } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
}

function App() {
  const { error } = useSearchParams();
  const { messages, isLoading, sendMessage, setMessages } = useChat();
  const [input, setInput] = React.useState('');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Previous Chat 1', timestamp: new Date() },
    { id: '2', title: 'Previous Chat 2', timestamp: new Date() },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Auto-send error message when component mounts
  React.useEffect(() => {
    if (error) {
      sendMessage(`I got this error in my Jupyter notebook. Can you help me fix it?\n\n${error}`, { image: '' });
    }
  }, [error]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || isLoading) return;

    let message = input;
    if (selectedImage) {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        message += `\n[Image: ${selectedImage.name}]`;
        // Add your image handling logic here
        sendMessage(message, { image: base64Image });
      };
      reader.readAsDataURL(selectedImage);
      return; // Return early since sendMessage will be called in onloadend callback
    } else {
      sendMessage(message, { image: '' }); // Use empty string instead of null
    }

    setInput('');
    setSelectedImage(null);
  };

  const handleNewChat = () => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      title: `New Chat ${chatHistory.length + 1}`,
      timestamp: new Date(),
    };
    
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]); // Clear current messages
    setSidebarOpen(false); // Close sidebar after creating new chat
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Here you would typically load the messages for the selected chat
    // This is where you'd implement chat persistence
    setMessages([]); // For now, just clearing messages
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Chat History</h2>
          <button className="close-button" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="new-chat-button">
          <button onClick={handleNewChat}>
            <Plus size={16} />
            New Chat
          </button>
        </div>
        <div className="chat-history">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`chat-history-item ${currentChatId === chat.id ? 'active' : ''}`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <MessageSquare size={16} />
              <span>{chat.title}</span>
              <span className="chat-timestamp">
                {chat.timestamp.toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="chat-container">
        <header className="header">
          <div className="header-content">
            <button 
              className="menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="logo">AI</div>
            <div className="header-title">
              <h1>AI Chat Interface</h1>
              <p>Powered by Gemini</p>
            </div>
          </div>
        </header>

        <main className="messages-container">
          {messages.length === 0 ? (
            <div className="welcome-container">
              <div className="welcome-content">
                <div className="welcome-icon-container">
                  <span className="welcome-icon">💡</span>
                </div>
                <h2 className="welcome-title">Welcome to AI Chat!</h2>
                <p className="welcome-description">
                  Ask me anything about coding, debugging, or general questions. I'm here to help!
                </p>
                <div className="feature-grid">
                  <div className="feature-item">
                    <MessageSquare size={24} />
                    <h3>Smart Conversations</h3>
                    <p>Advanced AI-powered responses for your questions</p>
                  </div>
                  <div className="feature-item">
                    <Image size={24} />
                    <h3>Image Support</h3>
                    <p>Upload and analyze images in our chat</p>
                  </div>
                  <div className="feature-item">
                    <Code size={24} />
                    <h3>Code Assistant</h3>
                    <p>Get help with coding and debugging</p>
                  </div>
                  <div className="feature-item">
                    <FileText size={24} />
                    <h3>Chat History</h3>
                    <p>Access your previous conversations</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
              >
                <div className="message-content">
                  <div className="message-header">
                    <div className="avatar">
                      {message.role === 'assistant' ? 'AI' : 'U'}
                    </div>
                    <div className="font-medium">
                      {message.role === 'assistant' ? 'Assistant' : 'You'}
                    </div>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    {message.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </main>

        <form onSubmit={handleSubmit} className="input-container">
          <div className="input-wrapper">
            {selectedImage && (
              <div className="selected-image">
                <img 
                  src={URL.createObjectURL(selectedImage)} 
                  alt="Selected" 
                />
                <button 
                  type="button" 
                  onClick={() => setSelectedImage(null)}
                  className="remove-image"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="input-actions">
              <button
                type="button"
                className="upload-button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Image size={20} />
              </button>
              <button
                type="submit"
                className="send-button"
                disabled={isLoading || (!input.trim() && !selectedImage)}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          {isLoading && (
            <div className="loading">
              <div className="loading-dots">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <span>AI is thinking...</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;