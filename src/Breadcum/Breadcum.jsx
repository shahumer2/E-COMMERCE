import React from 'react';
import { IoIosHome } from "react-icons/io";
import "./Breadcum.css"
import { FaAngleRight } from "react-icons/fa";
const Breadcrumb = ({ label }) => {
    return (
        <div className="breadcrumb-option">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb__links">
                            <a href="./">
                                <IoIosHome className='mr-3'/>
                                <span className='mr-2'> Home</span>
                                <FaAngleRight className='mr-[-19px]'/>
                            </a>
                            <span> / {label}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
