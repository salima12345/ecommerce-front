import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState,useRef } from "react";
import styled from "styled-components";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'



const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

  }
  gap: 30px;
  margin-top: 10rem;
  margin-right:7rem
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const BoxInfo = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  height:25rem;
`;

const ProductContainer=styled.div`
display :flex;
gap:20px;
border: 1px solid rgba(0, 0, 0, 0.1);
border-radius:7px;

`;
const ProductInfo = styled.div`
padding:10px;

`;
const ProductTitle=styled.div`
width:25rem;
font-weight:500;
margin-bottom:10px;
color:#565959;
font-size:20px;
display:flex;
justify-content:space-between;
align-items:center;
`;

const ProductImageBox = styled.div`

width: 70px;
    height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px 0px 0px 7px;
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 200px;
    height: 210px;
    img{
      max-width: 190px;
      max-height: 120px;
    }
  }
`;
const Quantity=styled.div`
span{
  color:#565959;
font-size:16px;
font-weight:500;
margin-right:10px;



}
`;
const Properties=styled.div`
span{
  color:#565959;
font-size:16px;
font-weight:500;
margin-right:10px;




}
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;
const Price=styled.div`
color:#0F1111;
font-size:18px;
font-weight:700;
`;
const Total=styled.div`
text-align:right;
margin-top:20px;

span{
  width:25rem;
font-weight:500;
margin-bottom:10px;
color:#565959;
font-size:20px;
}
`;

const Input=styled.input`
width:98%;
height:30px;
 border:1px solid #ccc;
 border-radius:7px;
 margin-bottom:10px;
 padding:5px;

`;


 


export default function CartPage() {
    const {cartProducts,setCartProducts,more,removeProduct,clearCart,isSuccess,setIsSuccess} = useContext(CartContext);
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    
    const [products,setProducts] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const [streetAddress,setStreetAddress] = useState('');
    const [country,setCountry] = useState('');
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const cityRef = useRef(null);
    const postalCodeRef = useRef(null);
    const streetAddressRef = useRef(null);
    const countryRef = useRef(null);

    useEffect(() => {
      if (nameRef.current) {
          nameRef.current.focus();
      }
  }, []);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart && storedCart.length > 0) {
      setCartProducts(storedCart);
    } else {
      setIsCartEmpty(true);
    }
  }, []);

  useEffect(() => {
    if (cartProducts.length === 0) {
      localStorage.removeItem('cart');
      setIsCartEmpty(true);
    } else {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      setIsCartEmpty(false);
      console.log(cartProducts);

    }
  }, [cartProducts]);
  

   



    useEffect(() => {
        if (cartProducts.length > 0) {
          axios.post('/api/cart', { ids: cartProducts })
            .then(response => {
              setProducts(response.data);
            });
        }else{
            setProducts([]);
        }
      }, [cartProducts]);
      useEffect(() => {
        if (typeof window === 'undefined') {
          return;
        }
        if (window?.location.href.includes('success')) {
          setIsSuccess(true);         
           clearCart();


        }
      }, [isSuccess]);
     
    
      
      
      
      
  function less(id){
    removeProduct(id);
  }
  function handleRemove(index) {
    const updatedCartProducts = [...cartProducts];
    updatedCartProducts.splice(index, 1);
    setCartProducts(updatedCartProducts);
    if (updatedCartProducts.length === 0) {
      setIsCartEmpty(true);
      clearCart();
    }
  }
  
  
  
  
  
  
  
  
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  
  let total = 0;

  cartProducts.forEach((cartProduct) => {
    const product = products.find((p) => p._id === cartProduct.id);

    if (product) {
      total += product.price * cartProduct.quantity;
    }
  });

  
  
    if (isSuccess) {
      return (
        
        <>
          <Header isSuccess={true} />
          <Center>
            <ColumnsWrapper>
              <Box>
                <h1>Thanks for your order!</h1>
                <p>We will email you when your order will be sent.</p>
              </Box>
            </ColumnsWrapper>
          </Center>
        </>
      );
    }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <>
          {isCartEmpty && cartProducts.length === 0 && (
        <h2>Your Cart is empty</h2>
      )}
    
        {cartProducts.length > 0 &&(
          <>
 <h2>Shopping Cart</h2>
 {products.map(product => {
  const productInCart = cartProducts.filter(productInCart => 
    productInCart.id === product._id && 
    productInCart.color === productInCart.color && 
    (( productInCart.size === productInCart.size) || !productInCart.size)&&
    ((productInCart.rom === productInCart.rom) || !productInCart.rom)

    );
  return (
    <>
    {productInCart.map((productInCart, index) => (
      

      <ProductContainer key={`${product._id}-${productInCart.color}-${productInCart.size}-${index}`}>
          <ProductImageBox>

         {product.colors.map((color, index)=> {
      if (color.name === productInCart.color) {
        return <img  key={index} src={color.images[0]} alt="" />;
      }
      return null;
    })}
  </ProductImageBox>
        <ProductInfo>
          <ProductTitle>
            <p> {product.title}</p>
            <FontAwesomeIcon icon={faTrash} onClick={() => handleRemove(index)} color="red" cursor="pointer" />
          </ProductTitle>
          <Properties>
            <span>Price:</span>MAD{productInCart.quantity * product.price}
            <p><span>Color:</span> {productInCart.color}</p>
            {
              productInCart.size &&(
                <p><span>Size: </span>{productInCart.size}</p>


              )
            }
            {
              productInCart.rom &&(
                <p><span>Rom: </span>{productInCart.rom}</p>


              )
            }

          </Properties>
          <Quantity>
            <span> Quantity:</span>
            <Button onClick={() => less(product._id)}>-</Button>
            <QuantityLabel>
            {productInCart.quantity}
            </QuantityLabel>
              <Button onClick={() => { console.log('Button clicked'); more(product._id, productInCart.color, productInCart.size); }}>+</Button>
          </Quantity>
        </ProductInfo>
      </ProductContainer>
      
      
     
    ))}
   
    </>
  );
})}



 </>
        )

        }

</>
<Total>
      <Price>  <span>Total cost:</span>   MAD {total}
       </Price>
    </Total>

          </Box>
          {!!cartProducts?.length && (
            <BoxInfo>
              <h2>Order information</h2>
              <Input
                                    ref={nameRef}
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    name="name"
                                    onChange={ev => setName(ev.target.value)}
                                />
                                <Input
                                    ref={emailRef}
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    name="email"
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                                <Input
                                    ref={cityRef}
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)}
                                />
                                <Input
                                    ref={postalCodeRef}
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)}
                                />
                                <Input
                                    ref={streetAddressRef}
                                    type="text"
                                    placeholder="Street Address"
                                    value={streetAddress}
                                    name="streetAddress"
                                    onChange={ev => setStreetAddress(ev.target.value)}
                                />
                                <Input
                                    ref={countryRef}
                                    type="text"
                                    placeholder="Country"
                                    value={country}
                                    name="country"
                                    onChange={ev => setCountry(ev.target.value)}
                                />
                                <input type="hidden" name="products" value={cartProducts.join(',')} />
              <Button primary block onClick={goToPayment}>Continue To payment</Button>
            </BoxInfo>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
