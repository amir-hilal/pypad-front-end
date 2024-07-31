import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/styles.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleStartCoding = () => {
    navigate('/workspace');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 10,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="home-page bg-image h-75 p-5 text-center flex flex-column flex-center">
      <motion.h1
        className="text-neon"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 10 }}
      >
        Welcome to Pypad
      </motion.h1>
      <motion.p
        className="text-light p-3"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 10, delay: 0.2 }}
      >
        Your one-stop platform for all your coding needs. Dive into the world of coding with our interactive code editor.
      </motion.p>
      <motion.div
        className="m-5"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 50, damping: 10, delay: 0.4 }}
      >
        <button className="bg-neon text-dark p-3 rounded shadow-neon fb-500 ts-larger rounded" onClick={handleStartCoding}>
          Start Coding
        </button>
      </motion.div>
      <motion.div
        className="flex flex-space-around w-full features"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="bg-dark text-light p-3 rounded shadow m-2 rounded feature" variants={itemVariants}>
          <h2 className="text-neon">Collaborate</h2>
          <p className="text-light">Work with other developers and share your projects.</p>
        </motion.div>
        <motion.div className="bg-dark text-light p-3 rounded shadow m-2 rounded feature" variants={itemVariants}>
          <h2 className="text-neon">Learn</h2>
          <p className="text-light">Access a wide range of tutorials and improve your coding skills.</p>
        </motion.div>
        <motion.div className="bg-dark text-light p-3 rounded shadow m-2 rounded feature" variants={itemVariants}>
          <h2 className="text-neon">Build</h2>
          <p className="text-light">Create amazing Python scripts with our powerful code editor.</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomePage;
