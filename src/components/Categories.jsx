import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data";
import "./Categories.css";

const Categories = () => {
  return (
    <div className="home_categories">
      <h1 style={{ color: "black" }}>Explore Top Categories</h1>
      <p>
        Unfurl the map of your dreams. Discover our havens crafted for every
        wanderer. Steep yourself in the rhythm of a new place, find solace in
        familiar comforts, and etch memories that shimmer in your heart.
      </p>
      <div className="home_categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index}>
            <div className="home_category">
              <img src={category?.img} alt={category?.label} />
              <div className="home_overlay"></div>
              <div className="home_category_text">
                <div className="home_category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
