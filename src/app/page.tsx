'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-screen">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap mb-4">
            <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
            {m.content}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t"
      >
        <input
          className="w-full p-2 text-gray-900 border rounded"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}