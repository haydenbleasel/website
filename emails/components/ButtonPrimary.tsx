import { MjmlButton } from 'mjml-react';
import type { FC } from 'react';
import { black, grayLight, leadingTight, textBase, borderBase } from './theme';

type ButtonPrimaryProps = {
  link: string;
  uiText: string;
};

const ButtonPrimary: FC<ButtonPrimaryProps> = ({ link, uiText }) => (
  <>
    <MjmlButton
      lineHeight={leadingTight}
      fontSize={textBase}
      height={52}
      padding="0"
      align="left"
      href={link}
      backgroundColor={black}
      borderRadius={borderBase}
      cssClass="light-mode"
    >
      {uiText}
    </MjmlButton>
    <MjmlButton
      lineHeight={leadingTight}
      fontSize={textBase}
      height={52}
      padding="0"
      align="left"
      href={link}
      backgroundColor={grayLight}
      color={black}
      borderRadius={borderBase}
      cssClass="dark-mode"
    >
      {uiText}
    </MjmlButton>
  </>
);

export default ButtonPrimary;
