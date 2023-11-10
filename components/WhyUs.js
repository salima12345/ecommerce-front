import React from 'react'
import styled from 'styled-components'
import Center from './Center';
import { FaFacebook, FaInstagram, FaTwitter, FaFacebookMessenger, FaWhatsapp } from 'react-icons/fa';
const SloganContainer=styled.div`
background-color:#ffffff;
width:100%;
position:absolute;



`;
const Slogan=styled.div`
display:flex;
flex-direction:row;
align-items:center;
border-bottom:1px solid #ccc;

span{
    background-color: #ccc;
    height:80px;
    width:1px;
    margin-top:60px;
}
@media (max-width: 1024px){
    flex-direction:column;
    
}


`;
const SloganItem=styled.div`
width:30rem;
padding:20px;
text-align:center;
p{
    font-size:12px;
    color:#999;

}
p a{
    margin-right:5px;
    cursor:pointer;
    &:hover{
        color:#8cb7f5;
    }

}
`;
const Contact=styled.div`
padding:20px;
display:flex;
flex-direction:row;
gap:25rem;
@media (max-width: 1024px){
    flex-direction:column;
}
`;
const SocialMedia=styled.div``;
const MediaIcons=styled.div`
display: flex;

  align-items: center;


  svg {
    margin-right: 10px;
    font-size: 24px; 
    color: #333;
    cursor:pointer;
    transition: color 0.3s;
    &:hover {
        color: #000;
      }
  }
  
`;
const Links=styled.div`
display:flex;
flex-direction:row;
gap:70px;
@media (max-width: 1024px){
    flex-direction:column;
}

`;
const LinkItem=styled.div`
display:flex;
flex-direction:column;
a{
    font-size:14px;
    color:#999;
    cursor:pointer;
    margin-top:10px;

}
`;

export default function WhyUs() {
  return (
    <SloganContainer>
        <Center>
        <Slogan>
        <SloganItem>
            <img src="/money-check-dollar-svgrepo-com.svg"  width="30px" heigth="30px" alt=""/>
            <h5>Great value</h5>
            <p>We offer competitive prices
                <br/> 
                on over 100 million items.</p>

        </SloganItem>
        <span></span>
        <SloganItem>
        <img src="/delivery-svgrepo-com.svg"  width="30px" heigth="30px" alt=""/>
            <h5>Worldwide shopping</h5>
            <p>We ship to over 200 countries
                <br/>
                 and regions, and our site
                 <br/> 
                comes in 12 languages.</p>

        </SloganItem>
        <span></span>

        <SloganItem>
        <img src="/payment-card-svgrepo-com.svg"  width="30px" heigth="30px" alt=""/>
            <h5>Safe payment</h5>
            <p>Pay with the world’s most
                <br/>
                 popular and secure payment 
                 <br/>
                  methods.</p>

        </SloganItem>
        <span></span>

        <SloganItem>
        <img src="/shield-checkmark-svgrepo-com.svg"  width="30px" heigth="30px" alt=""/>
            <h5>Shop with confidence</h5>
            <p>Our Buyer Protection policy 
                <br/>
                covers your entire purchase
                <br/>
                 journey.</p>

        </SloganItem>
        <span></span>
        
        <SloganItem>
        <img src="/call-center-person-3-svgrepo-com.svg"  width="30px" heigth="30px" alt=""/>
            <h5># center</h5>
            <p>Round-the-clock assistance 
                <br/>
                for a smooth shopping
                <br/> experience.</p>

        </SloganItem>
        <span></span>
        <SloganItem>
            <div>
            <img src="/android-svgrepo-com(1).svg"  width="30px" heigth="30px" alt=""/>
            <img src="/apple-svgrepo-com.svg"  width="30px" heigth="30px" alt=""/>


            </div>
            <h5>Shop better</h5>
            <p>
                <a>Download the app</a>
                for mobile
                <br/>
                -only features such as image 
                <br/>
                search and discount games.
            </p>

        </SloganItem>





    </Slogan>
    <Contact>
        <SocialMedia>
            <h5>Stay connected</h5>
            <MediaIcons>
            <FaFacebook />
      <FaInstagram />
      <FaTwitter />
      <FaFacebookMessenger />
      <FaWhatsapp />

            </MediaIcons>

        </SocialMedia>
        <Links>
        <LinkItem>
        <h5>Shopping with us</h5>
        <a>Making Payments</a>
        <a >Delivery Options</a>
        <a >Buyer Protection</a>


        </LinkItem>
        <LinkItem>
        <h5>Customer service</h5>
        <a > Center</a>
        <a >Transaction Services Agreement for non-</a>
        <a >EU/UK Consumers</a>
        <a >Terms and Conditions for EU/EEA/UK </a>
        <a >Consumers (Transactions)</a>
        <a>Take our feedback survey</a>



        </LinkItem>
        <LinkItem>
        <h5>Collaborate with us</h5>
        <a>Partnerships</a>
        <a >Affiliate program</a>
        <a >DS Center</a>


        </LinkItem>
        </Links>

    </Contact>

        </Center>



    </SloganContainer>
    
  )
}

