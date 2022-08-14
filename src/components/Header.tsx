import React from 'react';
import styled from 'styled-components';
const logo = require('../assets/logo.svg');

const Container = styled.header`
  margin: 1rem 0 auto;
  display:flex;
  justify-content:center;
  align-items:center;
  bakcground-color: red;

   img{
    width: 100px;
    height: 100px;
    border-radius: 100%;
   }
`;

const Title = styled.h1`
   font-size: 3.5rem;
   font-weight: 700;
   color: #0c766a;
   margin: 0 1rem;
`;

export const Header = () => {
  return (
    <Container>
      <img src={logo.default}/>
    </Container>
  )
}
