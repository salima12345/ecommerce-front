import styled from "styled-components";
import ItemsBox from "./ItemsBox";

const StyledProductsGrid = styled.div`
  display: grid;
  width:98%;
  grid-template-columns: 1fr 1fr 1fr 1fr  1fr;
  gap: 20px;
  @media (max-width: 1024px){
    grid-template-columns: 1fr ;
    width:150%;
    position:relative;
    margin-left:160px;

    

  }
 
`;

export default function ItemsGrid({ products }) {
    return (
      <StyledProductsGrid>
        {products?.length > 0 &&
          products.map(product => (
            <ItemsBox key={product._id} {...product} />
          ))}
      </StyledProductsGrid>
    );
  }