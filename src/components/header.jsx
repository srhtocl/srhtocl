import { NavLink, useLocation, useNavigate, } from "react-router-dom";
import { FiLogOut, FiChevronLeft, FiLogIn } from "react-icons/fi";
import { useAuth } from "../context/auth-context";
import React from "react";

export const Header = () => {

    // authContext.user.email.split("@")[0]

    const authContext = useAuth();

    const location = useLocation();

    const navigate = useNavigate();

    const getPageName = (path) => {

        const paths = {
            "/": "Ana Sayfa",
            "/all-messages": "Tüm Mesajlar",
            "/message": "Mesaj Gönder",
            "/login": "Giriş Yap",
            "/create-post": "Gönderi Oluştur",
            "/posts": "Gönderiler"
        };

        return paths.hasOwnProperty(path) ? paths[path] : path.split("/").at(-1);
    };



    return (

        <header id="header" className="flex justify-center bg-gray-100 border-b-2 00 fixed top-0 w-full">
            <nav className="flex justify-around w-full">

                <div>
                    {<NavLink className="navlink py-4" ><FiChevronLeft onClick={() => { location.pathname !== "/" && navigate(-1) }} className="react-fi-navlink" /></NavLink>}
                </div>

                <div>{getPageName(location.pathname)}</div>

                <div>
                    {
                        authContext.user ?

                        <NavLink className="navlink py-4 icon" to="/" onClick={authContext.handleLogout}><FiLogOut className="react-fi-navlink" /></NavLink>

                        :

                        <NavLink className="navlink py-4 icon" to="/login"><FiLogIn className="react-fi-navlink" /></NavLink>
                    }
                </div>

            </nav>
        </header>

    );
};