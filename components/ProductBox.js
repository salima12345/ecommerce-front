import Image from "next/image";
import styled from "styled-components"

const CatWrapper=styled.div`
width: 265px;
height: 145px;
background-color:#ffffff;
border:1px solid #E0E0E0;

display: flex;
justify-content: space-between;
align-items: center;
`;
const CategoryInfo=styled.div`
padding-left:20px;
`;
const Title=styled.h2`
font-size: 16px;
font-weight: 400;
`;
const MinPrice=styled.p`
font-size: 13px;
font-weight: 400;
color:#8B96A5;

`;
const CategoryImage=styled.div`

margin-top:50px;

img{
    max-width: 100%;
    max-height: 100%;
}
`;

export default function ProductBox({name,image,minPrice}){
    return(
        <CatWrapper>
            <CategoryInfo>
                <Title>{name}</Title>
                <MinPrice>From 
                    <br/>
                    USD {minPrice}
                </MinPrice>

            </CategoryInfo>
            <CategoryImage>
            <Image src={image?.[0]} alt="" />


            </CategoryImage>

        </CatWrapper>
    )

}