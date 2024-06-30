import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import serverURL from "../service/serverURL";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/slice/userSlice";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  const profileImagePath = user?.profileImg
    ? `${serverURL}/${user.profileImg.replace("public", "")}`
    : "";

  return (
    <div className="navbar">
      <Link to={"/"}>Birdie Cliff.</Link>
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            style={{ color: "#F8395A" }}
            onClick={() => navigate(`/properties/search/${search}`)}
          />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user ? (
          <Link to="/create-listing" className="host">
            Make own Nest
          </Link>
        ) : (
          <Link to="/login" className="host">
            Make own Nest
          </Link>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu style={{ color: "#969393" }} />
          {user ? (
            <img
              src={profileImagePath}
              alt="profileImg"
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
              }}
            />
          ) : (
            <Person
              style={{
                color: "#969393",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          )}
        </button>
        {dropdownMenu && (
          <div className="navbar_right_accountmenu">
            {user ? (
              <>
                <Link to="/:userId/trips">Trip List</Link>
                <Link to="/:userId/wishlist">Wish List</Link>
                <Link to="/:userId/properties">Property List</Link>
                <Link to="/:userId/reservations">Reservation List</Link>
                <Link to="/create-listing">Make Own Nest</Link>
                <Link onClick={handleLogout} to="#">
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
                <hr />
                <Link style={{ marginTop: "5px" }} to="/login">
                  Make Own Nest
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
