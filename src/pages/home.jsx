
import React from "react";

export default function Home() {        

    return (

        <div className="home-card">
            <div className="header"></div>
            <div className="profile">
                <img src="https://pbs.twimg.com/profile_images/1483105275766882304/4CYpr2hO_400x400.jpg" alt="Serhat öcal" />
            </div>
            <div className="content">
                <h3 className="title">Serhat Öcal</h3>
                <span> </span>
                <p> </p>
            </div>
            <div className="social">
                {/* eslint-disable jsx-a11y/anchor-has-content */}
                <a className="fab fa-twitter" href="https://www.twitter.com/srhtocl"></a>
                <a className="fab fa-facebook" href="https://www.facebook.com/srhtocl"></a>
                <a className="fab fa-instagram" href="https://www.instagram.com/srhtocl/"></a>
                <a className="fab fa-github" href="https://www.github.com/srhtocl"></a>
            </div>
        </div>
    )

}