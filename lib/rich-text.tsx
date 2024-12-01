import { CodeSnippet } from '@/components/code-snippet';
import type { RichText } from 'basehub/react-rich-text';
import type { ComponentProps } from 'react';

export const richTextComponents: ComponentProps<typeof RichText>['components'] =
  {
    pre: CodeSnippet,
  };
