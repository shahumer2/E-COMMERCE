import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import { FaHome, FaAngleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Rating from 'react-rating';

const ProductDetail = () => {
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const { currentUser } = state.persisted.user;
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [review, setreview] = useState('')
    const params = useParams();
    const { ProductDetails, getProductById } = useProduct();

    useEffect(() => {
        getProductById(params.id);

    }, [params.id]);

    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    const truncateDescription = (text) => {
        if (!text) return '';
        const words = text.split(' ');
        return words.slice(0, 100).join(' ');
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        if (currentUser && currentUser !== "null") {
            const productToAdd = {
                productId: params?.id,
                quantity: parseInt(quantity),
                sizeId: selectedSize || null,
                colorId: selectedColor || null,
            };

            console.log("Adding to cart:", productToAdd);
            alert("Product added to cart!");
        } else {
            toast.error("Please login to add product to cart");
        }
    };
    const [rating, setRating] = useState(0);

    const handleRatingChange = (rate) => {
        setRating(rate);
        setreview({
            ...review,
            review: rate
        })
    };
    const onCommentChange = (e) => {
        setreview({
            ...review,
            comment: e.target.value,
            productId: params.id
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser && currentUser !== "null") {


            console.log('Review submitted with rating:', review);
        }
        else {
            toast.error("Please login to submit review");
        }
        // Handle form submission logic here
    };
    const handleColorChange = (event, colorId) => {
        console.log(colorId, "color selected");
        // Update the form data with the selected color ID
        // Assuming you're using a form handler like Formik or a custom handler
        // formik.setFieldValue('colorId', colorId); 
    };

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb Product={ProductDetails} />
                <ProductDetailsPic images={ProductDetails?.images} />
                <ProductDetailsText
                    Product={ProductDetails}
                    expanded={isExpanded}
                    truncateDescription={truncateDescription}
                    handleToggle={handleToggle}
                    handleCartClick={handleCartClick}
                    handleColorChange={handleColorChange}
                />
                <ProductDetailsTab Product={ProductDetails} activeTab={activeTab} handleTabClick={handleTabClick} />
                <Review activeTab={activeTab} handleTabClick={handleTabClick} rating={rating} handleSubmit={handleSubmit} onCommentChange={onCommentChange} handleRatingChange={handleRatingChange} />
            </div>
        </div>
    );
};

const Breadcrumb = ({ Product }) => (
    <div className="breadcrumb-option mb-[80px]">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb__links">
                        <Link to="/"><FaHome className='mr-2' />Home <FaAngleRight className='ml-1' /></Link>
                        <Link to="#">Women’s <FaAngleRight className='ml-1' /></Link>
                        <span>{Product?.name}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProductDetailsPic = ({ images }) => (
    <div className="col-lg-6">
        <div className="product__details__pic">
            <div className="product__details__pic__left">
                {images && images.map((image, index) => (
                    <a key={index} className="pt" href={`#product-${index + 1}`}>
                        <img src={image.url} alt={`Thumb ${index + 1}`} />
                    </a>
                ))}
            </div>
            <div className="product__details__slider__content">
                <div className="product__details__pic__slider">
                    {images && images.map((image, index) => (
                        <img key={index} data-hash={`product-${index + 1}`} className="product__big__img" src={image.url} alt={`Product ${index + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ProductDetailsText = ({ Product, expanded, truncateDescription, handleToggle, handleCartClick, handleColorChange }) => (
    <div className="col-lg-6">
        <div className="product__details__text">
            <h3>{Product?.name}</h3>
            <div className="rating">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <span>(138 reviews)</span>
            </div>
            <div className="product__details__price">
                ₹ {Product?.skus && Product.skus[0]?.price} <span> ₹ {Product?.basePrice}</span>
            </div>
            <div>
                <p>
                    {expanded ? Product?.description : `${truncateDescription(Product?.description)}...`}
                </p>
                <button onClick={handleToggle} className="text-blue-500 hover:underline">
                    {expanded ? 'Read Less' : 'Read More'}
                </button>
            </div>
            <div className="product__details__button">
                <div className="quantity">
                    <span>Quantity:</span>
                    <div className="pro-qty">
                        <input type="number" />
                    </div>
                </div>
                <button className="cart-btn" onClick={handleCartClick}>
                    <span className="icon_bag_alt"></span> Add to cart
                </button>
            </div>
            <ProductDetailsWidget Product={Product} handleColorChange={handleColorChange} />
        </div>
    </div>
);

const ProductDetailsWidget = ({ Product, handleColorChange }) => (


    <div className="product__details__widget">
        <ul>
            <li>
                <span>Availability:</span>
                <div className="stock__checkbox">
                    <label htmlFor="stockin">
                        {Product.status === "AVAILABLE" ? "IN STOCK" : "OUT OF STOCK"}
                        <input type="checkbox" id="stockin" checked readOnly />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </li>
            <li>
                <span>Available color:</span>
                {/* <div className="color__checkbox">
                    {Product.skus.map((sku, index) => (
                        <label key={index} htmlFor={sku.color.name}>
                            <input
                                type="radio"
                                name="color__radio"
                                id={sku.color.name}
                                value={sku.color.name}
                                onChange={(e) => handleColorChange(e, sku.color.id)}
                            />
                            <span
                                className={`checkmark ${sku.color.name}-bg`}
                                style={{ backgroundColor: sku.color.name }}
                            ></span>
                        </label>
                    ))}
                </div> */}
            </li>

            <li>
                <span>Available size:</span>
                <div className="size__btn">
                    {Product.skus && Product.skus.length > 0 && Product.skus[0].sizes && Product.skus[0].sizes.map((sizeObj, index) => (
                        <label key={index} htmlFor={`${sizeObj.size.name}-btn`}>
                            {sizeObj.size.name}
                            <input
                                type="radio"
                                id={`${sizeObj.size.name}-btn`}
                                name="size__radio"
                                value={sizeObj.size.id}
                                onChange={() => handleSizeChange(sizeObj.size.id)} // Function to handle size selection
                            />
                        </label>
                    ))}
                </div>

            </li>
            <li>
                <span>Promotions:</span>
                <p>Free shipping</p>
            </li>
        </ul>
    </div>
);

const ProductDetailsTab = ({ Product, activeTab, handleTabClick }) => (
    <div className="col-lg-12">
        <div className="product__details__tab">
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => handleTabClick('description')}
                        role="tab"
                    >
                        Description
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'specification' ? 'active' : ''}`}
                        onClick={() => handleTabClick('specification')}
                        role="tab"
                    >
                        Specification
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => handleTabClick('reviews')}
                        role="tab"
                    >
                        Reviews (2)
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                <div className={`tab-pane ${activeTab === 'description' ? 'active' : ''}`} role="tabpanel">
                    <p>{Product?.description}</p>
                </div>
                <div className={`tab-pane ${activeTab === 'specification' ? 'active' : ''}`} role="tabpanel">
                    <p>{Product?.specification}</p>
                </div>
                <div className={`tab-pane ${activeTab === 'reviews' ? 'active' : ''}`} role="tabpanel">
                    <Review activeTab={activeTab} handleTabClick={handleTabClick} />
                </div>
            </div>
        </div>
    </div>
);

const Review = ({ activeTab, handleTabClick, rating, handleRatingChange, handleSubmit, onCommentChange }) => {
    // Assuming you have a function to handle form submission and other logic
    return (
        <div className="review-container">
            <h4 className="review-title">Reviews</h4>
            <Rating
                emptySymbol="fa fa-star-o fa-3x star"
                fullSymbol="fa fa-star fa-3x star filled"
                initialRating={rating}
                onChange={handleRatingChange}
                className="rating-stars"
            />
            <form onSubmit={handleSubmit} className="review-form">
                <textarea
                    className="review-textarea"
                    onChange={onCommentChange}
                    placeholder="Add your review"
                />
                <button type="submit" className="submit-button  bg-blue-500">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductDetail;
