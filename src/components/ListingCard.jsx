import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import "./ListingCard.css";

const ListingCard = () => {
  return (
    <div className="listing-card">
      <div className="listing_slider-container">
        <div className="listing_slider">
          <div className="listing_slide">
            <img
              src="https://a0.muscache.com/im/pictures/81dca5d6-5a86-49bc-8eca-4a8610a07d27.jpg"
              alt="list img"
            />
            <div className="listing_prev-button">
              <MdArrowBackIosNew style={{ fontSize: "15px" }} />
            </div>
            <div className="listing_next-button">
              <MdArrowForwardIos style={{ fontSize: "15px" }} />
            </div>
          </div>
        </div>
      </div>
      <h3>City, province,country</h3>
      <p>Category</p>
      <p>Type</p>
      <p><span>₹ Price</span> per night</p>
    </div>
  );
};

export default ListingCard;
