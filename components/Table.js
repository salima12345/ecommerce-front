import styled from "styled-components";
const StyledTable=styled.table`
width:100%;
th{
    text-align:left;
    text-transform:uppercase;
    color:#aaa;
    font-weight:normal;
}


`;


export default function Table(props){
    return(
        <StyledTable {...props}/>
    )

}