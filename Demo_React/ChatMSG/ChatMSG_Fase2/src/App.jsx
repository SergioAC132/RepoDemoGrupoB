import ChatContainer from './Components/ChatContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#282c34', color: 'white' }}>
        <h1>Messenger Lite (No-Persistence)</h1>
      </header>
      <main>
        <ChatContainer />
      </main>
    </div>
  );
}

export default App;