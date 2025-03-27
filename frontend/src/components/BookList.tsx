import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortByTitle, setSortByTitle] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSortToggle = () => {
    setSortByTitle(!sortByTitle);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `categories=${encodeURIComponent(cat)}`)
        .join("&");

      // Define the data source
      const dataSource = `https://localhost:5001/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}&sortByTitle=${sortByTitle}`;

      const response = await fetch(dataSource, {
        credentials: "include",
      });

      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortByTitle, totalItems, selectedCategories]);

  return (
    <div className="container my-4">
      {/* Sort Button */}
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary" onClick={handleSortToggle}>
          {sortByTitle ? "Unsort" : "Sort by Title"}
        </button>
      </div>

      {/* Book Cards */}
      <div className="row row-cols-md-1 row-cols-lg-2 row-cols-sm-1">
        {books.map((b) => (
          <div className="col p-2" key={b.bookID}>
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
              <button
                className="btn btn-success"
                onClick={() => {
                  navigate(`/buyBook/${b.title}/${b.bookID}/${b.price}`);
                }}
              >
                Add to Cart
              </button>
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
