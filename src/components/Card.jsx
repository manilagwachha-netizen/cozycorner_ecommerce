import React from "react";

const Card = (props) => {
  const product = props.data;

  console.log(product.thumbnail);

  return (
    <div className="col">
      <div
        className="card h-100 border-0 rounded-4 shadow overflow-hidden"
        style={{
          background: "rgba(228, 224, 226, 0)",
          color: "#842029",
        }}
      >
        <img
          src={product.images}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
          alt={product.title}
        />
        <div className="card-body px-5 fs-5">
          {product.title.length > 25 ? (
            <h4 className="card-title" title={product.title}>
              {product.title.slice(0, 25)}..
            </h4>
          ) : (
            <h4 className="card-title" title={product.title}>
              {product.title}
            </h4>
          )}

          <p className="card-text fw-bold">
            Price :
            <span className="text-success ms-2">Rs. {product.price}</span>
          </p>

          <a
            href={`/productview/${product.id}`}
            className="btn bg-warning-subtle fs-5 fw-semibold"
          >
            View More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
