
import React, { useState } from 'react';
import { Book } from '../types';
import { downloadBook } from '../services/api';
import { toast } from 'sonner';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    if (!book.downloadPath) {
      toast.error('No download path available');
      return;
    }
    
    setIsDownloading(true);
    try {
      await downloadBook(book.downloadPath);
      toast.success(`Downloaded "${book.title}" successfully`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download the book');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">{book.author}</p>
        <p className="text-sm text-gray-500 mb-4">{book.description}</p>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
