import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  align-items: center;
  background-color: ${props => props.theme.color1};
  border: 1px solid ${props => props.theme.colorAlt1};
  border-radius: 30px;
  bottom: -30px;
  display: flex;
  fill: ${props => props.theme.colorAlt1};
  height: 60px;
  justify-content: center;
  position: absolute;
  right: 20px;
  width: 60px;
`;

const ActionButton = ({ children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      {children}
    </Wrapper>
  );
};

export default ActionButton;
