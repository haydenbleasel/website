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

const MDX_URL =
  "https://raw.githubusercontent.com/haydenbleasel/website/refs/heads/main/apps/website/app/page.mdx";

const fetchContent = async (): Promise<string> => {
  const response = await fetch(MDX_URL);
  return response.text();
};

const parseMdx = (content: string): string[] => {
  const lines = content
    .replace(/<[^>]+\s*\/>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/ ?[\u{1F1E0}-\u{1F1FF}]/gu, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  const formattedLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      formattedLines.push("");
      formattedLines.push(`━━━ ${line.slice(3).toUpperCase()} ━━━`);
      formattedLines.push("");
    } else if (line.startsWith("- ")) {
      formattedLines.push(`  • ${line.slice(2)}`);
    } else {
      formattedLines.push(line);
      formattedLines.push("");
    }
  }

  formattedLines.push("");
  formattedLines.push("Visit my website @ haydenbleasel.com");

  return formattedLines;
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const printCharacter = async (char: string): Promise<void> => {
  process.stdout.write(char);
  await sleep(10);
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
  const contentPromise = fetchContent();

  for (const line of bootLines) {
    await printLine(line);
  }

  const [content] = await Promise.all([contentPromise, sleep(2000)]);

  await fadeUp(bootLines);

  const introLines = parseMdx(content);

  for (const line of introLines) {
    await printLine(line);
  }
};

main();
