import { PrismicLink } from '@prismicio/react';
import Image from 'next/image';
import type { FC } from 'react';

type StoreButtonsProps = {
  appStoreLink: string;
  googlePlayLink: string;
};

export const StoreButtons: FC<StoreButtonsProps> = ({
  appStoreLink,
  googlePlayLink,
}) => (
  <div className="flex gap-3">
    <PrismicLink href={appStoreLink} aria-label="App Store">
      <div className="flex transition-all hover:translate-y-[-2px] hover:drop-shadow-md dark:hidden">
        <Image
          src="/images/app-store.svg"
          layout="fixed"
          width={132}
          height={44}
          alt="Download on the App Store"
          priority
          quality={100}
        />
      </div>
      <div className="hidden transition-all hover:translate-y-[-2px] hover:drop-shadow-md dark:flex">
        <Image
          src="/images/app-store-dark.svg"
          layout="fixed"
          width={132}
          height={44}
          alt="Download on the App Store"
          priority
          quality={100}
        />
      </div>
    </PrismicLink>
    <PrismicLink href={googlePlayLink} aria-label="Play Store">
      <div className="flex transition-all hover:translate-y-[-2px] hover:drop-shadow-md dark:hidden">
        <Image
          src="/images/play-store.svg"
          layout="fixed"
          width={148.5}
          height={44}
          alt="Get it on Google Play"
          priority
          quality={100}
        />
      </div>
      <div className="hidden transition-all hover:translate-y-[-2px] hover:drop-shadow-md dark:flex">
        <Image
          src="/images/play-store-dark.svg"
          layout="fixed"
          width={148.5}
          height={44}
          alt="Get it on Google Play"
          priority
          quality={100}
        />
      </div>
    </PrismicLink>
  </div>
);

export default StoreButtons;
