import type { FC } from 'react';
import type { SliceComponentProps } from '@prismicio/react';
import Image from 'next/future/image';
import type { FilledLinkToWebField } from '@prismicio/types';
import Link from 'next/link';
import { docResolver } from '../../utils/prismic';

const StoreButtons: FC<
  SliceComponentProps<{
    slice_type: 'store_buttons';
    primary: {
      appStoreLink: FilledLinkToWebField;
      googlePlayLink: FilledLinkToWebField;
    };
  }>
> = ({ slice }) => {
  const appStoreLink = docResolver(slice.primary.appStoreLink);
  const googlePlayLink = docResolver(slice.primary.googlePlayLink);

  return (
    <div className="flex gap-3">
      <Link
        href={appStoreLink}
        aria-label="App Store"
        target="_blank"
        rel="noopener noreferrer"
        className="flex dark:hidden"
      >
        <Image
          src="/images/app-store.svg"
          width={132}
          height={44}
          alt="Download on the App Store"
          priority
          quality={100}
          className="transition-all hover:translate-y-[-2px] hover:drop-shadow-md"
        />
      </Link>
      <Link
        href={appStoreLink}
        aria-label="App Store"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden dark:flex"
      >
        <Image
          src="/images/app-store-dark.svg"
          width={132}
          height={44}
          alt="Download on the App Store"
          priority
          quality={100}
          className="transition-all hover:translate-y-[-2px] hover:drop-shadow-md"
        />
      </Link>
      <Link
        href={googlePlayLink}
        aria-label="Play Store"
        target="_blank"
        rel="noopener noreferrer"
        className="flex dark:hidden"
      >
        <Image
          src="/images/play-store.svg"
          width={148.5}
          height={44}
          alt="Get it on Google Play"
          priority
          quality={100}
          className="transition-all hover:translate-y-[-2px] hover:drop-shadow-md"
        />
      </Link>
      <Link
        href={googlePlayLink}
        aria-label="Play Store"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden dark:flex"
      >
        <Image
          src="/images/play-store-dark.svg"
          width={148.5}
          height={44}
          alt="Get it on Google Play"
          priority
          quality={100}
          className="transition-all hover:translate-y-[-2px] hover:drop-shadow-md"
        />
      </Link>
    </div>
  );
};

export default StoreButtons;
