"use client";

import { Button } from "@/components/ui/button";
import { LiveLayer } from "@/components/live-layer";
import { ArrowUpRight, Sparkles, Video, KanbanSquare, BarChart3 } from "lucide-react";

const TESTIMONIALS = [
  { quote: "Serin transformed our hiring process completely. We found candidates we would have missed otherwise.", name: "Sarah Chen", role: "Head of Talent, TechCorp" },
  { quote: "The live interview feature with transcription is a game-changer. We focus on the conversation, not notes.", name: "Michael Rodriguez", role: "Recruitment Lead, StartupHub" },
  { quote: "Resume parsing alone saves our team 10+ hours per week. The accuracy is genuinely impressive.", name: "Priya Sharma", role: "HR Manager, GlobalTech" },
  { quote: "Kanban-style tracking gives us complete visibility. No more candidates falling through the cracks.", name: "David Kim", role: "VP of People, InnovateCo" },
  { quote: "Analytics dashboards helped us cut time-to-hire by 40% in three months.", name: "Emily Johnson", role: "Talent Operations, ScaleUp" },
  { quote: "Best ATS we've used. Team collaboration features make feedback so much easier.", name: "James Wilson", role: "CTO, DevStudio" },
];

const FEATURES = [
  { n: "01", label: "Intelligence", icon: Sparkles, t: "AI-powered job creation", d: "Generate complete, well-structured job postings in seconds. The agent analyzes your requirements and proposes descriptions calibrated to attract the right candidates." },
  { n: "02", label: "Experience", icon: Video, t: "Live AI interviews", d: "Conduct video interviews with built-in voice activity detection and automatic recording. Review with AI-generated transcripts and side-by-side candidate comparison." },
  { n: "03", label: "Workflow", icon: KanbanSquare, t: "Smart application tracking", d: "Visualize the full pipeline on Kanban boards. Drag candidates through stages, collaborate with your team, and never lose track of promising talent." },
  { n: "04", label: "Intelligence", icon: BarChart3, t: "Data-driven insights", d: "Turn recruitment data into action. Track key metrics, analyze trends, and optimize your talent acquisition strategy from one dashboard." },
];

const STEPS = [
  { n: "01", t: "Define the role", d: "Paste a job description or pick a template. Serin extracts the competencies that actually matter for the position." },
  { n: "02", t: "Calibrate the rubric", d: "Set the skills, depth, and weighting. The agent generates structured questions aligned to each dimension." },
  { n: "03", t: "Run interviews on autopilot", d: "Candidates take the interview asynchronously across time zones. The agent adapts question by question." },
  { n: "04", t: "Review with signal, not noise", d: "Scored transcripts, evidence per dimension, and a ranked shortlist your team can act on the same day." },
];

export default function Home() {
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      <div className="mesh-bg" />
      <div className="noise" />
      <LiveLayer />

      {/* Nav */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg
            width="28"
            height="20"
            viewBox="0 0 28 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
            aria-label="Serin logo"
          >
            <path
              d="M2 18 A 12 12 0 0 1 26 18"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M7 18 A 7 7 0 0 1 21 18"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="text-lg font-serif tracking-tight">Serin</span>
        </div>
        <div className="hidden md:flex items-center gap-9 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Customers</a>
          <a href="#cta" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <Button variant="ghost" size="sm" className="rounded-full px-4 hover:bg-foreground/5">
          Sign in
        </Button>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-28 md:pb-36">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground mb-10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-foreground">Now in private beta</span>
            <span className="opacity-40">·</span>
            <span>Other visitors live on this page</span>
          </div>

          <h1 className="font-serif text-[3.25rem] sm:text-7xl md:text-[6.25rem] leading-[0.95] tracking-[-0.03em] text-foreground">
            Connecting skills
            <br />
            <span className="italic text-[color:var(--terra)]">with the opportunities</span>
            <br />
            they deserve.
          </h1>

          <p className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Serin is an agentic interview platform. AI-powered job creation, live interviews
            with voice activity detection, and intelligent pipeline tracking, built for
            recruiting teams that hire on substance.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="rounded-full px-7 h-12 text-base bg-foreground text-background hover:bg-foreground/90 group">
              Reserve early access
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full px-7 h-12 text-base hover:bg-foreground/5">
              Watch a sample interview
            </Button>
          </div>
        </div>
      </section>

      <div className="hairline max-w-7xl mx-auto" />

      {/* Features */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold text-[color:var(--terra)] mb-4 uppercase tracking-[0.18em]">Features</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] text-foreground">
              Why recruiting teams<br />choose Serin.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex items-end">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Four product surfaces, one continuous workflow. From the first job description
              to the offer letter, Serin removes the friction without removing the human.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <div key={f.n} className="card-hover glass rounded-2xl p-10 md:p-12">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">{f.n}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--terra)]">{f.label}</span>
                </div>
                <div className="h-9 w-9 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <f.icon className="h-4 w-4 text-foreground/70" />
                </div>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl tracking-[-0.02em] text-foreground mb-4 leading-[1.1]">
                {f.t}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="hairline max-w-7xl mx-auto" />

      {/* How it works */}
      <section id="how" className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
        <div className="max-w-2xl mb-20">
          <p className="text-xs font-semibold text-[color:var(--terra)] mb-4 uppercase tracking-[0.18em]">How it works</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] text-foreground">
            From job description to <span className="italic text-[color:var(--terra)]">ranked shortlist</span>, in one workflow.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="card-hover glass rounded-2xl p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted-foreground tracking-wider">{s.n}</span>
                <span className="h-px flex-1 mx-4 bg-border" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Step</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3 tracking-[-0.01em] leading-[1.15]">{s.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="hairline max-w-7xl mx-auto" />

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-28 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 mb-16">
          <p className="text-xs font-semibold text-[color:var(--terra)] mb-4 uppercase tracking-[0.18em]">Testimonials</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-[-0.02em] leading-[1.05] text-foreground max-w-2xl">
            Trusted by recruiting teams worldwide.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex marquee gap-5 w-max">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <figure key={i} className="w-[380px] flex-shrink-0 glass rounded-2xl p-7">
                <blockquote className="text-foreground/90 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[color:var(--terra)] to-[oklch(0.4_0.12_35)] flex items-center justify-center text-xs font-semibold text-white">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm text-foreground font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="hairline max-w-7xl mx-auto" />

      {/* CTA */}
      <section id="cta" className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">
        <div className="relative rounded-3xl overflow-hidden glass p-12 md:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.7_0.14_40/0.18),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.7_0.1_140/0.15),transparent_55%)]" />

          <div className="relative">
            <h2 className="font-serif text-4xl md:text-6xl tracking-[-0.02em] leading-[1.0] text-foreground max-w-3xl">
              Interview every <span className="italic text-[color:var(--terra)]">promising</span> candidate.
              <br />
              Without burning your team.
            </h2>
            <p className="mt-8 text-muted-foreground text-lg max-w-2xl leading-relaxed">
              Join engineering and recruiting teams piloting Serin today. Private beta is open
              by application.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-full px-7 h-12 text-base bg-foreground text-background hover:bg-foreground/90 group">
                Reserve early access
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full px-7 h-12 text-base hover:bg-foreground/5">
                Talk to the team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <svg
              width="22"
              height="16"
              viewBox="0 0 28 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground"
              aria-label="Serin logo"
            >
              <path
                d="M2 18 A 12 12 0 0 1 26 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M7 18 A 7 7 0 0 1 21 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span>© 2026 Serin · Made on Earth, by humans</span>
          </div>
          <div className="flex gap-7">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}