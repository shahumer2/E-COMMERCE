import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-7">
                        <div className="footer__about">
                            <div className="footer__logo">
                                <a href="./index.html"><img src="img/logo.png" alt="" /></a>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                cilisis.</p>
                            <div className="footer__payment">
                                <a href="#"><img src="img/payment/payment-1.png" alt="" /></a>
                                <a href="#"><img src="img/payment/payment-2.png" alt="" /></a>
                                <a href="#"><img src="img/payment/payment-3.png" alt="" /></a>
                                <a href="#"><img src="img/payment/payment-4.png" alt="" /></a>
                                <a href="#"><img src="img/payment/payment-5.png" alt="" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-5">
                        <div className="footer__widget">
                            <h6>Quick links</h6>
                            <ul>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Blogs</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        <div className="footer__widget">
                            <h6>Account</h6>
                            <ul>
                                <li><a href="#">My Account</a></li>
                                <li><a href="#">Orders Tracking</a></li>
                                <li><a href="#">Checkout</a></li>
                                <li><a href="#">Wishlist</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-8 col-sm-8">
                        <div className="footer__newslatter">
                            <h6>NEWSLETTER</h6>
                            <form action="#">
                                <input type="text" placeholder="Email" />
                                <button type="submit" className="site-btn">Subscribe</button>
                            </form>
                            <div className="footer__social">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-youtube-play"></i></a>
                                <a href="#"><i className="fa fa-instagram"></i></a>
                                <a href="#"><i className="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <p className="text-center"> {/* Copyright text goes here */} </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
