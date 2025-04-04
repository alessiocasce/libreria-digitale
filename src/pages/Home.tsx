
import React from 'react';
import BookSearch from '../components/BookSearch';
import BookList from '../components/BookList';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Download Service</h1>
      <BookSearch />
      <BookList />
    </div>
  );
};

export default Home;
