import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Conectamos al puerto del servidor Express
const socket = io('http://localhost:4000');

export const useSocket = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Escuchar historial inicial
    socket.on('history', (history) => {
      setMessages(history);
    });

    // Escuchar nuevos mensajes
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('history');
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = (user, text) => {
    socket.emit('send_message', { user, text });
  };

  return { messages, sendMessage };
};