import React from 'react';
import Header from './Header';
import Categories from './Categories';
import ProductSection from './Product';
import Footer from './Footer';
import SearchModel from './SearchModal';
import './Page.css'; // Assuming you import your CSS here
import BannerSection from './Banner';
import TrendSection from './Trend';
import DiscountSection from './Discount';
import ServicesSection from './Service';
import InstagramSection from './Instagram';

const HomePage = () => {
    return (
        <div>
           
            <Categories />
            <ProductSection />
            <BannerSection/>
            <TrendSection/>
            <DiscountSection/>
            <ServicesSection/>
            <InstagramSection/>
            {/* Add other sections/components here */}
           
            <SearchModel />
        </div>
    );
}

export default HomePage;
