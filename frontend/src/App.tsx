import { useState, useEffect } from 'react';
import './App.css';

interface Message {
  id: number;
  content: string;
  created_at: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  // 1. Add a new state to track the loading status.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/messages')
      .then(response => response.json())
      .then(data => {
        setMessages(data);
        // 2. Set loading to false AFTER data is fetched.
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // 3. Also set loading to false if an error occurs.
        setIsLoading(false);
      });
  }, []);

  // 4. Create a function for cleaner rendering logic.
  const renderContent = () => {
    if (isLoading) {
      return <p>Loading messages...</p>;
    }
    
    if (messages.length === 0) {
      return <p>No messages found. Be the first to post!</p>;
    }

    return (
      <ul>
        {messages.map(message => (
          <li key={message.id}>
            <p>{message.content}</p>
            <small>Posted on: {new Date(message.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Messages from the Database</h1>
        
        {/* 5. Call the render function. */}
        {renderContent()}

      </header>
    </div>
  );
}

export default App;