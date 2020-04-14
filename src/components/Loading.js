import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Container = styled.div`
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  top: 0;
  width: 50px;
`;

const Loader = styled.div`
  margin: 0 auto;
  position: relative;
  width: 50px;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const Circle = styled.svg`
  animation: ${rotate} 2s linear infinite;
  bottom: 0;
  height: 50px;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  stroke: ${props => props.theme.colorAlt2};
  top: 0;
  transform-origin: center center;
  width: 50px;
`;

const Path = styled.circle`
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-width: 3px;
`;

const Loading = () => {
  return (
    <Wrapper>
      <Container>
        <Loader>
          <Circle viewBox="25 25 50 50">
            <Path cx="50" cy="50" r="15" fill="none" />
          </Circle>
        </Loader>
      </Container>
    </Wrapper>
  );
};

export default Loading;
