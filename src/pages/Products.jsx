import axios from "axios";
import React, { useState } from "react";
import Card from "../components/Card";

const Products = () => {
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
      <div className="my-5 px-5" id="trending_products border">
        <h2>Trending Products</h2>
        <hr />
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products.map((item) => (
            <Card data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
