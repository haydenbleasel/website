const parseError = (error: unknown): string =>
  error instanceof Error ? error.message : `${error as string}`;

export default parseError;
