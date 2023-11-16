import styled from "styled-components";
import Center from "./Center";
import { FaAndroid, FaApple } from 'react-icons/fa';
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
const Container=styled.div`
padding:20px;


`;
const MainFooter=styled.div`
display:flex;
gap:20rem;
@media (max-width: 1024px){
    flex-direction:column;
}

`;




const LeftSide=styled.div`
display:flex;
flex-direction:column;
`;
const Download=styled.div``;
const DownloadFrom=styled.div`
display:flex;
gap:20px;
@media (max-width: 1024px){
    flex-direction:column;
}
`;
const Rightside=styled.div`
display:flex;
flex-direction:column;
`;


const Title=styled.h3`
font-size: 16px;
font-weight: 500;
`;

const FooterLink=styled.div`
p{
    color:#999;
 
}
p span{
    font-size:14px;
    color:#999;
    cursor:pointer;
    margin-top:10px;
    &:hover{
        color:#8cb7f5;
    }
}
`;

export default function Footer() {
    const router = useRouter();
    const isProductPage = router.asPath.includes('/product/');
  return (
        <Container style={{ backgroundColor: isProductPage ? '#E0E0E0' : '#F2F2F2' }}>
            <Center>
             <MainFooter>
              <LeftSide>
              <FooterLink>
                <Title>Help</Title>
                <p>
                    <span>Help Center</span>,<span> Disputes & Reports</span>, <span>Buyer Protection</span>, <span>Report IPR infringement</span>,
                    <br/>
                    <span> Regulated Information</span>, <span>Integrity Compliance </span>
                </p>


                </FooterLink>
                <FooterLink>
                <Title>Browse By Category</Title>
                <p>
                    <span>All Popular</span>,<span> Product</span>, <span>Promotion</span>, <span>Low Price</span>,
                    <span> Great Value</span>, <span>Reviews </span>, <span> Blogs</span>, <span>Seller Portal </span>,
                    <br/>
                    <span> Black Friday</span>, <span>Brand Assistant </span>

                </p>


                </FooterLink>
                <Download>
                   <DownloadFrom>
                   
              </DownloadFrom>

                    
                    

                </Download>
              </LeftSide>
              <Rightside>
              <FooterLink>
                <Title>Brand Multi-Language Sites</Title>
                <p>
                    <span>Arabic</span>,<span> Frensh</span>
                    </p>


                </FooterLink>
                <FooterLink>
                <Title>Brand Group</Title>
                <p>
                    <span>Brand Group website</span>,<span> Brand Cloud</span>,<span>Brand International</span>
                    </p>


                </FooterLink>

              </Rightside>

            
             </MainFooter>

            </Center>
        </Container>

  )
}

