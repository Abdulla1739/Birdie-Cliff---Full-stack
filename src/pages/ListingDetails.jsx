import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingTripListAPI, getListingByIdAPI } from '../service/AllAPI';
import serverURL from '../service/serverURL';
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from '../components/Loader';
import './ListingDetails.css'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();  
  const [listing, setListing] = useState(null);
  const navigate = useNavigate()
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const getListingByID = async () => {
    try {
      const result = await getListingByIdAPI(id);
      const data = result.data; 
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetching from server by id failed", err);
    }
  };

  useEffect(() => {
    getListingByID();
  }, [id]);
  
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));


  const customerId = useSelector((state)=>state?.user?._id)

  const handleSubmit = async()=>{
    try {
      const bookingForm = {
        customerId,
        listingId:id,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      }
      console.log(bookingForm);
      const reqBody = JSON.stringify(bookingForm)
      const result = await bookingTripListAPI(reqBody)
      if (result.status =200) {
        navigate(`/${customerId}/trips`)
      }
      
    } catch (err) {
      console.log("Submit Booking Failed.", err.message)
    }
  }

  return loading ? <Loader /> : (
    <>
    <Navbar/>
      <div className="listing-details">
        <div className="listing-details-title">
          <h1 style={{color:"black"}}>{listing.title}</h1>
          <div></div>
        </div>

        <div className="listing-details-photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              key={item}
              src={`${serverURL}/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedsCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="listing-details-profile">
          <img
            src={`${serverURL}/${listing.creator.profileImg.replace("public", "")}`}
            alt="Host"
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="listing-details-booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="listing-details-amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="listing-details-facility" key={index}>
                  <div className="listing-details-facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="listing-details-date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ₹ {listing.price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ₹ {listing.price} x {dayCount} night
                </h2>
              )}

              <h2>Total price: ₹ {listing.price * dayCount}</h2>
              <p>Start Date: {dateRange[0].startDate.toDateString()}</p>
              <p>End Date: {dateRange[0].endDate.toDateString()}</p>

              <button onClick={handleSubmit} className="listing-details-button" type="submit">
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ListingDetails;