import React from "react";
import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listing from "../components/Listing";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Listing />
      <Slide />

      <Categories />
      <Footer />
    </div>
  );
};

export default HomePage;
