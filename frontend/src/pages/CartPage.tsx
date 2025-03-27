import { useNavigate } from "react-router-dom";
import WelcomeHeader from "../components/WelcomeHeader";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart } = useCart();
  return (
    <>
      <WelcomeHeader />
      <div>
        <div className="container">
          <h2>Cart</h2>
          <div>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <div>
                <p>You have {cart.length} items in your cart</p>
                {cart.map((item: CartItem) => (
                  <div className="row" key={item.bookID}>
                    <div className="col-6">{item.title}</div>
                    <div className="col-3">{item.quantity}</div>
                    <div className="col-3">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="container">
          <h4>Total:</h4>
        </div>
        <div className="container pt-4">
          <button className="btn btn-success">Checkout</button>
        </div>
        <div className="container pt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/books")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
