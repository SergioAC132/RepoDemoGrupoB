import { useEffect, useRef, useState } from "react";
import "./Chat.css";

export default function Chat() {
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "history") {
        setMessages(data.payload);
      }

      if (data.type === "message") {
        setMessages((prev) => [...prev, data.payload]);
      }
    };

    return () => ws.current.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinChat = () => {
    ws.current.send(JSON.stringify({
      type: "join",
      username,
    }));
    setJoined(true);
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    ws.current.send(JSON.stringify({
      type: "message",
      text,
    }));

    setText("");
  };

  if (!joined) {
    return (
      <div className="chat-login">
        <h2>💬 Chat en tiempo real</h2>
        <input
          placeholder="Tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={joinChat}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <header className="chat-header">👋 {username}</header>

      <div className="chat-messages">
        {messages.map((msg, i) => {
          const isMe = msg.user === username;

          return (
            <div key={i} className={`chat-message ${isMe ? "me" : ""}`}>
              {!isMe && <span className="chat-user">{msg.user}</span>}
              <div className="chat-bubble">{msg.text}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}