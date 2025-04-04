
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import { Book } from '../types';
import { getBooks } from '../services/api';
import { toast } from 'sonner';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading books...</div>;
  }

  if (books.length === 0) {
    return <div className="text-center py-10">No books found. Try searching for some!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
