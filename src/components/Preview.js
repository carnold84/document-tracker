import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${props => props.theme.preview.bgColor};
  border-radius: 5px;
  height: 240px;
  margin: 0 0 20px;
`;

const PreviewImg = styled.img`
  height: 100%;
  object-fit: contain;
  width: 100%;
`;

const Preview = ({link, src}) => {
  return (
    <Wrapper>
      {src && link && (
        <a href={link} rel="noopener noreferrer" target={'_blank'}>
          <PreviewImg alt={'Preview'} src={src} />
        </a>
      )}
      {src && !link && (
        <PreviewImg alt={'Preview'} src={src} />
      )}
    </Wrapper>
  );
};

export default Preview;
