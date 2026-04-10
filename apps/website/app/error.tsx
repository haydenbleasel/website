"use client";

const Error = () => (
  <div className="flex flex-col gap-4">
    <h1 className="font-serif text-[28px] sm:text-[38px] leading-[1.2] text-foreground">
      Something went wrong
    </h1>
    <p className="text-muted-foreground">
      An unexpected error occurred. Please try refreshing the page.
    </p>
  </div>
);

export default Error;
