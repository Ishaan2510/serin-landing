"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LiveLayer } from "@/components/live-layer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <LiveLayer />

      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-400" />
          <span className="text-lg font-semibold tracking-tight">Serin</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#product" className="hover:text-zinc-100 transition">Product</a>
          <a href="#how" className="hover:text-zinc-100 transition">How it works</a>
          <a href="#trust" className="hover:text-zinc-100 transition">Trust</a>
        </div>
        <Button variant="secondary" size="sm">Request access</Button>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live: see other visitors exploring this page
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            AI interviews
            <br />
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
              that feel human.
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Serin is an agentic interview platform that asks meaningful follow-ups,
            adapts in real time, and surfaces signal traditional assessments miss.
            Built for teams that hire on substance.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="text-base px-7">Reserve early access</Button>
            <Button size="lg" variant="outline" className="text-base px-7">
              Watch a sample interview
            </Button>
          </div>
        </div>
      </section>

      {/* Product */}
      <section id="product" className="relative z-10 max-w-7xl mx-auto px-8 py-24 border-t border-zinc-900">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wider">The product</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Built for structured, scalable, signal-rich interviews.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition">
            <div className="h-10 w-10 rounded-lg bg-zinc-900 mb-5 flex items-center justify-center">
              <div className="h-4 w-4 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Adaptive follow-ups</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The agent listens, reasons, and probes deeper on weak answers, just like a senior interviewer would.
            </p>
          </Card>
          <Card className="p-6 bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition">
            <div className="h-10 w-10 rounded-lg bg-zinc-900 mb-5 flex items-center justify-center">
              <div className="h-4 w-4 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Evaluation that scales</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Multi-dimensional scoring, instruction-following, and side-by-side candidate comparison out of the box.
            </p>
          </Card>
          <Card className="p-6 bg-zinc-950 border-zinc-900 hover:border-zinc-800 transition">
            <div className="h-10 w-10 rounded-lg bg-zinc-900 mb-5 flex items-center justify-center">
              <div className="h-4 w-4 rounded-sm bg-gradient-to-br from-zinc-200 to-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Always-on availability</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Candidates interview when they're ready, across time zones, with consistent rigor every run.
            </p>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 max-w-7xl mx-auto px-8 py-24 border-t border-zinc-900">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium text-zinc-500 mb-3 uppercase tracking-wider">How it works</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            From job description to ranked candidates in one workflow.
          </h2>
        </div>
        <div className="space-y-px bg-zinc-900 rounded-lg overflow-hidden">
          {[
            { n: "01", t: "Define the role", d: "Paste a JD or pick a template. Serin extracts the competencies that matter." },
            { n: "02", t: "Calibrate the rubric", d: "Set the skills, depth, and weighting. The agent generates structured questions aligned to each dimension." },
            { n: "03", t: "Run interviews on autopilot", d: "Candidates take the interview asynchronously. The agent adapts question-by-question." },
            { n: "04", t: "Review with signal, not noise", d: "Get scored transcripts, evidence per dimension, and a ranked shortlist your team can act on." },
          ].map((s) => (
            <div key={s.n} className="bg-zinc-950 px-8 py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
              <span className="text-sm font-mono text-zinc-600 w-12">{s.n}</span>
              <h3 className="text-lg font-semibold md:w-64 flex-shrink-0">{s.t}</h3>
              <p className="text-zinc-400 text-sm md:text-base">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust / CTA */}
      <section id="trust" className="relative z-10 max-w-7xl mx-auto px-8 py-24 border-t border-zinc-900">
        <div className="rounded-2xl border border-zinc-900 bg-gradient-to-br from-zinc-950 to-black p-12 md:p-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            Interview every promising candidate. Without burning your team.
          </h2>
          <p className="mt-6 text-zinc-400 text-lg max-w-2xl">
            Join engineering and recruiting teams piloting Serin today.
          </p>
          <div className="mt-10 flex gap-3">
            <Button size="lg" className="text-base px-7">Reserve early access</Button>
            <Button size="lg" variant="ghost" className="text-base px-7 text-zinc-400 hover:text-zinc-100">
              Talk to the team
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 max-w-7xl mx-auto px-8 py-12 border-t border-zinc-900 text-sm text-zinc-500 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>© 2026 Serin. Built by Blink Analytics.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-300">Privacy</a>
          <a href="#" className="hover:text-zinc-300">Terms</a>
          <a href="#" className="hover:text-zinc-300">Contact</a>
        </div>
      </footer>
    </main>
  );
}