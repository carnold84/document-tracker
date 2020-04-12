import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${props => props.theme.textAlt1};
  display: flex;
  fill: ${props => props.theme.textAlt1};
  font-family: ${props => props.theme.fontFamilySecondary};
  font-size: 1em;
  left: 20px;
  padding: 7px 0;
  position: absolute;
  top: 20px;
`;

const BackButton = ({ children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
      </svg>
      <span>Back</span>
    </Wrapper>
  );
};

export default BackButton;
