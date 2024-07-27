import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/styles.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartCoding = () => {
    navigate('/workspace');
  };

  return (
    <div className="bg-image h-75 p-5 text-center flex flex-column flex-center">
      <h1 className="text-neon">Welcome to Pypad</h1>
      <p className="text-light p-3">Your one-stop platform for all your coding needs. Dive into the world of coding with our interactive code editor.</p>
      <div className="m-5">
        <button className="bg-neon text-dark p-3 rounded shadow-neon fb-500 ts-larger" onClick={handleStartCoding}>
          Start Coding
        </button>
      </div>
      <div className="flex flex-space-around w-full">
        <div className="bg-dark text-light p-3 rounded shadow m-2">
          <h2 className="text-neon">Collaborate</h2>
          <p className="text-light">Work with other developers and share your projects.</p>
        </div>
        <div className="bg-dark text-light p-3 rounded shadow m-2">
          <h2 className="text-neon">Learn</h2>
          <p className="text-light">Access a wide range of tutorials and improve your coding skills.</p>
        </div>
        <div className="bg-dark text-light p-3 rounded shadow m-2">
          <h2 className="text-neon">Build</h2>
          <p className="text-light">Create amazing python scritps with our powerful code editor.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
