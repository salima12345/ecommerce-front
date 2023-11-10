import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
const LeftTime = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
`;

const StyledTime = styled.div`
  
 
`;

const Title1 = styled.h1`
  color: black;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  @media (max-width: 1024px){
    font-weight: 500;
    font-size: 14px;



  }
`;



const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <LeftTime>
      <StyledTime>
        <Title1> {timeLeft.days} d:</Title1>
      </StyledTime>
      <StyledTime>
        <Title1> {timeLeft.hours} h:</Title1>
      </StyledTime>
      <StyledTime>
        <Title1> {timeLeft.minutes} m:</Title1>
      </StyledTime>
      <StyledTime>
        <Title1> {timeLeft.seconds}s </Title1>
      </StyledTime>
    </LeftTime>
  );
};

export default dynamic(()=>Promise.resolve(Countdown),{ssr:false})
