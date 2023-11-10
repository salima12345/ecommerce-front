import styled from "styled-components";

export default function Center({children}){
    const StyledDiv=styled.div`
    max-with:800px;
    margin:0 auto;
    padding:0 60px;

    `
    return(
        <StyledDiv>{children}</StyledDiv>
    )
}