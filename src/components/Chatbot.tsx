import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! أنا المساعد الذكي لأمريكي. كيف يمكنني مساعدتك اليوم؟ 👋',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const botResponses = {
    greetings: [
      'مرحباً! كيف حالك اليوم؟ 😊',
      'أهلاً وسهلاً! كيف يمكنني مساعدتك؟',
      'مرحباً! أنا هنا لمساعدتك في أي شيء تحتاجه.'
    ],
    portfolio: [
      'أمريكي مطور ذكاء اصطناعي وأمن سيبراني. لديه خبرة في OpenAI و Intel و L\'Oréal. يمكنك استكشاف مشاريعه في قسم المشاريع! 🚀',
      'أمريكي متخصص في الذكاء الاصطناعي والأمن السيبراني. يدرس في Kennesaw State University ولديه خبرة في شركات عالمية كبيرة.',
      'يمكنك تحميل السيرة الذاتية من الزر في الصفحة الرئيسية، أو استكشاف المشاريع في قسم المشاريع!'
    ],
    contact: [
      'يمكنك التواصل مع أمريكي عبر: \n• LinkedIn: linkedin.com/in/amrikyy\n• GitHub: github.com/Moeabdelaziz007\n• Email: [email protected]',
      'أمريكي متاح للتواصل عبر LinkedIn و GitHub. يمكنك أيضاً تحميل السيرة الذاتية للحصول على معلومات التواصل الكاملة.',
      'للتواصل المهني، استخدم LinkedIn أو GitHub. للتعاون في المشاريع، يمكنك مراجعة الكود المفتوح على GitHub!'
    ],
    projects: [
      'أمريكي يعمل على مشاريع متقدمة في الذكاء الاصطناعي والأمن السيبراني. استكشف قسم المشاريع لرؤية أحدث أعماله! 🔥',
      'المشاريع تشمل تطبيقات الذكاء الاصطناعي، حلول الأمن السيبراني، وتطوير الويب المتقدم. كل مشروع يوضح مهارات مختلفة!',
      'يمكنك رؤية المشاريع المميزة في الصفحة الرئيسية، أو استكشاف جميع المشاريع في قسم المشاريع.'
    ],
    skills: [
      'أمريكي متخصص في:\n• الذكاء الاصطناعي والتعلم الآلي\n• الأمن السيبراني\n• تطوير الويب (React, TypeScript)\n• Python, JavaScript, C++\n• حلول الحوسبة السحابية',
      'المهارات التقنية تشمل: React, TypeScript, Python, AI/ML, Cybersecurity, Cloud Computing, وأكثر!',
      'يمكنك رؤية المهارات التقنية المستخدمة في كل مشروع في قسم المشاريع.'
    ],
    default: [
      'عذراً، لم أفهم سؤالك. هل يمكنك إعادة صياغته؟ 🤔',
      'يمكنني مساعدتك في معلومات عن أمريكي، مشاريعه، مهاراته، أو كيفية التواصل معه.',
      'جرب أن تسأل عن: المشاريع، المهارات، التواصل، أو السيرة الذاتية.'
    ]
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('مرحبا') || message.includes('hello') || message.includes('hi')) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)];
    }
    
    if (message.includes('مشروع') || message.includes('project') || message.includes('عمل')) {
      return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)];
    }
    
    if (message.includes('تواصل') || message.includes('contact') || message.includes('linkedin') || message.includes('github')) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    }
    
    if (message.includes('مهارة') || message.includes('skill') || message.includes('تقنية') || message.includes('technology')) {
      return botResponses.skills[Math.floor(Math.random() * botResponses.skills.length)];
    }
    
    if (message.includes('أمريكي') || message.includes('amrikyy') || message.includes('سيرة') || message.includes('cv')) {
      return botResponses.portfolio[Math.floor(Math.random() * botResponses.portfolio.length)];
    }
    
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-neon-green text-dark-bg p-4 rounded-full shadow-lg hover:bg-neon-green/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-dark-bg border border-neon-green/20 rounded-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-neon-green/20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-dark-bg" />
                </div>
                <div>
                  <h3 className="text-tech-white font-semibold">أمريكي AI</h3>
                  <p className="text-xs text-medium-gray">متصل الآن</p>
                </div>
              </div>
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-neon-green text-dark-bg'
                        : 'bg-medium-gray/20 text-tech-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('ar-EG', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-medium-gray/20 text-tech-white p-3 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">يكتب...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neon-green/20">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 bg-medium-gray/20 text-tech-white placeholder-medium-gray px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green/50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-neon-green text-dark-bg p-2 rounded-lg hover:bg-neon-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 