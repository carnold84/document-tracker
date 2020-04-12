import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const RadioButton = styled.div`
  align-items: center;
  display: flex;
  margin: 0 20px 0 0;
`;

const Label = styled.label`
  color: ${props => props.theme.text1};
  font-family: ${props => props.theme.fontFamilySecondary};
  margin: 0 10px 0 0;
`;

const InputWrapper = styled.div`
  display: flex;
  fill: ${props => props.theme.text1};
  margin: 0 5px 0 0;
  position: relative;
`;

const Input = styled.input.attrs({
  type: 'radio',
})`
  left: 0;
  opacity: 0;
  position: absolute;
  top: 3px;
`;

const RadioGroup = ({ name, onChange, options, value, ...rest }) => {
  const onRadioSelect = evt => {
    onChange(evt.currentTarget.value);
  };

  return (
    <Wrapper {...rest}>
      {options.map(element => {
        const isChecked = element.value === value;
        return (
          <RadioButton key={element.value}>
            <InputWrapper>
                {isChecked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                )}
              <Input
                checked={isChecked}
                id={element.value}
                name={name}
                onChange={onRadioSelect}
                value={element.value}
              />
            </InputWrapper>
            <Label htmlFor={element.value}>{element.label}</Label>
          </RadioButton>
        );
      })}
    </Wrapper>
  );
};

export default RadioGroup;
