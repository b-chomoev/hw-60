import { useCallback, useEffect, useState } from 'react';
import { Message } from '../../types';

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDateTime, setLastDateTime] = useState(null);

  const fetchMessages = useCallback( async () => {
    let url = 'http://146.185.154.90:8000/messages';

    if (lastDateTime) {
      url += `?datetime=${lastDateTime}`;
    }

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        setMessages(prevMessages => [...(prevMessages || []), ...data]);
        setLastDateTime(data[data.length - 1].dateTime);
      }
    }
  }, [lastDateTime]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const url = 'http://146.185.154.90:8000/messages?datetime=' + (lastDateTime || '');
      const response = await fetch(url);
      if (response.ok) {
        const data: Message[] = await response.json();
        if (data.length > 0) {
          fetchMessages().catch((error) => console.error('Ошибка при получении сообщений:', error));
        }
      }
    }, 3000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [lastDateTime, fetchMessages]);

  return (
    <div>
      <h1>Chat</h1>
      <div className='messages-list'>
        {messages.map(message => (
          <div key={message.id} className='message-item'>
            <strong>{message.author}: </strong> {message.message}
            <div className='message-datetime'>{new Date(message.datetime).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;