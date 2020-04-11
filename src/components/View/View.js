import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  align-items: center;
  background-color: #E5E1DE;
  background-image: url("./document-tracker/img/bg_pattern.png");
  background-repeat: repeat;
  display: flex;
  flex-shrink: 0;
  height: 250px;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderTitle = styled.h2`
  color: #222222;
  font-family: "Lora", serif;
  font-size: 2em;
  font-style: italic;
  font-weight: 400;
`;

const Content = styled.div`
  padding: 300px 20px 20px;
`;

const View = ({ children, controls, maxHeight, minHeight, title }) => {
  const headerEl = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(maxHeight);
  
  const onScroll = () => {
    const {scrollTop} = document.documentElement;
    const nextHeight = headerHeight - scrollTop;

    if (nextHeight > minHeight && nextHeight < maxHeight) {
      setHeaderHeight(headerHeight - scrollTop)
    }
  };

  useEffect(() => {
    setHeaderHeight(headerEl.current.innerHeight);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Wrapper>
      <Header ref={headerEl} style={{height: `${headerHeight}px`}}>
        <HeaderTitle>{title}</HeaderTitle>
        {controls}
      </Header>
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};

export default View;
