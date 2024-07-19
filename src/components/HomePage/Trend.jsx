import React from 'react';

const TrendSection = () => {
    const trends = [
        {
            title: "Hot Trend",
            items: [
                {
                    imgSrc: "img/trend/ht-1.jpg",
                    title: "Chain bucket bag",
                    price: "$ 59.0",
                    rating: 5,
                },
                {
                    imgSrc: "img/trend/ht-2.jpg",
                    title: "Pendant earrings",
                    price: "$ 59.0",
                    rating: 5,
                },
                {
                    imgSrc: "img/trend/ht-3.jpg",
                    title: "Cotton T-Shirt",
                    price: "$ 59.0",
                    rating: 5,
                },
            ],
        },
        {
            title: "Best seller",
            items: [
                {
                    imgSrc: "img/trend/bs-1.jpg",
                    title: "Cotton T-Shirt",
                    price: "$ 59.0",
                    rating: 5,
                },
                {
                    imgSrc: "img/trend/bs-2.jpg",
                    title: "Zip-pockets pebbled tote briefcase",
                    price: "$ 59.0",
                    rating: 5,
                },
                {
                    imgSrc: "img/trend/bs-3.jpg",
                    title: "Round leather bag",
                    price: "$ 59.0",
                    rating: 5,
                },
            ],
        },
        {
            title: "Feature",
            items: [
                {
                    imgSrc: "img/trend/f-1.jpg",
                    title: "Bow wrap skirt",
                    price: "$ 59.0",
                    rating: 5,
                },
                {
                    imgSrc: "img/trend/f-2.jpg",
                    title: "Metallic earrings",
                    price: "$ 59.0",
                    rating: 5,
                },
                {
                    imgSrc: "img/trend/f-3.jpg",
                    title: "Flap cross-body bag",
                    price: "$ 59.0",
                    rating: 5,
                },
            ],
        },
    ];

    return (
        <section className="trend spad">
            <div className="container">
                <div className="row">
                    {trends.map((trend, index) => (
                        <div key={index} className="col-lg-4 col-md-4 col-sm-6">
                            <div className="trend__content">
                                <div className="section-title">
                                    <h4>{trend.title}</h4>
                                </div>
                                {trend.items.map((item, idx) => (
                                    <div key={idx} className="trend__item">
                                        <div className="trend__item__pic">
                                            <img src={item.imgSrc} alt={item.title} />
                                        </div>
                                        <div className="trend__item__text">
                                            <h6>{item.title}</h6>
                                            <div className="rating">
                                                {[...Array(item.rating)].map((star, i) => (
                                                    <i key={i} className="fa fa-star"></i>
                                                ))}
                                            </div>
                                            <div className="product__price">{item.price}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendSection;
