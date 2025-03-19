import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("https://localhost:5001/Book/AllBooks");
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Books</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard">
          <h2>{b.title}</h2>
          <ul>
            <ul>Author: {b.author}</ul>
            <ul>Publisher: {b.publisher}</ul>
            <ul>ISBN: {b.isbn}</ul>
            <ul>Classification: {b.classification}</ul>
            <ul>Category: {b.category}</ul>
            <ul>Page Count: {b.pageCount}</ul>
            <ul>Price: {b.price}</ul>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
