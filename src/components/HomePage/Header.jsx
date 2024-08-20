import React, { useState } from 'react';
import './Page.css';
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'bootstrap';
import { signoutSuccess } from '../../redux/Slice/UserSlice';
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { currentUser } = state.persisted.user;
   
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

    const toggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const handleLogout=(e)=>{
        e.preventDefault()
        try {
            dispatch(signoutSuccess())
            navigate("/auth/signIn")
            
        } catch (error) {
            
        }
    }

    return (
        <>
            <div className={`offcanvas-menu-overlay ${isOffcanvasOpen ? 'active' : ''}`} onClick={toggleOffcanvas}></div>
            <div className={`offcanvas-menu-wrapper ${isOffcanvasOpen ? 'active' : ''}`}>
                <div className="offcanvas__close" onClick={toggleOffcanvas}>+</div>
                <ul className="offcanvas__widget">
                    <li><span className="icon_search search-switch"></span></li>
                    <li><a href="#"><span className="icon_heart_alt"><CiHeart /></span>
                        <div className="tip">2</div>
                    </a></li>
                    <li><a href="#"><span className="icon_bag_alt"></span>
                        <div className="tip">2</div>
                    </a></li>
                </ul>
                <div className="offcanvas__logo">
                    <a href="./index.html"><img src="/img/logo.png" alt="Logo" /></a>
                </div>
                <nav className="offcanvas__menu">
                    <ul>
                        <li className="active"><a href="./index.html">Home</a></li>
                        <li><a href="#">Women’s</a></li>
                        <li><a href="#">Men’s</a></li>
                        <li><Link to="/AllProducts">Shop</Link></li>
                        <li><a href="#">Pages</a>
                            <ul className="dropdown">
                                <li><a href="./product-details.html">Product Details</a></li>
                                <li><a href="./shop-cart.html">Shop Cart</a></li>
                                <li><a href="./checkout.html">Checkout</a></li>
                                <li><a href="./blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><a href="./blog.html">Blog</a></li>
                        <li><a href="./contact.html">Contact</a></li>
                    </ul>
                </nav>
                <div className="offcanvas__auth">
                    <a href="/auth/signin">Login</a>
                    <a href="/auth/signup">Register</a>
                </div>
                <ul>
                                    <li className="active"><a href="/">Home</a></li>
                                    <li><a href="#">Womennnn’s</a></li>
                                    <li><a href="#">Men’s</a></li>
                                    <li><Link to="/AllProducts">Shop</Link></li>
                                    <li><a href="#">Pages</a>
                                        <ul className="dropdown">
                                            <li><a href="./Product/viewbyid">Product Details</a></li>
                                            <li><a href="./cart">Shop Cart</a></li>
                                            <li><a href="/Product/CheckoutbyId">Checkout</a></li>
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="./blog.html">Blog</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                </ul>
            </div>
            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-2 col-lg-2">
                            <div className="header__logo">
                                <a href="./index.html"><img src={"./img/logo.png"} alt="Logo" style={{ width: "90px" }} /></a>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><a href="/">Home</a></li>
                                    <li><a href="#">Women’s</a></li>
                                    <li><a href="#">Men’s</a></li>
                                    <li><a href="Product/AllProducts">Shop</a></li>
                                    <li><a href="#">Pages</a>
                                        <ul className="dropdown">
                                            <li><a href="/Product/viewbyid">Product Details</a></li>
                                            <li><a href="./cart">Shop Cart</a></li>
                                            <li><a href="/Product/CheckoutbyId">Checkout</a></li> 
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="./blog.html">Blog</a></li>
                                    <li><a href="./contact.html">Contact</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-xl-3 col-lg-3">
                            <div className="header__right">
                                <ul className="header__right__widget">
                                    <li><span className="icon_search search-switch"><CiSearch size="25"/></span></li>
                                    <li><a href="#"><span className="icon_heart_alt"><CiHeart/></span>
                                        <div className="tip">2</div>
                                    </a></li>
                                    <li><a href="#"><span className="icon_bag_alt"><MdOutlineShoppingBag/></span>
                                        <div className="tip">2</div>
                                    </a></li>
                                </ul>
                                <div className="header__right__auth ml-[20px]">
                                    {currentUser ? (
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" data-toggle="dropdown">
                                                {`Welcome, ${currentUser.user.name.substring(0,6)}`}
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><Link to="/change-password">Change Password</Link></li>
                                                <li><Link to="/profile">My Profile</Link></li>
                                                <li><button onClick={(e)=>handleLogout(e)} >Logout</button></li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <>
                                            <a href="/auth/signin">Login</a>
                                            <a href="/auth/signup">Register</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open" onClick={toggleOffcanvas}>
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
