import type { JSXMapSerializer, SliceComponentProps } from '@prismicio/react';
import { PrismicRichText } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';
import type { FC } from 'react';
import richTextComponents from '../../components/richTextComponents';

const blogComponents: JSXMapSerializer = {
  ...richTextComponents,
  paragraph: ({ children, key }) => (
    <p
      key={key}
      className="mb-4 indent-8 text-md font-normal text-gray-900 dark:text-white"
    >
      {children}
    </p>
  ),
};

const RichText: FC<
  SliceComponentProps<{
    slice_type: 'rich_text';
    primary: {
      content: RichTextField;
    };
  }>
> = ({ slice }) => (
  <div>
    <PrismicRichText
      field={slice.primary.content}
      components={blogComponents}
    />
  </div>
);

export default RichText;
