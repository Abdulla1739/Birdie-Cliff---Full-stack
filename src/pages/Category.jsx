import { useState, useEffect } from "react";
import "./WishList.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/slice/userSlice";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import { getCategoryAPI } from "../service/AllAPI";
import Footer from "../components/Footer";

const Category = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings);

  const handleCategoryAPI = async () => {
    try {
      const result = await getCategoryAPI(category);
      const data = result.data;
      dispatch(setListings({ listings: data }));

      setLoading(false);
    } catch (error) {
      console.log("Fetch Listings Failed", error.message);
    }
  };

  useEffect(() => {
    handleCategoryAPI();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className=" wishlist-tiltle-list-heading">{category} Listing</h1>
      <div className="Wishlist-tiltle-list ">
        {listings && listings.length > 0 ? (
          listings.map(
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
                key={_id}
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
              height: "35vh",
              fontSize: "larger",
              fontWeight: "800",
            }}
          >
            No Listing for specific category
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Category;
