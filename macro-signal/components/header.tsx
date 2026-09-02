import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="relative pb-8 before:pointer-events-none before:absolute before:-top-10 before:bottom-0 before:left-[calc(50%-50vw)] before:right-[calc(50%-50vw)] before:-z-10 before:bg-card">
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Macro Signal
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            G7 macro indicators
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Compare growth, inflation, unemployment and more across G7 economies.
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
