import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
    const [selectedSize,setSelectedSize]=useState(product.properties.Size[0]);
    const handleColorClick = (colorName) => {
        setSelectedColor(colorName);
      };
      const handleSizeClick=(size)=>{
        setSelectedSize(size);
      }
  return (
    <ProductContext.Provider
      value={{
        selectedColor,
        handleColorClick,
        setSelectedColor,
        selectedSize,
        setSelectedSize,
        handleSizeClick
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
