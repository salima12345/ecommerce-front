import styled from "styled-components";
import { useState } from "react";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const BigImage = styled.img`
  max-width: 100%;
  margin-top:40px;
  margin-right:8rem;
  max-height: 200px;
  transition: transform 0.3s ease; 
  transform: scale(${(props) => (props.active ? 1.5 : 1)});
`;
const ImageButtons = styled.div`
  display: flex;
  flex-direction:column;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `
      border-color: #ccc;
    `
      : `
      border-color: transparent;
    `}
  height: 70px;
  width:90px;

  cursor: pointer;
  border-radius: 5px;
`;
const BigImageWrapper = styled.div`
  height: 10rem;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
          <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </ImageButton>
        ))}
      </ImageButtons>
      <BigImageWrapper>
        <BigImage src={activeImage} active={true} />
      </BigImageWrapper>

    </>
  );
}
