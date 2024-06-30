import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import "./WishList.css";
import { getReservationListAPI } from "../service/AllAPI";
import { useEffect, useState } from "react";
import { setReservationList } from "../redux/slice/userSlice";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const ReservationList = () => {
  const user = useSelector((state) => state.user);
  const reservationList = user?.reservationList;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getReservationList = async () => {
    try {
      const result = await getReservationListAPI(user?._id);
      console.log(result.data, "data recived");
      dispatch(setReservationList(result.data));
      setLoading(false);
    } catch (err) {
      console.log("fecth Reservation list failed", err.message);
    }
  };
  useEffect(() => {
    getReservationList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className=" wishlist-tiltle-list-heading">Your Reservation List</h1>
      <div className="Wishlist-tiltle-list ">
        {reservationList && reservationList.length > 0 ? (
          reservationList?.map(
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
            Reservation Not Found
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
