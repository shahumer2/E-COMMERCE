import React from 'react';
import { FaCar } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";



const ServicesSection = () => {
    return (
        <section className="services spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="services__item">
                        <i className="fa fa-support"><FaCar/></i>
                            <h6>Free Shipping</h6>
                            <p>For all orders over $99</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="services__item">
                        <i className="fa fa-support"><FaMoneyBill/></i>
                            <h6>Money Back Guarantee</h6>
                            <p>If goods have Problems</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="services__item">
                            <i className="fa fa-support"><BiSupport/></i>
                            <h6>Online Support 24/7</h6>
                            <p>Dedicated support</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="services__item">
                        <i className="fa fa-support"><MdPayment/></i>
                            <h6>Payment Secure</h6>
                            <p>100% secure payment</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
