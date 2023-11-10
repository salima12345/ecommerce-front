import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import SallersProductBox from './SallersProductBox';
import { CartContext } from './CartContext';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const StyledNewSales=styled.div`
width:92.5%;

display: flex;
flex-direction:column;

margin-top:100px;
border-radius:10px;

gap:0;
@media (max-width: 1024px){
  margin-top:60px;
}

`;

const Title=styled.h1`
font-size: 20px;
font-weight: 600;
span{
  color:#1F74D3;
}
@media (max-width: 1024px){
  font-weight: 500;
  font-size: 16px;



}


`;


const MoreLink=styled.a`
cursor:pointer;
color:black;
font-weight:500;
font-size:16px;
@media (max-width: 1024px){
  display:none;
}

`;

const TitleBarre = styled.div`
width: 100%;
box-sizing: border-box;background: linear-gradient(128deg, rgba(0, 209, 255, 0.50) 0%, #2C7CF1 100%);
border-radius:7px 7px 0 0;
padding: 10px;
display:flex;
justify-content:space-between;
align-items:center;
 flex-direction: column;
  align-items:flex-start;
  padding: 5px;
  height: 50px;
justify-content:flex-start;
`;

const ProductsRow = styled.div`
width: 100%;
box-sizing: border-box;
height:300px;

  
  background-color:#fff;
  @media (max-width: 1024px){



  }
`;
const SallerItems = styled(Carousel)`
  .react-multi-carousel-item {
  }
`;

const carouselResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};




export default function TopSallers({  mostSoldProducts }) {
  
 
  return (
    <div>
      <Center>
          <StyledNewSales>
          <TitleBarre>
              <Title>
               Top Sallers this month
              </Title>
             
              <MoreLink>View more</MoreLink>
          </TitleBarre>
        
      
          <ProductsRow>
          <SallerItems 
          responsive={carouselResponsive}
          >
            {mostSoldProducts?.length > 0 &&
                mostSoldProducts.map((item) => (
                  <SallersProductBox key={item._id} {...item} />
                ))}
            </SallerItems>
      
              </ProductsRow>
            </StyledNewSales>

      </Center>
    </div>
  );
}
