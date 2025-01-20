export const Attribution = () => (
  <div className="flex items-center justify-center bg-dashed p-4 text-muted-foreground text-sm">
    <a
      href="https://logo.dev"
      aria-label="Logo API"
      // biome-ignore lint/a11y/noBlankTarget: "required for logo.dev attribution"
      target="_blank"
    >
      Logos provided by Logo.dev
    </a>
  </div>
);
