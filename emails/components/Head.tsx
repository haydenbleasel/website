import type { FC, ReactElement } from 'react';
import React from 'react';
import {
  MjmlHead,
  MjmlFont,
  MjmlAttributes,
  MjmlAll,
  MjmlStyle,
  MjmlRaw,
} from 'mjml-react';
import { black, grayDark } from './theme';

type HeadProps = { children?: ReactElement };

const Head: FC<HeadProps> = ({ children }) => (
  <MjmlHead>
    <MjmlRaw>
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
    </MjmlRaw>
    <MjmlFont
      name="Inter"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900"
    />
    <MjmlStyle>{`
        .smooth {
          -webkit-font-smoothing: antialiased;
        }
        .paragraph a {
          color: ${black} !important;
        }
        .li {
          text-indent: -18px;
          margin-left: 24px;
          display: inline-block;
        }
        .footer a {
          text-decoration: none !important;
          color: ${grayDark} !important;
        }
        .dark-mode {
          display: none;
        }
        @media (min-width:480px) {
          td.hero {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .logo > * {
            filter: invert(1) !important;
          }
          .paragraph > *, .paragraph a, .li > div {
            color: #fff !important;
          }
          .dark-mode {
            display: inherit;
          }
          .light-mode {
            display: none;
          }
        }
      `}</MjmlStyle>
    <MjmlAttributes>
      <MjmlAll
        font-family='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        font-weight="400"
      />
    </MjmlAttributes>
    {children}
  </MjmlHead>
);

export default Head;
