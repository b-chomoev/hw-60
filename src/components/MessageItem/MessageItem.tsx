import * as React from 'react';
import { Message } from '../../types';

interface Props {
  message: Message;
}

const MessageItem: React.FC<Props> = ({message}) => {
  return (
    <div>
      <div key={message.id} className="message-item">
        <strong>{message.author}:</strong> {message.message}
        <div className="message-datetime">{new Date(message.datetime).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default MessageItem;