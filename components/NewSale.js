import React from 'react';
import styled from 'styled-components';
import Center from './Center';
import SaleProductBox from './SaleProductBox';
import { CartContext } from './CartContext';
import Countdown from './CountDown';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const StyledNewSales=styled.div`
width:100%;

display: flex;
flex-direction:column;

margin-top:100px;
border-radius:10px;

gap:0;
@media (max-width: 1024px){
  margin-top:150px;
  width:150%;
  position:relative


}
`;


const Deadline=styled.div`
background: linear-gradient(128deg, rgba(0, 209, 255, 0.50) 0%, #2C7CF1 100%);
border-radius:7px 7px 0 0;
padding: 10px;
height: 50px;
width: 100%;
box-sizing: border-box;
display:flex;
justify-content:space-between;
align-items:center;
@media (max-width: 1024px) {
  flex-direction: column;
  align-items:flex-start;
  padding: 5px;
  height: 70px;
justify-content:flex-start;

}


`;
const Title=styled.h1`
font-size: 20px;
font-weight: 600;
span{
  color:#1F74D3;
}
@media (max-width: 1024px) {
  font-weight: 500;
  font-size: 16px;


}




`;
const Title2=styled.h2`
font-size: 20px;
font-weight: 400;
color:black;
@media (max-width: 1024px) {
  font-weight: 200;
  font-size: 14px;


}
`;
const DealCounter=styled.div`
display:flex;
align-items:center;
@media (max-width: 1024px) {
  order: 2;
  transform:translateY(-40%);
}

`;
const MoreLink=styled.a`
cursor:pointer;
color:black;
font-weight:500;
font-size:16px;
@media (max-width: 1024px) {
display:none;
}


`;

const DeadlineTitle = styled.div`
width: 100%;
`;

const ProductsRow = styled.div`
width: 100%;
box-sizing: border-box;height:300px;
  
  background-color:#fff;
  
`;
const SaleItems = styled(Carousel)`
  .react-multi-carousel-item {
    margin-right: 0px;
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




export default function NewSalesCategory({ productsOnSale ,targetDate}) {
 
 
  return (
    <div>
      <Center>
          <StyledNewSales>
          <DeadlineTitle>
            <Deadline>
              <Title>
                Deals <span>&</span> offers

              </Title>
              <DealCounter>
              <Title2>Finish in :</Title2>
              <Countdown targetDate={targetDate} />
              </DealCounter>
              <MoreLink>View more</MoreLink>
            </Deadline>
          </DeadlineTitle>
        
      
          <ProductsRow>
          <SaleItems 
          responsive={carouselResponsive}
          >
         
              {productsOnSale?.length > 0 &&
                productsOnSale.map((newSale) => (
                  <SaleProductBox key={newSale._id} {...newSale} />
                ))}
            </SaleItems>
      
              </ProductsRow>
            </StyledNewSales>

      </Center>
    </div>
  );
}
