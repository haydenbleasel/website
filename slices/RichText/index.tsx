import type { SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';
import type { FC } from 'react';

const RichText: FC<
  SliceComponentProps<{
    slice_type: 'rich_text';
    primary: {
      content: RichTextField;
    };
  }>
> = ({ slice }) => <PrismicRichText field={slice.primary.content} />;

export default RichText;
