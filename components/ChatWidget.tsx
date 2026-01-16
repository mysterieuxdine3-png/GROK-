
import React, { useState, useRef, useEffect } from 'react';
import { getGrokAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: "Salut ! Je suis Grok AI. Comment puis-je t'aider aujourd'hui dans ton apprentissage ?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const aiResponse = await getGrokAssistantResponse(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[100]">
      {isOpen && (
        <div className="mb-4 w-[320px] lg:w-[380px] h-[500px] bg-[#0f0f0f] border border-gray-900 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#1a1a1a] p-5 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-[#00ff99] rounded-full animate-pulse shadow-[0_0_8px_#00ff99]"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Assistant Grok AI</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-white transition text-2xl"
            >
              &times;
            </button>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex-grow p-5 overflow-y-auto custom-scrollbar space-y-4"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#00ff99] text-black font-bold rounded-br-none' 
                      : 'bg-[#1a1a1a] text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a1a1a] px-4 py-3 rounded-2xl text-[10px] text-gray-500 font-bold uppercase tracking-widest animate-pulse">
                  Grok réfléchit...
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-gray-800 bg-[#0a0a0a]">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Question technique..." 
                className="w-full bg-black border border-gray-800 rounded-full px-6 py-4 text-xs text-white outline-none focus:border-[#00ff99] pr-14 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-3 top-2 text-[#00ff99] p-2 hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#00ff99] text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 border-4 border-black group transition-all"
      >
        <svg className={`w-7 h-7 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'group-hover:rotate-12'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
        </svg>
      </button>
    </div>
  );
};

export default ChatWidget;
