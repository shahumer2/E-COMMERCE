import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BannerSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true
    };

    return (
        <section className="banner set-bg" style={{ backgroundImage: `url('img/banner/banner-1.jpg')` }}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-7 col-lg-8 m-auto">
                        <Slider {...settings}>
                            <div className="banner__item">
                                <div className="banner__text">
                                    <span>The Chloe Collection</span>
                                    <h1>The Project Jacket</h1>
                                    <a href="#">Shop now</a>
                                </div>
                            </div>
                            <div className="banner__item">
                                <div className="banner__text">
                                    <span>The Chloe Collection</span>
                                    <h1>The Project Jacket</h1>
                                    <a href="#">Shop now</a>
                                </div>
                            </div>
                            <div className="banner__item">
                                <div className="banner__text">
                                    <span>The Chloe Collection</span>
                                    <h1>The Project Jacket</h1>
                                    <a href="#">Shop now</a>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BannerSection;
