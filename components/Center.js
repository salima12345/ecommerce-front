import styled from "styled-components";
const StyledDiv=styled.div`
max-with:800px;
margin:0 auto;
padding:0 60px;

`

export default function Center({children}){
   
    return(
        <StyledDiv>{children}</StyledDiv>
    )
}