import React from 'react';
import ReactStars from 'react-rating-stars-component';

export default function StarRatingComponent({ rating, changeRating }) {
  return (
    <ReactStars
      count={5}
      value={rating}
      onChange={(newRating) => changeRating(newRating)}
      size={24}
      activeColor="#ffd700"
    />
  );
}
