import React from "react";

const Card = (props) => {
  return (
    <>
      <div class="col">
        <div class="card card h-100 border-0 rounded-4 shadow overflow-hidden" style={{background:"rgba(228, 224, 226, 0)", color:"#842029"}}>
          <img src={props.data.thumbnail} class="card-img-top" height="60%" alt="..." />
          <div class="card-body px-5  fs-5">
            {/* condition ? True : False */}
            {props.data.title.length > 25 ? (
              <h4 class="card-title" title={props.data.title}>{props.data.title.slice(0, 25)}..</h4>
            ) : (
              <h4 class="card-title" title={props.data.title}>{props.data.title}</h4>
            )}

            <p className="card-text fw-bold">
              Price :
              <span className="text-decoration-line-through text-muted small fw-light">
                Rs.{props.data.price}
              </span>
              <span className="text-success"> Rs.{props.data.price}</span>
            </p>
            <a href={`/productview/${props.data.id}`} className="btn bg-warning-subtle fs-5 fw-semibold">
              View More
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
