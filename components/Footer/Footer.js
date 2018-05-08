import  styled, { css } from 'styled-components';

const Footer = () => (
    <FooterClass>
      <FooterText>Copyright © 2018 Qdemy</FooterText>
    </FooterClass>
  )

const FooterClass = styled.div`
  margin-left: 320px;
  margin-right: 70px;
  text-align: center;
  color: #50667b;
  border-top: 1px solid rgba(0, 0, 0, 0.0625);
`;

const FooterText = styled.div`
  font-size: 14px;
  margin: 23px 0;
`;
  
  export default Footer;