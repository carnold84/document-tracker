import styled from 'styled-components';

const Label = styled.label`
  color: ${props => props.theme.label.color};
  font-family: ${props => props.theme.label.fontFamily};
  font-style: italic;
  margin: 0 0 5px;
`;

export default Label;
