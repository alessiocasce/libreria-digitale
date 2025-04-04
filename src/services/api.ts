
import { Book } from '../types';
import { toast } from 'sonner';

const API_URL = 'http://localhost:3000';

// Common options for fetch requests
const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors' as RequestMode,
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  const response = await fetch(`${API_URL}/search`, {
    ...fetchOptions,
    method: 'POST',
    body: JSON.stringify({ bookName: query }),
  });
  
  if (!response.ok) {
    throw new Error(`Search failed with status: ${response.status}`);
  }
  
  return response.json();
};

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_URL}/books`, {
      ...fetchOptions,
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch books with status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    // Return empty array on error to prevent app from crashing
    return [];
  }
};

export const downloadBook = async (downloadPath: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/download`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify({ downloadPath }),
    });
    
    if (!response.ok) {
      throw new Error(`Download failed with status: ${response.status}`);
    }
    
    // Get the filename from the Content-Disposition header or create a default one
    const contentDisposition = response.headers.get('Content-Disposition');
    let filename = 'downloaded-book.pdf';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
      }
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading book:', error);
    throw error;
  }
};
