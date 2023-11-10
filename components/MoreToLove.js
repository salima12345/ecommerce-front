
import styled from "styled-components";
import Center from "./Center";
import ItemsBox from "./ItemsBox";
import ItemsGrid from "./ItemsGrid";
import { useState } from "react";

const Items=styled.div`
margin-top:30px;
margin-bottom:70px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:95.3%
`;
const TitleItems=styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-bottom:70px;
margin-top:50px;
`;
const StyledTitle=styled.div`
display:flex;
justify-content:center;
align-items:center;

span{
background-color: #ccc;
    width:150px;
    height:1px;
    
}
`;
const Title=styled.h2`
margin-left:15px;
    margin-right:15px;

`;
const ViewMoreBtn=styled.button`
background: linear-gradient(128deg, #2C7CF1 0%, rgba(0, 209, 255, 0.50) 100%);
color:#ffffff;
font-weight:500;
border-radius:20px;
font-size:20px;
padding:10px;
border:none ;
cursor:pointer;
width:200px;
margin-top:60px;
`;



export default function MoreToLove({ productItems }) {
  const [visibleProducts, setVisibleProducts] = useState(15); 

  const handleViewMoreClick = () => {
    if (visibleProducts + 5 <= productItems.length) {
      setVisibleProducts((prevCount) => prevCount + 5); 
    } else {
      setVisibleProducts(productItems.length); 
    }
  };

  const handleViewLessClick = () => {
    setVisibleProducts(15); 
  };

  return (
    <Center>
      <Items>
        <TitleItems>
          <StyledTitle>
            <span></span>
            <Title>More To Love</Title>
            <span></span>
          </StyledTitle>
        </TitleItems>

        <ItemsGrid products={productItems.slice(0, visibleProducts)}></ItemsGrid>

        {visibleProducts < productItems.length ? (
          <ViewMoreBtn onClick={handleViewMoreClick}>View more</ViewMoreBtn>
        ) : (
          <ViewMoreBtn onClick={handleViewLessClick}>View less</ViewMoreBtn>
        )}
      </Items>
    </Center>
  );
}
