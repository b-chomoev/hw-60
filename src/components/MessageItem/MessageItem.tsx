import * as React from 'react';
import { Message } from '../../types';

interface Props {
  message: Message;
}

const MessageItem: React.FC<Props> = ({message}) => {
  return (
    <div className='card col-5 m-2'>
      <div key={message.id} className="card-header">
        <div className="card-body">
          <strong className='card-title'>{message.author}:</strong> {message.message}
          <div className="card-text">{new Date(message.datetime).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;