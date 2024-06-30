import React, { useState } from "react";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdFavorite,
} from "react-icons/md";
import "./ListingCard.css";
import serverURL from "../service/serverURL";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { wishListAPI } from "../service/AllAPI";
import { setWishList } from "../redux/slice/userSlice";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const handleclick = () => {
    navigate(`/properties/${listingId}`);
  };

  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const reqBody = {};
      try {
        const response = await wishListAPI(user?._id, listingId, reqBody);

        if (response.status === 200) {
          const data = response.data;
          dispatch(setWishList(data.wishList));
        } else {
          console.error("Failed to update wishlist:", response);
        }
      } catch (error) {
        console.error("Error updating wishlist:", error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="listing-card">
      <div className="listing_slider-container">
        <div
          className="listing_slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="listing_slide">
              <img
                src={`${serverURL}/${photo.replace("public", "")}`}
                alt={`photo ${index + 1}`}
                onClick={handleclick}
              />
              <div className="listing_prev-button" onClick={goToPrevSlide}>
                <MdArrowBackIosNew style={{ fontSize: "15px" }} />
              </div>
              <div className="listing_next-button" onClick={goToNextSlide}>
                <MdArrowForwardIos style={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 onClick={handleclick}>
        {city}, {province}, {country}
      </h3>
      <p onClick={handleclick}>{category}</p>
      {!booking ? (
        <>
          <p onClick={handleclick}>{type}</p>
          <p onClick={handleclick}>
            <span>₹{price}</span> per night
          </p>
        </>
      ) : (
        <>
          <p onClick={handleclick}>
            {startDate} - {endDate}
          </p>
          <p onClick={handleclick}>
            Total Price <span>₹{totalPrice}</span>
          </p>
        </>
      )}
      <button className="favorite" onClick={patchWishList} disabled={!user}>
        {isLiked ? (
          <MdFavorite size={24} color="red" />
        ) : (
          <MdFavorite size={24} color="white" />
        )}
      </button>
    </div>
  );
};

export default ListingCard;
