import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/data/series";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/60 bg-background/70 py-3 backdrop-blur-xl"
            : "py-5",
        )}
      >
        <nav className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
          <button
            onClick={() => go("#home")}
            aria-label="Vane & Co — home"
            className="group flex flex-col leading-none"
          >
            <span className="font-display text-lg font-extrabold tracking-tight text-gold-gradient sm:text-xl">
              VANE &amp; CO
            </span>
            <span className="label-caps mt-1 text-[0.55rem] text-muted-foreground transition-colors group-hover:text-gold">
              Birmingham · 1924
            </span>
          </button>

          <div className="hidden items-center gap-1 xl:flex">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className={cn(
                    "relative px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors",
                    isActive ? "text-gold" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-gold"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go("#contact")}
              className="label-caps hidden bg-gold px-5 py-2.5 text-[0.65rem] text-primary-foreground transition-shadow hover:gold-glow lg:inline-flex"
            >
              Join the Family
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-11 place-items-center border border-border text-gold transition-colors hover:border-gold xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col border-l border-border bg-surface-1 p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-bold text-gold-gradient">
                  VANE &amp; CO
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center border border-border text-gold"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-10 flex flex-col">
                {NAV_ITEMS.map((item, i) => {
                  const id = item.href.replace("#", "");
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => go(item.href)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className={cn(
                        "border-b border-border/50 py-4 text-left font-display text-2xl transition-colors",
                        active === id ? "text-gold" : "text-foreground hover:text-gold",
                      )}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
              <button
                onClick={() => go("#contact")}
                className="label-caps mt-auto bg-gold py-4 text-primary-foreground"
              >
                Join the Family
              </button>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
