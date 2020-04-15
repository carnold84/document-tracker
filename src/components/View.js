import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Header = styled.header`
  align-items: center;
  background-color: #E5E1DE;
  background-image: url("./img/bg_pattern.png");
  background-repeat: repeat;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  transition: height 400ms ease;
  width: 100%;
  z-index: 1000;

  .is-expanded & {
    height: 250px;
  }

  .is-compact &, .is-default & {
    height: 60px;
  }
`;

const HeaderTitle = styled.h2`
  color: #222222;
  font-family: ${props => props.theme.fontFamilyPrimary};
  font-style: italic;
  font-weight: 400;
  transition: font-size 400ms ease;

  .is-expanded & {
    font-size: 2em;
  }

  .is-compact &, .is-default & {
    font-size: 1.4em;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 300px 20px 20px;
  position: relative;

  .is-expanded & {
    padding: 300px 20px 20px;
  }

  .is-compact &, .is-default & {
    padding: 100px 20px 20px;
  }
`;

export const HEADER_TYPES = {
  COMPACT: 'is-compact',
  EXPANDED: 'is-expanded',
};

const TOP_LIMIT = 160;

const View = ({ children, controls, defaultHeaderType = HEADER_TYPES.COMPACT, title }) => {
  const [headerType, setHeaderType] = useState(defaultHeaderType);

  useEffect(() => {
    if (defaultHeaderType === HEADER_TYPES.EXPANDED) {
      const onScroll = () => {
        const {scrollTop} = document.documentElement;
      
        if (headerType === HEADER_TYPES.EXPANDED && scrollTop >= TOP_LIMIT) {
          setHeaderType(HEADER_TYPES.COMPACT);
        } else if (headerType === HEADER_TYPES.COMPACT && scrollTop < TOP_LIMIT) {
          setHeaderType(HEADER_TYPES.EXPANDED);
        }
      };
    
      window.addEventListener('scroll', onScroll);
    
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  });

  let classes = [];

  if (headerType === HEADER_TYPES.COMPACT) {
    classes.push('is-compact');
  } else if (headerType === HEADER_TYPES.EXPANDED) {
    classes.push('is-expanded');
  }

  if (defaultHeaderType === HEADER_TYPES.COMPACT) {
    classes.push('is-default');
  }

  return (
    <Wrapper className={classes.join(' ')}>
      <Header>
        {title && <HeaderTitle>{title}</HeaderTitle>}
        {controls}
      </Header>
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};

export default View;
