import Header from '../../components/Header'
import React from 'react';
import { Category } from '../../models/Category';
import { mongooseConnect } from "../../lib/mongoose";
import styled from 'styled-components';
import { primary } from "../../lib/colors";
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import 'react-icons/ai';
import { useRef, useEffect } from 'react';
import Image from 'next/image';

import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import { useState } from 'react';
import FiltredProduct from '../../components/FiltredProduct';
import { Product } from '../../models/Product';
import { useRouter } from 'next/router';
const Container=styled.div`
display:grid;
grid-template-columns:1fr 6fr;
width:100%;
gap:10rem;
position: relative;
@media (max-width: 1024px){
  grid-template-columns:1fr;
  height:100%;
  margin-top:100px;


}


`;
const SideNav=styled.div`
 height:100vh;
 max-height: calc(100vh - 90px);
 padding-right:70px;
 Width:150px;
 padding-left:70px;
 overflow-y: auto; 
 display: flex;
 flex-direction:column;
 background-color:#ffffff;
 position: fixed;
 top: 5.3rem;
 @media (max-width: 1024px){
  display: ${({isCategoriesVisible}) => isCategoriesVisible ? 'flex' : 'none'};
  height:100%;
  position:absolute;
  margin-top:0px;
  z-index:2;
  top:0;
  padding-left:30px;
  padding-right:40px;
  padding-top:10px;


 }
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
const CategoryList=styled.div`
padding-left:15px;
transform:translateY(-6%);

`;
const ChildName=styled.p`
padding-left:8px;
font-size:14px;
font-weight:500;
cursor:pointer;
&:hover{
  color:${primary};
}






`;
const StyledList=styled.div`
list-style: none;
padding-left:19px;

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
  padding-left: 2rem;
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
  border:none;



}

`;
const SearchResult=styled.div`
padding:20px;
display:flex;
align-items:center;
p{
  font-weight:500;
}
@media (max-width: 1024px){
  display:none;


}

`;
const SortBy=styled.div`
display:flex;
align-items:center;
p{
  font-weight:500;
}
@media (max-width: 1024px){
  padding-left:2rem;
  width:300px;

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
@media (max-width: 1024px){
  width:235px;
}


`;
const Options=styled.div`
position :absolute ;
background-color: #fff;
border-radius: 5px;
border: 1px solid #ccc;
width:170px;
margin-top:45px;
padding-left:10px;
z-index: 9999; 
p{
  cursor:pointer;
  color:#222;
font-size:14px;
&:hover{
    color:${primary};
}
@media (max-width: 1024px){
  z-index:9999;
}
  

}
`;
const CatTitle=styled.div`
display:none;
width:280px;


gap:10px;
color:black;
font-weight:700;
font-size:16px;
align-items:center;

height:40px;
background-color:#ffffff;
padding-left:15px;
border-radius:10px 10px 0 0px;


@media (max-width: 1024px){
  display:flex;
  padding-left: 2rem;
  margin-left:1.5rem


}

`;
const Burger=styled(Image) `
display none ;
@media (max-width: 1024px){
  display:flex;
}

`;
const Cross=styled.div`
display:none;
@media (max-width: 1024px){
  display:flex;
  gap:10px;
  img {
    display: block;
  }
}

`;
const ImageBurger=styled(Image)`
fill: #505050; 
width: 20px;
height: 20px;
margin-right: 8px;
display:flex;

@media (max-width: 1024px){
  display:none;
}
`;
const Tit=styled.div`
  display:flex;
  align-items:center;
  gap:20px;
  `;

 export default function CategoryPage({category,childWithSubCategories,minPrice,maxPrice ,products}) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [isOpen,setIsOpen]=useState(false);
  const selectBarreRef = useRef(null);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);   
  const [selectedChildcategory, setSelectedChildcategory] = useState(null);

  
  const [selectedOption, setSelectedOption] = useState('Price High To Low'); 
  const [filteredProducts, setFilteredProducts] = useState(products);
  const router = useRouter();
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const { id } = router.query;


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
        return products.slice().sort((a, b) => b.price - a.price);
      case 'Price Low To High':
        return products.slice().sort((a, b) => a.price - b.price);
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
  const handleChildClick=(childCategory)=>{
    setSelectedChildcategory(childCategory);
    const filtered = products.filter((product) => {
      return childCategory.subCategories.some(subCategory => subCategory._id.toString() === product.category._id.toString());
    });


    const subchildCategoryPrices = filtered.map((product) => product.price);
  const minPrice = Math.min(...subchildCategoryPrices);
  const maxPrice = Math.max(...subchildCategoryPrices);
    setFilteredProducts(filtered);
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
    
    console.log('Filtered Products:', filtered);
    setFilteredProducts(filtered);
    setPriceRange([minPrice, maxPrice]);

  };
  
  
  
  


   
  return (
    <>
    <Header/>
        <Container>
            <SideNav isCategoriesVisible={isCategoriesVisible}>
             <Tit>
             <h3>Categories</h3>
                <Cross>
          <ImageBurger src="/cross-svgrepo-com.svg" alt="" width={30} height={30} onClick={() => setIsCategoriesVisible(false)}  />
         
        </Cross>
             </Tit>
                <CatName
                 onClick={() => handleCategory()}
                >{category.name}</CatName>
                <CategoryList>
                  {childWithSubCategories.map((childCategory) => (
                    <div key={childCategory._id}>
                       <ChildName
                        onClick={() => handleChildClick(childCategory)}
                       >{childCategory.name}</ChildName>
             
                <StyledList>
                   {childCategory.subCategories.map((subCategory) => (
                     <ListItem key={subCategory._id}
                    onClick={() => handleSubcategoryClick(subCategory)}>{subCategory.name}</ListItem>
                      ))}
             </StyledList>
           </div>
            ))}
          </CategoryList>
          <h3>Price</h3>
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
                
            
            </SideNav>

           
            <ProductItems>
              <HeadNav>
                <SearchResult>
                  <p> Results:</p>
                 {filteredProducts.length}
                </SearchResult>
                <CatTitle>
            <Burger src="/catsvg.svg" alt="" width={20} height={20}  onClick={() => setIsCategoriesVisible(!isCategoriesVisible)} />
<p> Categories</p>
             

            </CatTitle>
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
  
    const category = await Category.findById(id);
    if (!category) {
      return {
        notFound: true,
      };
    }
    const childCategories = await Category.find({ parent: category._id });
    const childWithSubCategories = [];
    const productPrices = [];
    const products = [];
    for (const childCategory of childCategories) {
      const subCategories = await Category.find({ parent: childCategory._id });
      childWithSubCategories.push({
        ...childCategory.toObject(),
        subCategories: subCategories.map((subCategory) => subCategory.toObject()),
      });
    }
    for (const childCategory of childCategories) {
      const subCategories = await Category.find({ parent: childCategory._id });
  
      for (const subCategory of subCategories) {
        const subCategoryProducts = await Product.find(
          { category: subCategory._id },
          'price title rating countSales images'
        ).populate('category');
        products.push(...subCategoryProducts);
        console.log(products );
  
        subCategoryProducts.forEach((product) => {
          productPrices.push(product.price);
        });
      }
     
    }
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
        childCategories: JSON.parse(JSON.stringify(childCategories)),
        childWithSubCategories: JSON.parse(JSON.stringify(childWithSubCategories)),
        minPrice,
      maxPrice,
      products: JSON.parse(JSON.stringify(products)),      }, 
    };
  }
  
  
