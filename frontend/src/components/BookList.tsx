import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortByTitle, setSortByTitle] = useState<boolean>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSortToggle = () => {
    setSortByTitle(!sortByTitle);
  };

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          selectedCategories,
          sortByTitle
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories, sortByTitle]);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

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
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default BookList;
