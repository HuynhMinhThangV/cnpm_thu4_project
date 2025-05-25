import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          marginRight: "1rem",
          textDecoration: "none",
          color: isActive ? "blue" : "black",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Home
      </NavLink>

      <NavLink
        to="/savedbooks"
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "blue" : "black",
          fontWeight: isActive ? "bold" : "normal",
        })}
      >
        Tủ truyện
      </NavLink>
    </nav>
  );
};

export default Menu;
