import Header from '../../components/Header'
import React from 'react';
import { Caterogy } from '../../models/Category';
import { mongooseConnect } from "../../lib/mongoose";
import styled from 'styled-components';
import { primary } from "../../lib/colors";
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import 'react-icons/ai';
import { useRef, useEffect } from 'react';

import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { useState } from 'react';
import FiltredProduct from '../../components/FiltredProduct';
import { Product } from '../../models/Product';
const Container=styled.div`
display:grid;
grid-template-columns:1fr 6fr;
width:100%;
gap:10rem;
position: relative;
@media (max-width: 1024px){
  grid-template-columns:2.5fr 1.5fr;


}


`;
const SideNav=styled.div`
height:100vh;
max-height: calc(100vh - 90px);
padding-right:70px;
Width:150px;
padding-left:70px;
overflow-y: auto; 
background-color:#ffffff;
position: fixed;
top: 5.3rem;

`;
const CatName=styled.h6`
font-size:16px;
font-weight:500;
transform:translateY(-60%);
cursor:pointer;
&:hover{
  color:${primary};
}

`;


const StyledList=styled.div`
list-style: none;
padding-left:19px;
transform:translateY(-10%);

`;
const ListItem=styled.p`
text-decoration: none;
cursor:pointer;
color:#222;
font-size:14px;
&:hover{
    color:${primary};
}

`;


const PriceRange=styled.div`
font-size:13px;
padding-top:10px;
font-weight:500;
`;

const ProductItems=styled.div`
padding-top: 6rem;
padding-left: 32rem;
@media (max-width: 1024px){
  padding-left: 21rem;
  padding-top: 6rem;



}





`;
const Products=styled.div`
margin-top:50px;
margin-right:80px;
`;
const HeadNav=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
transform:translateX(-10%);
width:55rem;

height:60px;
border-bottom: 2px solid #ccc;
@media (max-width: 1024px){
  flex-direction:column;
  position:relative;
  width:70%;
  margin-bottom:100px;
  justify-content:flex-start;
  align-items:flex-start;



}

`;
const SearchResult=styled.div`
padding:20px;
display:flex;
align-items:center;
p{
  font-weight:500;
}

`;
const SortBy=styled.div`
display:flex;
align-items:center;
p{
  font-weight:500;
}

`;

const SelectContainer=styled.div`
display:flex;
flex-direction:column;
position:relative;

`
const SelectBarre=styled.button`
display:flex;
align-items:center;
justify-content:space-between;
width:180px;
height:30px;
font-size:16px;
background-color: #fff;
border: 1px solid #ccc;
border-radius: 5px;


`;
const Options=styled.div`
position :absolute ;
background-color: #fff;
border-radius: 5px;
border: 1px solid #ccc;
width:170px;
margin-top:45px;
padding-left:10px;
p{
  cursor:pointer;
  color:#222;
font-size:14px;
&:hover{
    color:${primary};
}}`;
const Properties=styled.div`
ul li{
  text-decoration:none;
  list-style: none;
  transform:translateX(-30%);
  width:120px;



} 



`;
const CustomCheckbox = styled.input`
  cursor: pointer;
 
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  vertical-align: middle;
  
  

  &:hover {
    border-color:1px solid ${primary};
  }
`;
const MoreLessBtn=styled.p`
cursor:pointer;
color:${primary}
`;
  

 export default function ChildCategoryPage({category,subCategories,minPrice,maxPrice ,products}) {

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [isOpen,setIsOpen]=useState(false);
  const selectBarreRef = useRef(null);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);   

  
  const [selectedOption, setSelectedOption] = useState('Price High To Low'); 
  const [filteredProducts, setFilteredProducts] = useState(products);
  const properties = category.properties || [];
  const [selectedPropertyValues, setSelectedPropertyValues] = useState({});
  const [showAllPropertyValues, setShowAllPropertyValues] = useState(false);
  const propertiesWithValues = properties.map((property) => {
    return {
      name: property.name,
      values: property.values || [],
    };
  });


  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        isOpen &&
        selectBarreRef.current &&
        !selectBarreRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('click', handleDocumentClick);
  
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen]); 


  
  const sortProducts = (products, option) => {
    switch (option) {
      case 'Price High To Low':
        return products.slice().sort((a, b) => {
          const priceA = a.sale ? a.price - (a.price * a.discountPercentage) / 100 : a.price;
          const priceB = b.sale ? b.price - (b.price * b.discountPercentage) / 100 : b.price;
          return priceB - priceA;
        });
      case 'Price Low To High':
        return products.slice().sort((a, b) => {
          const priceA = a.sale ? a.price - (a.price * a.discountPercentage) / 100 : a.price;
          const priceB = b.sale ? b.price - (b.price * b.discountPercentage) / 100 : b.price;
          return priceA - priceB;
        });
      case 'Most Ordered':
        console.log('Tri par Most Ordered');
      
        return products.slice().sort((a, b) => b.countSales - a.countSales);



                 case 'Top Rated':
                  return products.slice().sort((a, b) => b.rating - a.rating);    
      default:
        return products;
    };}
  
  
    
  
  
  
  const filterProductsByPrice = (minPrice, maxPrice) => {
    return products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  };
  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  
    const [minPrice, maxPrice] = newPriceRange;
    const filteredByPrice = filterProductsByPrice(minPrice, maxPrice);
  
    if (selectedSubcategory) {
      const filtered = filteredByPrice.filter(
        (product) => product.category._id.toString() === selectedSubcategory._id.toString()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(filteredByPrice);
    }
  };
  const handleCategory=()=>{
    setFilteredProducts(products);
      setPriceRange([minPrice, maxPrice]);

    
  }


  

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const sortedProducts = sortProducts(filteredProducts, option);
    setFilteredProducts(sortedProducts);
    setIsOpen(false);
  };

  const handleSubcategoryClick = (subCategory) => {
    setSelectedSubcategory(subCategory);
    
    
  
    const filtered = products.filter((product) => {
     
      return product.category._id.toString() === subCategory._id.toString();
    });
    const subchildCategoryPrices = filtered.map((product) => product.price);
    const minPrice = Math.min(...subchildCategoryPrices);
    const maxPrice = Math.max(...subchildCategoryPrices);
    
    setFilteredProducts(filtered);
    setPriceRange([minPrice, maxPrice]);

  };
  const handleShowMoreClick = () => {
    setShowAllPropertyValues(true);
  };

  const handleShowLessClick = () => {
    setShowAllPropertyValues(false);
  };



  
  const handlePropertyValueClick = (propertyName, propertyValue) => {
      const selectedValues = { ...selectedPropertyValues };
    
      if (!selectedValues[propertyName]) {
        selectedValues[propertyName] = [];
      }
    
      const isValueSelected = selectedValues[propertyName].includes(propertyValue);
    
      if (isValueSelected) {
        selectedValues[propertyName] = selectedValues[propertyName].filter(
          (value) => value !== propertyValue
        );
       
      } else {
        selectedValues[propertyName].push(propertyValue);

      }
  
    setSelectedPropertyValues(selectedValues);
    if (Object.keys(selectedValues).every((key) => selectedValues[key].length === 0))  {
      setFilteredProducts(products); 


    }
    
    
  };
  
  
  useEffect(() => {
    let newFilteredProducts = products;
   
    for (const propertyName in selectedPropertyValues) {
      if (selectedPropertyValues.hasOwnProperty(propertyName)) {
        const selectedValues = selectedPropertyValues[propertyName];
   
        if (selectedValues.length > 0) {
          newFilteredProducts = newFilteredProducts.filter((product) => {
            if (
              product.properties &&
              product.properties.hasOwnProperty(propertyName)
            ) {
              const productValues = product.properties[propertyName].flat();
              return selectedValues.some((value) => productValues.includes(value));
            }
            return false;
          });
        }
      }
    }
   
    if (Object.values(selectedPropertyValues).every((values) => values.length === 0)) {
      newFilteredProducts = products;
    }
   
    setFilteredProducts(newFilteredProducts);
   }, [selectedPropertyValues, products]);
  
  
 

  useEffect(() => {
    const sortedProducts = sortProducts(products, 'Price High To Low');
    setFilteredProducts(sortedProducts);
  }, []);
  
  
  
  
  
  



  


















  
 
  return (
    <>
    <Header/>
        <Container>
            <SideNav>
                <h4>Categories</h4>
                <CatName
                 onClick={() => handleCategory()}
                >{category.name}</CatName>
                
                {subCategories && (
  <StyledList>
    {subCategories.map((subCategory) => {
      return (
        <ListItem
          key={subCategory._id}
          onClick={() => handleSubcategoryClick(subCategory)}
        >
          {subCategory.name}
        </ListItem>
      );
    })}
  </StyledList>
)}              
      
          <h4>Price</h4>
          <Slider
            min={minPrice}
            max={maxPrice}
            range
            defaultValue={priceRange}
            onChange={handlePriceChange}
          />
          <PriceRange>
             MAD{priceRange[0]} - MAD{priceRange[1]}
          </PriceRange>
          <Properties>
            {propertiesWithValues.length > 0 && (
              <div>
                {propertiesWithValues.map((property) => (
                  <div key={property.name}>
                    <h4>{property.name}</h4>
                    <ul>
                      {showAllPropertyValues
                        ? property.values.map((value) => (
                            <li key={value}>
                              <CustomCheckbox
                                type="checkbox"
                                value={value}
                                checked={(selectedPropertyValues[property.name] || []).includes(value)}
                                onChange={() => handlePropertyValueClick(property.name, value)}
                              />
                              {value}
                            </li>
                          ))
                        : property.values.slice(0, 7).map((value) => (
                            <li key={value}>
                              <CustomCheckbox
                                type="checkbox"
                                value={value}
                                checked={(selectedPropertyValues[property.name] || []).includes(value)}
                                onChange={() => handlePropertyValueClick(property.name, value)}
                              />
                              {value}
                            </li>
                          ))}
                    </ul>
                    {property.values.length > 7 && (
                      <MoreLessBtn onClick={showAllPropertyValues ? handleShowLessClick : handleShowMoreClick}>
                        {showAllPropertyValues ? 'View less' : 'View more'}
                      </MoreLessBtn>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Properties>
        
         

                
            
            </SideNav>

           
            <ProductItems>
              <HeadNav>
                <SearchResult>
                  <p> Results:</p>
                 {filteredProducts.length}
                </SearchResult>
                <SortBy>
                <p> Sort by :</p>
                 <SelectContainer>
                 <SelectBarre
                  ref={selectBarreRef} 
                 onClick={()=>setIsOpen((prev)=>!prev)}
                 >
<p>{selectedOption}</p>
                  {!isOpen ?(
                    <AiOutlineCaretDown></AiOutlineCaretDown>
                  ):<AiOutlineCaretUp></AiOutlineCaretUp>}
                  

                 </SelectBarre>
                 {isOpen && (
                  <Options>
                       <p onClick={() => handleOptionClick('Price High To Low')}>
                      Price High To Low
                    </p>
                    <p onClick={() => handleOptionClick('Price Low To High')}>
                      Price Low To High
                    </p>
                    <p onClick={() => handleOptionClick('Most Ordered')}>
                      Most Ordered
                    </p>
                    <p onClick={() => handleOptionClick('Top Rated')}>
                      Top Rated
                    </p>



                  </Options>

                 )}

                 </SelectContainer>


                </SortBy>


              </HeadNav>
              <Products>
              <FiltredProduct products={filteredProducts} />

              </Products>
          


            </ProductItems>

        </Container>

    </>
  )
}


export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
  
    const category = await Caterogy.findById(id);
    if (!category) {
      return {
        notFound: true,
      };
    }
    const subCategories = await Caterogy.find({ parent: category._id });
    
    const productPrices = [];
    const products = [];

    for (const subCategory of subCategories) {
        const subCategoryProducts = await Product.find(
          { category: subCategory._id },
          'price title properties rating countSales images sale  discountPercentage'
        ).populate('category');
        products.push(...subCategoryProducts);
  
        subCategoryProducts.forEach((product) => {
          const discountedPrice = product.sale ? product.price - (product.price * product.discountPercentage) / 100 : product.price;
          productPrices.push(discountedPrice); 
        });
      }
      console.log('All Products:', products);

      
    
      
      
      
      
      
      
      




    
      
    let minPrice = Number.MAX_VALUE;
    let maxPrice = 0;
  
    productPrices.forEach((price) => {
      if (price < minPrice) {
        minPrice = price;
      }
      if (price > maxPrice) {
        maxPrice = price;
      }
    });
    return {
      props: {
        category: JSON.parse(JSON.stringify(category)),
        subCategories: JSON.parse(JSON.stringify(subCategories)),
        minPrice,
      maxPrice,
      products: JSON.parse(JSON.stringify(products)),      }, 
    };
  }
  
  
