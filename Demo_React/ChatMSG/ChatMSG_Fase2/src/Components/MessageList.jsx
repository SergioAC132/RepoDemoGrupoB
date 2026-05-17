const MessageList = ({ messages }) => {
  return (
    <div style={{ height: '300px', border: '1px solid #ddd', overflowY: 'auto', padding: '10px' }}>
      {messages.map((m) => (
        <div key={m.id} style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold', color: '#007bff' }}>{m.user}: </span>
          <span>{m.text}</span>
          <div style={{ fontSize: '10px', color: '#aaa' }}>{m.time}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;