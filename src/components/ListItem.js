import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.li`
  align-items: center;
  background-color: ${props => props.theme.color2};
  border-radius: 5px;
  color: ${props => props.theme.colorAlt1};
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 100px 40px;
  justify-content: flex-end;
  margin: 0 0 20px;
  padding: 20px 25px;
`;

const Text = styled.div`
  display: grid;
  font-family: ${props => props.theme.fontFamilySecondary};
  grid-gap: 7px;
  grid-template-rows: auto auto;
`;

const Title = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 1.1em;
  font-weight: 400;
  margin: 0;
`;

const SubTitle = styled.p`
  color: ${props => props.theme.text2};
  font-size: 1em;
  margin: 0;
`;

const TypeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Type = styled.p`
  background-color: ${props => props.theme.color3};
  color: ${props => props.theme.text2};
  font-size: 0.9em;
  padding: 6px 9px;
  text-transform: uppercase;
`;

const Btn = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color1};
  border-radius: 20px;
  display: flex;
  fill: ${props => props.theme.text2};
  height: 40px;
  justify-content: center;
  width: 40px;

  svg {
    transform: scaleX(-1) translateX(4px);
  }
`;

const View = ({ subTitle, title, type }) => {
  return (
    <Wrapper>
      <Text>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Text>
      <TypeContainer>
        <Type>{type}</Type>
      </TypeContainer>
      <Btn>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
          <path fill="none" d="M0 0h24v24H0z"/>
        </svg>
      </Btn>
    </Wrapper>
  );
};

export default View;
