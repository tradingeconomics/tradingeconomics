"use client";

import { Moon, Sun } from "lucide-react";

import { applyTheme, type Theme } from "@/lib/theme";
import { useHydrated } from "@/lib/use-hydrated";
import { useIsDark } from "@/lib/use-is-dark";
import { cn } from "@/lib/utils";

const segmentClass =
  "flex size-7 items-center justify-center rounded-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring/50";

function segmentStyle(active: boolean) {
  return active
    ? {
        backgroundColor: "var(--toggle-active-bg)",
        color: "var(--toggle-active-fg)",
      }
    : {
        backgroundColor: "transparent",
        color: "var(--toggle-inactive-fg)",
      };
}

export function ThemeToggle() {
  const mounted = useHydrated();
  const dark = useIsDark();
  const isDark = mounted && dark;

  function select(next: Theme) {
    applyTheme(next);
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-1.5",
        !mounted && "pointer-events-none opacity-0",
      )}
    >
      <button
        type="button"
        aria-pressed={!isDark}
        aria-label="Light mode"
        onClick={() => select("light")}
        style={segmentStyle(!isDark)}
        className={segmentClass}
      >
        <Sun className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Dark mode"
        onClick={() => select("dark")}
        style={segmentStyle(isDark)}
        className={segmentClass}
      >
        <Moon className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
