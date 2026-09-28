import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    id: "candles",
    label: "Candles",
    emoji: "🕯️",
    desc: "Slow down & unwind.",
    iconBg: "#f6d8d0",
  },
  {
    id: "self-care",
    label: "Self Care",
    emoji: "🌸",
    desc: "Little rituals for you.",
    iconBg: "#ddd0ea",
  },
  {
    id: "mugs",
    label: "Mugs & Drinkware",
    emoji: "☕",
    desc: "Sip something warm.",
    iconBg: "#e8dcc9",
  },
  {
    id: "home-decoration",
    label: "Home Décor",
    emoji: "🏠",
    desc: "Style your corners.",
    iconBg: "#eab98a",
  },
  {
    id: "fragrance",
    label: "Room Fragrance",
    emoji: "🌿",
    desc: "A scent for every mood.",
    iconBg: "#93a97e",
  },
  {
    id: "gifts",
    label: "Gifts",
    emoji: "🎁",
    desc: "For someone (or you).",
    iconBg: "#f3d0ce",
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToCategories = (e) => {
    e.preventDefault();
    navigate("/", { state: { scrollTo: "shop-by-category" } });
  };
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.state]);
  return (
    <>
      <div
        style={{
          background: "linear-gradient(135deg, #fff7ed, #fce7f3, #f5f3ff)",
          color: "#5c2a4a",
        }}
      >
        <div className="py-5  d-md-flex justify-content-evenly align-items-center container">
          <div
            className="col-md-5 rounded-4 p-4"
            // style={{ boxShadow: "0 3px 10px rgba(109, 7, 83, 0.25)" }}
          >
            <div className="col-11.5 ">
              <div
                className="badge d-inline-flex align-items-center gap-2
                         text-danger-emphasis
                         rounded-pill px-3 py-2 mb-2 fs-6"
                style={{ background: "rgb(92, 7, 71,0.5)" }}
              >
                <span className="fs-4">🕯️</span>
                <span className="fw-semibold">New: Autumn cozy edit</span>
              </div>

              <h1 className="display-2 fw-bold lh-1 mb-4">
                Make your
                <br />
                space feel like
                <br />
                home
              </h1>

              <p className="text-secondary lh-lg mb-4">
                Soft-glow candles, warm textures and little rituals for
                <br className="d-none d-md-block" />
                the corners of your day that deserve more comfort.
              </p>

              <div className="d-md-flex gap-3 flex-wrap">
                <a href="/shop">
                <button className="btn bg-warning-subtle text-warning-emphasis rounded-pill px-4 py-3 fw-semibold shadow-sm">
                  ✨ Shop the collection
                </button>
                </a>

                <a href="#" onClick={goToCategories}>
                  <button className="btn bg-danger-subtle text-danger-emphasis rounded-pill px-4 py-3 fw-semibold shadow-sm">
                    🌸 Browse categories
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="banner col-md-5" id="banner">
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="./public/B1.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./public/B2.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="./public/B3.png"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          {/* End of banner */}
        </div>

        {/* Our Story */}
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <span
                className="text-uppercase small fw-semibold d-block mb-2"
                style={{ color: "#8aa079", letterSpacing: ".05em" }}
              >
                Our story
              </span>
              <h2
                className="fw-bold mb-4"
                style={{
                  color: "#3d2f28",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                }}
              >
                Little things that make life feel cozy.
              </h2>
              <p className="text-secondary mb-3" style={{ lineHeight: 1.7 }}>
                CozyCorner started as a small shelf of hand-poured candles and
                grew into a home for the little things that make a space feel
                like yours — soft textures, warm light, and scents that turn a
                room into a memory.
              </p>
              <p className="text-secondary" style={{ lineHeight: 1.7 }}>
                Every piece is chosen slowly, tested at home first, and picked
                for the everyday moments — a slow morning, a quiet evening, a
                little treat on a Tuesday.
              </p>
            </div>
            <div className="col-md-6">
              <div className="position-relative">
                <img
                  src="/story.png"
                  alt="A cozy pastel living room with candles, plants and a little home illustration"
                  className="w-100 rounded-4"
                  style={{
                    height: 320,
                    objectFit: "cover",
                    boxShadow: "0 24px 48px -20px rgba(92,42,74,0.45)",
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                />
                <span
                  className="position-absolute rounded-pill bg-white px-3 py-2 fw-semibold small"
                  style={{
                    bottom: -18,
                    left: 24,
                    color: "#5c2a4a",
                    boxShadow: "0 10px 20px -8px rgba(92,42,74,0.35)",
                  }}
                >
                  Handpicked with love ♡
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Section */}
        <div className="container py-5" id="shop-by-category">
          <span
            className="text-uppercase small fw-semibold d-block mb-2"
            style={{ color: "#8aa079", letterSpacing: ".05em" }}
          >
            Browse
          </span>
          <h2
            className="fw-bold mb-4"
            style={{
              color: "#3d2f28",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Shop by category
          </h2>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-6 g-3">
            {CATEGORIES.map((cat) => (
              <div className="col" key={cat.id}>
                <div
                  className="rounded-4 p-4 text-center h-100"
                  style={{
                    background: "#fdf3ea",
                    border: "1px solid #f2e3d5",
                    cursor: "pointer",
                    transition: "transform .2s ease, box-shadow .2s ease",
                  }}
                  onClick={() =>
                    navigate("/shop", { state: { category: cat.id } })
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 14px 26px -14px rgba(92,42,74,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: 56,
                      height: 56,
                      background: cat.iconBg,
                      fontSize: 24,
                    }}
                  >
                    {cat.emoji}
                  </div>
                  <h6 className="fw-bold mb-1" style={{ color: "#3d2f28" }}>
                    {cat.label}
                  </h6>
                  <p className="small text-secondary mb-0">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
