import styled from "styled-components";

import Link from "next/link";

const ItemsWrapper=styled.div`
width: 200px;
height: 270px;
background-color:#ffffff;
border-radius:7px;
border:1px solid #E0E0E0;
transition: box-shadow 0.3s ease;

&:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}
@media (max-width: 1024px){
  position:relative;
  width:150px;
  height:200px;
  text-align:center;
}

`;
const ItemInfo=styled.div`
padding-left:20px;
margin-top:30px;
@media (max-width: 1024px){
  margin-top:10px;
  padding-left:10px;

}
`;
const ItemImage=styled(Link)`
display: flex;
width: 140px;
height: 110px;
padding: 14.222px 0px 0px 24.889px;
justify-content: center;
align-items: center;
img{
  width:100%;
height:100%
}
@media (max-width: 1024px){
  position:relative;
  height:80px;
  padding:10px;

  img{
    width:60%;
    height:60%;
  }
}
`;
const Price=styled(Link)`
font-size: 16px;
font-weight: 700;
text-decoration:none;
display:block;
color: #2c7cf1;
`;
const Title=styled(Link)`
text-decoration:none;
display:block;

font-size: 16px;
font-weight: 500;
color:black;
height:40px;
@media (max-width: 1024px){
  height:45px;
}
`;
const OldPrice=styled.div`
font-size: 14px;
  color: #777777;
  text-decoration: line-through;
`;



export default function ItemsBox({_id, images, title,price, rating, sale, discountPercentage}) {
  const url = '/product/'+ _id;
  const truncatedTitle = title.length > 25 ? `${title.substring(0, 25)}...` : title;

  const discountedPrice = sale ? price - (price * discountPercentage) / 100 : null;
  return (
    <ItemsWrapper>
        <ItemImage href={url}>
          <img src={images?.[0]} alt="" />
        </ItemImage>
       
      <ItemInfo>
          <Title href={url}>{truncatedTitle}  </Title>
          {sale ? (
          <>
            <div>
              <OldPrice href={url}>MAD{price.toFixed(2)}</OldPrice>
            </div>
            <div>
              <Price href={url}>MAD{discountedPrice.toFixed(2)}</Price> 
            </div>
          </>
        ) : (
          <Price href={url}>MAD{price}</Price>
        )}
      </ItemInfo>
    </ItemsWrapper>
  );
}

