export const AskChatGPT = () => {
  const url = new URL("https://chatgpt.com/");
  url.searchParams.set("hints", "search");
  url.searchParams.set(
    "prompt",
    `Read these 3 pages:

- https://www.haydenbleasel.com/
- https://www.haydenbleasel.com/about
- https://www.haydenbleasel.com/projects

Then explain in simple terms what this person does.`
  );

  return (
    <div className="pb-8">
      <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">
        Don't understand this site?{" "}
        <a
          className="font-medium text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
          href={url.toString()}
          rel="noopener noreferrer"
          target="_blank"
        >
          Ask ChatGPT
        </a>
      </p>
    </div>
  );
};
