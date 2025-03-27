import "./App.css";
import BuyBookPage from "./pages/BuyBookPage";
import BooksPage from "./pages/BooksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  //Making global functions

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
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
