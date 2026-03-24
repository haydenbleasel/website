const output = `Member of Technical Staff at OpenAI. Originally from Sydney and currently living in San Francisco, California.

Visit my website: haydenbleasel.com`;

const main = (): void => {
  process.stdout.write(`${output}\n`);
};

if (import.meta.main) {
  main();
}
