"use client";

const GlobalError = () => (
  <html lang="en">
    <body>
      <main
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, sans-serif",
          gap: "1rem",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <h1>Something went wrong</h1>
        <p>An unexpected error occurred. Please try refreshing the page.</p>
      </main>
    </body>
  </html>
);

export default GlobalError;
