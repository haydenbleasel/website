/* eslint-disable import/unambiguous, @typescript-eslint/explicit-member-accessibility */
// https://github.com/microsoft/TypeScript/issues/46907

declare namespace Intl {
  type ListType = 'conjunction' | 'disjunction';

  type ListFormatOptions = {
    localeMatcher?: 'lookup' | 'best fit';
    type?: ListType;
    style?: 'long' | 'short' | 'narrow';
  };

  type ListFormatPart = {
    type: 'element' | 'literal';
    value: string;
  };

  class ListFormat {
    constructor(locales?: string | string[], options?: ListFormatOptions);
    format(values: unknown[]): string;
    formatToParts(values: unknown[]): ListFormatPart[];
    supportedLocalesOf(
      locales: string | string[],
      options?: ListFormatOptions
    ): string[];
  }
}
