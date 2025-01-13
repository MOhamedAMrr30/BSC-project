import { FC } from 'react';

interface ToolbarProps {
  onClearChat: () => void;
  onRedirect: () => void;
}

const Toolbar: FC<ToolbarProps> = ({ onClearChat, onRedirect }) => {
  return (
    <div className="flex gap-2 p-2 border-b">
      <button 
        onClick={onClearChat}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear Chat
      </button>
      <button 
        onClick={onRedirect}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go to Localhost:8000
      </button>
    </div>
  );
};

export default Toolbar; 