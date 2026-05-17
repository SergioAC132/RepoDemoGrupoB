import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      onLogin(data.username);
    } catch {
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '380px', margin: '80px auto', padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>Entrar al chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tu nombre de usuario"
          maxLength={30}
          autoFocus
          style={{ width: '100%', padding: '0.6rem', marginBottom: '0.8rem', boxSizing: 'border-box', fontSize: '1rem' }}
        />
        {error && <p style={{ color: 'red', marginBottom: '0.8rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading || !username.trim()}
          style={{ padding: '0.6rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
