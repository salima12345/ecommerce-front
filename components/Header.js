import Link from "next/link";
import styled from "styled-components";
import Center from "../components/Center";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../components/CartContext";
import { InstantSearch, SearchBox, Hits, Highlight ,connectStateResults} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { primary } from "../lib/colors";
import CartIcon from "./icons/CartIcon";
import 'instantsearch.css/themes/satellite.css';
import { useRouter } from 'next/router';



const searchClient = algoliasearch('GYDHMMRB18', '551fbcf2375d5d84c2ec468a964a9c65');

const getsubCategoryUrl = (categoryId) => {
  return `/subCategory/${categoryId}`;
};

const Hit = ({ hit }) => (
  <Link href={`/subCategory/${hit.category}`} style={{ textDecoration: 'none' }}>
    <div className="hit-title" style={{
      color: '#000',
      fontFamily: 'Space Grotesk',
      fontSize: '16px',
      fontStyle: 'normal',
      textDecoration: 'none',
      outline: 'none',
      fontWeight: 500,
    }}>
      <Highlight attribute="title" hit={hit} />
    </div>
  </Link>
);

const StyledHeader = styled.header`
  border-bottom: 2px solid #d4d4d4;
  box-shadow: 0 2px 4px #d4d4d4;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #f2f2f2;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  align-items: center;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  position: relative;
  z-index: 3;
  color: #8CB7F5;
  font-size: 1.5rem;
  margin-right: 5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  @media (max-width: 1024px) {
    font-size: 1rem;
    order: 1;
  }
`;

const Search = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 170px;

  @media (max-width: 1024px) {
    margin-right: 0;
    order: 2;
  }
`;

const StyledSearchBox = styled(SearchBox)`
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #8cb7f5;
    outline: none;
  }
`;

const StyledHit = styled(Hit)`
  color: #000;
  font-family: Space Grotesk;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
`;

const ButtonSearch = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 90%;
  padding: 5px 10px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  border-radius: 0 10px 10px 0;
  background-color: ${primary};
  border: none;
  svg {
    color: #fff;
  }
`;

const CartCount = styled.button`
  border-radius: 50%;
  border: none;
  color: #ffffff;
  transform: translate(-50%, -50%);
  background-color: ${primary};
`;

const NavIcon = styled(Link)`
  display: flex;
  color: #696969;
  font-weight: 500;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: #8cb7f5;
    cursor: pointer;
  }

  svg {
    width: 30px;
    height: 20px;
  }

  @media (max-width: 1024px) {
    order: 1;
    transform: translate(90%, -95%);
    margin-left: 55%;
    position: relative;
  }
`;

const Header = ({ isSuccess }) => {
  const router = useRouter();
  const { cartProducts } = useContext(CartContext);
  const [cartItemCount, setCartItemCount] = useState(cartProducts.length);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
 
  useEffect(() => {
  let totalQuantity = 0;
  for (let product of cartProducts) {
   totalQuantity += product.quantity;
  }
  setCartItemCount(totalQuantity);
  }, [cartProducts]);
 

 
  const CustomHits = connectStateResults(({ searchState, searchResults }) => {
    if (!searchState.query) {
    return null;
    }
    setSearchResults(searchResults);
    return searchResults && searchResults.nbHits > 0 ? (
    <div >
      <Hits hitComponent={Hit} />
    </div>
    ) : (
    <div>No results</div>
    );
   });
   
   const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      // Naviguer vers la page de la catégorie avec le premier résultat de la recherche
      router.push(getsubCategoryUrl(getCategoryIdFromHits(searchResults.hits)));
    }
  };
const getCategoryIdFromHits = (hits) => {
  if (hits.length > 0) {
    return hits[0].category;
  }
  return null;
 };
 
 
  return (
  <StyledHeader>
   <Center>
     <Wrapper>
       <Logo href={'/'}>
         Brand
       </Logo>
       <InstantSearch
         indexName="products"
         searchClient={searchClient}
       >
         <Search>
         <StyledSearchBox
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyPress={handleKeyPress} // Ajouter cette ligne
            value={searchQuery}
          />
           <CustomHits />
         </Search>
       </InstantSearch>
 
       <NavIcon href={'/cart'}>
         <CartIcon className="w-30 h-30" />
         <CartCount>
           {cartItemCount}
         </CartCount>
       </NavIcon>
     </Wrapper>
   </Center>
  </StyledHeader>
  );
 }
 
 export default Header;
