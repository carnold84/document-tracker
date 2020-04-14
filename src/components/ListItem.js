import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

const Wrapper = styled.li`
  align-items: center;
  background-color: ${props => props.theme.color2};
  border-radius: 5px;
  color: ${props => props.theme.colorAlt1};
  cursor: pointer;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 100px 30px;
  justify-content: flex-end;
  margin: 0 0 20px;
  padding: 15px 25px;
`;

const Text = styled.div`
  display: grid;
  font-family: ${props => props.theme.fontFamilySecondary};
  grid-gap: 7px;
  grid-template-rows: auto auto;
`;

const Title = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 1.2em;
  font-weight: 400;
  margin: 0;
`;

const SubTitle = styled.p`
  color: ${props => props.theme.text2};
  font-size: 1em;
  margin: 0;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.div`
  align-items: center;
  background-color: ${props => props.theme.color1};
  border-radius: 15px;
  display: flex;
  fill: ${props => props.theme.text2};
  height: 30px;
  justify-content: center;
  transition: transform 200ms;
  width: 30px;

  svg {
    transform: scaleX(-1) translateX(3px);
  }

  &:hover {
    background-color: #293238;
    transform: scale(1.25);
  }
`;

const ListItem = ({ onClick, subTitle, title, type }) => {
  return (
    <Wrapper onClick={onClick}>
      <Text>
        <Title>{title}</Title>
        <SubTitle>{subTitle}</SubTitle>
      </Text>
      <TagContainer>
        <Tag>{type}</Tag>
      </TagContainer>
      <Btn>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
          <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
          <path fill="none" d="M0 0h24v24H0z"/>
        </svg>
      </Btn>
    </Wrapper>
  );
};

export default ListItem;
