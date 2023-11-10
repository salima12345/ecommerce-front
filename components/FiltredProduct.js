import styled from "styled-components";
import ItemsBox from "./ItemsBox";

const StyledProductsGrid = styled.div`
  display: grid;
  width:98%;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  @media (max-width: 1024px){
    grid-template-columns: 1fr 1fr ;
    gap: 10px;


    
  }

 
`;

export default function FiltredProduct({ products }) {
    return (
      <StyledProductsGrid>
        {products?.length > 0 &&
          products.map(product => (
            <ItemsBox key={product._id} {...product} />
          ))}
      </StyledProductsGrid>
    );
  }