import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import "./WishList.css";
import Footer from "../components/Footer";

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);
  return (
    <>
      <Navbar />
      <h1 className=" wishlist-tiltle-list-heading">Your Wish List</h1>
      <div className="Wishlist-tiltle-list ">
        {wishList && wishList.length > 0 ? (
          wishList?.map(
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
            WishList Not Found
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishList;
