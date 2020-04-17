import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  align-items: center;
  background-color: ${props => props.theme.actionButton.bgColor};
  border: ${props => props.theme.actionButton.border};
  border-radius: 30px;
  bottom: -30px;
  box-shadow: ${props => props.theme.actionButton.boxShadow};
  cursor: pointer;
  display: flex;
  fill: ${props => props.theme.actionButton.color};
  height: 60px;
  justify-content: center;
  position: absolute;
  right: 20px;
  transition: transform 200ms;
  width: 60px;

  &:hover {
    background-color: ${props => props.theme.actionButton._hover.bgColor};
    transform: scale(1.1);
  }
`;

const ActionButton = ({ children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      {children}
    </Wrapper>
  );
};

export default ActionButton;
