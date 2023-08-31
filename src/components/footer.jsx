import { NavLink } from "react-router-dom";
import { FiHome, FiEdit, FiMessageSquare, FiBook, FiLogIn, FiClipboard } from "react-icons/fi";
import React from "react";
import { useAuth } from "../context/auth-context";
import Cookies from "js-cookie";

export const Footer = ({ user, isLoading }) => {
  const authContext = useAuth();

  return (
    <footer
      id="footer"
      className="flex justify-center bg-gray-100 border-t-2 00 fixed bottom-0 w-full"
    >
      <nav className="flex justify-around w-full">
        <NavLink to="/" className="navlink py-4 icon">
          <FiHome className="react-fi-navlink" />
        </NavLink>

        <NavLink to="/posts" className="navlink py-4 icon">
          <FiClipboard className="react-fi-navlink" />
        </NavLink>

        <NavLink
          to={ authContext.user ? Cookies.get("user") ? `/response/${Cookies.get("user")}` : "/all-messages" : "/message" }
          className="navlink py-4 icon" >
            <FiMessageSquare className="react-fi-navlink" />
        </NavLink>

        {authContext.user && (
          <NavLink className="navlink py-4 icon" to="/all-messages">
            <FiBook className="react-fi-navlink" />
          </NavLink>
        )}

        {authContext.user && (
          <NavLink className="navlink py-4 icon" to="/create-post">
            <FiEdit className="react-fi-navlink" />
          </NavLink>
        )}
      </nav>
    </footer>
  );
};
