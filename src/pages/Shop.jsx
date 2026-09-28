import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  Star,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

const CATEGORY_META = {
  "home-decoration": { label: "Home Décor", emoji: "🏠" },
  candles: { label: "Candles", emoji: "🕯️" },
  "self-care": { label: "Self Care", emoji: "🌸" },
  mugs: { label: "Mugs & Drinkware", emoji: "☕" },
  fragrance: { label: "Room Fragrance", emoji: "🌿" },
  gifts: { label: "Gifts", emoji: "🎁" },
};

const getCategoryMeta = (cat = "") =>
  CATEGORY_META[cat] || {
    label: cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    emoji: "✨",
  };

const TINTS = ["#F3D9D2", "#EADFC9", "#DCD2EA", "#F0CBA8", "#D9E2CE"];
const tintFor = (id) => TINTS[id % TINTS.length];

const rupee = (n) => `Rs. ${Number(n).toFixed(2)}`;

const Shop = () => {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(location.state?.category || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceMax, setPriceMax] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [quickView, setQuickView] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    axios
      .get("/cozycorner_home_decor.json")
      .then((result) => {
        const list = result.data.products || [];
        setProducts(list);
        const highest = list.reduce(
          (max, p) => Math.max(max, Math.ceil(p.price)),
          100,
        );
        setPriceMax(highest);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Something went wrong in axios.", err);
        setError(
          "Couldn't load products right now. Please try again in a moment.",
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlist(storedWishlist.map((item) => item.id));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products],
  );
  const highestPrice = useMemo(
    () => products.reduce((max, p) => Math.max(max, Math.ceil(p.price)), 100),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (category !== "all" && p.category !== category) return false;
      if (p.price > priceMax) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && p.stock <= 0) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
        list = [...list].sort(
          (a, b) =>
            new Date(b?.meta?.createdAt || 0) -
            new Date(a?.meta?.createdAt || 0),
        );
        break;
      default:
        break;
    }
    return list;
  }, [products, search, category, sortBy, priceMax, minRating, inStockOnly]);

  const toggleWishlist = (product) => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const exists = wishlistItems.find((item) => item.id === product.id);

    let updated;
    if (exists) {
      updated = wishlistItems.filter((item) => item.id !== product.id);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "Removed from wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      updated = [
        ...wishlistItems,
        {
          id: product.id,
          title: product.title,
          image: product.thumbnail,
          price: product.price,
          discount: product.discountPercentage,
        },
      ];
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to wishlist",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    localStorage.setItem("wishlistItems", JSON.stringify(updated));
    setWishlist(updated.map((item) => item.id));
  };

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItem = cartItems.find((item) => item.id === product.id);

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
      id: product.id,
      title: product.title,
      image: product.thumbnail,
      price: product.price,
      quantity: 1,
      discount: product.discountPercentage,
    };

    cartItems.push(productData);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    setCart((prev) => [...prev, { id: product.id, qty: 1 }]);

    Swal.fire({
      title: "Success!",
      icon: "success",
      text: "Item added to the cart.",
      draggable: true,
      timer: 3000,
    });
  };

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("featured");
    setPriceMax(highestPrice);
    setMinRating(0);
    setInStockOnly(false);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
        <div className="fs-1 mb-3">🕯️</div>
        <div
          className="spinner-border"
          style={{ color: "#c1897e", width: "1.8rem", height: "1.8rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-secondary mt-3">Finding your cozy picks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger rounded-4 border-0 shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="position-relative overflow-hidden px-3 px-md-5 py-5 "
      style={{
        background: "linear-gradient(135deg, #fff7ed, #fce7f3, #f5f3ff)",
      }}
    >

      <div className="position-relative container" style={{ zIndex: 1 }}>
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <span
              className="badge rounded-pill fw-semibold mb-2 px-3 py-2"
              style={{
                background: "#fbeee4",
                color: "#8a5a3f",
                letterSpacing: ".02em",
              }}
            >
              ✨ The full collection
            </span>
            <h1
              className="fw-bold mb-0"
              style={{
                color: "#5c2a4a",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
              }}
            >
              Find Your Cozy.
            </h1>
          </div>
          <div className="d-flex gap-4 text-secondary small">
            <span className="d-flex align-items-center gap-1">
              <Heart size={16} style={{ color: "#c1897e" }} />
              {wishlist.length} saved
            </span>
            <span className="d-flex align-items-center gap-1">
              <ShoppingBag size={16} style={{ color: "#c1897e" }} />
              {cartCount} in cart
            </span>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
          <div
            className="input-group rounded-pill overflow-hidden bg-white"
            style={{
              maxWidth: 360,
              boxShadow: "0 6px 18px -10px rgba(92,42,74,0.25)",
            }}
          >
            <span className="input-group-text bg-white border-0 ps-3">
              <Search size={16} style={{ color: "#c1897e" }} />
            </span>
            <input
              type="text"
              className="form-control border-0 py-2"
              placeholder="Search for something cozy..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
            {search && (
              <button
                className="btn btn-white border-0 pe-3"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className="btn rounded-pill d-lg-none d-inline-flex align-items-center gap-2 px-3"
            style={{ border: "1.5px solid #e7d9cf", color: "#5c2a4a" }}
            onClick={() => setFiltersOpen((o) => !o)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          <select
            className="form-select rounded-pill ms-lg-auto bg-white"
            style={{
              maxWidth: 220,
              boxShadow: "0 6px 18px -10px rgba(92,42,74,0.25)",
              border: "none",
            }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Sort: Price low to high</option>
            <option value="price-desc">Sort: Price high to low</option>
            <option value="name-asc">Sort: Name A–Z</option>
            <option value="rating">Sort: Rating</option>
          </select>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            className="btn btn-sm rounded-pill px-3 fw-semibold"
            style={
              category === "all"
                ? { background: "#c1897e", color: "#fff", border: "none" }
                : {
                    background: "#fff",
                    color: "#5c2a4a",
                    border: "1.5px solid #eee0d6",
                  }
            }
            onClick={() => setCategory("all")}
          >
            All
          </button>
          {categories.map((cat) => {
            const meta = getCategoryMeta(cat);
            const active = category === cat;
            return (
              <button
                key={cat}
                className="btn btn-sm rounded-pill px-3 fw-semibold"
                style={
                  active
                    ? { background: "#c1897e", color: "#fff", border: "none" }
                    : {
                        background: "#fff",
                        color: "#5c2a4a",
                        border: "1.5px solid #eee0d6",
                      }
                }
                onClick={() => setCategory(cat)}
              >
                {meta.emoji} {meta.label}
              </button>
            );
          })}
        </div>

        <div className="row g-4">
          <div
            className={`col-lg-3 ${filtersOpen ? "d-block" : "d-none d-lg-block"}`}
          >
            <div
              className="p-4 rounded-4"
              style={{
                background: "#fdf3ea",
                position: "sticky",
                top: 24,
                border: "1px solid #f2e3d5",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6
                  className="fw-bold mb-0 text-uppercase small"
                  style={{ color: "#8a5a3f", letterSpacing: ".05em" }}
                >
                  Filters
                </h6>
                <button
                  className="btn btn-link btn-sm text-decoration-none p-0"
                  style={{ color: "#c1897e" }}
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>

              <hr style={{ borderColor: "#f0dfcf" }} />

              <label
                className="form-label small fw-semibold"
                style={{ color: "#8a5a3f" }}
              >
                Price, up to {rupee(priceMax)}
              </label>
              <input
                type="range"
                className="form-range mb-4"
                min="10"
                max={highestPrice}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
              />

              <label
                className="form-label small fw-semibold d-block mb-2"
                style={{ color: "#8a5a3f" }}
              >
                Rating
              </label>
              <div className="mb-4 d-flex flex-column gap-2">
                {[0, 4, 4.5].map((r) => (
                  <label
                    key={r}
                    className="d-flex align-items-center gap-2 small rounded-3 px-2 py-1"
                    style={{
                      cursor: "pointer",
                      background: minRating === r ? "#f3d9d2" : "transparent",
                    }}
                  >
                    <input
                      className="form-check-input m-0"
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => setMinRating(r)}
                      autoComplete="off"
                    />
                    {r === 0 ? "Any rating" : `${r}+ stars`}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <p className="text-secondary small mb-3">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-5 my-4">
                <div className="fs-1 mb-2">🔍</div>
                <h5 className="fw-bold" style={{ color: "#5c2a4a" }}>
                  No cozy finds here...
                </h5>
                <p className="text-secondary">
                  Try another search or reset your filters.
                </p>
                <button
                  className="btn btn-sm rounded-pill px-4 py-2 fw-semibold"
                  style={{
                    background: "#c1897e",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4">
                {filtered.map((product) => {
                  const isWished = wishlist.includes(product.id);
                  const outOfStock = product.stock <= 0;
                  const discounted = product.discountPercentage
                    ? product.price * (1 - product.discountPercentage / 100)
                    : product.price;
                  const meta = getCategoryMeta(product.category);
                  const tint = tintFor(product.id);

                  return (
                    <div className="col" key={product.id}>
                      <div
                        className="card h-100 border-0 rounded-4 overflow-hidden position-relative"
                        style={{
                          boxShadow: "0 10px 30px -18px rgba(92,42,74,0.35)",
                          transition: "transform .2s ease, box-shadow .2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-6px)";
                          e.currentTarget.style.boxShadow =
                            "0 18px 34px -16px rgba(92,42,74,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 10px 30px -18px rgba(92,42,74,0.35)";
                        }}
                      >
                        {outOfStock && (
                          <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center fw-semibold small"
                            style={{
                              background: "rgba(255,250,243,0.8)",
                              zIndex: 2,
                            }}
                          >
                            Out of stock
                          </div>
                        )}

                        {product.discountPercentage > 0 && (
                          <span
                            className="position-absolute m-3 px-3 py-1 rounded-pill fw-bold small text-white"
                            style={{
                              background: "#c1897e",
                              zIndex: 1,
                              boxShadow: "0 4px 10px -4px rgba(0,0,0,0.3)",
                            }}
                          >
                            {Math.round(product.discountPercentage)}% off
                          </span>
                        )}

                        <button
                          className="btn position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center rounded-circle bg-white"
                          style={{
                            width: 36,
                            height: 36,
                            zIndex: 1,
                            color: isWished ? "#c1897e" : "#5c2a4a",
                            boxShadow: "0 4px 10px -4px rgba(0,0,0,0.25)",
                          }}
                          onClick={() => toggleWishlist(product)}
                          aria-label="Toggle wishlist"
                        >
                          <Heart
                            size={16}
                            fill={isWished ? "#c1897e" : "none"}
                          />
                        </button>

                        <div style={{ background: tint, padding: 18 }}>
                          <img
                            src={product.thumbnail || product.images?.[0]}
                            className="w-100 rounded-4"
                            style={{ height: 200, objectFit: "cover" }}
                            alt={product.title}
                          />
                        </div>

                        <div className="card-body px-4 py-3 d-flex flex-column">
                          <span
                            className="text-uppercase small fw-semibold"
                            style={{ color: "#8aa079", letterSpacing: ".05em" }}
                          >
                            {meta.emoji} {meta.label}
                          </span>
                          <h6
                            className="fw-bold mt-1 mb-1"
                            style={{ color: "#3d2f28" }}
                            title={product.title}
                          >
                            {product.title.length > 28
                              ? `${product.title.slice(0, 28)}…`
                              : product.title}
                          </h6>

                          <div className="d-flex align-items-center gap-1 small text-secondary mb-3">
                            <Star
                              size={14}
                              fill="#c1897e"
                              style={{ color: "#c1897e" }}
                            />
                            {product.rating.toFixed(1)}
                            <span className="ms-1">
                              ({product.reviews?.length || 0})
                            </span>
                          </div>

                          <div className="mt-auto">
                            <div className="d-flex align-items-baseline gap-2 mb-2">
                              {product.discountPercentage > 0 && (
                                <span className="text-decoration-line-through text-secondary small">
                                  {rupee(product.price)}
                                </span>
                              )}
                              <span
                                className="fw-bold"
                                style={{
                                  color: "#5c2a4a",
                                  fontFamily:
                                    "Georgia, 'Times New Roman', serif",
                                  fontSize: "1.25rem",
                                }}
                              >
                                {rupee(discounted)}
                              </span>
                            </div>

                            <button
                              className="btn w-100 rounded-pill fw-semibold d-flex align-items-center justify-content-center gap-2 py-2"
                              style={{
                                background: "#5c2a4a",
                                color: "#fff",
                                border: "none",
                              }}
                              disabled={outOfStock}
                              onClick={() => addToCart(product)}
                            >
                              <ShoppingBag size={15} /> Add to Cart
                            </button>

                            <button
                              className="btn btn-sm w-100 mt-2 text-decoration-underline"
                              style={{ color: "#8a5a3f" }}
                              data-bs-toggle="modal"
                              data-bs-target="#quickViewModal"
                              onClick={() => setQuickView(product)}
                            >
                              Quick View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="quickViewModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4 border-0 overflow-hidden">
            {quickView && (
              <div className="row g-0">
                <div
                  className="col-md-6"
                  style={{ background: tintFor(quickView.id) }}
                >
                  <img
                    src={quickView.thumbnail || quickView.images?.[0]}
                    alt={quickView.title}
                    className="w-100 h-100"
                    style={{ objectFit: "cover", minHeight: 340 }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="modal-body p-4">
                    <button
                      type="button"
                      className="btn-close float-end"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <span
                      className="text-uppercase small fw-semibold"
                      style={{ color: "#8aa079" }}
                    >
                      {getCategoryMeta(quickView.category).emoji}{" "}
                      {getCategoryMeta(quickView.category).label}
                    </span>
                    <h4 className="fw-bold mt-1" style={{ color: "#3d2f28" }}>
                      {quickView.title}
                    </h4>
                    <div className="d-flex align-items-center gap-1 small text-secondary mb-2">
                      <Star
                        size={14}
                        fill="#c1897e"
                        style={{ color: "#c1897e" }}
                      />
                      {quickView.rating.toFixed(1)} · {quickView.stock} in stock
                    </div>
                    <h5
                      className="fw-bold mb-3"
                      style={{
                        color: "#5c2a4a",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "1.6rem",
                      }}
                    >
                      {rupee(
                        quickView.discountPercentage
                          ? quickView.price *
                              (1 - quickView.discountPercentage / 100)
                          : quickView.price,
                      )}
                    </h5>
                    <p className="text-secondary small">
                      {quickView.description}
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn text-white rounded-pill px-4 fw-semibold"
                        style={{ background: "#5c2a4a" }}
                        data-bs-dismiss="modal"
                        onClick={() => addToCart(quickView)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn rounded-pill px-3"
                        style={{
                          border: "1.5px solid #e7d9cf",
                          color: "#5c2a4a",
                        }}
                        onClick={() => toggleWishlist(quickView)}
                      >
                        {wishlist.includes(quickView.id)
                          ? "♥ Wishlisted"
                          : "♡ Wishlist"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4 px-4 py-2 rounded-pill text-white d-flex align-items-center gap-2"
          style={{
            background: "#5c2a4a",
            zIndex: 1080,
            boxShadow: "0 10px 24px -8px rgba(0,0,0,0.4)",
          }}
        >
          ✨ {toast}
        </div>
      )}
    </div>
  );
};

export default Shop;