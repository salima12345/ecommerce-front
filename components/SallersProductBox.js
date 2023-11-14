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


const Price = styled.div`
  font-size: 16px;
  color: #2c7cf1;
  font-weight: 500;
`;





export default function SallersProductBox({_id, title, images, discountPercentage,price }) {
  const getProductUrl = (productId) => {
    return `/product/${productId}`;
  };
  const truncatedTitle = title.length > 20 ? `${title.substring(0, 20)}...` : title;

  return (
    <ProductBoxWrapper>
      <Link href={getProductUrl(_id)}>
      <ProductImage>

<img src={images?.[0]} alt="" />
</ProductImage>
      </Link>
      <Link href={getProductUrl(_id)}>
      <Title>{truncatedTitle}</Title>

      </Link>
      <Link href={getProductUrl(_id)}>
      <Price>
                      MAD
                      {(
                        price -
                        (price * discountPercentage) / 100
                      ).toFixed(2)}
                    </Price>
      
      </Link>
     
        


       
  
    </ProductBoxWrapper>
  );
}
