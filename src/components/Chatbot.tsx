import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! أنا أمريكي، مطور ذكاء اصطناعي وأمن سيبراني. سعيد بلقائك! كيف يمكنني مساعدتك اليوم؟ 👋",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      "مرحباً! أنا أمريكي، مطور ذكاء اصطناعي وأمن سيبراني. كيف حالك؟ 😊",
      "أهلاً وسهلاً! أنا أمريكي، سعيد بلقائك. كيف يمكنني مساعدتك اليوم؟",
      "مرحباً! أنا أمريكي، متخصص في الذكاء الاصطناعي. كيف يمكنني خدمتك؟",
    ],

    portfolio: [
      "أنا أمريكي، مطور مصري-أمريكي متخصص في الذكاء الاصطناعي والأمن السيبراني. أعمل حالياً في OpenAI ولي خبرة في Intel و L'Oréal. أدرس هندسة الأمن السيبراني في Kennesaw State University. يمكنك استكشاف مشاريعي في قسم المشاريع! 🚀",
      "أنا أمريكي، عمري 26 سنة وأعيش في القاهرة. متخصص في حلول الذكاء الاصطناعي والأمن السيبراني. لدي خبرة في شركات عالمية كبيرة وأعمل على مشاريع مبتكرة. يمكنك تحميل سيرتي الذاتية من الصفحة الرئيسية!",
      "أنا أمريكي، مطور شغوف بالتقنيات الحديثة. أعمل على مشاريع متقدمة في الذكاء الاصطناعي وأحل مشاكل معقدة في الأمن السيبراني. استكشف مشاريعي لترى ما أعمل عليه حالياً!",
    ],

    contact: [
      "يمكنك التواصل معي عبر:\n• LinkedIn: linkedin.com/in/amrikyy\n• GitHub: github.com/Moeabdelaziz007\n• Email: [email protected]\n\nأحب التعاون في المشاريع المبتكرة! 🤝",
      "أنا متاح للتواصل عبر LinkedIn و GitHub. إذا كنت مهتماً بالتعاون في مشاريع الذكاء الاصطناعي أو الأمن السيبراني، فلا تتردد في التواصل معي!",
      "أحب التعرف على مطورين ومهندسين موهوبين! يمكنك التواصل معي عبر LinkedIn للتعاون المهني، أو GitHub لمراجعة مشاريعي المفتوحة المصدر.",
    ],

    projects: [
      "أعمل حالياً على مشاريع متقدمة في الذكاء الاصطناعي والأمن السيبراني. كل مشروع يمثل تحدياً جديداً وأتعلم منه الكثير. استكشف قسم المشاريع لترى أحدث أعمالي! 🔥",
      "مشاريعي تشمل تطبيقات الذكاء الاصطناعي، حلول الأمن السيبراني، وتطوير الويب المتقدم. كل مشروع يوضح مهارات مختلفة وأساليب حل المشاكل. أحب العمل على مشاريع لها تأثير حقيقي!",
      "أعمل على مشاريع متنوعة - من تطبيقات الذكاء الاصطناعي إلى حلول الأمن السيبراني. يمكنك رؤية المشاريع المميزة في الصفحة الرئيسية، أو استكشاف جميع مشاريعي في قسم المشاريع.",
    ],

    skills: [
      "أنا متخصص في:\n• الذكاء الاصطناعي والتعلم الآلي\n• الأمن السيبراني وحماية البيانات\n• تطوير الويب (React, TypeScript)\n• Python, JavaScript, C++\n• حلول الحوسبة السحابية\n\nأحب تعلم تقنيات جديدة باستمرار! 💻",
      "مهاراتي التقنية تشمل: React, TypeScript, Python, AI/ML, Cybersecurity, Cloud Computing. أحب العمل مع أحدث التقنيات وحل المشاكل المعقدة!",
      "أتعلم وأطور مهاراتي باستمرار. يمكنك رؤية التقنيات التي أستخدمها في كل مشروع في قسم المشاريع. أحب تجربة تقنيات جديدة وتطبيقها في مشاريعي!",
    ],

    experience: [
      "لدي خبرة في شركات عالمية كبيرة:\n• OpenAI - أعمل على تطوير حلول الذكاء الاصطناعي\n• Intel - خبرة في تطوير المعالجات والبرمجيات\n• L'Oréal - تطوير حلول تقنية مبتكرة\n\nأحب العمل في بيئات متنوعة ومتحدية! 🏢",
      "خبرتي تشمل العمل في شركات تقنية عالمية. كل تجربة علمتني مهارات جديدة وأعطتني منظوراً مختلفاً لحل المشاكل التقنية.",
      "أعمل حالياً في OpenAI وأدرس هندسة الأمن السيبراني. خبرتي في Intel و L'Oréal علمتني أهمية الابتكار والتعلم المستمر.",
    ],

    education: [
      "أدرس حالياً هندسة الأمن السيبراني في Kennesaw State University. أحب الجمع بين الدراسة الأكاديمية والخبرة العملية في الشركات العالمية! 🎓",
      "أتابع دراستي في الأمن السيبراني مع العمل في مجال الذكاء الاصطناعي. هذا الجمع يعطيني منظوراً شاملاً للتحديات التقنية الحديثة.",
      "أدرس في Kennesaw State University وأعمل في نفس الوقت. أحب تطبيق ما أتعلمه في الجامعة على مشاريعي العملية!",
    ],

    goals: [
      "هدفي تطوير حلول ذكاء اصطناعي آمنة ومبتكرة. أريد المساهمة في مستقبل تقني أفضل وأكثر أماناً! 🌟",
      "أطمح لتطوير تقنيات ذكاء اصطناعي متقدمة مع التركيز على الأمان والخصوصية. أحب العمل على مشاريع لها تأثير إيجابي على المجتمع.",
      "أريد أن أصبح خبيراً في مجال الذكاء الاصطناعي الآمن. أحب التعلم المستمر والمساهمة في تطوير تقنيات المستقبل!",
    ],

    default: [
      "عذراً، لم أفهم سؤالك تماماً. هل يمكنك إعادة صياغته؟ 🤔\n\nيمكنني التحدث عن: مشاريعي، خبراتي، مهاراتي، أو كيفية التواصل معي.",
      "أنا أمريكي، مطور ذكاء اصطناعي وأمن سيبراني. يمكنني مساعدتك في معلومات عني، مشاريعي، أو كيفية التواصل معي.",
      "جرب أن تسأل عن: مشاريعي، خبراتي، مهاراتي، دراستي، أو كيفية التواصل معي. أنا هنا لمساعدتك! 😊",
    ],
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("مرحبا") ||
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("أهلا")
    ) {
      return botResponses.greetings[
        Math.floor(Math.random() * botResponses.greetings.length)
      ];
    }

    if (
      message.includes("مشروع") ||
      message.includes("project") ||
      message.includes("عمل") ||
      message.includes("أعمال")
    ) {
      return botResponses.projects[
        Math.floor(Math.random() * botResponses.projects.length)
      ];
    }

    if (
      message.includes("تواصل") ||
      message.includes("contact") ||
      message.includes("linkedin") ||
      message.includes("github") ||
      message.includes("ايميل")
    ) {
      return botResponses.contact[
        Math.floor(Math.random() * botResponses.contact.length)
      ];
    }

    if (
      message.includes("مهارة") ||
      message.includes("skill") ||
      message.includes("تقنية") ||
      message.includes("technology") ||
      message.includes("برمجة")
    ) {
      return botResponses.skills[
        Math.floor(Math.random() * botResponses.skills.length)
      ];
    }

    if (
      message.includes("أمريكي") ||
      message.includes("amrikyy") ||
      message.includes("سيرة") ||
      message.includes("cv") ||
      message.includes("من أنت")
    ) {
      return botResponses.portfolio[
        Math.floor(Math.random() * botResponses.portfolio.length)
      ];
    }

    if (
      message.includes("خبرة") ||
      message.includes("experience") ||
      message.includes("عملت") ||
      message.includes("شركة")
    ) {
      return botResponses.experience[
        Math.floor(Math.random() * botResponses.experience.length)
      ];
    }

    if (
      message.includes("دراسة") ||
      message.includes("جامعة") ||
      message.includes("education") ||
      message.includes("كوليدج")
    ) {
      return botResponses.education[
        Math.floor(Math.random() * botResponses.education.length)
      ];
    }

    if (
      message.includes("هدف") ||
      message.includes("طموح") ||
      message.includes("goal") ||
      message.includes("مستقبل")
    ) {
      return botResponses.goals[
        Math.floor(Math.random() * botResponses.goals.length)
      ];
    }

    return botResponses.default[
      Math.floor(Math.random() * botResponses.default.length)
    ];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
        data-oid="2s.uxqc"
      >
        <AnimatePresence mode="wait" data-oid="_4fl2u:">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              data-oid="bmjyx_c"
            >
              <X size={24} data-oid=":f6vewd" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              data-oid="at12fa:"
            >
              <MessageCircle size={24} data-oid="qgtt-fs" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence data-oid="skbxtpy">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-dark-bg border border-neon-green/20 rounded-xl shadow-2xl flex flex-col"
            data-oid=":61sl4t"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b border-neon-green/20"
              data-oid="6n_pb1:"
            >
              <div className="flex items-center space-x-2" data-oid="ryld1gl">
                <div
                  className="w-8 h-8 bg-neon-green rounded-full flex items-center justify-center"
                  data-oid="oy05ru0"
                >
                  <Bot size={16} className="text-dark-bg" data-oid="8jp3488" />
                </div>
                <div data-oid="r.fsbln">
                  <h3
                    className="text-tech-white font-semibold"
                    data-oid="7_f2exi"
                  >
                    أمريكي
                  </h3>
                  <p className="text-xs text-medium-gray" data-oid="df_5v59">
                    متصل الآن
                  </p>
                </div>
              </div>
              <div
                className="w-2 h-2 bg-neon-green rounded-full animate-pulse"
                data-oid="wpj:gnj"
              ></div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              data-oid="50_0w_m"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  data-oid="qv5emqq"
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-neon-green text-dark-bg"
                        : "bg-medium-gray/20 text-tech-white"
                    }`}
                    data-oid="ify2kis"
                  >
                    <p
                      className="text-sm whitespace-pre-line"
                      data-oid="8jae4j9"
                    >
                      {message.text}
                    </p>
                    <p className="text-xs opacity-70 mt-1" data-oid="_7_jpw0">
                      {message.timestamp.toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
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
                  data-oid="0cqh7dm"
                >
                  <div
                    className="bg-medium-gray/20 text-tech-white p-3 rounded-lg"
                    data-oid="cis467:"
                  >
                    <div
                      className="flex items-center space-x-1"
                      data-oid="pfq826."
                    >
                      <Loader2
                        size={16}
                        className="animate-spin"
                        data-oid="-phryk2"
                      />

                      <span className="text-sm" data-oid="th:og8u">
                        يكتب...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} data-oid="gh26x1h" />
            </div>

            {/* Input */}
            <div
              className="p-4 border-t border-neon-green/20"
              data-oid="os.meb0"
            >
              <div className="flex space-x-2" data-oid="bh_c:ip">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 bg-medium-gray/20 text-tech-white placeholder-medium-gray px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green/50"
                  data-oid="lbr2u:4"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-neon-green text-dark-bg p-2 rounded-lg hover:bg-neon-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-oid="fu:y9vm"
                >
                  <Send size={16} data-oid="c9v7mwj" />
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
