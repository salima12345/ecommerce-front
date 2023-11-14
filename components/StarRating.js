import React, { useState } from 'react';

import Rating from '@mui/material/Rating';
export default function StarRatingComponent({ rating, changeRating }) {
 return (
  <Rating
  name="rating"
  value={rating}
  onChange={(event, newValue) => {
    changeRating(newValue);
  }}
/>
 );
}
