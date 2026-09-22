import { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  ExternalLink,
  Globe,
  HelpCircle,
  MapPin,
  Search,
  Settings2,
  Smartphone,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";
import { TypeWriter } from "@/components/TypeWriter";

const CAL_URL = "https://cal.com/alyssa-gable/fix-my-tech";
const EMAIL = "alyssasgable@gmail.com";

type Category = "website" | "mobile" | "presence" | "tech" | "unsure";

const diagnostics = {
  website: {
    label: "My website",
    icon: Globe,
    color: "text-cyan-400",
    issues: [
      "My site looks outdated",
      "Something is broken",
      "It doesn't work well on mobile",
      "I need a new page",
      "I want more people to contact me",
    ],
    response:
      "Your website probably doesn't need to be rebuilt from scratch. Let's figure out what's actually getting in the way.",
    price: "Website fixes start at $40",
  },

  mobile: {
    label: "Mobile",
    icon: Smartphone,
    color: "text-purple-400",
    issues: [
      "My site looks bad on phones",
      "Buttons or menus don't work",
      "Text or images are messed up",
      "The site feels slow",
      "I need help with mobile layout",
    ],
    response:
      "Mobile problems can make an otherwise good website frustrating to use. We can identify what's happening and fix the problem.",
    price: "Mobile fixes start at $40",
  },

  presence: {
    label: "Online presence",
    icon: Search,
    color: "text-green-400",
    issues: [
      "People can't find my business",
      "My website doesn't explain what I do",
      "I need a better landing page",
      "I need help with my online presence",
      "I don't know what I should improve",
    ],
    response:
      "Sometimes the problem isn't the technology. It's how the technology is presenting your business. We can look at the whole picture.",
    price: "Website upgrades start at $75",
  },

  tech: {
    label: "Tech setup",
    icon: Settings2,
    color: "text-yellow-400",
    issues: [
      "I need help choosing technology",
      "I need something connected",
      "I need an automation",
      "I'm stuck on a technical problem",
      "I have an idea but don't know how to build it",
    ],
    response:
      "Bring me the problem, even if you don't know the technical words for it. We'll figure out what you actually need.",
    price: "Consultations are free",
  },

  unsure: {
    label: "I don't know",
    icon: HelpCircle,
    color: "text-pink-400",
    issues: [
      "Something just feels wrong",
      "My website isn't getting results",
      "I inherited a website I don't understand",
      "I need someone to look at everything",
      "I don't know where to start",
    ],
    response:
      "That's completely fine. You don't need to diagnose the problem before asking for help.",
    price: "Start with a free consultation",
  },
};

export default function FixMyTech() {
  const [category, setCategory] = useState<Category | null>(null);
  const [issue, setIssue] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selected = category ? diagnostics[category] : null;

  const selectCategory = (value: Category) => {
    setCategory(value);
    setIssue(null);
  };

  useEffect(() => {
    if (!issue) {
      setRevealed(false);
      return;
    }
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 1400);
    return () => clearTimeout(t);
  }, [issue]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-400 selection:text-black">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a
          href="/"
          className="font-mono text-sm tracking-widest text-white transition hover:text-cyan-400"
        >
          ALYSSA<span className="text-cyan-400">/</span>GABLE
        </a>

        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-cyan-400/30 px-4 py-2 font-mono text-xs text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-400/10"
        >
          BOOK A CONSULT
        </a>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 text-center md:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 font-mono text-xs text-cyan-300">
          <MapPin className="h-3.5 w-3.5" />
          ATLANTA, GA • REMOTE-FRIENDLY
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Something on your
          <span className="block text-cyan-400">
            website not working?
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 md:text-xl">
          You don't need another complicated tech person.
          <br />
          Bring me the problem. We'll figure it out.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#diagnostic"
            className="group inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Diagnose my problem
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>

          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900"
          >
            Book a consultation
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-5 font-mono text-xs text-zinc-600">
          Small businesses • Creatives • Entrepreneurs • Community organizations
        </p>
      </section>

      {/* Interactive Diagnostic */}
      <section
        id="diagnostic"
        className="mx-auto max-w-5xl scroll-mt-10 px-6 pb-24"
      >
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/40">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/70 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
            <span className="h-3 w-3 rounded-full bg-green-400/70" />

            <div className="ml-3 flex items-center gap-2 font-mono text-xs text-zinc-500">
              <Terminal className="h-3 w-3" />
              fix-my-tech / diagnostic
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-8">
              <p className="font-mono text-sm text-cyan-400">
                $ diagnose --problem
              </p>

              <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                What's giving you trouble?
              </h2>

              <p className="mt-2 text-zinc-500">
                Pick the closest match. You can change your answer anytime.
              </p>
            </div>

            {/* Category Buttons */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {(Object.keys(diagnostics) as Category[]).map((key) => {
                const item = diagnostics[key];
                const Icon = item.icon;
                const active = category === key;

                return (
                  <button
                    key={key}
                    onClick={() => selectCategory(key)}
                    className={`group rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-cyan-400/60 bg-cyan-400/10"
                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-600 hover:bg-zinc-900"
                    }`}
                  >
                    <Icon
                      className={`mb-4 h-6 w-6 ${item.color} transition group-hover:scale-110`}
                    />

                    <div className="font-medium">{item.label}</div>

                    <div className="mt-1 text-xs text-zinc-600">
                      Click to explore
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Second Diagnostic Step */}
            {selected && (
              <div className="mt-10 border-t border-zinc-800 pt-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-zinc-600">
                      Next question
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Which sounds most like your problem?
                    </h3>

                    <div className="mt-5 space-y-2">
                      {selected.issues.map((item) => (
                        <button
                          key={item}
                          onClick={() => setIssue(item)}
                          className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                            issue === item
                              ? "border-cyan-400/50 bg-cyan-400/10 text-white"
                              : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              issue === item
                                ? "border-cyan-400 bg-cyan-400 text-black"
                                : "border-zinc-700"
                            }`}
                          >
                            {issue === item && (
                              <Check className="h-3 w-3" />
                            )}
                          </span>

                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Diagnostic Result */}
                  <div className="flex flex-col rounded-xl border border-zinc-800 bg-black p-6">
                    <div className="font-mono text-xs text-green-400">
                      {issue && !revealed ? (
                        <TypeWriter text="> analyzing..." speed={40} />
                      ) : (
                        "> ANALYSIS_COMPLETE"
                      )}
                    </div>

                    <div className="mt-5 flex-1">
                      <Sparkles className="h-7 w-7 text-cyan-400" />

                      {issue && !revealed && (
                        <p className="mt-5 font-mono text-sm text-zinc-500">
                          Cross-referencing known issues...
                        </p>
                      )}

                      {(!issue || revealed) && (
                        <>
                          <p className="mt-5 text-lg leading-7 text-zinc-200">
                            {issue
                              ? selected.response
                              : "Select the problem that sounds closest to what you're experiencing."}
                          </p>

                          {issue && (
                            <div className="mt-5 space-y-3">
                              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                                  Your problem
                                </p>
                                <p className="mt-1 text-sm text-zinc-300">
                                  {issue}
                                </p>
                              </div>

                              <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                                  My fix
                                </p>
                                <p className="mt-1 font-mono text-xs text-cyan-300">
                                  {selected.price}
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {issue && revealed && (
                      <a
                        href={CAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-6 flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300"
                      >
                        Let's fix it
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-y border-zinc-900 bg-zinc-950/60">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-12">
            <p className="font-mono text-sm text-cyan-400">
              // INTRODUCTORY PRICING
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Fix the problem. Don't overcomplicate it.
            </h2>

            <p className="mt-4 max-w-2xl text-zinc-500">
              I'm currently offering introductory pricing while I build my
              client base. Larger projects get a custom quote before any work
              begins.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Website Fix */}
            <div className="rounded-xl border border-cyan-400/30 bg-black/60 p-6 transition hover:-translate-y-1 hover:border-cyan-400/60">
              <Wrench className="h-6 w-6 text-cyan-400" />

              <div className="mt-6 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Website Fix</h3>

                <span className="font-mono text-sm text-cyan-400">
                  $40+
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Broken links, layout problems, forms, buttons, small updates
                and other focused fixes.
              </p>
            </div>

            {/* Website Cleanup */}
            <div className="rounded-xl border border-zinc-800 bg-black/40 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
              <Globe className="h-6 w-6 text-cyan-400" />

              <div className="mt-6 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Website Cleanup</h3>

                <span className="font-mono text-sm text-cyan-400">
                  $75+
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Clean up an existing site, improve structure, update content
                and make it easier to use.
              </p>
            </div>

            {/* Landing Page */}
            <div className="rounded-xl border border-zinc-800 bg-black/40 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
              <Sparkles className="h-6 w-6 text-cyan-400" />

              <div className="mt-6 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Landing Page</h3>

                <span className="font-mono text-sm text-cyan-400">
                  $125+
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                A focused page designed to explain what you do and give
                visitors a clear next step.
              </p>
            </div>

            {/* Consultation */}
            <div className="rounded-xl border border-zinc-800 bg-black/40 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
              <Settings2 className="h-6 w-6 text-cyan-400" />

              <div className="mt-6 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Tech Consultation</h3>

                <span className="font-mono text-sm text-green-400">
                  FREE
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Not sure what you need? Let's talk through the problem before
                you spend money.
              </p>
            </div>

            {/* Online Presence */}
            <div className="rounded-xl border border-zinc-800 bg-black/40 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
              <Search className="h-6 w-6 text-cyan-400" />

              <div className="mt-6 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Online Presence</h3>

                <span className="font-mono text-sm text-cyan-400">
                  $75+
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Look at your website and online presence together and identify
                practical improvements.
              </p>
            </div>

            {/* Custom */}
            <div className="rounded-xl border border-zinc-800 bg-black/40 p-6 transition hover:-translate-y-1 hover:border-zinc-600">
              <HelpCircle className="h-6 w-6 text-cyan-400" />

              <div className="mt-6 flex items-baseline justify-between gap-3">
                <h3 className="font-semibold">Custom Project</h3>

                <span className="font-mono text-sm text-cyan-400">
                  LET'S TALK
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Have an unusual idea? Bring it over. We'll figure out whether
                I can help build it.
              </p>
            </div>
          </div>

          {/* Pricing Note */}
          <div className="mt-8 rounded-lg border border-yellow-400/10 bg-yellow-400/5 px-5 py-4">
            <p className="font-mono text-xs leading-6 text-zinc-500">
              <span className="text-yellow-400">NOTE:</span>{" "}
              Introductory pricing applies to qualifying projects. Final
              pricing depends on the scope of the work.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono text-sm text-cyan-400">
              // HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              No tech-speak required.
            </h2>

            <p className="mt-4 text-zinc-500">
              You know what's frustrating about your technology. My job is to
              help figure out what needs to happen next.
            </p>
          </div>

          <div className="space-y-4">
            {[
              [
                "01",
                "Tell me what's happening",
                "Send me your website, describe the problem, or just tell me what you're trying to accomplish.",
              ],
              [
                "02",
                "We figure it out",
                "Use the free consultation to figure out whether it's a quick fix, a larger project, or something else.",
              ],
              [
                "03",
                "Fix it",
                "If I can help, I'll explain what needs to be done and what it will cost before we start.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="flex gap-5 rounded-xl border border-zinc-800 bg-zinc-950 p-5"
              >
                <div className="font-mono text-sm text-cyan-400">
                  {number}
                </div>

                <div>
                  <h3 className="font-semibold">{title}</h3>

                  <p className="mt-1 text-sm leading-6 text-zinc-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atlanta */}
      <section className="border-y border-zinc-900 bg-zinc-950/70">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-sm text-cyan-400">
                <MapPin className="h-4 w-4" />
                ATLANTA, GEORGIA
              </div>

              <h2 className="mt-4 text-3xl font-bold">
                Built in Atlanta.
                <br />
                Available beyond Atlanta.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-zinc-500">
                I help Atlanta-area small businesses, creatives,
                entrepreneurs, and community organizations make better use of
                their technology.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-black p-5 font-mono text-xs text-zinc-500">
              <div className="text-green-400">$ location</div>
              <div className="mt-2">Atlanta, GA</div>

              <div className="mt-4 text-green-400">$ availability</div>
              <div className="mt-2">local + remote</div>

              <div className="mt-4 text-green-400">$ approach</div>
              <div className="mt-2">
                practical / human / no jargon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-mono text-sm text-cyan-400">
          // FAQ
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          Before you book
        </h2>

        <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {[
            [
              "Do I have to be in Atlanta?",
              "No. I'm based in Atlanta, but many website and technology projects can be handled remotely.",
            ],
            [
              "Do I need a new website?",
              "Not necessarily. If your current site can be fixed or improved, there's no reason to rebuild it just because something isn't working.",
            ],
            [
              "What if I don't know what's wrong?",
              "That's exactly what the consultation is for. You can explain what you're experiencing without knowing the technical terminology.",
            ],
            [
              "How much will my project cost?",
              "Small fixes have starting prices listed above. Larger projects get a quote after we understand what actually needs to be done.",
            ],
          ].map(([question, answer]) => (
            <div key={question}>
              <h3 className="font-semibold text-zinc-200">
                {question}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-6 py-16 text-center md:px-12">
          <Sparkles className="mx-auto h-8 w-8 text-cyan-400" />

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Let's figure out what's wrong.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-zinc-400">
            Start with a conversation. No pressure to buy anything. Just bring
            the problem.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-7 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Book a Fix My Tech consultation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>

            <a
              href={`mailto:${EMAIL}?subject=Fix My Tech Request`}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-7 py-3 font-semibold text-white transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Email me
            </a>
          </div>

          <p className="mt-6 font-mono text-xs text-zinc-600">
            {EMAIL}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 font-mono text-xs text-zinc-600 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Alyssa Gable
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="transition hover:text-cyan-400"
            >
              Portfolio
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="transition hover:text-cyan-400"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
