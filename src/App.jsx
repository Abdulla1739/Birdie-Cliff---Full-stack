import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import Category from "./pages/Category";
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/create-listing"
          element={<ProtectedRoute element={CreateListing} />}
        />
        <Route
          path="/properties/:id"
          element={<ProtectedRoute element={ListingDetails} />}
        />
        <Route
          path="/properties/category/:category"
          element={<ProtectedRoute element={Category} />}
        />
        <Route path="/properties/search/:search" element={<Search />} />
        <Route
          path="/:userId/trips"
          element={<ProtectedRoute element={TripList} />}
        />
        <Route
          path="/:userId/wishlist"
          element={<ProtectedRoute element={WishList} />}
        />
        <Route
          path="/:userId/properties"
          element={<ProtectedRoute element={PropertyList} />}
        />
        <Route
          path="/:userId/reservations"
          element={<ProtectedRoute element={ReservationList} />}
        />
        <Route element={<Navigate to={"/"} />} path="/*" />
      </Routes>
    </>
  );
}

export default App;
