import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Homepage = () => {
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
                <button className="btn bg-warning-subtle text-warning-emphasis rounded-pill px-4 py-3 fw-semibold shadow-sm">
                  ✨ Shop the collection
                </button>

                <button className="btn bg-danger-subtle text-danger-emphasis rounded-pill px-4 py-3 fw-semibold shadow-sm">
                  🌸 Browse categories
                </button>
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

        <div className="my-5 px-5 py-4 border container" id="trending_products">
          <h1>Cozy Home Essentials</h1>
          <hr />
          <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-5">
            {products.map((item) => (
              <Card data={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
