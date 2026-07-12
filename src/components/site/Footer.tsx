import { Instagram, Twitter, Youtube, Facebook, Mail, MapPin } from "lucide-react";
import { NAV_ITEMS } from "@/data/series";

const SOCIALS = [
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X / Twitter" },
  { icon: Youtube, label: "YouTube" },
  { icon: Facebook, label: "Facebook" },
];

export function Footer() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-surface-1">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
      />
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-display text-2xl font-extrabold text-gold-gradient">
              VANE &amp; CO
            </span>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              A cinematic crime saga set in the smoke and gold of 1920s Birmingham.
              An original concept campaign created as a design portfolio showcase.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid size-11 place-items-center border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label-caps text-gold">Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {NAV_ITEMS.map((n) => (
                <li key={n.href}>
                  <button
                    onClick={() => go(n.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-caps text-gold">Contact</h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-bronze" />
                <span>Small Heath, Birmingham
                  <br />England, 1924</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-bronze" />
                <a href="mailto:family@vaneandco.co.uk" className="transition-colors hover:text-gold">
                  family@vaneandco.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vane &amp; Co. A fictional concept campaign. All imagery AI-generated for portfolio use.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-gold">Privacy</a>
            <a href="#" className="transition-colors hover:text-gold">Terms</a>
            <a href="#" className="transition-colors hover:text-gold">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
