import commonAPI from "./commonAPI";
import serverURL from "./serverURL";

export const registerAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/register`, reqBody, {
    "Content-Type": "multipart/form-data",
  });
};

export const loginAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/login`, reqBody);
};

export const addListingAPI = async (reqBody, reqHeader) => {
  return await commonAPI(
    "POST",
    `${serverURL}/properties/create`,
    reqBody,
    reqHeader
  );
};

export const getListingAPI = async (selectedCategory) => {
  return await commonAPI(
    "GET",
    selectedCategory !== "All"
      ? `${serverURL}/properties?category=${selectedCategory}`
      : `${serverURL}/properties`,
    ""
  );
};
export const getListingByIdAPI = async (id) => {
  return await commonAPI("GET", `${serverURL}/properties/${id}`, "");
};
export const bookingTripListAPI = async (reqBody) => {
  return await commonAPI("POST", `${serverURL}/bookings/create`, reqBody);
};

export const getTripListAPI = async (id) => {
  return await commonAPI("GET", `${serverURL}/users/${id}/trips`, "");
};
export const wishListAPI = async (userId, listingId, reqBody) => {
  return await commonAPI(
    "PATCH",
    `${serverURL}/users/${userId}/${listingId}`,
    reqBody,
    ""
  );
};

export const getPropertyListAPI = async (id) => {
  return await commonAPI("GET", `${serverURL}/users/${id}/properties`, "");
};

export const getReservationListAPI = async (id) => {
  return await commonAPI("GET", `${serverURL}/users/${id}/reservations`, "");
};

export const getCategoryAPI = async (category) => {
  return await commonAPI(
    "GET",
    `${serverURL}/properties?category=${category}`,
    ""
  );
};
export const getListingBySearchAPI = async (search) => {
  return await commonAPI("GET", `${serverURL}/properties/search/${search}`, "");
};
