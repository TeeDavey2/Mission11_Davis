import { useNavigate } from "react-router-dom";
import WelcomeHeader from "../components/WelcomeHeader";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <WelcomeHeader />
      <div>
        <div className="container-fluid" style={{ width: "1000px" }}>
          <h2>Cart</h2>
          <div>
            {cart.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              // IF CART ISNT EMPTY
              <div className="container">
                <p>You have {cart.length} items in your cart</p>
                {/* DISPLAYING ITEMS IN CART */}
                {cart.map((item: CartItem) => (
                  <div
                    className="row col-lg-12 p-2 w-75 justify-content-center align-items-center mx-auto"
                    key={item.bookID}
                  >
                    <div className="col-lg-4">{item.title}</div>
                    <div className="col-lg-2">{item.quantity}</div>
                    <div className="col-lg-3">${item.price.toFixed(2)}</div>
                    <div className="col-lg-3">
                      {/* REMOVE FROM CART */}
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => {
                          removeFromCart(item.bookID);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="container-fluid">
          {/* DISPLAYING CART TOTAL */}
          <h4>
            Total: <strong>${totalAmount.toFixed(2)}</strong>
          </h4>
        </div>
        {/* CHECKOUT BUTTON THAT DOESN'T ACTUALLY DO ANYTHING */}
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
