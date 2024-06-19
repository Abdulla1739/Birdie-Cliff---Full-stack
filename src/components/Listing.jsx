import React from 'react';
import { categories } from '../data';
import './Listing.css'; 
import ListingCard from './ListingCard';

const Listing = () => {
  return (
   <>
        <div className='home_categories-list'>
          {categories?.map((item, index) => (
            <div className='home_category-list' key={index}>
              <div className='home_category-list_icon'>{item.icon}</div>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        <div  className='listings'>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>
            <ListingCard/>

        </div>
   </>
  );
};

export default Listing;
