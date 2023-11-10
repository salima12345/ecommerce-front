import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const DealItemsContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const Item = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width: 100px;
  height: 125px;

  img {
    width: 100px;
    border-radius: 10px;
    height: 80px;
  }
`;

const Price = styled.div`
  border-radius: 20px;
  background-color: #2c7cf1;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  z-index: 2;
  position: relative;
  width: 100px;
  z-index: 2;
  position: relative;
  width: 100px;
  transform: translate(-10%, -40%);

  padding: 5px 10px;
`;

const OldPrice = styled.div`
  font-size: 16px;
  color: #777777;
  text-decoration: line-through;
  transform: translate(10%, -40%);
`;

const responsiveMultiCarousel = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function DealItems({ productsOnSale }) {
  return (
    <DealItemsContainer>
      <Carousel responsive={responsiveMultiCarousel}>
        {productsOnSale.map((product) => (
          <Item key={product._id}>
            <img src={product.images[0]} alt={product.title} />
            <Price>
              MAD
              {(
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
            </Price>
            <OldPrice>MAD{product.price}</OldPrice>
          </Item>
        ))}
      </Carousel>
    </DealItemsContainer>
  );
}

export default DealItems;
