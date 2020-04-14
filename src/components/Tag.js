import styled from 'styled-components';

const Tag = styled.p`
  background-color: ${props => props.theme.color3};
  color: ${props => props.theme.text2};
  font-size: 0.8em;
  margin: 0;
  padding: 6px 9px;
  text-transform: uppercase;
`;

export default Tag;
