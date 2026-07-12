import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border/40 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -z-10 h-64 w-[90%] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(233,193,118,0.4), transparent 70%)" }}
      />
      <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
        <SectionHeading
          kicker="Join the Family"
          title="By Order of the Vanes"
          subtitle="Subscribe for exclusive stills, trailer drops and news from Birmingham. No spies. No secrets sold."
        />

        <Reveal>
          <div className="glass rim-gold mt-12 p-8 sm:p-10">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-6"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="grid size-16 place-items-center rounded-full bg-gold text-primary-foreground gold-glow"
                  >
                    <Check className="size-8" />
                  </motion.span>
                  <h3 className="font-display text-2xl text-foreground">You're one of us now.</h3>
                  <p className="text-sm text-muted-foreground">
                    Welcome to the family. Watch your inbox — we'll be in touch.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1 text-left">
                      <label htmlFor="nl-email" className="label-caps text-[0.6rem] text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        id="nl-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@birmingham.co.uk"
                        className="mt-2 w-full border-0 border-b border-bronze bg-transparent py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
                      />
                    </div>
                    <MagneticButton className="sm:mt-6 sm:self-end" aria-label="Subscribe">
                      Subscribe <ArrowRight className="size-4" />
                    </MagneticButton>
                  </div>
                  {error && <p className="text-left text-sm text-destructive">{error}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
