import { useState } from 'react';
import * as React from 'react';

interface Props {
  onSendMessage: (message: string, author: string) => void;
}

const MessageForm: React.FC<Props> = ({onSendMessage}) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message && author) {
      onSendMessage(message, author);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Your name' value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="text" placeholder='Your text' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type='submit' className='btn btn-primary'>Send</button>
    </form>
  );
};

export default MessageForm;