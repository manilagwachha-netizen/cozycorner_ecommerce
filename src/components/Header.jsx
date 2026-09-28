import React from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const isHomeActive = location.pathname === "/";
  const isShopActive = location.pathname === "/shop";

  const goToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const goToShop = (e) => {
    e.preventDefault();
    navigate("/shop");
  };

  const goToCategories = (e) => {
    e.preventDefault();
    navigate("/", { state: { scrollTo: "shop-by-category" } });
  };
  return (
    <>
      <header className="px-4 sticky-top" style={{ background: "#5c2a4a", zIndex:1030 }}>
        <nav className="navbar navbar-expand-lg container">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img
                src="logo.png"
                alt="Logo"
                width={"50px"}
                className="rounded-circle shadow"
              />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse fw-semibold"
              id="navbarScroll"
            >
              <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <a
                    className={`nav-link text-white fw-semibold ${isHomeActive ? "active" : ""}`}
                    style={isHomeActive ? { textDecoration: "underline" } : {}}
                    aria-current="page"
                    href="/"
                    onClick={goToHome}
                  >
                    Home
                  </a>
                </li>

                <li className="nav-item">
                  <a                     className={`nav-link text-white fw-semibold ${isShopActive ? "active" : ""}`}
                    style={isShopActive ? { textDecoration: "underline" } : {}}
                    href="/shop"
                    onClick={goToShop}>
                    Shop
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className={`nav-link text-white fw-semibold ${isShopActive ? "active" : ""}`}
                    style={isShopActive ? { textDecoration: "underline" } : {}}
                    href="/"
                    onClick={goToCategories}
                  >
                    Categories
                  </a>
                </li>
              </ul>

              <div className="navbar-nav d-flex gap-3">
                <div>
                  <a
                    href="/cart"
                    className="btn btn-light btn-sm ms-2 bg-danger-subtle"
                  >
                    <ShoppingCart size={22} />
                  </a>
                </div>

                <div>
                  <a
                    href="/wishlist"
                    className="btn btn-light btn-sm ms-2 bg-danger-subtle"
                  >
                    <Heart size={22}></Heart>
                  </a>
                </div>

                <div>
                  <a
                    href="/profile"
                    className="btn btn-light btn-sm ms-2 bg-danger-subtle"
                  >
                    <User size={22}></User>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
