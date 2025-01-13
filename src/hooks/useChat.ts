import { useState } from 'react';
import { getGeminiResponse } from '../lib/gemini';

export function useChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string, p0: { image: string; }) => {
    try {
      console.log('Sending message:', message);
      setIsLoading(true);
      
      // Add user message
      setMessages(prev => [...prev, { role: 'user', content: message }]);

      // Get response from Gemini
      const response = await getGeminiResponse(message);
      console.log('Received response:', response);

      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    setMessages
  };
}