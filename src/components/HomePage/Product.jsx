import React, { useState } from 'react';
import useProduct from '../../hooks/useProduct';

const ProductSection = () => {
    const [filter, setFilter] = useState('*');

    const handleFilterClick = (filter) => {
        setFilter(filter);
    };

    const {Product} = useProduct();
    console.log(Product,'lolo');

    const products = [
        { id: 1, category: 'women', image: 'product-1.jpg', label: 'New', name: 'Buttons tweed blazer', price: 59.0, rating: 5 },
        { id: 2, category: 'men', image: 'product-2.jpg', name: 'Flowy striped skirt', price: 49.0, rating: 5 },
        { id: 3, category: 'accessories', image: 'product-3.jpg', label: 'out of stock', name: 'Cotton T-Shirt', price: 59.0, rating: 5 },
        { id: 4, category: 'cosmetic', image: 'product-4.jpg', name: 'Slim striped pocket shirt', price: 59.0, rating: 5 },
        { id: 5, category: 'kid', image: 'product-5.jpg', name: 'Fit micro corduroy shirt', price: 59.0, rating: 5 },
        { id: 6, category: 'women', image: 'product-6.jpg', label: 'Sale', name: 'Tropical Kimono', price: 49.0, oldPrice: 59.0, rating: 5 },
        { id: 7, category: 'accessories', image: 'product-7.jpg', name: 'Contrasting sunglasses', price: 59.0, rating: 5 },
        { id: 8, category: 'cosmetic', image: 'product-8.jpg', label: 'Sale', name: 'Water resistant backpack', price: 49.0, oldPrice: 59.0, rating: 5 }
    ];

    const filteredProducts = filter === '*' ? products : products.filter(product => product.category === filter);

    return (
        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="section-title">
                            <h4>New product</h4>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <ul className="filter__controls">
                            <li className={filter === '*' ? 'active' : ''} onClick={() => handleFilterClick('*')}>All</li>
                            <li className={filter === 'women' ? 'active' : ''} onClick={() => handleFilterClick('women')}>Women’s</li>
                            <li className={filter === 'men' ? 'active' : ''} onClick={() => handleFilterClick('men')}>Men’s</li>
                            <li className={filter === 'kid' ? 'active' : ''} onClick={() => handleFilterClick('kid')}>Kid’s</li>
                            <li className={filter === 'accessories' ? 'active' : ''} onClick={() => handleFilterClick('accessories')}>Accessories</li>
                            <li className={filter === 'cosmetic' ? 'active' : ''} onClick={() => handleFilterClick('cosmetic')}>Cosmetics</li>
                        </ul>
                    </div>
                </div>
                <div className="row property__gallery">
                    {filteredProducts.map(product => (
                        <div key={product.id} className={`col-lg-3 col-md-4 col-sm-6 mix ${product.category}`}>
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url('/img/product/${product.image}')` }}>
                                    {product.label && <div className={`label ${product.label.toLowerCase().replace(' ', '')}`}>{product.label}</div>}
                                    <ul className="product__hover">
                                        <li><a href={`/img/product/${product.image}`} className="image-popup"><span className="arrow_expand"></span></a></li>
                                        <li><a href="#"><span className="icon_heart_alt"></span></a></li>
                                        <li><a href="#"><span className="icon_bag_alt"></span></a></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6><a href="#">{product.name}</a></h6>
                                    <div className="rating">
                                        {Array.from({ length: product.rating }, (_, i) => <i key={i} className="fa fa-star"></i>)}
                                    </div>
                                    <div className="product__price">${product.price.toFixed(1)} {product.oldPrice && <span>${product.oldPrice.toFixed(1)}</span>}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductSection;
