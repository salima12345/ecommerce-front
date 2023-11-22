import Center from "./Center";
import styled ,{keyframes}from "styled-components";

import { useState } from "react";
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useSession,signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";




const Bg = styled.div`
  color:#fff;
  height:20rem;
  padding-top: 8rem;
  padding-bottom:70px;
  @media (max-width: 1024px){
    padding-top: 10rem;


  }

`;



const Container=styled.div`
height:25rem;
display:flex;
width:92.5%;

gap:20px;
@media (max-width: 1024px){
  display:flex;
  flex-direction:column;
  height:15rem;
  margin-bottom:10rem;
}


`;
const Categories=styled.div`

border-radius:10px;
width:20%;
background-color:#f9f9f9;

@media (max-width: 1270px) and (min-width: 1024px){
  width:40%;

}
@media (max-width: 1024px){
width:100%;

}








`;
const CatTitle=styled.div`
display:flex;

gap:10px;
color:black;
font-weight:700;
font-size:16px;
display:flex;
align-items:center;
height:40px;
background-color:#f9f9f9;
padding-left:15px;
border-radius:10px 10px 0 0px;

@media (max-width: 1024px){
width:150px;
}

`;
const Burger=styled(Image) `
display none ;
@media (max-width: 1024px){
  display:flex;
}

`;
const ImageBg=styled(Image)`
display:flex;
@media (max-width: 1024px){
  display:none;
}


`;

const CatLinks=styled.div`
display:flex;
flex-direction:column;
background-color:#ffffff;

gap:14px;
width:100%;
padding-top:20px;
padding-bottom:10px;
position:relative;

@media (max-width: 1024px) {
  z-index:9999;
  width:200px;
  height:100%;
position:absolute;
left:0%;

top:0%;
  img {
    display:none;
  }
  padding:10%;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
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





const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  color:black;
  font-size:1.2rem;
  display:flex;
align-items:center;
gap:10px;
font-weight:bold;

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

const HoveredCategories = styled.div`
display:none;
  position: fixed ;
  background-color:#ffffff;
  border-left:1px solid #e0e0e0;
  left:20.2%;

  border-radius:0px 5px 5px  0px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 19px 20px 0px 19px;
  z-index: 10;
  height:23.88rem;
  width:48%;
  display:flex;
  flex-direction:row;
  gap:25px;
  @media (max-width: 1024px){
    display:none;
  }

`;

const HoveredLink = styled(Link)`
text-decoration:none;
color:black;
font-size:16px;
font-weight:500;

`;
const HoveredSubLink=styled(Link)`
text-decoration:none;
color:#505050;
font-size:16px;
font-weight:400;
margin-bottom:10px;

`;
const Cat=styled.div`
display:flex;
flex-direction:column;
gap:10px;
width:100%;
postion:relative;


`;
const SubCat=styled.div`
display:flex;
flex-direction:column;
margin-top:10px;

`;

const Banner =styled.div`
width: 51%;
position:relative;
@media (max-width: 1270px) and (min-width: 1024px){
  width:31%;

}

@media (max-width: 1024px){
  display:none;
}

  `;
 

  const ActiveLink = styled(({ isActive, ...props }) => <Link {...props} />)`
text-decoration: none;
margin-left: 10px;
cursor: pointer;
display: flex;
align-items: center;
color: ${({ isActive }) => (isActive ? "black" : "#505050")};
font-family: Inter;
font-size: 16px;
font-style: normal;

&:hover {
 font-weight: ${({ isActive }) => (isActive ? "500" : "400")};
 height:30px;
 background-color:#E5F1FF;
 margin-left:0px;
 padding-left:10px;
}
}
 
  &:hover ${HoveredCategories} {
    display: grid;
    grid-template-columns: auto auto auto ;
    position:fixed;
  

  }
`;
const Title2=styled.h2`
font-size: 14px;
font-weight: 400;
color:#ffffff;


`;
const Title1=styled.h1`
font-size: 16px;
font-weight: 500;
color:#ffffff;


`;
const BannerItem=styled.div`
position: relative;
display:flex;
flex-direction:column;
gap:90px;


`;
const Bloc=styled.div`
position: relative;
background-image: url('/RightSideBack.png');
background-size: cover;
background-position: center;
border-radius: 5px;
width:25%;
text-align:center;

p{
  font-weight:bold;
  color:black;
}



@media (max-width: 1024px){
  width:100%;
  z-index: 0;
}
`;
const ImageAvatar=styled(Image)`
border-radius:50%;
width: 50px;
height: 50px;
margin-top:10px;

`;
const spin = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
 border: 4px solid #f3f3f3;
 border-top: 4px solid #3498db;
 border-radius: 50%;
 width: 15px;
 height: 15px;
 animation: ${spin} 2s linear infinite;
 margin: auto;
`;




const Deal=styled.div`
position: relative;
background-image: url('/banner2.jpg');
background-size: cover;
background-position: center;
border-radius: 5px;
overflow: hidden;
height: 120px;
padding:10px;
display:flex;
justify-content:space-between;


::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(128deg, #2C7CF1 0%, rgba(0, 209, 255, 0.50) 100%);
}
 > div {
  position: relative;
  z-index: 1; 
}


`;
const CustomCarousel = styled(ResponsiveCarousel)`
  height: 100px; 
  margin-bottom:70px;
  img{
    height: 230px; 
    border-radius: 10px;



  }
`;
const ProductCarouselContainer = styled.div`
  width: 70%;
  .slick-slide {
    padding: 0 5px; 
  }
  .slick-prev,
  .slick-next {
    backgroud-color:#ccc;

    font-size: 24px;
  
    cursor: pointer;
    z-index: 2;
    transition: all 0.3s ease-in-out;

    
  }
  .slick-prev {
    left: -20px;
    top:65px;
  }
  .slick-next {
    right: -20px;
    top:65px;
    margin-right:10px;

  }
  a{
    text-decoration:none;
  }

  
`;




const Item = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  text-align:center;
  width: 10px;
  height: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
    border-radius: 10px;
    height: 80px;
    margin-bottom: 5px;
  }
`;

const Price = styled.div`
  font-size: 16px;
  color: #2c7cf1;
  font-weight: 500;
`;

const OldPrice = styled.div`
  font-size: 14px;
  color: #777777;
  text-decoration: line-through;
`;

const LoginButton=styled.div`
display:flex;
gap: 20px ;
margin-top:30px;
justify-content:center;
`;
const Register=styled.button`
background: linear-gradient(128deg, #2C7CF1 0%, rgba(0, 209, 255, 0.50) 100%);
color:#ffffff;
font-weight:bold;
border-radius:10px;
padding:10px;
border:none ;
cursor:pointer;
width:80px;


`;
const SignIn=styled.button`
color:black;
font-weight:bold;
border-radius:10px;
padding:10px;
border:none ;
cursor:pointer;
width:80px;


`;
const Logout=styled.button`
background: linear-gradient(128deg, #2C7CF1 0%, rgba(0, 209, 255, 0.50) 100%);
color:#ffffff;
font-weight:bold;
border-radius:10px;
padding:10px;
border:none ;
cursor:pointer;
width:80px;

`;
const ShopNow=styled.div`
width: 80%;
height: 50%; 
position:relative;
margin: auto;
border-radius: 5px;
background-image: url('/ShopNow.png');
background-size: cover;
background-position: center;
margin-top:15px;
text-align:left;
padding:10px;
a{text-decoration:none}
.product-slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slick-slide {
  display: flex;
  justify-content: center;
  gap:0px;
  align-items: center;
  padding: 0 px;
}

.product-item {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 100px;
  height: 100%;
}

.product-image {
  width: 60px;
  height: 60px;
 
  object-fit: cover; 
  border-radius: 10px;
  margin-bottom: 2px;
}

.product-price {
  font-size: 14px;
  color: #2c7cf1;
  font-weight: 500;
}
@media (max-width: 1024px){
  height:230px;
}


`;















export default function Featured({categories,allcategories,productsOnSale}){
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
    }
  }, [session]);
  
  const handleSignOut = async () => {
    setIsLoading(true); 
    await signOut();
  };
  

  
  

  const getCategoryUrl = (categoryId) => {
    return `/category/${categoryId}`;
  };
  const getchildCategoryUrl = (categoryId) => {
    return `/childCategory/${categoryId}`;
  };
  const getsubCategoryUrl = (categoryId) => {
    return `/subCategory/${categoryId}`;
  };
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const [hoveredChildCategories, setHoveredChildCategories] = useState([]);
  const getProductUrl = (productId) => {
    return `/product/${productId}`;
  };
  const handleParentCategoryHover = (category_id) => {
    setHoveredCategoryId(category_id);
    const hoveredCategory = allcategories.find((category) => category._id === category_id);
    const hoveredChildCategories = allcategories.filter((category) => category.parent === hoveredCategory._id);
    setHoveredChildCategories(hoveredChildCategories);
   };
   
  const handleParentCategoryLeave = () => {
    setHoveredCategoryId(null);
  };

 
    return(
       <Bg>
        
        <Center>
           <Container
            onMouseLeave={handleParentCategoryLeave}
    
           >
           
           <Categories
           >
            <CatTitle>
            <Burger src="/catsvg.svg" alt="" width={20} height={20}  onClick={() => setIsCategoriesVisible(!isCategoriesVisible)} />

              <ImageBg src="/catsvg.svg" alt="" width={20} height={20}  />
              Categories

            </CatTitle>
       <CatLinks  isVisible={isCategoriesVisible}>
        <Cross>
          <ImageBurger src="/cross-svgrepo-com.svg" alt="" width={30} height={30} onClick={() => setIsCategoriesVisible(false)}  />
          <Logo href={'/'}>
         
         Brand           
          </Logo>
        </Cross>
       {  categories?.map((category) => (
          <ActiveLink
          href={getCategoryUrl(category._id)}
            key={category._id}
            onMouseEnter={() => handleParentCategoryHover(category._id)}
            isActive={hoveredCategoryId === category._id}
          >
            <div>
    <Image src={category.image[0]} alt="Icon" width={20} height={20} />
  </div>
                  {category.name}   
  


                   </ActiveLink>
        ))}
       </CatLinks>
       
      </Categories>
      {hoveredCategoryId  && (

   <HoveredCategories

   onMouseLeave={handleParentCategoryLeave}
   >
{console.log("Hovered child categories in render:", hoveredChildCategories)}

   {hoveredChildCategories.map((childCategory) => (
     <Cat key={childCategory._id}>
       <div>
         <HoveredLink href={getchildCategoryUrl(childCategory._id)}
>{childCategory.name}

</HoveredLink>
       </div>
       <SubCat>
         {allcategories
           .filter((category) => category.parent === childCategory._id)
           .map((subChildCategory) => (
             <HoveredSubLink key={subChildCategory._id} 
             href={getsubCategoryUrl(subChildCategory._id)}>
               {subChildCategory.name}
             </HoveredSubLink>
           ))}
       </SubCat>
     </Cat>
   ))}
 </HoveredCategories>
  )} 
      
   
    
           <Banner>
          <BannerItem>
          <CustomCarousel
                showStatus={false}
                showThumbs={false}
                autoPlay={true}
                interval={4000}
                infiniteLoop={true}
                transitionTime={500}
              >
                <div>
                  <Image src="/image_1.png" alt="Image 1" width={500} height={300}  layout="responsive"/>
                </div>
                <div>
                  <Image src="/image_2.png" alt="Image 2" width={500} height={300}  layout="responsive"/>
                </div>
                <div>
                  <Image src="/image_3.png" alt="Image 3" width={500} height={300} layout="responsive" />
                </div>
                <div>
                  <Image src="/image_4.png" alt="Image 4" width={500} height={300} layout="responsive" />
                </div>
              </CustomCarousel>
              <Deal>
                <div>
                <Title1>Welcome Deal</Title1>
                <Title2>Your exclusive price</Title2>

                </div>
                <ProductCarouselContainer>
              <Slider
                slidesToShow={4} 
                infinite={true}
                swipeToSlide={true}
                arrows={true}
                dots={false}
               
                
                
                
                
              >
                {productsOnSale.map((product) => (
                  <Item key={product._id}>
          <Link href={getProductUrl(product._id)} >
            <Image
              src={product.images[0]}
              alt={product.title}
              width={80}
              height={80}
            

            />
          </Link>
                  <Link href={getProductUrl(product._id)}>
                    <Price>
                      MAD
                      {(
                        product.price -
                        (product.price * product.discountPercentage) / 100
                      ).toFixed(2)}
                    </Price>
                  </Link>
                    <OldPrice>MAD{product.price}</OldPrice>
                  </Item>
                ))}
              </Slider>
            </ProductCarouselContainer>
          
      
              
                         
            </Deal>
          </BannerItem>


           </Banner>
           <Bloc>

           <ImageAvatar 
 src="/ava.png" 
 alt="" 
 width={50} 
 height={50} 

/>          
           {session ? (
              <div>
                <p>Welcome {session.user.name}</p>
                <Logout onClick={handleSignOut}>
           {isLoading ? <Loader /> : 'Logout'}
                    </Logout>
              </div>
            ) : (
              <div>
                <p>Welcome to Brand</p>
                <LoginButton>
                  <Register onClick={() => router.push("/register")}>
                    Register
                  </Register>
                  <SignIn onClick={() => router.push("/login")}>Sign in</SignIn>
                </LoginButton>
              </div>
            )}

            
            <ShopNow>
            <Title2>Welcome Deal</Title2>
                <Title1>Shop now to save on 
               <br>
                </br>                  
                top items
                  </Title1>
                  <div className="product-slider">
                <Slider
              slidesToShow={2}
                  autoplay={true}
             autoplaySpeed={3000} 
                   infinite={true}
                  pauseOnHover={false}
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                        >
      {productsOnSale.map((product) => (
        <div className="product-item" key={product._id}>
          <Link href={getProductUrl(product._id)}>
          <Image className="product-image" src={product.images[0]} alt={product.title} width={60} height={60} />

          </Link>
        <Link href={getProductUrl(product._id)}>
        <div className="product-price">
            MAD
            {(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}
          </div>
        </Link>
        </div>
      ))}
    </Slider>
  </div>

            </ShopNow>
           </Bloc>
          
      
           </Container>
             
                 
        
        </Center>
       </Bg>
    )
}

