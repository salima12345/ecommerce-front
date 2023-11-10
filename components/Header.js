import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState,useEffect} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import Image from "next/image";
import Input from "./Input";
import { primary } from "@/lib/colors";
import CartIcon from "./icons/CartIcon";
import { IoSearch } from "react-icons/io5";

const StyledHeader = styled.header`
border-bottom: 2px solid #d4d4d4;
box-shadow: 0 2px 4px #d4d4d4 ;
position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color:#f2f2f2;



  
`;

const Wrapper = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 padding: 20px 0;
 align-items:center;
 width:92.5%;


 @media (max-width: 1024px) {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

}
`;


const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
  color:#8CB7F5;
  font-size:1.5rem;
  display:flex;
align-items:center;
gap:10px;
font-weight:bold;
@media (max-width: 1024px){
  font-size:1rem;
  order: 1;


}
`;
const Search=styled.div`
width:78%;
position:relative;
height:45px;
display:flex;
position:relative;
margin-right:170px;
@media (max-width: 1024px){
    margin-right: 0;
    order: 2; 

}




`;
const ButtonSearch=styled.button`
position:absolute;
top: 0;
  right: 0;
  height: 90%;
  padding: 5px 10px;
  font-weight:bold;
  color:#fff;
  cursor:pointer;


  border-radius: 0 10px 10px 0;
  background-color:${primary};
  border:none;
  svg {
    color: #fff;
  }
  

`;





const CartCount=styled.button`
border-radius:50%;
with:15px;
border:none;
color:#ffffff;
transform:translate(-20%,-50%);

background-color:${primary};
`;
const NavIcon=styled(Link)`
display:flex;
color: #696969;
font-weight: 500;
transition: color 0.3s ease;
margin-right:80px;

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
  transform:translate(90%,-95%);
  margin-left:55%;
  position:relative;
 }

`;



export default function Header({ isSuccess }) {
  const {cartProducts} = useContext(CartContext);
  const [searchItem, setSearchItem] = useState("");
  const [cartItemCount, setCartItemCount] = useState(cartProducts.length);

  useEffect(() => {
    let totalQuantity = 0;
    for (let product of cartProducts) {
      totalQuantity += product.quantity;
    }
    setCartItemCount(totalQuantity);
  }, [cartProducts]);
  

  function handleSearch(){
    e.preventDefault();
  }
 

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
            <Logo href={'/'}>
         
              Brand           
               </Logo>
                 <Search onSubmit={handleSearch}>
                 <Input 
                  type="text"
                   placeholder="Search"
                   value={searchItem}
                   onChange={(e) => setSearchItem(e.target.value)}
                   />
                  <ButtonSearch >
                  <IoSearch size={20} color="#fff" />
                   </ButtonSearch>

                </Search>

          
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