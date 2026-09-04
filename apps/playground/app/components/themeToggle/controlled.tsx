"use client";

import { Card, ThemeToggle } from "@cubicsui/components";
import { useState } from "react";

export function Controlled() {
  const themes = ["light", "system", "dark"] as const;
  const [current, setCurrent] = useState<(typeof themes)[number]>("light");

  return (
    <Card className="column">
      <ThemeToggle
        variant="full"
        currentTheme={current}
        themeObject={{
          light: { text: "Light Mode", onClick: () => setCurrent("system") },
          system: { text: "System Mode", onClick: () => setCurrent("dark") },
          dark: { text: "Dark Mode", onClick: () => setCurrent("light") },
        }}
      />
      <p>Current theme is: {current}</p>
    </Card>
  );
}
