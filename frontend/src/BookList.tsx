import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortByTitle, setSortByTitle] = useState<boolean>(false);

  const handleSortToggle = () => {
    setSortByTitle(!sortByTitle);
  };

  const dataSource = sortByTitle
    ? `https://localhost:5001/Book/SortTitle?pageSize=${pageSize}&pageNum=${pageNum}`
    : `https://localhost:5001/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`;

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(dataSource);
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortByTitle]);

  return (
    <div className="container my-4">
      {/* Title */}
      <h1 className="text-center mb-4">Books</h1>

      {/* Sort Button */}
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary" onClick={handleSortToggle}>
          {sortByTitle ? "Unsort" : "Sort by Title"}
        </button>
      </div>

      {/* Book Cards */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {books.map((b) => (
          <div className="col" key={b.bookID}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title">{b.title}</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Author:</b> {b.author}
                  </li>
                  <li className="list-group-item">
                    <b>Publisher:</b> {b.publisher}
                  </li>
                  <li className="list-group-item">
                    <b>ISBN:</b> {b.isbn}
                  </li>
                  <li className="list-group-item">
                    <b>Classification:</b> {b.classification}
                  </li>
                  <li className="list-group-item">
                    <b>Category:</b> {b.category}
                  </li>
                  <li className="list-group-item">
                    <b>Page Count:</b> {b.pageCount}
                  </li>
                  <li className="list-group-item">
                    <b>Price:</b> ${b.price}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`btn btn-outline-primary mx-1 ${
              pageNum === index + 1 ? "active" : ""
            }`}
            onClick={() => setPageNum(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Books per page */}
      <div className="d-flex justify-content-center mt-3">
        <label className="me-2">
          Books per page:
          <select
            className="form-select d-inline-block w-auto ms-2"
            value={pageSize}
            onChange={(p) => setPageSize(parseInt(p.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default BookList;
