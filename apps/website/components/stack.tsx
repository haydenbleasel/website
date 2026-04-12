interface StackItem {
  name: string;
  url: string;
  description: string;
}

const stackItems: StackItem[] = [
  {
    description: "Your AI chatbot for everyday use.",
    name: "ChatGPT",
    url: "https://chatgpt.com/",
  },
  {
    description: "Focused desktop app for agentic development.",
    name: "Codex App",
    url: "https://developers.openai.com/codex/app",
  },
  {
    description: "AI speech synthesis and voice cloning.",
    name: "ElevenLabs",
    url: "https://try.elevenlabs.io/5fxrqtrzwdfu",
  },
  {
    description: "The better way to schedule your meetings.",
    name: "Cal.com",
    url: "https://refer.cal.com/haydenbleasel",
  },
  {
    description: "Your ticket to stress-free flying.",
    name: "Flighty",
    url: "https://flighty.com/?via=haydenbleasel",
  },
  {
    description: "A modern, Rust-based terminal.",
    name: "Warp",
    url: "https://app.warp.dev/referral/24YEQY",
  },
  {
    description: "Scheduling and analytics for X.",
    name: "Typefully",
    url: "https://typefully.com/?via=haydenbleasel",
  },
  {
    description: "Simple repository management.",
    name: "GitHub Desktop",
    url: "https://github.com/apps/desktop",
  },
  {
    description: "Grow your wealth with automated investing.",
    name: "Wealthfront",
    url: "https://www.wealthfront.com/c/affiliates/invited/AFFA-NU3D-C5WC-2CWU",
  },
  {
    description: "Simple banking for U.S. startups.",
    name: "Mercury",
    url: "https://mercury.com/r/haste",
  },
  {
    description: "Premium Australian luggage.",
    name: "July",
    url: "https://go.shopmy.us/p-5598980",
  },
  {
    description: "Summon a self-driving car.",
    name: "Waymo",
    url: "https://waymo.smart.link/4pcoqniy5?code=HAYDEN5S6L",
  },
];

export const Stack = () => (
  <div className="grid gap-6 sm:gap-2">
    {stackItems.map((item) => (
      <a
        className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 no-underline"
        href={item.url}
        key={item.name}
        rel="noopener noreferrer"
        target="_blank"
      >
        <p className="font-medium text-foreground group-hover:text-muted">{item.name}</p>
        <p className="text-sm">{item.description}</p>
      </a>
    ))}
  </div>
);
