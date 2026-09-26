import React from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className="px-4" style={{background:"rgba(66, 0, 51, 0.5)"}}>
        <nav className="navbar navbar-expand-lg px-5 ">
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
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll ">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/products">
                    Shop
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/carts">
                    Categories
                  </a>
                </li>
              </ul>
              <div className=" navbar-nav d-flex gap-3">
                <div>
                  <a
                    href="#"
                    className="btn btn-light btn-sm ms-2 bg-warning-subtle"
                  >
                    <ShoppingCart size={22} />
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="btn btn-light btn-sm ms-2 bg-warning-subtle"
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
