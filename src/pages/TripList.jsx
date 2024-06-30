import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getTripListAPI } from "../service/AllAPI";
import { setTripList } from "../redux/slice/userSlice";
import ListingCard from "../components/ListingCard";
import "./TripList.css";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripLists = useSelector((state) => state.user.tripList.data);
  const dispatch = useDispatch();
  const gettripList = async () => {
    try {
      const data = await getTripListAPI(userId);
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Failed to get trip list.", err.message);
    }
  };

  useEffect(() => {
    gettripList();
  }, []);
  console.log("trippy found", tripLists);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="trip-tiltle-list-heading">Your trip List</h1>
      <div className="trip-tiltle-list">
        {tripLists && tripLists.length > 0 ? (
          tripLists?.map(
            ({
              listingId,
              hostId,
              startDate,
              endDate,
              totalPrice,
              booking = true,
            }) => (
              <ListingCard
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
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
            No Bookings Create new!!!
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
