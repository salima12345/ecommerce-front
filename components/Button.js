import styled, {css} from "styled-components";
import { primary } from "@/lib/colors";
export const  ButtonStyled=css`
border:0;
padding: 5px 10px;
border-radius: 5px;
cursor: pointer;
display: inline-flex;
align-items: center;
text-decoration: none;
font-family: 'Poppins', sans-serif;
font-weight:500;
svg{
  height: 16px;
  margin-right: 5px;
}
${props=>props.block && css`
display:block;
width:100%;


`}
${props=>props.white && !props.outline && css`
background-color:#0F0000;

color:#fff;



`}

${props => props.white && props.outline && css`
background-color: transparent;
color: #0F0000;
border: 1px solid #0F0000;
`}
${props=>props.primary && !props.outline && css`
background-color:${primary};
color:#fff;
border:1px solid ${primary};


`}
${props => props.black && props.outline && css`
background-color: #000;
color: #fff;
border: 1px solid #000;
`}
${props=>props.black && !props.outline && css`
background-color:#ffffff;
color:#000;
border:1px solid #fff;



`}
${props=>props.primary && props.outline && css`
background-color:#ffffff;
color:${primary};



`}
${props=>props.size==='l' && css`
font-size:1.2rem;
padding:10px 20px;
svg{
    height:20px;
}
`}
`;
 const StyledButton=styled.button`

${ButtonStyled}

`;

export default function  Button({children,...rest})
{
    return(
        <StyledButton {...rest}>
            {children}
        </StyledButton>
    )
}