import './App.css';
import React, { useState, useEffect } from 'react';
import ChatBubble from '../ChatBubble/ChatBubble';
function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');

    websocket.onmessage = (event) => {
      const res = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, { text: res.data, isUser: false }]); 
    };

    websocket.onopen = () => {
      console.log('WebSocket Connected');
    };

    websocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');

      if (ws) {
        ws.send(JSON.stringify({ query: input }));
      }
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          rows="3"
          cols="50"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default App;
