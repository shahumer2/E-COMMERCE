import React from 'react';
import Header from './Header';
import Breadcrumb from '../../Breadcum/Breadcum';
import Footer from './Footer';
import { ImCross } from "react-icons/im";
import Rating from './Rating';
const ShopCart = () => {
    return (
        <>
            <Header/>
            <Breadcrumb  label="cart"/>

        <section className="shop-cart spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop__cart__table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="cart__product__item">
                                            <img src="/img/shop-cart/cp-1.jpg" alt="" />
                                            <div className="cart__product__item__title">
                                                <h6>Chain bucket bag</h6>
                                                <div className="rating">
                                                   <Rating value="2"/>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="cart__price">$ 150.0</td>
                                        <td className="cart__quantity">
                                            <div className="pro-qty">
                                                <input type="number" value="1" />
                                            </div>
                                        </td>
                                        <td className="cart__total">$ 300.0</td>
                                        <td className="cart__close"><span className="icon_close"><ImCross/></span></td>
                                    </tr>
                                    {/* Other rows */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="cart__btn">
                            <a href="#">Continue Shopping</a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="cart__btn update__btn">
                            <a href="#"><span className="icon_loading"></span> Update cart</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="discount__content">
                            <h6>Discount codes</h6>
                            <form action="#">
                                <input type="text" placeholder="Enter your coupon code" />
                                <button type="submit" className="site-btn">Apply</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 offset-lg-2">
                        <div className="cart__total__procced">
                            <h6>Cart total</h6>
                            <ul>
                                <li>Subtotal <span>$ 750.0</span></li>
                                <li>Total <span>$ 750.0</span></li>
                            </ul>
                            <a href="#" className="primary-btn">Proceed to checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </>
    );
};

export default ShopCart;
