import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);
  useEffect(() => {
    if (isSuccess) {
      setCartProducts([]);
      ls?.setItem('cart', JSON.stringify([]));
    }
  }, [isSuccess]);
  
  
  
  
  function AddProduct(productId, color, size,rom) {
    const existingProductIndex = cartProducts.findIndex(
      (product) => product.id === productId && product.color === color && 
      ((size && product.size === size) || !size) &&
      ((rom && product.rom === rom) || !rom) 


         );

    if (existingProductIndex !== -1) {
      const updatedCart = cartProducts.map((product, index) =>
        index === existingProductIndex
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      setCartProducts(updatedCart);
    } else {
      const productInfo = { id: productId, color, quantity: 1 };
      if (size) {
        productInfo.size = size;
      }   
      if(rom){
        productInfo.rom = rom;

      }
      setCartProducts([...cartProducts, productInfo]); 
    }
  }
  
  





  function removeProduct(productId) {
    setCartProducts(prev => {
      const updatedCart = [...prev];
      const productIndex = updatedCart.findIndex(item => item.id === productId);
  
      if (productIndex !== -1) {
        const product = { ...updatedCart[productIndex] };
  
        if (product.quantity > 1) {
          product.quantity -= 1;
          updatedCart[productIndex] = product;
        } else {
          updatedCart.splice(productIndex, 1);
        }
      }
  
      return updatedCart;
    });
  }
  function more(id, color, size) {
    setCartProducts((prevCart) => {
      const updatedCart = prevCart.map((product) => {
        if (product.id === id && product.color === color && product.size === size) {

          return { ...product, quantity: product.quantity + 1 };

        }
        setCartProducts( updatedCart);

        return product;
      });
      return updatedCart;
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function clearCart() {
    setCartProducts([]);
  }
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,AddProduct,more,removeProduct,clearCart, isSuccess, setIsSuccess}}>
      {children}
    </CartContext.Provider>
  );
}