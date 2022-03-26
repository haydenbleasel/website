import { asHTML } from '@prismicio/helpers';
import type { SliceComponentProps } from '@prismicio/react';
import type { RichTextField } from '@prismicio/types';
import type { FC } from 'react';

const Blockquote: FC<
  SliceComponentProps<{
    slice_type: 'blockquote';
    primary: {
      content: RichTextField;
    };
  }>
> = ({ slice }) => (
  <blockquote
    // eslint-disable-next-line react/no-danger, @typescript-eslint/naming-convention
    dangerouslySetInnerHTML={{ __html: asHTML(slice.primary.content) }}
  />
);

export default Blockquote;
