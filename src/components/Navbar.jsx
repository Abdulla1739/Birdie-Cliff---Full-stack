import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import "./NavBar.css";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  return (
    <div className="navbar">
        <Link to={"/"}>Birdie Cliff.</Link>
      <div className="navbar_search">
        <input type="text" placeholder="Search..." />
        <IconButton>
          <Search style={{ color: "#F8395A" }} />
        </IconButton>
      </div>
      <div className="navbar_right">
        {user? (
          <a href="/create-listing" className="host">
            Make own Nest
          </a>
          ) : (
            <a href="/login" className="host">
              Make own Nest
            </a>
        )}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu style={{ color: "#969393" }} />
          {!user ? (
            <Person
              style={{
                color: "#969393",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            <img src="" alt="profileImg" />
          )}
        </button>
        {dropdownMenu && (
          <div className="navbar_right_accountmenu">
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Sign Up</Link>
            <hr />
            <Link style={{marginTop: "5px"}} to={""}>Make Own Nest</Link>
          </div>
        )}
        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={""}>Trip List</Link>
            <Link to={""}>Wish List</Link>
            <Link to={""}>Property List</Link>
            <Link to={""}>Reservation List</Link>
            <Link to={""}>Make Own Nest</Link>
            <Link to={"/login"}>Log Out</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
