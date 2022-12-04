import type { FC } from 'react';
import type { PrimitiveLabelProps } from '@radix-ui/react-label';
import { Root } from '@radix-ui/react-label';

type LabelProps = PrimitiveLabelProps;

const Label: FC<LabelProps> = ({ htmlFor, ...props }) => (
  <Root
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700"
    {...props}
  />
);

export default Label;
