const FOOTER_LINKS = [
  { label: "fbclh", href: "https://www.fbclh.io/" },
  { label: "GitHub", href: "https://github.com/fbclh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/fbclh/" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-16 pt-8 pb-8 before:pointer-events-none before:absolute before:inset-y-0 before:left-[calc(50%-50vw)] before:right-[calc(50%-50vw)] before:-z-10 before:bg-card">
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Macro Signal</p>
        </div>

        <nav aria-label="Social links">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
