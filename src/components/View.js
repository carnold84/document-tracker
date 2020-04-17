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
  background-color: ${props => props.theme.view.header.bgColor};
  background-image: ${props => props.theme.view.header.bgImage};
  background-repeat: repeat;
  box-shadow: ${props => props.theme.view.header.boxShadow};
  display: flex;
  flex-shrink: 0;
  padding: 0 20px;
  position: fixed;
  top: 0;
  transition: height 400ms ease;
  width: 100%;
  z-index: 1000;

  .is-expanded & {
    height: 250px;
    justify-content: center;
  }

  .is-compact &, .is-default & {
    height: 60px;
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  background-position: center center;
  background-image: ${props => props.theme.view.logo.image};
  background-size: contain;
  background-repeat: no-repeat;
  height: 34px;
  left: 50%;
  margin: 0 0 0 -17px;
  opacity: 0;
  position: absolute;
  transition: opacity 200ms;
  width: 40px;

  .is-expanded & {
    opacity: 0;
  }

  .is-compact &, .is-default & {
    opacity: 1;
  }
`;

const LogoFull = styled(Logo)`
  background-image: ${props => props.theme.view.logo.fullImage};
  height: 60px;
  margin: 0 0 0 -111px;
  width: 222px;

  .is-expanded & {
    opacity: 1;
  }

  .is-compact &, .is-default & {
    opacity: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 300px 20px 20px;
  position: relative;

  .is-expanded & {
    padding: 290px 20px 20px;
  }

  .is-compact &, .is-default & {
    padding: 90px 20px 20px;
  }
`;

export const HEADER_TYPES = {
  COMPACT: 'is-compact',
  EXPANDED: 'is-expanded',
};

const TOP_LIMIT = 160;

const View = ({
  children,
  controlsLeft,
  controlsRight,
  defaultHeaderType = HEADER_TYPES.COMPACT,
  title,
}) => {
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
        {controlsLeft}
        <Logo />
        <LogoFull />
        {controlsRight}
      </Header>
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};

export default View;
