// frontend/src/components/dashboard/AIChatbot.jsx
import React, { useState, useRef, useEffect } from 'react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your mental health assistant. How are you feeling today? You can share anything that's on your mind.", 
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    'sad': {
      text: "I'm sorry you're feeling sad. Remember that it's okay to feel this way. Would you like to try a quick breathing exercise or write about what's bothering you in your journal?",
      suggestions: ['Start breathing exercise', 'Open journal', 'Coping strategies']
    },
    'anxious': {
      text: "When feeling anxious, try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
      suggestions: ['Grounding exercise', 'Breathing technique', 'Distraction methods']
    },
    'happy': {
      text: "That's wonderful! Celebrating positive moments is important. Would you like to record this happy moment in your gratitude journal?",
      suggestions: ['Write in journal', 'Set a reminder', 'Share the joy']
    },
    'stressed': {
      text: "Stress can be overwhelming. Try breaking down what's stressing you into smaller, manageable pieces. Remember to take deep breaths - maybe try the breathing exercise?",
      suggestions: ['Breathing exercise', 'Break it down', 'Self-care tips']
    },
    'tired': {
      text: "It's important to listen to your body when you're tired. Make sure you're getting enough rest and practicing good sleep hygiene.",
      suggestions: ['Sleep tips', 'Energy boosters', 'Rest techniques']
    },
    'angry': {
      text: "Anger is a natural emotion. Try stepping away from the situation, taking deep breaths, or expressing your feelings through journaling.",
      suggestions: ['Cool down exercise', 'Journal it out', 'Anger management']
    },
    'default': {
      text: "Thank you for sharing. How has this been affecting your day? Would you like to explore some coping strategies together?",
      suggestions: ['Coping strategies', 'Mindfulness exercise', 'More support']
    }
  };

  const quickResponses = [
    "I'm feeling anxious today 😰",
    "I've been really stressed 😫",
    "I'm feeling sad and don't know why 😢",
    "I just need someone to talk to 💬",
    "I'm feeling overwhelmed 🌊",
    "I'm actually doing great today! 😊",
    "I'm having trouble sleeping 🛌"
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { 
      text: inputMessage, 
      isBot: false, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let response = botResponses.default;
      const message = inputMessage.toLowerCase();
      
      if (message.includes('sad') || message.includes('down') || message.includes('depressed')) {
        response = botResponses.sad;
      } else if (message.includes('anxious') || message.includes('nervous') || message.includes('worried')) {
        response = botResponses.anxious;
      } else if (message.includes('happy') || message.includes('good') || message.includes('great')) {
        response = botResponses.happy;
      } else if (message.includes('stress') || message.includes('overwhelm')) {
        response = botResponses.stressed;
      } else if (message.includes('tired') || message.includes('exhaust') || message.includes('sleep')) {
        response = botResponses.tired;
      } else if (message.includes('angry') || message.includes('mad') || message.includes('frustrat')) {
        response = botResponses.angry;
      }

      const botMessage = { 
        text: response.text, 
        isBot: true, 
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickResponse = (response) => {
    setInputMessage(response);
  };

  const handleSuggestionClick = (suggestion) => {
    const userMessage = { 
      text: `I'd like to try: ${suggestion}`, 
      isBot: false, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      let response = "That's a great choice! ";
      if (suggestion.includes('breathing') || suggestion.includes('exercise')) {
        response += "Let me guide you to the breathing exercises section where you can practice calming techniques.";
      } else if (suggestion.includes('journal')) {
        response += "The journal is perfect for expressing your thoughts and feelings. Would you like me to open it for you?";
      } else if (suggestion.includes('coping') || suggestion.includes('strategies')) {
        response += "Here are some coping strategies that might help: deep breathing, going for a walk, talking to a friend, or practicing mindfulness.";
      } else {
        response += "I'm here to support you. Remember to be kind to yourself today.";
      }

      const botMessage = { 
        text: response, 
        isBot: true, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { 
        text: "Hello! I'm your mental health assistant. How are you feeling today? You can share anything that's on your mind.", 
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white">🤖</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Mental Health Assistant</h1>
              <p className="text-gray-600 mt-2">Your AI companion for emotional support and wellness guidance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">💬</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Mindful Companion</h2>
                  <p className="text-purple-100 text-sm">Always here to listen</p>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300 font-semibold"
              >
                New Chat
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                    message.isBot
                      ? 'bg-white border border-purple-100 rounded-bl-none'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none'
                  }`}>
                    <div className="flex items-start space-x-3">
                      {message.isBot && (
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">AI</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className={message.isBot ? 'text-gray-800' : 'text-white'}>{message.text}</p>
                        <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                          {formatTime(message.timestamp)}
                        </div>
                        
                        {/* Suggestions */}
                        {message.isBot && message.suggestions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm transition-all duration-300 border border-purple-200 hover:border-purple-300"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {!message.isBot && (
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">You</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-none p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">AI</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Responses */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <p className="text-sm text-gray-600 mb-3 font-semibold">Quick responses:</p>
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(suggestion)}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-700 px-4 py-2 rounded-xl text-sm transition-all duration-300 border border-blue-200 hover:border-blue-300 font-medium shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="How are you feeling today? Share anything on your mind..."
                  className="w-full border border-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  Press Enter to send
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Private & Secure</h3>
            <p className="text-gray-600 text-sm">Your conversations are confidential and encrypted</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💝</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Non-judgmental</h3>
            <p className="text-gray-600 text-sm">Share anything without fear of judgment</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🕒</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">24/7 Available</h3>
            <p className="text-gray-600 text-sm">Always here when you need support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;