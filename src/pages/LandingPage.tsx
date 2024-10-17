import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');


  useEffect(() => {
    fetch('http://localhost:5432/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Service</h1>
        <h1>{message}</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={() => navigate('/order')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Ordering
        </button>
      </div>
    </div>
  );
}

export default LandingPage;