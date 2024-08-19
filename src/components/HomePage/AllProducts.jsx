import React, { useState } from 'react';
import Header from './Header';
import useProduct from '../../hooks/useProduct';
// import './Shop.css'; // Assuming you have a CSS file for styles
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { IoMdResize } from "react-icons/io";
import { Link } from 'react-router-dom';
const categories = [
  {
    id: 1,
    name: 'Women',
    items: ['Coats', 'Jackets', 'Dresses', 'Shirts', 'T-shirts', 'Jeans'],
  },
  {
    id: 2,
    name: 'Men',
    items: ['Coats', 'Jackets', 'Dresses', 'Shirts', 'T-shirts', 'Jeans'],
  },
  {
    id: 3,
    name: 'Kids',
    items: ['Coats', 'Jackets', 'Dresses', 'Shirts', 'T-shirts', 'Jeans'],
  },
  {
    id: 4,
    name: 'Accessories',
    items: ['Coats', 'Jackets', 'Dresses', 'Shirts', 'T-shirts', 'Jeans'],
  },
  {
    id: 5,
    name: 'Cosmetic',
    items: ['Coats', 'Jackets', 'Dresses', 'Shirts', 'T-shirts', 'Jeans'],
  },
];

const ShopSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(1);

  const handleToggle = (id) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  return (
    <>

      <div className="shop__sidebar">
        <div className="sidebar__categories">
          <div className="section-title">
            <h4>Categories</h4>
          </div>
          <div className="categories__accordion">
            {categories.map((category) => (
              <div className="card" key={category.id}>
                <div className={`card-heading ${activeCategory === category.id ? 'active' : ''}`}>
                  <a onClick={() => handleToggle(category.id)}>{category.name}</a>
                </div>
                {activeCategory === category.id && (
                  <div className="card-body">
                    <ul>
                      {category.items.map((item, index) => (
                        <li key={index}><a href="#">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <ShopFilter />
        <ShopSizes />
        <ShopColors />
      </div>
    </>
  );
};

const ShopFilter = () => {
  return (
    <div className="sidebar__filter">
      <div className="section-title">
        <h4>Shop by price</h4>
      </div>
      <div className="filter-range-wrap">
        <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content" data-min="33" data-max="99"></div>
        <div className="range-slider">
          <div className="price-input">
            <p>Price:</p>
            <input type="text" id="minamount" />
            <input type="text" id="maxamount" />
          </div>
        </div>
      </div>
      <a href="#">Filter</a>
    </div>
  );
};

const ShopSizes = () => {
  const sizes = ['xxs', 'xs', 'xs-s', 's', 'm', 'm-l', 'l', 'xl'];
  return (
    <div className="sidebar__sizes">
      <div className="section-title">
        <h4>Shop by size</h4>
      </div>
      <div className="size__list">
        {sizes.map((size, index) => (
          <label key={index} htmlFor={size}>
            {size}
            <input type="checkbox" id={size} />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

const ShopColors = () => {
  const colors = [
    { id: 'black', name: 'Blacks' },
    { id: 'whites', name: 'Whites' },
    { id: 'reds', name: 'Reds' },
    { id: 'greys', name: 'Greys' },
    { id: 'blues', name: 'Blues' },
    { id: 'beige', name: 'Beige Tones' },
    { id: 'greens', name: 'Greens' },
    { id: 'yellows', name: 'Yellows' },
  ];

  return (
    <div className="sidebar__color">
      <div className="section-title">
        <h4>Shop by color</h4>
      </div>
      <div className="size__list color__list">
        {colors.map((color) => (
          <label key={color.id} htmlFor={color.id}>
            {color.name}
            <input type="checkbox" id={color.id} />
            <span className="checkmark"></span>
          </label>
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({ images, label, name, basePrice, skus, price, isSale, oldPrice,id }) => {
  console.log(id, "imageeeee");

  return (
    <Link to={`/product/${id}`}>
    <div className={`product__item ${isSale ? 'sale' : ''}`}>
      <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${images[0].url})` }}>
        <div className="label bg-green-600">New</div>
        <ul className="product__hover">
          <li><a href={images[0].url} className="image-popup"><span className="arrow_expand"><IoMdResize /></span></a></li>
          <li><a href="#"><span className="icon_heart_alt"><FaHeart /></span></a></li>
          <li><a href="#"><span className="icon_bag_alt"><FaCartPlus /></span></a></li>
        </ul>
      </div>
      <div className="product__item__text">
        <h6><a href="#">{name}</a></h6>
        <div className="rating">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="product__price-container flex-row">
          <div className="product__price line-through">
            ${basePrice}
            {isSale && <span className="sale-price">${oldPrice}</span>}
          </div>

          {
            skus?.map((sku) => {

              return (

                <span>{sku?.price}</span>
              )
            })

          }
        </div>

      </div>

    </div>
    </Link>
  );
};

const AllProduct = () => {
  const { Product } = useProduct();
  console.log(Product, 'majnh');

  const products = [
    { image: 'img/shop/shop-1.jpg', label: 'New', name: 'Furry hooded parka', price: 59.0 },
    { image: 'img/shop/shop-2.jpg', name: 'Flowy striped skirt', price: 49.0 },
    { image: 'img/shop/shop-3.jpg', name: 'Croc-effect bag', price: 59.0 },
    { image: 'img/shop/shop-4.jpg', name: 'Dark wash Xavi jeans', price: 59.0 },
    { image: 'img/shop/shop-5.jpg', name: 'Ankle-cuff sandals', price: 49.0, isSale: true, oldPrice: 59.0 },
    { image: 'img/shop/shop-6.jpg', name: 'Contrasting sunglasses', price: 59.0 },
    { image: 'img/shop/shop-7.jpg', name: 'Circular pendant earrings', price: 59.0 },
    { image: 'img/shop/shop-8.jpg', label: 'Out Of Stock', name: 'Cotton T-Shirt', price: 59.0 },
  ];

  return (
    <section className="shop spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <ShopSidebar />
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="row">
              {Product.map((product, index) => (
                <div className="col-lg-4 col-md-6" key={index}>
                  <ProductItem {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
