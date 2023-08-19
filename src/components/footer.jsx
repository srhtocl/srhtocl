import { NavLink } from "react-router-dom";
import { FiHome, FiEdit, FiMessageSquare, FiLogIn  } from "react-icons/fi";
import React from "react";
import { useAuth } from "../context/auth-context";



export const Footer = ({ user, isLoading }) => {

    const authContext = useAuth();

    return (
        <footer id="footer" className="flex justify-center bg-gray-100 border-t-2 00 fixed bottom-0 w-full">
            <nav className="flex justify-center w-full">
                <div className="flex justify-around w-full">
                    <NavLink to="/" className="navlink py-4"><FiHome className="react-fi-navlink" /></NavLink>

                    <NavLink to="/message" className="navlink py-4"><FiMessageSquare className="react-fi-navlink" /></NavLink>

                    {!authContext.user && (<NavLink className="navlink py-4" to="/login"><FiLogIn className="react-fi-navlink" /></NavLink>)}

                    {authContext.user && (<NavLink className="navlink py-4" to="/all-messages"><FiEdit className="react-fi-navlink" /></NavLink>)}
                </div>
            </nav>
        </footer>
    );
};