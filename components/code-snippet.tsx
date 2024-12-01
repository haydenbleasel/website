import type { HandlerProps } from 'basehub/react-rich-text';
import { codeToHtml } from 'shiki';

type CodeSnippetProps = HandlerProps<'pre'>;

export const CodeSnippet = async ({
  children,
  language,
  code,
}: CodeSnippetProps) => {
  const html = await codeToHtml(code, {
    theme: 'vitesse-light',
    lang: language,
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
