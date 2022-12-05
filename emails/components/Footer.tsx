import { MjmlSection, MjmlColumn, MjmlText } from 'mjml-react';
import type { FC } from 'react';
import { grayDark, textSm } from './theme';

const Footer: FC = () => (
  <MjmlSection cssClass="smooth">
    <MjmlColumn>
      <MjmlText
        cssClass="footer"
        padding="24px 24px 48px"
        fontSize={textSm}
        color={grayDark}
      >
        © 2022 Mailing&nbsp;&nbsp;·&nbsp;&nbsp;
      </MjmlText>
    </MjmlColumn>
  </MjmlSection>
);

export default Footer;
