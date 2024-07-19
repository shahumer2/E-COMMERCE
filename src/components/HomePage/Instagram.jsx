import React from 'react';

const InstagramSection = () => {
    const instagramItems = [
        { id: 1, image: 'img/instagram/insta-1.jpg', link: '@ashion_shop' },
        { id: 2, image: 'img/instagram/insta-2.jpg', link: '@ashion_shop' },
        { id: 3, image: 'img/instagram/insta-3.jpg', link: '@ashion_shop' },
        { id: 4, image: 'img/instagram/insta-4.jpg', link: '@ashion_shop' },
        { id: 5, image: 'img/instagram/insta-5.jpg', link: '@ashion_shop' },
        { id: 6, image: 'img/instagram/insta-6.jpg', link: '@ashion_shop' },
    ];

    return (
        <div className="instagram">
            <div className="container-fluid">
                <div className="row">
                    {instagramItems.map(item => (
                        <div key={item.id} className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div className="instagram__item" style={{ backgroundImage: `url(${item.image})` }}>
                                <div className="instagram__text">
                                    <i className="fa fa-instagram"></i>
                                    <a href="#">{item.link}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstagramSection;
