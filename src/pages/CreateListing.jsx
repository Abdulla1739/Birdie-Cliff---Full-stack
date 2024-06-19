import React from "react";
import "./CreateListing.css";
import Navbar from "../components/Navbar";
import { categories,types, facilities } from "../data";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { styled, } from 'styled-components';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

const StyledRemoveCircleOutline = styled(RemoveCircleOutline)`
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #F8395A;
  }
`;
const StyledAddCircleOutline = styled(AddCircleOutline)`
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #F8395A;
  }
`;

const CreateListing = () => {
    
  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish your Place</h1>
        <form>
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describe your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div className="category" key={index}>
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            <h3>What type of place will guests have?</h3>
            <div className="type-list">
                {types?.map((item,index)=>(
                    <div className="type" key={index}>
                        <div className="type_text">
                            <h4>{item?.name}</h4>
                            <p>{item?.description}</p>
                        </div>
                        <div className="type_icon">
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>
            <h3>Where's your place located?</h3>
            <div className="full">
                <div className="location">
                    <p>Street Address</p>
                    <input type="text" placeholder="Street Address" name="streetAddress" required/>
                </div>
            </div>
            <div  className="half">
                <div className="location">
                    <p>Appartment, Suite etc. (if applicable)</p>
                    <input type="text" placeholder="apt, Suite etc. (if applicable)" name="aptSuite" required/>
                </div>
                <div className="location">
                    <p>City</p>
                    <input type="text" placeholder="City" name="city" required/>
                </div>
            </div>
            <div  className="half">
                <div className="location">
                    <p>Province</p>
                    <input type="text" placeholder="Province" name="province" required/>
                </div>
                <div className="location">
                    <p>Country</p>
                    <input type="text" placeholder="Country" name="country" required/>
                </div>
            </div>
            <h3>Share some basics about your place</h3>
            <div className="basics">
                <div className="basic">
                    <p>Guests</p>
                    <div className="basic_count">
                    <StyledRemoveCircleOutline />
                    <p>1</p>
                    <StyledAddCircleOutline/>
                    </div>
                </div>
                <div className="basic">
                    <p>Bedrooms</p>
                    <div className="basic_count">
                    <StyledRemoveCircleOutline />
                    <p>1</p>
                    <StyledAddCircleOutline/>
                    </div>
                </div>
                <div className="basic">
                    <p>Beds</p>
                    <div className="basic_count">
                    <StyledRemoveCircleOutline />
                    <p>1</p>
                    <StyledAddCircleOutline/>
                    </div>
                </div>
                <div className="basic">
                    <p>Bathrooms</p>
                    <div className="basic_count">
                    <StyledRemoveCircleOutline />
                    <p>1</p>
                    <StyledAddCircleOutline/>
                    </div>
                </div>
            </div>
          </div>
          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />
            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
                {facilities?.map((item,index)=>(
                    <div className="facility" key={index}>
                        <div className="facility_icon">{item.icon}</div>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
            <h3>Add some photos of your place</h3>
            <DragDropContext > 
                {/* onDragEnd={} */}
                <Droppable droppableId="photos" direction="horizontal">
                    {(provided)=>(
                        <div className="photos" {...provided.droppableProps} ref={provided.innerRef}>
                            
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                required
              />
              <p>Highlight</p>
              <input
                type="text"
                placeholder="Highlight"
                name="highlight"
                required
              />
              <p>Highlight details</p>
              <textarea
                type="text"
                placeholder="Highlight details"
                name="highlightDesc"
                required
              />
              <p>Now, set your PRICE</p>
              <span>₹</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                className="price"
                required
              />
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>


          
        </form>
      </div>
    </>
  );
};

export default CreateListing;
