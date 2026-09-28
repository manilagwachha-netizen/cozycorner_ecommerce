import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import axios from "axios";

const TINTS = ["#F3D9D2", "#EADFC9", "#DCD2EA", "#F0CBA8", "#D9E2CE"];
const tintFor = (id) => TINTS[id % TINTS.length];

const rupee = (n) => `Rs. ${Number(n).toFixed(2)}`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(stored);
  }, []);

  const persist = (items) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item,
    );
    persist(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    persist(updated);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Removed from cart",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const unit = item.price * (1 - (item.discount || 0) / 100);
    return sum + unit * item.quantity;
  }, 0);

  useEffect(() => {
    axios
      .get("/cozycorner_home_decor.json")
      .then((result) => {
        console.log(result.data);
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.log("Something Went Wrong in axios.", error);
      });
  }, []);

  return (
    <div
      className="position-relative overflow-hidden px-3 px-md-5 py-5 "
      style={{
          background: "linear-gradient(135deg, #fff7ed, #fce7f3, #f5f3ff)",
        minHeight: "80vh",
      }}
    >
      <div className="position-relative container" style={{ zIndex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span
              className="badge rounded-pill fw-semibold mb-2 px-3 py-2"
              style={{
                background: "#fbeee4",
                color: "#8a5a3f",
                letterSpacing: ".02em",
              }}
            >
              🛍 Your bag
            </span>
            <h1
              className="fw-bold mb-0"
              style={{
                color: "#5c2a4a",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
              }}
            >
              Your Cozy Cart ♡
            </h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center text-center py-5 my-5">
            <div className="fs-1 mb-3">☁️</div>
            <h4
              className="fw-bold mb-2"
              style={{
                color: "#3d2f28",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              Your cart is feeling a little empty
            </h4>
            <p className="text-secondary mb-4">Let's find something cozy.</p>
            <button
              className="btn rounded-pill px-4 py-2 fw-semibold"
              style={{ background: "#5c2a4a", color: "#fff", border: "none" }}
              onClick={() => navigate("/shop")}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div
                className="rounded-4 overflow-hidden"
                style={{
                  background: "#fff",
                  boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)",
                }}
              >
                <table className="table align-middle mb-0">
                  <thead>
                    <tr style={{ background: "#fdf3ea" }}>
                      <th
                        className="ps-4 py-3 small text-uppercase"
                        style={{ color: "#8a5a3f", letterSpacing: ".04em" }}
                      >
                        S.No
                      </th>
                      <th
                        className="py-3 small text-uppercase"
                        style={{ color: "#8a5a3f", letterSpacing: ".04em" }}
                      >
                        Product
                      </th>
                      <th
                        className="py-3 small text-uppercase"
                        style={{ color: "#8a5a3f", letterSpacing: ".04em" }}
                      >
                        Quantity
                      </th>
                      <th
                        className="py-3 small text-uppercase"
                        style={{ color: "#8a5a3f", letterSpacing: ".04em" }}
                      >
                        Price
                      </th>
                      <th
                        className="pe-4 py-3 small text-uppercase text-end"
                        style={{ color: "#8a5a3f", letterSpacing: ".04em" }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => {
                      const unitPrice =
                        item.price * (1 - (item.discount || 0) / 100);
                      return (
                        <tr key={item.id} style={{ borderColor: "#f2e3d5" }}>
                          <td
                            className="ps-4 fw-semibold"
                            style={{ color: "#5c2a4a" }}
                          >
                            {index + 1}
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="rounded-3 d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0"
                                style={{
                                  width: 56,
                                  height: 56,
                                  background: tintFor(item.id),
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-100 h-100"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <span
                                className="fw-semibold"
                                style={{ color: "#3d2f28" }}
                              >
                                {item.title}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div
                              className="d-inline-flex align-items-center rounded-pill px-1"
                              style={{ border: "1.5px solid #eee0d6" }}
                            >
                              <button
                                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: 28,
                                  height: 28,
                                  color: "#5c2a4a",
                                }}
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus size={13} />
                              </button>
                              <span
                                className="fw-semibold px-2"
                                style={{ color: "#3d2f28" }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: 28,
                                  height: 28,
                                  color: "#5c2a4a",
                                }}
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className="fw-bold"
                                style={{
                                  color: "#5c2a4a",
                                  fontFamily:
                                    "Georgia, 'Times New Roman', serif",
                                }}
                              >
                                {rupee(unitPrice)}
                              </span>
                              {item.discount > 0 && (
                                <span
                                  className="badge rounded-pill small fw-semibold"
                                  style={{
                                    background: "#f3d9d2",
                                    color: "#8a5a3f",
                                  }}
                                >
                                  {item.discount.toFixed(2)}% off
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="pe-4 text-end">
                            <button
                              className="btn btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 fw-semibold"
                              style={{
                                background: "#fdeceb",
                                color: "#b3413a",
                                border: "none",
                              }}
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button
                className="btn rounded-pill px-4 py-2 fw-semibold mt-4"
                style={{
                  border: "1.5px solid #e7d9cf",
                  color: "#5c2a4a",
                  background: "#fff",
                }}
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
            </div>

            <div className="col-lg-4">
              <div
                className="p-4 rounded-4"
                style={{
                  background: "#fdf3ea",
                  position: "sticky",
                  top: 24,
                  border: "1px solid #f2e3d5",
                }}
              >
                <h6
                  className="fw-bold mb-3 text-uppercase small"
                  style={{ color: "#8a5a3f", letterSpacing: ".05em" }}
                >
                  Cart Summary
                </h6>
                <hr style={{ borderColor: "#f0dfcf" }} />
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Total Items</span>
                  <span className="fw-semibold" style={{ color: "#3d2f28" }}>
                    {totalItems} unit{totalItems !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Total Price</span>
                  <span
                    className="fw-bold"
                    style={{
                      color: "#5c2a4a",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "1.2rem",
                    }}
                  >
                    {rupee(totalPrice)}
                  </span>
                </div>
                <button
                  className="btn w-100 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 py-2"
                  style={{
                    background: "#5c2a4a",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={() =>
                    Swal.fire({
                      title: "This is a demo checkout",
                      icon: "info",
                      text: "No real payment will be processed.",
                      timer: 2200,
                    })
                  }
                >
                  <ShoppingBag size={16} /> Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
