import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import { PrismicLink } from '@prismicio/react';
import Image from 'next/image';

const StoreButtons: FC<
  SliceComponentProps<{
    slice_type: 'store_buttons';
    primary: {
      appStoreLink: string;
      googlePlayLink: string;
    };
  }>
> = ({ slice }) => (
  <div className="flex gap-3">
    <PrismicLink href={slice.primary.appStoreLink} aria-label="App Store">
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
    <PrismicLink href={slice.primary.googlePlayLink} aria-label="Play Store">
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
