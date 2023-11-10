import styled from 'styled-components';
import Button from './Button';

const StyledSub = styled.div`
  margin-top: 50px;
  background-color: #eff2f4;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;
const SubForm=styled.div``;
const EmailInput = styled.input`
  padding: 8px;
  margin-top: 10px;
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"%3E%3Cpath d="M20.1666 5.50002C20.1666 4.49169 19.3416 3.66669 18.3333 3.66669H3.66665C2.65831 3.66669 1.83331 4.49169 1.83331 5.50002V16.5C1.83331 17.5084 2.65831 18.3334 3.66665 18.3334H18.3333C19.3416 18.3334 20.1666 17.5084 20.1666 16.5V5.50002ZM18.3333 5.50002L11 10.0834L3.66665 5.50002H18.3333ZM18.3333 16.5H3.66665V7.33335L11 11.9167L18.3333 7.33335V16.5Z" fill="%238B96A5"%3E%3C/path%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: 8px center;
  padding-left: 36px;
  border:1px solid #E0E0E0;
  width: 274px;
    border-radius:5px;
    margin-right:10px;
`;

export default function Subscribe() {
  return (
    <StyledSub>
      <Container>
        <Title>Subscribe on our newsletter</Title>
        <p>
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
     <SubForm>
     <EmailInput
          type="text"
          placeholder="Email"
        />
        <Button primary type="submit">Subscribe</Button>
     </SubForm>
      </Container>
    </StyledSub>
  );
}
