import { useNavigate, useParams } from "react-router-dom";
import WelcomeHeader from "../components/WelcomeHeader";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function BuyBookPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [bookQuantity, setBookQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      title: String(title) || "No Book Found",
      bookID: Number(bookID),
      price: Number(price),
      quantity: bookQuantity,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <div className="container">
        <WelcomeHeader />
        <div className="container">
          <h2>Add {title} to Cart</h2>
        </div>
        <div className="container pt-4">
          <input
            className="form-control"
            type="number"
            placeholder="Qty"
            min={0}
            value={bookQuantity}
            onChange={(x) => setBookQuantity(Number(x.target.value))}
          />
        </div>
        <div className="container pt-4">
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        <div className="container pt-4">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default BuyBookPage;
