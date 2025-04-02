
import React from "react";
import { Book } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const downloadUrl = `https://1lib.sk${book.download}`;
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pt-[140%] bg-slate-200">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x300?text=No+Cover";
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <p className="text-slate-500 text-sm text-center p-4">No cover available</p>
          </div>
        )}
      </div>
      <CardContent className="flex-grow flex flex-col p-4">
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-slate-600 text-sm mb-2 italic line-clamp-1">
          {book.author}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {book.year && (
            <span className="text-xs bg-slate-100 px-2 py-1 rounded">
              {book.year}
            </span>
          )}
          {book.extension && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {book.extension.toUpperCase()}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          className="mt-3 w-full"
          onClick={() => window.open(downloadUrl, "_blank")}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
