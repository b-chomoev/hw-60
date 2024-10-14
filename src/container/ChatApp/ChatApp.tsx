import { useCallback, useEffect, useState } from 'react';
import { Message } from '../../types';
import MessageForm from '../../components/MessageForm/MessageForm';
import MessageItem from '../../components/MessageItem/MessageItem';

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const fetchMessages = useCallback(async () => {
    let url = 'http://146.185.154.90:8000/messages';
    if (lastDatetime) {
      url += `?datetime=${lastDatetime}`;
    }
    const response = await fetch(url);
    if (response.ok) {
      const data: Message[] = await response.json();
      if (data.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...data]);
        setLastDatetime(data[data.length - 1].datetime);
      }
    }
  }, [lastDatetime]);

  useEffect(() => {
    const id = setInterval(fetchMessages, 3000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [fetchMessages,lastDatetime]);

  const sendMessage = async (message: string, author: string) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const data = new URLSearchParams();
    data.set('message', message);
    data.set('author', author);

    await fetch('http://146.185.154.90:8000/messages', {
      method: 'post',
      body: data,
    });

    await fetchMessages();

    const id = setInterval(fetchMessages, 3000);
    setIntervalId(id);
  };

  return (
    <div className="container">
      <h1 className='card-title'>Chat</h1>
      <MessageForm onSendMessage={sendMessage} />
      <div className="messages-list">
        {messages.map((message) => (
          <MessageItem message={message} />
        ))}
      </div>
    </div>
  );
};

export default ChatApp;