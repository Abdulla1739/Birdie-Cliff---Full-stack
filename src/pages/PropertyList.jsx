import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import "./WishList.css";
import { getPropertyListAPI } from "../service/AllAPI";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/slice/userSlice";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getPropertyList = async () => {
    try {
      const result = await getPropertyListAPI(user?._id);
      console.log(result.data, "data recived");
      dispatch(setPropertyList(result.data));
      setLoading(false);
    } catch (err) {
      console.log("fecth property failed", err.message);
    }
  };
  useEffect(() => {
    getPropertyList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className=" wishlist-tiltle-list-heading">Your Property List</h1>
      <div className="Wishlist-tiltle-list ">
        {propertyList && propertyList.length > 0 ? (
          propertyList?.map(
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
              height: "35vh",
              fontSize: "larger",
              fontWeight: "900",
            }}
          >
            No Property Listed
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
