import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Trash2, HelpCircle, Package, BarChart3, ShoppingCart, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface PredefinedQuestion {
  id: string;
  question: string;
  category: 'inventory' | 'sales' | 'reports' | 'general';
  icon: React.ComponentType<any>;
  response: string;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const predefinedQuestions: PredefinedQuestion[] = [
    {
      id: '1',
      question: 'How do I add a new product to inventory?',
      category: 'inventory',
      icon: Package,
      response: 'To add a new product to your inventory:\n\n1. Navigate to Inventory → Products\n2. Click the "Add Product" button\n3. Fill in the product details:\n   - Product name\n   - Price\n   - Stock quantity\n   - Category and Brand\n4. Click "Save" to add the product\n\nThe product will immediately appear in your inventory list and be available for sales transactions.'
    },
    {
      id: '2',
      question: 'How can I check low stock items?',
      category: 'inventory',
      icon: AlertTriangle,
      response: 'You can check low stock items in several ways:\n\n1. **Dashboard**: View the "Low Stock Items" section on your main dashboard\n2. **Inventory Page**: Go to Inventory → Products and look for items highlighted in red or yellow\n3. **Reports**: Check the Reports section for detailed stock analysis\n\nLow stock alerts are automatically generated when items fall below their minimum threshold. You can set custom thresholds for each product.'
    },
    {
      id: '3',
      question: 'How do I process a sale transaction?',
      category: 'sales',
      icon: ShoppingCart,
      response: 'To process a sale transaction:\n\n1. Go to Transactions → Sales\n2. Click "New Sale" button\n3. Add customer information\n4. Select products from your inventory\n5. Enter quantities for each item\n6. Review the total amount\n7. Choose payment method\n8. Complete the transaction\n\nThe system will automatically update your inventory levels and generate a receipt.'
    },
    {
      id: '4',
      question: 'How can I generate sales reports?',
      category: 'reports',
      icon: BarChart3,
      response: 'To generate sales reports:\n\n1. Navigate to the Reports section\n2. Select the type of report you need:\n   - Daily/Weekly/Monthly sales\n   - Product performance\n   - Category analysis\n   - Customer reports\n3. Choose your date range\n4. Apply any filters (product, category, etc.)\n5. Click "Generate Report"\n\nYou can export reports as PDF or Excel files for further analysis or sharing with stakeholders.'
    },
    {
      id: '5',
      question: 'What user roles are available in the system?',
      category: 'general',
      icon: HelpCircle,
      response: 'The system supports three user roles:\n\n**Admin**: Full access to all features including:\n- User management\n- System settings\n- All inventory operations\n- Financial reports\n\n**Assistant**: Limited access including:\n- Inventory management\n- Sales processing\n- Basic reports\n\n**Cashier**: Basic access for:\n- Processing sales\n- Viewing product information\n- Basic transaction reports\n\nRole permissions ensure data security and appropriate access levels for different team members.'
    },
    {
      id: '6',
      question: 'How do I set up low stock alerts?',
      category: 'inventory',
      icon: AlertTriangle,
      response: 'To set up low stock alerts:\n\n1. Go to Inventory → Products\n2. Select a product to edit\n3. Set the "Minimum Stock Threshold"\n4. Enable notifications in Settings\n5. Configure alert preferences:\n   - Email notifications\n   - Dashboard alerts\n   - Alert frequency\n\nThe system will automatically notify you when stock levels fall below the threshold, helping you maintain optimal inventory levels.'
    },
    {
      id: '7',
      question: 'How can I track vendor purchases?',
      category: 'sales',
      icon: ShoppingCart,
      response: 'To track vendor purchases:\n\n1. Go to Partners → Vendors to manage vendor information\n2. Navigate to Transactions → Purchases\n3. Click "New Purchase" to record a purchase\n4. Select the vendor\n5. Add purchased items and quantities\n6. Enter purchase costs\n7. Save the transaction\n\nYou can view purchase history, track spending by vendor, and generate purchase reports for better supplier management.'
    },
    {
      id: '8',
      question: 'How do I use the barcode generator?',
      category: 'general',
      icon: Package,
      response: 'To use the barcode generator:\n\n1. Go to Tools → Barcode Generator\n2. Enter the product ID or barcode value\n3. Select barcode format (CODE128, EAN13, etc.)\n4. Adjust width and height settings\n5. Choose whether to display the value below the barcode\n6. Click "Generate"\n7. Download as PNG/PDF or print directly\n\nYou can generate multiple barcodes at once and customize the appearance to match your labeling needs.'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Hello! I\'m your inventory management assistant. I can help you with questions about managing your stock, processing sales, generating reports, and using the system features. Feel free to ask me anything or select from the common questions below.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuestions(false);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the message matches any predefined questions
      const matchedQuestion = predefinedQuestions.find(q => 
        q.question.toLowerCase().includes(textToSend.toLowerCase()) ||
        textToSend.toLowerCase().includes(q.question.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase())
      );

      let responseText = '';
      
      if (matchedQuestion) {
        responseText = matchedQuestion.response;
      } else {
        // Generate contextual responses based on keywords
        const lowerText = textToSend.toLowerCase();
        
        if (lowerText.includes('product') || lowerText.includes('inventory') || lowerText.includes('stock')) {
          responseText = 'For inventory management, you can:\n\n• Add new products via Inventory → Products\n• Monitor stock levels on your dashboard\n• Set up low stock alerts\n• Track product movements\n\nWould you like specific guidance on any of these features?';
        } else if (lowerText.includes('sale') || lowerText.includes('transaction') || lowerText.includes('customer')) {
          responseText = 'For sales management, you can:\n\n• Process new sales via Transactions → Sales\n• View sales history and analytics\n• Manage customer information\n• Generate sales reports\n\nLet me know if you need help with any specific sales feature!';
        } else if (lowerText.includes('report') || lowerText.includes('analytics') || lowerText.includes('chart')) {
          responseText = 'The Reports section offers comprehensive analytics:\n\n• Sales performance reports\n• Inventory analysis\n• Product category insights\n• Financial summaries\n\nYou can customize date ranges and export reports in various formats. What type of report are you looking for?';
        } else if (lowerText.includes('user') || lowerText.includes('role') || lowerText.includes('permission')) {
          responseText = 'User management features include:\n\n• Three role types: Admin, Assistant, Cashier\n• Role-based permissions\n• User activity tracking\n• Secure authentication\n\nAdmins can manage user accounts in the Settings section. What specific user management task do you need help with?';
        } else if (lowerText.includes('barcode') || lowerText.includes('scan') || lowerText.includes('label')) {
          responseText = 'The barcode system allows you to:\n\n• Generate custom barcodes for products\n• Print barcode labels\n• Scan barcodes for quick product lookup\n• Support multiple barcode formats\n\nAccess the barcode generator in Tools → Barcode Generator. Need help with barcode setup?';
        } else {
          responseText = 'I\'m here to help with your inventory management system! I can assist with:\n\n• Product and inventory management\n• Sales and purchase transactions\n• Reports and analytics\n• User management\n• System features and tools\n\nPlease feel free to ask about any specific feature or select from the common questions above.';
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: PredefinedQuestion) => {
    handleSend(question.question);
  };

  const clearChat = () => {
    setMessages([]);
    setShowQuestions(true);
    // Re-add welcome message
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: 'welcome-new',
        text: 'Hello! I\'m your inventory management assistant. How can I help you today?',
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inventory': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sales': return 'bg-green-100 text-green-800 border-green-200';
      case 'reports': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'general': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">AI Assistant</h2>
            <p className="text-sm text-gray-600">Inventory Management Helper</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-100"
          title="Clear chat"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Predefined Questions */}
        {showQuestions && messages.length <= 1 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              Common Questions
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {predefinedQuestions.map((question) => {
                const IconComponent = question.icon;
                return (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionClick(question)}
                    className={`text-left p-3 rounded-lg border transition-all hover:shadow-md ${getCategoryColor(question.category)} hover:scale-[1.02]`}
                  >
                    <div className="flex items-start space-x-3">
                      <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{question.question}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</div>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3 border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex space-x-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about inventory management..."
            className="flex-1 resize-none rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="self-end px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="h-5 w-5" />
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Ask about inventory management, sales, reports, or system features
        </p>
      </div>
    </div>
  );
};

export default ChatAssistant;