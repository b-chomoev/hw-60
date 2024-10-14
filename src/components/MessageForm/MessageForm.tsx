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
    <form onSubmit={handleSubmit} className='col-5'>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Enter your name</label>
        <input type="text" placeholder="Your name" value={author} onChange={(e) => setAuthor(e.target.value)}
               className="form-control"/>
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Enter your message</label>
        <input type="text" placeholder="Your text" value={message} onChange={(e) => setMessage(e.target.value)} className='form-control' />
      </div>
      <button type="submit" className="btn btn-primary">Send</button>
    </form>
  );
};

export default MessageForm;