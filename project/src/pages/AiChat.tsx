import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiMessage: Message = {
        sender: 'ai',
        text: "I'm just a placeholder AI.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="border rounded-md p-4 h-96 overflow-y-auto flex flex-col space-y-2">
        {messages.map((m, index) => (
          <div
            key={index}
            className={m.sender === 'user' ? 'text-right' : 'text-left'}
          >
            <span className="inline-block px-3 py-2 rounded-md bg-gray-100 text-gray-800">
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}

