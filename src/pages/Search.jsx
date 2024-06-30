import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import "./WishList.css";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/slice/userSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { getListingBySearchAPI } from "../service/AllAPI";
import Footer from "../components/Footer";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const { search } = useParams();
  const listings = useSelector((state) => state.listings);

  const dispatch = useDispatch();

  const getSearchListings = async () => {
    try {
      const result = await getListingBySearchAPI(search);

      const data = result.data;
      dispatch(setListings({ listings: data }));

      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="wishlist-title-list-heading" style={{ color: "black" }}>
        {search}
      </h1>
      <div className="Wishlist-tiltle-list">
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
              height: "46.5vh",
              fontSize: "larger",
              fontWeight: "900",
            }}
          >
            Search Item Not Found
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;
