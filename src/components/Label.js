import styled from 'styled-components';

const Label = styled.label`
  color: ${props => props.theme.text2};
  font-family: ${props => props.theme.fontFamilyPrimary};
  font-style: italic;
  margin: 0 0 5px;
`;

export default Label;
