import styled from "styled-components";
import ProductBox from "../components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: auto auto auto auto ;
    gap:0px;
  }
`;

export default function ProductGrid({ products }) {
    return (
      <StyledProductsGrid>
        {products?.length > 0 &&
          products.map(product => (
            <ProductBox key={product._id} {...product} />
          ))}
      </StyledProductsGrid>
    );
  }