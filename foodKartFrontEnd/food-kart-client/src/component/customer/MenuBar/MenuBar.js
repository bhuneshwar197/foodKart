

import React from 'react';
import './MenuBar.css'; // optional for custom styles

const MenuBar = () => {
    return (
        <div id="NavBar">
            <div className="navbar-container">
            <div className="logo">foodKART</div>
            <ul className="nav-links">
                <li>Home</li>
                <li className="dropdown">
                    Food
                    <ul className="dropdown-menu">
                        <li>
                            Veg
                             <ul className="submenu">
                                <li>Breakfast</li>
                                <li>Lunch</li>
                                <li>Dinner</li>
                            </ul>
                        </li>
                        <li>
                            Non-Veg
                            <ul className="submenu">
                                <li>Breakfast</li>
                                <li>Lunch</li>
                                <li>Dinner</li>
                            </ul>
                        </li>
                        <li>
                            Both
                            <ul className="submenu">
                                <li>Breakfast</li>
                                <li>Lunch</li>
                                <li>Dinner</li>
                            </ul>
                        </li>
                        <li>General</li>
                    </ul>
                </li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Your Account</li>
                <li>Cart</li>
                <li>Admin</li>
            </ul>
            <div className="auth-section">
                <button className="btn green">SignUp</button>
                <button className="btn orange">Login</button>
                <button className="btn red">SignOut</button>
                <span className="user-email">Hello bhuneshwar197@gmail.com</span>
            </div>
        </div>
        </div>
    );
};

export default MenuBar;