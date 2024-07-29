import React, { useState } from 'react';
import UsersList from '../components/User/UserList';
import '../assets/css/styles.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-light h-75 p-5 text-center">
      <h1 className="text-neon mb-1">Search for other users here</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search users..."
        className="p-2 m-2 w-full rounded"
      />
      <UsersList query={query} />
    </div>
  );
};

export default SearchPage;
