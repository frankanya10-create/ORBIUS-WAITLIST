import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-ink-950/10 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-ink-950">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-400">
            <Logo size={12} />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            orbius
          </span>
        </div>
        <p className="font-mono text-xs text-ink-400">
          built by students, for students &middot; &copy; {new Date().getFullYear()}
        </p>
        <div className="flex gap-4 font-mono text-xs text-ink-400">
          <a href="https://instagram.com/orbiu_s" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink-950">
            instagram
          </a>
          <a href="https://twitter.com/orbius_sx" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink-950">
            x / twitter
          </a>
          <a href="https://tiktok.com/@orbiu_s" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink-950">
            tiktok
          </a>
        </div>
      </div>
    </footer>
  );
}
