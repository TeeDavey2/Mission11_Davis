import { useNavigate, useParams } from "react-router-dom";
import WelcomeHeader from "../components/WelcomeHeader";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function BuyBookPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  // ADDING TO CART FUNCTION
  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: String(title) || "No Book Found",
      price: Number(price),
      quantity,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <WelcomeHeader />
      <div className="container-fluid">
        <h2>Add {title} to Cart</h2>
      </div>

      {/* USING BOOTSTRAP GRID */}
      <div className="row align-items-center">
        {/* INPUT FOR QUANTITY */}
        <div className="col-md-6 col-lg-6">
          <input
            className="form-control"
            type="number"
            placeholder="Qty"
            min={1}
            value={quantity}
            onChange={(x) => setQuantity(Number(x.target.value))}
          />
        </div>
        {/* BUTTON TO ADD TO CART */}
        <div className="col-md-6 col-lg-6">
          <button className="btn btn-success w-75" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* CONTINUE SHOPPING BUTTON */}
      <div className="container-fluid pt-4">
        <button className="btn btn-primary w-50" onClick={() => navigate(-1)}>
          Continue Shopping
        </button>
      </div>
    </>
  );
}

export default BuyBookPage;
