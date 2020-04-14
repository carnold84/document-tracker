import styled from 'styled-components';

import TextField from './TextField';

const Textarea = styled(TextField).attrs({
  as: 'textarea',
})`
  border-radius: 5px;
`;

export default Textarea;
