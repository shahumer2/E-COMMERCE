import React from 'react';
import { FaStar } from "react-icons/fa";

const Rating = ({ value }) => {
    const totalStars = 5;
    return (
        <div className="rating flex-row">
            {[...Array(totalStars)].map((_, index) => (
                <FaStar
                    key={index}
                    color={index < value ? "orange" : "grey"}
                />
            ))}
        </div>
    );
};

export default Rating;
