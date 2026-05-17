import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import LoginForm from './LoginForm';

const ChatContainer = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const { messages, sendMessage } = useSocket();

  useEffect(() => {
    fetch('/api/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.username) setUsername(data.username);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/session', { method: 'DELETE' });
    setUsername(null);
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando...</p>;
  }

  if (!username) {
    return <LoginForm onLogin={setUsername} />;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <p style={{ margin: 0 }}>
          <small>Conectado como: <strong>{username}</strong></small>
        </p>
        <button onClick={handleLogout} style={{ fontSize: '0.75rem', cursor: 'pointer' }}>
          Cerrar sesión
        </button>
      </div>
      <h3 style={{ marginTop: 0 }}>Chat en Vivo (Memoria)</h3>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={(text) => sendMessage(username, text)} />
    </div>
  );
};

export default ChatContainer;
