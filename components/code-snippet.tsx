import type { HandlerProps } from 'basehub/react-rich-text';
import { type Highlighter, getSingletonHighlighter } from 'shiki';

type CodeSnippetProps = HandlerProps<'pre'>;

export const CodeSnippet = async ({
  children,
  language,
  code,
}: CodeSnippetProps) => {
  const highlighter: Highlighter = await getSingletonHighlighter({
    themes: ['dark-plus'],
    langs: [language],
  });
  const html = highlighter.codeToHtml(code, {
    theme: 'dark-plus',
    lang: language,
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
