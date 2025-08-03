import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { talk } from '@/lib/gemini';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const message = input;
    const newMessage: Message = { role: 'user', content: message };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      const reply = await talk(message);
      setMessages((prev) => [...prev, { role: 'bot', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Failed to fetch response.' },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
        <p className="mt-2 text-gray-600">
          Chat with an AI assistant about your medications
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-[400px] overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            />
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

