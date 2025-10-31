// frontend/src/App.tsx

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Create an empty "state" variable to store the message.
  const [message, setMessage] = useState('');

  //useEffect is a React Hook that runs side effects.
  //Fetching data is a side effect.
  //The empty array [] at the end means this effect runs only ONCE
  // when the component first loads.
  useEffect(() => {
    //Use the browser's built-in `fetch` function to make a request to 
    // the backend API.
    fetch('http://127.0.0.1:5000/')
      .then(response => response.json()) //Parse the JSON response
      .then(data => {
        console.log(data); //Optional: log the data to the console
        setMessage(data.message); //Update the message state variable
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); //Empty dependency array means run once on mount.

  //The component's UI.
  return (
    <div className="App">
      <header className="App-header">
        <h1>Full-Stack Portfolio</h1>
        {"This is my full-stack portfolio showing my skills in typescript, python, and SQL."}
        <p>{message || 'Loading message from backend...'}</p>
      </header>
    </div>
  );
}

export default App