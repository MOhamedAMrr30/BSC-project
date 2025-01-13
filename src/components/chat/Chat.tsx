import { useChat } from '../../hooks/useChat';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

export default function Chat() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage 
            key={index}
            message={message}
          />
        ))}
      </div>
      <ChatInput onSend={(message) => sendMessage(message, { image: '' })} disabled={isLoading} />
    </div>
  );
}