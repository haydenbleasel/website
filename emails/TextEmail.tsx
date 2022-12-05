import type { FC } from 'react';
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlSpacer,
} from 'mjml-react';
import Head from './components/Head';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  leadingTight,
  leadingRelaxed,
  textBase,
  textLg,
} from './components/theme';
import BulletedList from './components/BulletedList';

export type TextEmailProps = {
  name: string;
  message: string;
  items?: string[];
};

const TextEmail: FC<TextEmailProps> = ({ name, message, items }) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>
      <Header />
      <MjmlSection padding="0 24px 0" cssClass="smooth">
        <MjmlColumn>
          <MjmlText
            padding="24px 0 8px"
            fontSize={textLg}
            lineHeight={leadingTight}
            cssClass="paragraph"
          >
            Incoming message from {name}
          </MjmlText>
          <MjmlText
            cssClass="paragraph"
            padding="0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
          >
            {message}
          </MjmlText>
          {Array.isArray(items) && (
            <>
              <MjmlSpacer height="16px" />
              <BulletedList items={items} />
            </>
          )}
          <MjmlText
            padding="16px 0"
            fontSize={textBase}
            lineHeight={leadingRelaxed}
            cssClass="paragraph"
          >
            ♥,
            <br />
            Mailing
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
      <Footer />
    </MjmlBody>
  </Mjml>
);

export default TextEmail;
