import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ProductBoxWrapper = styled.div`
  background-color: #fff;
  border-radius:10px;
  padding: 20px;
  height: 248px;
  width: 189px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:15px;
  position: relative;
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color:#ffffff;
    transform: translateY(-5px);
  }
  a{
    text-decoration:none;
  }
`;

const ProductImage = styled.div`
  height: 140px;
  img {
    max-width: 120px;
    max-height: 120px;
  }
`;

const Title = styled.h2`
  color: #1c1c1c;
  font-size: 16px;
  font-weight: 500;
  height: 25px;
`;

const DiscountRow = styled.div`
  height: 28px;
  padding: 3px 13px 4px 13px;
  background-color: #ffe3e3;
  color: #eb001b;
  border-radius: 29px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  width: 50px;
  position: absolute; 
  top: 1%; 
  right: 5%;
`;
const Price = styled.div`
  font-size: 16px;
  color: #2c7cf1;
  font-weight: 500;
`;

const OldPrice = styled.div`
  font-size: 14px;
  color: #777777;
  text-decoration: line-through;
`;


const DiscountInfo = styled.div``;

export default function SaleProductBox({_id, title, images, discountPercentage, price }) {
  const getProductUrl = (productId) => {
    return `/product/${productId}`;
  };
  const truncatedTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;

  return (
    <ProductBoxWrapper>
      <Link href={getProductUrl(_id)}>
        <ProductImage>
          <DiscountRow>-% {discountPercentage}</DiscountRow>
          <img src={images?.[0]} alt="" />
        </ProductImage>
      </Link>
      <DiscountInfo>
        <Link href={getProductUrl(_id)}>
          <Title>{truncatedTitle}</Title>
        </Link>
        <Link href={getProductUrl(_id)}>
          <Price>
            MAD {(
              price -
              (price * discountPercentage) / 100
            ).toFixed(2)}
          </Price>
        </Link>
        <Link href={getProductUrl(_id)}>
          <OldPrice>MAD {price}</OldPrice>
        </Link>
      </DiscountInfo>
    </ProductBoxWrapper>
  );
}
