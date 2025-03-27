import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontSize: "16px",
      }}
      onClick={() => navigate("/cart")}
    >
      🛒{" "}
      <strong>
        ${totalAmount.toFixed(2)}{" "}
        <span style={{ color: "rgba(2, 6, 124, 0.8)" }}>({totalCount})</span>
      </strong>
    </div>
  );
};

export default CartSummary;
