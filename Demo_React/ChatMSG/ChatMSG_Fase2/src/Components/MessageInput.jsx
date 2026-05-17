import { useState } from 'react';

const MessageInput = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px', display: 'flex' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un mensaje..."
        style={{ flexGrow: 1, padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 15px' }}>Enviar</button>
    </form>
  );
};

export default MessageInput;