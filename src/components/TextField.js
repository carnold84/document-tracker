import styled from 'styled-components';

const TextField = styled.input`
  background-color: ${props => props.theme.color1};
  border: 2px solid ${props => props.theme.color3};
  border-radius: 22px;
  color: ${props => props.theme.text1};
  font-family: ${props => props.theme.fontFamilySecondary};
  font-size: 1em;
  margin: 0 0 20px;
  padding: 7px 15px;

  &:focus {
    box-shadow: 0 0 0 2px ${props => props.theme.color4};
    outline: none;
  }
`;

export default TextField;
