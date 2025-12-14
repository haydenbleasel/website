const bootLines = [
  "*************** PIP-OS(R) V7.1.0.8 ***************",
  "",
  "",
  "",
  "COPYRIGHT 2075 ROBCO (R)",
  "LOADER V1.1",
  "EXEC VERSION 41.10",
  "64k RAM SYSTEM",
  "38911 BYTES FREE",
  "NO HOLOTAPE FOUND",
  "LOAD ROM(1): DEITRIX 303",
];

const introLines = [
  "Hi, I'm Hayden Bleasel.",
  "",
  "I design and build software on the internet. I'm originally from Sydney, Australia and currently living in San Francisco, California.",
  "",
  "Visit my website @ haydenbleasel.com",
];

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const printCharacter = async (char: string): Promise<void> => {
  process.stdout.write(char);
  await sleep(30);
};

const printLine = async (line: string): Promise<void> => {
  for (const char of line) {
    await printCharacter(char);
  }
  process.stdout.write("\n");
};

const clearScreen = (): void => {
  process.stdout.write("\x1b[2J\x1b[H");
};

const redrawLines = (visibleLines: string[]): void => {
  clearScreen();
  for (const line of visibleLines) {
    process.stdout.write(`${line}\n`);
  }
};

const fadeUp = async (renderedLines: string[]): Promise<void> => {
  const currentLines = [...renderedLines];

  while (currentLines.length > 0) {
    await sleep(100);
    currentLines.shift();
    redrawLines(currentLines);
  }
};

const main = async (): Promise<void> => {
  for (const line of bootLines) {
    await printLine(line);
  }

  await sleep(2000);
  await fadeUp(bootLines);

  for (const line of introLines) {
    await printLine(line);
  }
};

main();
