"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Feather, Compass, Heart } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BookOpen },
  { href: '/manuscript', label: 'Manuscript', icon: Feather },
  { href: '/worldbuilding', label: 'Worldbuilding', icon: Compass },
  { href: '/characters', label: 'Characters', icon: Sparkles },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-12 text-ink lg:px-12">
      <section className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-velvet backdrop-blur">
        <div className="grid gap-10 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12 lg:p-16">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-rosewater bg-blush/70 px-4 py-2 text-sm">
              <Heart className="h-4 w-4" />
              Keepsakes of my heart.
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              A calm sanctuary for every tale you hold dear.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/80">
              Velvette gathers your manuscripts, characters, lore, and memories into a cozy archive that feels like a velvet journal made for fantasy authors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard" className="rounded-full bg-rosewater px-6 py-3 font-semibold transition hover:scale-[1.02]">
                Enter the sanctuary
              </Link>
              <Link href="/manuscript" className="rounded-full border border-sage bg-mint/50 px-6 py-3 font-semibold transition hover:scale-[1.02]">
                Open manuscript
              </Link>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-sage/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.9),_rgba(223,232,217,0.95))] p-7">
            <div className="rounded-[1.4rem] border border-white/70 bg-parchment p-6 shadow-inner">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-ink/70">Tonight&apos;s page</p>
                  <h2 className="text-2xl font-semibold">The Lantern Archive</h2>
                </div>
                <div className="rounded-full bg-rosewater/80 px-3 py-1 text-sm">Draft</div>
              </div>
              <div className="space-y-3 text-base leading-7 text-ink/75">
                <p>“The moonlight rested gently on the vellum pages, and the old oak seemed to breathe with the hush of memory.”</p>
                <p>Every chapter is framed in calm, soft light, with room for your worlds to unfold without pressure.</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl border border-sage/50 bg-white/70 px-4 py-3 transition hover:border-rosewater hover:bg-blush/60">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
