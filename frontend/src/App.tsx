import "./App.css";
import BuyBookPage from "./pages/BuyBookPage";
import BooksPage from "./pages/BooksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminBooksPage from "./pages/AdminBooksPage";
function App() {
  //Making global functions

  //*************FOR THE TA***************
  // NEW BOOTSTRAP REQUIREMENT
  // 1. Used container-fluid for better organization and flexibility
  // 2. Learned how to centralize rows using mx-auto
  // 3. Customized button sizes in BuyBookPage and CartPage using w-*

  return (
    <div className="main-content">
      {/* ROUTING */}
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route
              path="/buyBook/:title/:bookID/:price"
              element={<BuyBookPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
            <Route path="*" element={<h1>404 Page Not Found</h1>} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
