import Button from "../../components/Button";
import { CartContext } from "../../components/CartContext";
import Center from "../../components/Center";
import Header from "../../components/Header";
import WhiteBox from "../../components/WhiteBox";
import CartIcon from "../../components/icons/CartIcon";
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import { useContext, useState,useEffect,useCallback } from "react";
import styled from "styled-components";
import ProductImages from "../../components/ProductImages";
import StarRatingComponent from "../../components/StarRating";
import ItemsBox from "../../components/ItemsBox";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../../components/Footer";
import Comment from "../../models/Comment";
import { useSession } from "next-auth/react";
import { primary } from "../../lib/colors";
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import Image from "next/image";
import User from "../../models/User";



const ColWrapper = styled.div`

  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 50px;
  margin-top: 10rem;
  @media (max-width: 1024px){
  grid-template-columns: .8fr;

}

`;
const PriceRow = styled.div`
  display: flex;
  flex-direction:column;
  gap: 20px;
  align-items: start;
`;
const Desc=styled.div`
width:25rem;
font-weight:500;
margin-bottom:10px;
color:#565959;
font-size:20px;
`;
const Price = styled.span`
  font-size: 1.4rem;
  color:${primary}
`;
const Stars = styled.div`
 
`;
const TitleDetails = styled.h2`
  font-weight: 700;
  font-size: 16px;
`;

const HeadTitle = styled.div`
  border-bottom: 2px solid #d4d4d4;
  box-shadow: 0 2px 4px #d4d4d4;
  padding-left: 20px;
  padding-top: 5px;
  display:flex;
  justify-content:space-between;
  align-items:center;

`;
const ProductDetails=styled.div``;

const Details = styled.div`
  background-color: #fff;
  margin-top: 5rem;
  border-radius: 7px;
  width:90%;
  border: 1px solid #e0e0e0;
  p {
    padding: 20px;
  }
`;
const LeaveComment=styled.div`
`;
const Reviews=styled.div`
background-color: #fff;
  margin-top: 5rem;
  width:90%;

  border-radius: 7px;
  border: 1px solid #e0e0e0;
  


`;
const MoreLink=styled.a`
cursor:pointer;
color:black;
font-weight:500;
font-size:16px;
text-decoration:none;
color:${primary};
margin-right:10px;

`;
const RatingDetails=styled.div`
display:flex;
flex-direction:column;
gap:10px;
margin-top:20px;
`;
const ReviewsAverage=styled.div`
display:flex;
align-items:center;
`;
const AvgReview=styled.div`
color:#264996;

`;
const CountReview=styled.div`
color:${primary};


`;
const ReviewsContent=styled.div`
padding:20px;
display:flex;
gap:15rem;
@media (max-width: 1024px){
  flex-direction:column;
  gap:5rem;


}

`;
const Avg=styled.div`
background-color:#F1F1F2;
width:180px;
height:150px;
border-radius:7px;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
h2{
  color:gold;
}
p{
color:#313133;
font-weight:500;
}
`;
const RatVal=styled.div`
`;
const RatCount=styled.div`
color:#75757A;
font-size:16px;

`;
const RatingBar=styled.div`
display:flex;
flex-direction:row;
align-items:center;
gap:12px;
`;
const RatingBarContainer = styled.div`
  background-color: #F1F1F2;
  height: 10px;
  width: 100px; 
  position: relative;
  border-radius:10px;
`;

const RatingBarFill = styled.div`
  background-color: gold;
  height: 100%;
  width: ${({ width }) => width || '0%'}; 
  position: absolute;
  top: 0;
`;
const ReviewTitle=styled.div`
font-weight:500;
margin-bottom:10px;

`;
const Property=styled.p`
span{
  color: #555;
    font-weight: 500;
}
color:#0F1111;
font-size:16px;
`;
const Selectable=styled.div``;

const Colors=styled.div`
`;
const OtherColorsImg=styled.div`
display:flex;
flex-wrap: wrap;
`;
const ColorImage=styled(Image)`

border-radius:7px;
margin-right:20px;
border:1px solid white;

&:hover{
  border:1px solid black;


}
`;
const SelectableContainer=styled.div`
display:flex;

`;
const SelectableValue=styled.div`
backgroundColor: lightgray;
height:40px;
border:1px solid #ccc;
border-radius: 7px;
padding:7px;
display: flex;
justify-content: center;
align-items: center;
margin: 5px;
cursor: pointer;
&:hover{
  border:1px solid black;


}
`;


const FormGroup = styled.div`
  margin: 10px 0;
`;
const NoComment=styled.div`
display:flex;
align-items:center;
gap:20rem;
padding:40px;


p{
  font-weight:500;
  font-size:20px;
}

`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height:80px;
`;

const SubmitButton = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const UserRev=styled.div`
color:#75757A;
`;


const RelatedProducts=styled.div`
margin-left:15px;
margin-bottom:100px;

`;

const RelatedItems = styled(Carousel)`
  .react-multi-carousel-item {
    margin-right: 0px;
  }
`;

const carouselResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};


function ProductPage({ product,relatedProducts,commentss ,avgRating}) {
  const { AddProduct } = useContext(CartContext);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const [showAllComment, setShowAllComment] = useState(false);

  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
const [selectedSize, setSelectedSize] = useState(
  product?.properties && product.properties.Size ? product.properties.Size[0] : ''
); 
const [selectedRom, setSelectedRom] = useState(
  product?.properties && product.properties.Rom ? product.properties.Rom[0] : ''
);   
const [addedToCart, setAddedToCart] = useState(false);
const [productPrice, setProductPrice] = useState(product.price);


  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
  };
  const handleSizeClick=(size)=>{
    setSelectedSize(size);
  }
  const handleRomClick=(rom)=>{
    setSelectedRom(rom);
  }
  

  


const handleCommentSubmit = async (e) => {
  e.preventDefault();
  if (!session) {
    return;
  }
  const res = await fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
      rating,
      productId: product._id,
      userName: session.user.name,
    
    }),
  });
  setComment("");
  setRating(0);
};
function formatDate(date) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-Us', options);
}
const handleShowMoreClick = () => {
  setShowAllComment(true);
};

const handleShowLessClick = () => {
  setShowAllComment(false);
};


const handleGoToCart = () => {
  router.push('/cart');
};
const handleAddToCart = () => {
  AddProduct(product._id, selectedColor, selectedSize,selectedRom);
  setAddedToCart(true);
};
const calculateNewPrice = useCallback((originalPrice, selectedRom) => {
  let newPrice = originalPrice;
  if( product?.properties && product?.properties.Rom ){
    for (let i = 0; i < product?.properties.Rom.length; i++) {
      if (selectedRom > product?.properties.Rom[i]) {
        newPrice += originalPrice * 0.20;
      }
     }
  }
  
  return newPrice;
 }, [product]);
 
 
 useEffect(() => {
  const newPrice = calculateNewPrice(product.price, selectedRom);
  setProductPrice(newPrice);
 }, [selectedRom, product.price, calculateNewPrice]);
 
 
 
 
 






 




  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
          <ProductImages images={product.colors.find(color => color.name === selectedColor)?.images || product.images} alt="" />
          </WhiteBox>
          <ProductDetails>
            <Desc>{product.description}</Desc>
            <PriceRow>
            <Stars>
                <ReviewsAverage>
               <StarRatingComponent rating={avgRating} readOnly />
                  <AvgReview>
                  ({avgRating.toFixed(2)})


                  </AvgReview>
                </ReviewsAverage>
                <CountReview>
                  ({commentss.length} Reviews)
                </CountReview>
                

                  
             </Stars>
              <div>
              <Price>MAD {(
  productPrice -
  (productPrice * product.discountPercentage) / 100
).toFixed(2)}</Price>

                
              </div>
              
  <Colors>
     <div>
  {product.colors && product.colors.length > 0 && (
    <div>
      <Property><span>Color:</span>{selectedColor}</Property>
      <OtherColorsImg>
      <ColorImage
 src={product.colors[0].images[0]}
 alt={`${product.colors[0].name} color`}
 width={70}
 height={100}
 onClick={() => handleColorClick(product.colors[0].name)}

/>

        <div>
          {product.colors.slice(1).map((color, index) => (
            <ColorImage
              key={index}
              src={color.images[0]}
              alt={color.name}
              width={70}
              height={100}
              onClick={() => handleColorClick(color.name)}
            />
          ))}
        </div>
      </OtherColorsImg>
    </div>
  )}
</div>

     </Colors>
 
<Selectable>
{product?.properties && product?.properties.Size && (
    <Property>
      <span>Size:</span>{selectedSize}
    </Property>
  )}

    <SelectableContainer>
    {product?.properties?.Size ? (
      product?.properties.Size.length > 0 ? (
        product?.properties.Size.map((size, index) => (
          <>
         
          <SelectableValue key={index}
          onClick={() => handleSizeClick(size)}
          >{size}</SelectableValue>
          </>
        ))
      ) : (
        <span>No available sizes</span>
      )
    ) : (
      <span></span>
    )}

    </SelectableContainer>
    </Selectable>
   
 

<Selectable>
{product?.properties && product?.properties.Rom && (
    <Property>
      <span>Rom:</span>{selectedRom}
    </Property>
  )}
 <SelectableContainer>
 {product.properties?.Rom ? (
   product.properties.Rom.length > 0 ? (
  
     product.properties.Rom.map((rom, index) => (
       <>
       
       <SelectableValue key={index}
       onClick={() => handleRomClick(rom)}
       >{rom}</SelectableValue>
       </>
     ))
   ) : (
     <span>No available Rom</span>
   )
 ) : (
   <span></span>
 )
 }

 </SelectableContainer>
 </Selectable>









       
<Button primary onClick={handleAddToCart}>
    <CartIcon />
    Add to cart
  </Button>
            </PriceRow>
          </ProductDetails>
        </ColWrapper>
        <Details>
          <HeadTitle>
            <TitleDetails>Details</TitleDetails>
          </HeadTitle>
          <p>{product.details}</p>
        </Details>
       
       
       <Reviews>
      
       <HeadTitle>
            <TitleDetails>Customer Reviews</TitleDetails>
            {commentss.length > 3 && (
                      <MoreLink onClick={showAllComment ? handleShowLessClick : handleShowMoreClick}>
                        {showAllComment ? 'View less' : 'View more'}
                      </MoreLink>
                    )}
          </HeadTitle>   
          <ReviewsContent>
        
         

            
    
{
  commentss.length>0 ?(
    <>
    <div>
    <Avg>
        <h2>{avgRating.toFixed(1)}/5</h2>
        <StarRatingComponent rating={avgRating} readOnly />
        <p>({commentss.length} Reviews)</p>
        

        

      </Avg>
      <RatingDetails>
      {Array.from({ length: 5 }, (_, index) => {
const value = 5 - index;
const ratingCount = commentss.filter(comment => comment.rating === value).length;
const ratingPercentage = (ratingCount / commentss.length) * 100;

return (
<RatingBar key={value}>
<RatVal> {value} </RatVal>

<span style={{ color: 'gold' }}>★</span> 
<RatCount> ({ratingCount})</RatCount>

<RatingBarContainer>
<RatingBarFill width={`${ratingPercentage}%`} />
</RatingBarContainer>
</RatingBar>
);
})}

      </RatingDetails>
    </div>
    <div>
  
  <ReviewTitle>Reviews ({commentss.length})</ReviewTitle>
  {
    showAllComment ?  
       commentss.map((comment) => (
      <div key={comment._id}>
        <StarRatingComponent rating={comment.rating} readOnly />
        <p>{comment.comment}</p>
         <UserRev>{formatDate(comment.createdAt)} by <strong>{comment.user.name}</strong> </UserRev>
         <hr style={{ backgroundColor: '#F1F1F2', height: '2px', border: 'none' }} />
        
     

        

      
      </div>
    )):(
      commentss.slice(0,3).map((comment)=> (
        <div key={comment._id}>
          <StarRatingComponent rating={comment.rating} readOnly />
          <p>{comment.comment}</p>
           <UserRev>{formatDate(comment.createdAt)} by <strong>{comment.user.name}</strong> </UserRev>
           <hr style={{ backgroundColor: '#F1F1F2', height: '2px', border: 'none' }} />
          
       
  
          
  
        
        </div>


       )) )
  }
</div>
<div>
{session &&(
  <LeaveComment>
  <ReviewTitle>Leave your comment</ReviewTitle>
  
  
          {session && (
               <form onSubmit={handleCommentSubmit}>
               <FormGroup>
                 <TextArea
                        ref={(textarea) => {
                          if (textarea) {
                            textarea.focus();
                            textarea.selectionStart = textarea.value.length;
                          }
                        }}
              
                   value={comment}
                   onChange={(e) => setComment(e.target.value)}
                   placeholder="Write a comment"
                 />
               </FormGroup>
               <FormGroup>
                 <StarRatingComponent
                   rating={rating}
                   changeRating={(newRating) => setRating(newRating)}
                 />
               </FormGroup>
               <FormGroup>
                 <SubmitButton type="submit">Submit</SubmitButton>
               </FormGroup>
             </form>
          )}
  
          </LeaveComment>
)}

</div>
</>
  ):(
    <>
    <NoComment>
    <div>
      <Image width={30}  height={30} src="/comment-3-svgrepo-com.svg" alt=""/>
      <p>No comment</p>
    </div>
    <div>
    {session &&(
      <LeaveComment>
      <ReviewTitle>Leave your comment</ReviewTitle>
      
      
              {session && (
                   <form onSubmit={handleCommentSubmit}>
                   <FormGroup>
                     <TextArea
                            ref={(textarea) => {
                              if (textarea) {
                                textarea.focus();
                                textarea.selectionStart = textarea.value.length;
                              }
                            }}
                  
                       value={comment}
                       onChange={(e) => setComment(e.target.value)}
                       placeholder="Write a comment"
                     />
                   </FormGroup>
                   <FormGroup>
                     <StarRatingComponent
                       rating={rating}
                       changeRating={(newRating) => setRating(newRating)}
                     />
                   </FormGroup>
                   <FormGroup>
                     <SubmitButton type="submit">Submit</SubmitButton>
                   </FormGroup>
                 </form>
              )}
      
              </LeaveComment>
    )}
    
    </div>
    </NoComment>
  
    </>
  )
}

             
             </ReviewsContent>  
       </Reviews>


        
          
        <RelatedProducts >
            <h2>You might also like</h2>
            <RelatedItems  responsive={carouselResponsive}>
            {relatedProducts.map((relatedProduct) => (
              <ItemsBox
                key={relatedProduct._id}
                _id={relatedProduct._id}
                images={relatedProduct.images}
                price={relatedProduct.price}
                title={relatedProduct.title}
                rating={relatedProduct.rating}
              />
            ))}
          </RelatedItems>

        </RelatedProducts>

        
      </Center>
      <Footer/>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const product = await Product.findById(id);
  if (!product) {
    return {
      notFound: true,
    };
  }

  const relatedProducts = await Product.find({
    category: product.category,
  });
  
  const commentss = await Comment.find({
    product: id,
  }).populate("user","name");
  const totalRatings = commentss.reduce((total, comment) => total + comment.rating, 0);
  const avgRating = commentss.length > 0 ? totalRatings / commentss.length : 0;
  console.log("Average Rating:", avgRating); 


  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      commentss: JSON.parse(JSON.stringify(commentss)),
      avgRating,
    },
  };
}
export default dynamic(()=>Promise.resolve(ProductPage),{ssr:false})
