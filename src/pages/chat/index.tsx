import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { MdRender } from '../../components';
import './index.less';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  reasonContent?: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) {
      message.warning('Please enter your message');
      return;
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // 调用DeepSeek API
      const res = await fetch('/api/chat/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer sk-efzvvaxnleliyrnmgprlxlzxiraezpnmgatimeppyxptfayw`
        },
        body: JSON.stringify({
          model: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B',
          messages: [
            // ...messages,
            userMessage
          ],
          temperature: 0.5,
          stream: true,
        })
      });

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader available');
      const decoder = new TextDecoder();

      let reasonResult = '', result = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line) continue;
          
          const data = JSON.parse(line);
          switch (data.type) {
            case 'start':
              console.log('流开始');
              break;
            case 'reasoning':
              // console.log('推理过程:', data.content);
              reasonResult += data.content;
              setMessages((prev: any) => {
                const lastMessageObj = prev[prev.length - 1];
                if (lastMessageObj.role === 'assistant') {
                  return [
                    ...prev.slice(0, -1),
                    { ...lastMessageObj, reasonContent: reasonResult },
                  ];
                } else {
                  return [
                    ...prev,
                    { reasonContent: reasonResult, role: 'assistant' }
                  ]
                }
              });
              break;
            case 'content':
              // console.log('最终内容:', data.content);
              result += data.content;
              setMessages((prev: any) => {
                const lastMessageObj = prev[prev.length - 1];
                if (lastMessageObj.role === 'assistant') {
                  return [
                    ...prev.slice(0, -1),
                    { ...lastMessageObj, content: result },
                  ];
                } else {
                  return [
                    ...prev,
                    { content: result, role: 'assistant' }
                  ]
                }
              });
              break;
            case 'end':
              console.log('流结束');
              break;
          }
        }

      }
    } catch (error) {
      message.error('Failed to get response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-item ${msg.role === 'user' ? 'user' : 'assistant'}`}
          >
            <div className="message-content">
              <div style={{fontSize: '0.9em', color: '#999'}}>{msg.reasonContent}</div>
              <MdRender content={msg.content} />
              {/* <ReactMarkdown>{msg.content}</ReactMarkdown> */}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <Input.TextArea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
