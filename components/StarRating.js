import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

export default function StarRating({ rating, changeRating }) {
  console.log('Rating:', rating);
  return (
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      changeRating={(newRating) => changeRating(newRating)}
      numberOfStars={5}
      name="rating"
      starDimension="20px"
    />
  );
}

