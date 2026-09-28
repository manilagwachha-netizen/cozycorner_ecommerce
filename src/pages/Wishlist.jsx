import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Trash2, ShoppingBag, Heart } from "lucide-react";

const TINTS = ["#F3D9D2", "#EADFC9", "#DCD2EA", "#F0CBA8", "#D9E2CE"];
const tintFor = (id) => TINTS[id % TINTS.length];

const rupee = (n) => `Rs. ${Number(n).toFixed(2)}`;

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistItems(stored);
  }, []);

  const persist = (items) => {
    setWishlistItems(items);
    localStorage.setItem("wishlistItems", JSON.stringify(items));
  };

  const removeItem = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    persist(updated);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Removed from wishlist",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const addToCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Item already exist in cart.",
        draggable: true,
        timer: 2000,
      });
      return;
    }

    const productData = {
      id: item.id,
      title: item.title,
      image: item.image,
      price: item.price,
      quantity: 1,
      discount: item.discount,
    };

    cartItems.push(productData);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    Swal.fire({
      title: "Success!",
      icon: "success",
      text: "Item added to the cart.",
      draggable: true,
      timer: 3000,
    });
  };

  return (
    <div
      className="position-relative overflow-hidden px-3 px-md-5 py-5"
      style={{
          background: "linear-gradient(135deg, #fff7ed, #fce7f3, #f5f3ff)", minHeight: "80vh" }}
    >


      <div className="position-relative container" style={{ zIndex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span
              className="badge rounded-pill fw-semibold mb-2 px-3 py-2"
              style={{ background: "#fbeee4", color: "#8a5a3f", letterSpacing: ".02em" }}
            >
              ♡ Saved items
            </span>
            <h1
              className="fw-bold mb-0"
              style={{ color: "#5c2a4a", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
            >
              Your Wishlist ♡
            </h1>
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center text-center py-5 my-5">
            <Heart size={40} style={{ color: "#8a5a3f" }} className="mb-3" />
            <h4 className="fw-bold mb-2" style={{ color: "#3d2f28", fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Nothing cozy saved yet
            </h4>
            <p className="text-secondary mb-4">Save the little things you love for later.</p>
            <button
              className="btn rounded-pill px-4 py-2 fw-semibold"
              style={{ background: "#5c2a4a", color: "#fff", border: "none" }}
              onClick={() => navigate("/shop")}
            >
              Explore Cozy Finds
            </button>
          </div>
        ) : (
          <div>
            <p className="text-secondary small mb-3">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
            </p>

            <div className="rounded-4 overflow-hidden" style={{ background: "#fff", boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)" }}>
              <table className="table align-middle mb-0">
                <thead>
                  <tr style={{ background: "#fdf3ea" }}>
                    <th className="ps-4 py-3 small text-uppercase" style={{ color: "#8a5a3f", letterSpacing: ".04em" }}>
                      S.No
                    </th>
                    <th className="py-3 small text-uppercase" style={{ color: "#8a5a3f", letterSpacing: ".04em" }}>
                      Product
                    </th>
                    <th className="py-3 small text-uppercase" style={{ color: "#8a5a3f", letterSpacing: ".04em" }}>
                      Price
                    </th>
                    <th className="pe-4 py-3 small text-uppercase text-end" style={{ color: "#8a5a3f", letterSpacing: ".04em" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, index) => {
                    const unitPrice = item.price * (1 - (item.discount || 0) / 100);
                    return (
                      <tr key={item.id} style={{ borderColor: "#f2e3d5" }}>
                        <td className="ps-4 fw-semibold" style={{ color: "#5c2a4a" }}>
                          {index + 1}
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="rounded-3 d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0"
                              style={{ width: 56, height: 56, background: tintFor(item.id) }}
                            >
                              <img src={item.image} alt={item.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                            </div>
                            <span className="fw-semibold" style={{ color: "#3d2f28" }}>
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold" style={{ color: "#5c2a4a", fontFamily: "Georgia, 'Times New Roman', serif" }}>
                              {rupee(unitPrice)}
                            </span>
                            {item.discount > 0 && (
                              <span
                                className="badge rounded-pill small fw-semibold"
                                style={{ background: "#f3d9d2", color: "#8a5a3f" }}
                              >
                                {item.discount.toFixed(2)}% off
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="pe-4 text-end">
                          <div className="d-flex justify-content-end gap-2">
                            <button
                              className="btn btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 fw-semibold"
                              style={{ background: "#5c2a4a", color: "#fff", border: "none" }}
                              onClick={() => addToCart(item)}
                            >
                              <ShoppingBag size={14} /> Add to Cart
                            </button>
                            <button
                              className="btn btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-1 fw-semibold"
                              style={{ background: "#fdeceb", color: "#b3413a", border: "none" }}
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              className="btn rounded-pill px-4 py-2 fw-semibold mt-4"
              style={{ border: "1.5px solid #e7d9cf", color: "#5c2a4a", background: "#fff" }}
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
