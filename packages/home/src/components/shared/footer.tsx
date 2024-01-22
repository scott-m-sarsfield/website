import React from 'react';
import { styled } from 'styled-components';

const StyledFooter = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  flex-wrap: wrap;
  margin: 16px 32px;
`;

const StyledCopyright = styled.div`
  text-align: right;
  background-color: white;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  padding: 8px 16px;
`;

const Footer = () => (
  <StyledFooter>
    <StyledCopyright>&copy; 2024 Scott M Sarsfield</StyledCopyright>
  </StyledFooter>
);

export default Footer;
