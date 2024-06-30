import React, { useEffect, useState } from "react";
import { categories } from "../data";
import "./Listing.css";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { getListingAPI } from "../service/AllAPI";
import { setListings } from "../redux/slice/userSlice";

const Listing = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const listing = useSelector((state) => state.listings);

  const handleListingAPI = async () => {
    try {
      const result = await getListingAPI(selectedCategory);
      const data = result.data;
      dispatch(setListings({ listings: data }));

      setLoading(false);
    } catch (error) {
      console.log("Fetch Listings Failed", error.message);
    }
  };
  // console.log(listing);

  useEffect(() => {
    handleListingAPI();
  }, [selectedCategory]);

  return (
    <>
      <div className="home_categories-list">
        {categories?.map((item, index) => (
          <div
            className={`home_category-list ${
              item.label === selectedCategory ? "selected" : ""
            }`}
            key={index}
            onClick={() => setSelectedCategory(item.label)}
          >
            <div className="home_category-list_icon">{item.icon}</div>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listing && listing.length > 0 ? (
            listing?.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              )
            )
          ) : (
            <p
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "46.5vh",
                fontSize: "larger",
                fontWeight: "900",
              }}
            >
              No Listing Found
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Listing;
