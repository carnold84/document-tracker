import styled from 'styled-components';

const TextField = styled.input`
  background-color: ${props => props.theme.textField.bgColor};
  border: ${props => props.theme.textField.border};
  border-radius: 22px;
  color: ${props => props.theme.textField.color};
  font-family: ${props => props.theme.textField.fontFamily};
  font-size: 1em;
  margin: 0 0 20px;
  padding: 7px 15px;

  &:focus {
    box-shadow: ${props => props.theme.textField._focus.boxShadow};
    outline: none;
  }

  &:hover {
    border: ${props => props.theme.textField._hover.border};
  }
`;

export default TextField;
