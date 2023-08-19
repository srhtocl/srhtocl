import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/auth-context";
import React from "react";

export const Header = () => {

    const authContext = useAuth();


    return (

        <header id="header" className="flex justify-center bg-gray-100 border-b-2 00 fixed top-0 w-full">
            <nav className="flex justify-center w-full">
                <div className="flex justify-around w-full">

                    <div className="flex justify-center items-center">{authContext.user.email.split("@")[0]}</div>

                    <NavLink className="navlink py-4" to="/" onClick={authContext.handleLogout}><FiLogOut className="react-fi-navlink" /></NavLink>

                </div>
            </nav>
        </header>

    );
};