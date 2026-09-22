import React from 'react'
import { Search, Heart, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className="bg-success-subtle px-4">
        <nav className="navbar navbar-expand-lg ">
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
              <ul className="navbar-nav m-auto my-2 my-lg-0 navbar-nav-scroll">
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
              <div className="button">
                <a href="#" className="btn btn-light btn-sm ms-2">
                  <ShoppingCart size={22}/>
                </a>
                <a href="#" className="btn btn-light btn-sm ms-2">
                  <User size={22}></User>
                </a>
                
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
