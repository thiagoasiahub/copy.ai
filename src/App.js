// Create a react component that inputs two textarea messages and one drop down menu with two options first Facebook second Taboola then performs a fetch request to localhost:3000 gets back a response as a data.message and data.message1 and displays that message in a box below

import React, { useState } from 'react';
import './App.css';
import * as ReactBootstrap from 'react-bootstrap';

function App() {
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('https://15.228.100.172/:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, message1, message2 }),
    });
    const data = await response.json();
    setResponse(data.message);
    setLoading(false);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <label>
          <select
            value={message2}
            onChange={(e) => setMessage2(e.target.value)}
          >
            <option value="Artigo">Artigo</option>
            <option value="Blog Post">Blog Post</option>
            <option value="Facebook">Facebook</option>
          </select>
        </label>
        <label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <label>
          <textarea
            value={message1}
            onChange={(e) => setMessage1(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading ? <ReactBootstrap.Spinner animation="border" variant="warning" /> : <p>{response}</p>}
    </div>
  );
}

export default App;